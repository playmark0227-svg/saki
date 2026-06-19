/* =====================================================================
 * engine.js  —  ビジュアルノベル進行エンジン
 *  - シーン進行 / タイプライター演出 / 選択肢 / 好感度
 *  - ルート分岐・エンディング判定
 *  - セーブ＆ロード（localStorage）
 *  - 手続き的BGM・効果音（Web Audio API）
 * ===================================================================== */

(function () {
  "use strict";

  const SAVE_KEY = "sakura7_save_v1";
  // トゥルーエンド到達に必要な好感度（ルートごとに到達可能域が違うため個別設定）。
  // この値「未満」で受け入れ＝グッド、以上＝トゥルー、告白拒否＝ノーマル。
  const TRUE_THRESHOLD = { saki: 21, yukino: 25, hinata: 23, shion: 23 };

  /* ---------------- ゲーム状態 ---------------- */
  const defaultState = () => ({
    name: "さき",
    day: 0,
    scene: STORY_START,
    page: 0,
    aff: { saki: 0, yukino: 0, hinata: 0, shion: 0 },
    flags: {},
    route: null,
  });
  let state = defaultState();

  /* タイプライター制御 */
  let typing = false;
  let typeTimer = null;
  let fullText = "";

  /* ---------------- DOM 取得 ---------------- */
  const $ = (id) => document.getElementById(id);
  const els = {};
  function cacheEls() {
    [
      "title-screen", "title-continue", "title-start", "title-about", "about-box", "title-collect",
      "game-screen", "bg", "petals", "stage", "affection-bar",
      "dialogue", "speaker", "text", "choices", "advance-hint",
      "daycard", "daycard-text", "name-modal", "name-input", "name-ok",
      "ending-screen", "ending-title", "ending-text", "ending-restart", "ending-title-btn",
      "btn-save", "btn-load", "btn-bgm", "btn-title", "toast",
    ].forEach((k) => (els[k] = $(k)));
  }

  /* =====================================================================
   * サウンド（Web Audio API・手続き生成）
   * ===================================================================== */
  const Sound = {
    ctx: null, master: null, bgmOn: false, bgmTimer: null, step: 0,
    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    },
    note(freq, dur, type = "sine", vol = 0.18, when = 0) {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + when;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(this.master);
      o.start(t);
      o.stop(t + dur + 0.05);
    },
    blip() { this.init(); this.note(660, 0.06, "square", 0.04); },
    select() { this.init(); this.note(523, 0.08, "triangle", 0.12); this.note(784, 0.12, "triangle", 0.1, 0.06); },
    chime() { this.init(); [659, 880, 1046].forEach((f, i) => this.note(f, 0.5, "sine", 0.12, i * 0.08)); },
    // やさしいペンタトニックのアルペジオ・ループ
    melody: [392, 440, 523, 587, 659, 587, 523, 440, 392, 523, 659, 784, 659, 523, 440, 392],
    bass:   [196, 0, 196, 0, 220, 0, 220, 0, 174, 0, 174, 0, 196, 0, 196, 0],
    startBgm() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      this.bgmOn = true;
      this.step = 0;
      const tick = () => {
        if (!this.bgmOn) return;
        const i = this.step % this.melody.length;
        this.note(this.melody[i], 0.45, "sine", 0.06);
        if (i % 2 === 0) this.note(this.melody[i] * 2, 0.3, "triangle", 0.02);
        if (this.bass[i]) this.note(this.bass[i], 0.6, "sine", 0.05);
        this.step++;
      };
      tick();
      this.bgmTimer = setInterval(tick, 340);
    },
    stopBgm() {
      this.bgmOn = false;
      if (this.bgmTimer) clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    },
    toggleBgm() {
      if (this.bgmOn) { this.stopBgm(); return false; }
      this.startBgm(); return true;
    },
  };

  /* =====================================================================
   * 桜の花びらエフェクト
   * ===================================================================== */
  function spawnPetals() {
    const c = els.petals;
    c.innerHTML = "";
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = 6 + Math.random() * 8 + "s";
      p.style.animationDelay = -Math.random() * 12 + "s";
      p.style.transform = `scale(${0.5 + Math.random() * 0.9})`;
      p.style.opacity = 0.4 + Math.random() * 0.5;
      c.appendChild(p);
    }
  }

  /* =====================================================================
   * 描画
   * ===================================================================== */
  function applyName(t) {
    return (t || "").replace(/\{name\}/g, state.name || "さき");
  }

  function setBackground(bg) {
    els.bg.className = "bg bg-" + (bg || "schoolgate");
  }

  function renderPortrait(who, exp) {
    if (!who || who === "" || who === "player") {
      els.stage.innerHTML = "";
      els.stage.classList.remove("show");
      return;
    }
    const c = CHARACTERS[who];
    if (!c) { els.stage.innerHTML = ""; return; }
    els.stage.innerHTML =
      `<div class="portrait" style="--c:${c.color};--c2:${c.color2}">${buildCharArt(who, exp || "normal")}</div>`;
    // 再アニメーションのためにリフロー
    void els.stage.offsetWidth;
    els.stage.classList.add("show");
  }

  function renderSpeaker(who) {
    if (!who) { els.speaker.style.display = "none"; return; }
    els.speaker.style.display = "inline-block";
    if (who === "player") {
      els.speaker.textContent = state.name || "あなた";
      els.speaker.style.background = "linear-gradient(135deg,#7a8cff,#9d7aff)";
    } else if (CHARACTERS[who]) {
      els.speaker.textContent = CHARACTERS[who].name;
      const c = CHARACTERS[who];
      els.speaker.style.background = `linear-gradient(135deg,${c.color},${shadeHex(c.color, -18)})`;
    }
  }

  function shadeHex(hex, p) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = p / 100;
    r = Math.round(Math.min(255, Math.max(0, r + 255 * f)));
    g = Math.round(Math.min(255, Math.max(0, g + 255 * f)));
    b = Math.round(Math.min(255, Math.max(0, b + 255 * f)));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* 好感度バー */
  function renderAffection() {
    const max = 24;
    els["affection-bar"].innerHTML = ["saki", "yukino", "hinata", "shion"].map((id) => {
      const c = CHARACTERS[id];
      const v = Math.max(0, Math.min(max, state.aff[id]));
      const pct = (v / max) * 100;
      const hearts = Math.round((v / max) * 5);
      const hd = "♥".repeat(hearts) + "♡".repeat(5 - hearts);
      return `<div class="aff-row" title="${c.name}">
        <div class="aff-face" style="--c:${c.color}">${buildPortrait(id, v >= 14 ? "happy" : v >= 6 ? "smile" : "normal")}</div>
        <div class="aff-meta">
          <span class="aff-name" style="color:${shadeHex(c.color,-25)}">${c.short}</span>
          <span class="aff-hearts" style="color:${c.color}">${hd}</span>
          <div class="aff-track"><div class="aff-fill" style="width:${pct}%;background:linear-gradient(90deg,${c.color},${c.color2})"></div></div>
        </div>
      </div>`;
    }).join("");
  }

  /* タイプライター */
  function typeText(txt) {
    fullText = txt;
    typing = true;
    els.text.textContent = "";
    els["advance-hint"].style.opacity = 0;
    let i = 0;
    clearInterval(typeTimer);
    typeTimer = setInterval(() => {
      if (i >= txt.length) {
        finishTyping();
        return;
      }
      els.text.textContent += txt[i];
      if (txt[i] !== "「" && txt[i] !== "」" && txt[i] !== "、" && txt[i] !== "。" && i % 2 === 0) Sound.blip();
      i++;
    }, 28);
  }
  function finishTyping() {
    clearInterval(typeTimer);
    els.text.textContent = fullText;
    typing = false;
    els["advance-hint"].style.opacity = 0.9;
  }

  /* =====================================================================
   * シーン進行
   * ===================================================================== */
  function gotoScene(id) {
    state.scene = id;
    state.page = 0;
    const sc = STORY[id];
    if (!sc) { console.error("missing scene:", id); return; }

    // 効果適用（好感度・フラグ）
    let gained = false;
    if (sc.eff) gained = applyEff(sc.eff);
    if (sc.flag) Object.assign(state.flags, sc.flag);

    // 特殊ノード
    if (sc.nameInput) { showNameModal(); return; }
    if (sc.branch === "route") { resolveRoute(); return; }
    if (sc.branch && sc.branch.startsWith("ending:")) {
      resolveEnding(sc.branch.split(":")[1]); return;
    }
    if (sc.startDay) {
      state.day = sc.startDay;
      showDayCard(sc.dayTitle, () => gotoScene(sc.next));
      return;
    }
    if (sc.ending) { showEnding(sc); return; }

    setBackground(sc.bg);
    renderPortrait(sc.who, sc.exp);
    renderSpeaker(sc.who);
    renderAffection();
    if (gained) Sound.chime();
    showPage();
  }

  function applyEff(eff) {
    let gained = false;
    for (const k in eff) {
      if (state.aff[k] === undefined) continue;
      if (eff[k] > 0) gained = true;
      state.aff[k] = Math.max(0, state.aff[k] + eff[k]);
    }
    return gained;
  }

  function showPage() {
    const sc = STORY[state.scene];
    els.choices.innerHTML = "";
    els.choices.style.display = "none";
    const pages = sc.text || [""];
    typeText(applyName(pages[state.page]));
  }

  function advance() {
    if (typing) { finishTyping(); return; }
    const sc = STORY[state.scene];
    const pages = sc.text || [""];
    if (state.page < pages.length - 1) {
      state.page++;
      showPage();
      return;
    }
    // 最終ページ後
    if (sc.choices) { showChoices(sc.choices); return; }
    if (sc.next) { gotoScene(sc.next); return; }
  }

  function showChoices(choices) {
    els["advance-hint"].style.opacity = 0;
    els.choices.style.display = "flex";
    els.choices.innerHTML = "";
    choices.forEach((ch) => {
      const b = document.createElement("button");
      b.className = "choice";
      b.textContent = applyName(ch.label);
      b.onclick = (e) => {
        e.stopPropagation();
        Sound.select();
        if (ch.eff) { if (applyEff(ch.eff)) setTimeout(() => Sound.chime(), 120); }
        if (ch.flag) Object.assign(state.flags, ch.flag);
        renderAffection();
        gotoScene(ch.next);
      };
      els.choices.appendChild(b);
    });
  }

  /* ルート分岐：最も好感度の高いヒロインへ */
  function resolveRoute() {
    const order = ["saki", "yukino", "hinata", "shion"];
    let best = order[0];
    order.forEach((id) => { if (state.aff[id] > state.aff[best]) best = id; });
    state.route = best;
    gotoScene(best + "_4_title");
  }

  /* エンディング判定 */
  /* エンディング判定：好感度でルート決定 → フラグ組み合わせで100通りを合成 */
  function resolveEnding(char) {
    const e = window.computeEnding(char, state.flags);
    showComputedEnding(e);
  }

  const ENDINGS_KEY = "sakura7_endings_v1";
  function getCollected() {
    try { return JSON.parse(localStorage.getItem(ENDINGS_KEY) || "[]"); } catch (e) { return []; }
  }
  function recordEnding(code) {
    try {
      const s = getCollected();
      if (s.indexOf(code) < 0) { s.push(code); localStorage.setItem(ENDINGS_KEY, JSON.stringify(s)); }
    } catch (e) {}
  }

  function showComputedEnding(e) {
    setBackground(e.bg);
    els["game-screen"].classList.remove("active");
    els["ending-screen"].classList.add("active");
    const c = CHARACTERS[e.who];
    els["ending-title"].textContent = applyName(e.title);
    els["ending-title"].style.color = c ? c.color : "#ff7aa8";
    recordEnding(e.code);
    const collected = getCollected().length;
    let html = "";
    html += `<div class="ending-no">ENDING No.${e.code} / ${e.total}　<span class="ending-rank">${e.rank}</span></div>`;
    if (c) html += `<div class="ending-portrait" style="--c:${c.color}">${buildCharArt(e.who, e.exp || "happy")}</div>`;
    html += `<div class="ending-body">` + (e.body || []).map((t) => `<p>${applyName(t)}</p>`).join("") + `</div>`;
    html += `<p class="ending-fin">― 完 ―</p>`;
    html += `<div class="ending-collect">エンディング回収　${collected} / 100 種</div>`;
    els["ending-text"].innerHTML = html;
    els["ending-screen"].scrollTop = 0;
    clearSave();
  }

  /* =====================================================================
   * 名前入力 / デイカード / エンディング
   * ===================================================================== */
  function showNameModal() {
    els["name-modal"].classList.add("show");
    els["name-input"].value = state.name && state.name !== "あなた" ? state.name : "さき";
    els["name-input"].focus();
    els["name-input"].select();
  }
  function confirmName() {
    const v = els["name-input"].value.trim();
    state.name = v || "さき";
    els["name-modal"].classList.remove("show");
    Sound.select();
    gotoScene(STORY[state.scene].next);
  }

  function showDayCard(title, cb) {
    els["daycard-text"].textContent = title;
    els.daycard.classList.add("show");
    setTimeout(() => {
      els.daycard.classList.remove("show");
      setTimeout(cb, 600);
    }, 1900);
  }

  function showEnding(sc) {
    setBackground(sc.bg);
    els["game-screen"].classList.remove("active");
    els["ending-screen"].classList.add("active");
    const c = CHARACTERS[sc.who];
    els["ending-title"].textContent = applyName(sc.endTitle);
    els["ending-title"].style.color = c ? c.color : "#ff7aa8";
    let html = "";
    if (c) html += `<div class="ending-portrait" style="--c:${c.color}">${buildCharArt(sc.who, sc.exp || "happy")}</div>`;
    html += `<div class="ending-body">` + (sc.text || []).map((t) => `<p>${applyName(t)}</p>`).join("") + `</div>`;
    html += `<p class="ending-fin">― 完 ―</p>`;
    els["ending-text"].innerHTML = html;
    els["ending-screen"].scrollTop = 0;
    clearSave();
  }

  /* =====================================================================
   * セーブ / ロード
   * ===================================================================== */
  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      toast("セーブしました 💾");
    } catch (e) { toast("セーブできませんでした"); }
  }
  function hasSave() {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) { toast("セーブデータがありません"); return false; }
      state = Object.assign(defaultState(), JSON.parse(raw));
      startGameUI();
      gotoScene(state.scene);
      toast("ロードしました 📂");
      return true;
    } catch (e) { toast("ロードに失敗しました"); return false; }
  }
  function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

  let toastTimer = null;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1800);
  }

  /* =====================================================================
   * 画面遷移
   * ===================================================================== */
  function startGameUI() {
    els["title-screen"].classList.remove("active");
    els["ending-screen"].classList.remove("active");
    els["game-screen"].classList.add("active");
    spawnPetals();
  }

  function newGame() {
    state = defaultState();
    startGameUI();
    gotoScene(STORY_START);
  }

  function backToTitle() {
    Sound.select();
    els["game-screen"].classList.remove("active");
    els["ending-screen"].classList.remove("active");
    els["title-screen"].classList.add("active");
    els["title-continue"].style.display = hasSave() ? "inline-block" : "none";
    refreshCollect();
    spawnPetals();
  }

  function refreshCollect() {
    if (els["title-collect"]) {
      els["title-collect"].textContent = "🌸 エンディング回収　" + getCollected().length + " / 100 種";
    }
  }

  /* =====================================================================
   * 初期化・イベント
   * ===================================================================== */
  function init() {
    cacheEls();
    spawnPetals();
    els["title-continue"].style.display = hasSave() ? "inline-block" : "none";
    refreshCollect();

    els["title-start"].onclick = () => { Sound.select(); if (!Sound.bgmOn) toggleBgmBtn(true); newGame(); };
    els["title-continue"].onclick = () => { Sound.select(); if (!Sound.bgmOn) toggleBgmBtn(true); load(); };
    els["title-about"].onclick = () => {
      Sound.blip();
      els["about-box"].classList.toggle("show");
    };

    // ダイアログ送り
    els.dialogue.onclick = () => advance();

    // 名前入力
    els["name-ok"].onclick = confirmName;
    els["name-input"].addEventListener("keydown", (e) => { if (e.key === "Enter") confirmName(); });

    // HUD
    els["btn-save"].onclick = (e) => { e.stopPropagation(); Sound.blip(); save(); };
    els["btn-load"].onclick = (e) => { e.stopPropagation(); Sound.blip(); load(); };
    els["btn-bgm"].onclick = (e) => { e.stopPropagation(); toggleBgmBtn(); };
    els["btn-title"].onclick = (e) => { e.stopPropagation(); backToTitle(); };

    // エンディング
    els["ending-restart"].onclick = () => { Sound.select(); newGame(); };
    els["ending-title-btn"].onclick = () => backToTitle();

    // キーボード操作
    document.addEventListener("keydown", (e) => {
      if (els["name-modal"].classList.contains("show")) return;
      if (!els["game-screen"].classList.contains("active")) return;
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        if (els.choices.style.display !== "none") return;
        advance();
      }
    });
  }

  function toggleBgmBtn(forceOn) {
    let on;
    if (forceOn) { Sound.startBgm(); on = true; }
    else on = Sound.toggleBgm();
    els["btn-bgm"].textContent = on ? "♪ BGM" : "♪ off";
    els["btn-bgm"].classList.toggle("muted", !on);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
