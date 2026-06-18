/* =====================================================================
 * characters.js
 * キャラクターのデータ定義と、SVGによる立ち絵（ポートレート）生成。
 * 画像ファイルを一切使わず、すべてSVGで描画する。
 * 表情（expression）を差し替えることで感情表現を行う。
 * ===================================================================== */

/* キャラクターのカラーパレットと基本プロフィール */
const CHARACTERS = {
  saki: {
    id: "saki",
    name: "結城 咲",
    short: "咲",
    color: "#ff7a59",          // テーマカラー（コーラル）
    color2: "#ffd2a8",
    title: "幼なじみの太陽",
    palette: {
      hair: "#c8763c", hair2: "#a85e2a", hairHi: "#e6a368",
      eye: "#8a4b1e", brow: "#9c5a2a",
      ribbon: "#ff6f43", uniform: "#3a4a63", collar: "#f3f5ff",
    },
  },
  yukino: {
    id: "yukino",
    name: "氷室 雪乃",
    short: "雪乃",
    color: "#6a7bd6",          // テーマカラー（アイスブルー）
    color2: "#c3cdfb",
    title: "孤高の才媛",
    palette: {
      hair: "#2b2940", hair2: "#1a1830", hairHi: "#5a5b86",
      eye: "#5566cc", brow: "#3a3850",
      ribbon: "#5c6bc0", uniform: "#2c3550", collar: "#eef1ff",
    },
  },
  hinata: {
    id: "hinata",
    name: "七瀬 ひなた",
    short: "ひなた",
    color: "#5bbf8a",          // テーマカラー（ミントグリーン）
    color2: "#bdeccf",
    title: "やわらかな光",
    palette: {
      hair: "#d9c39a", hair2: "#c2a878", hairHi: "#efe0c0",
      eye: "#5a9e6b", brow: "#b79c6f",
      ribbon: "#81c784", uniform: "#3a4a63", collar: "#f3fff7",
    },
  },
  shion: {
    id: "shion",
    name: "月城 シオン",
    short: "シオン",
    color: "#8e6fd6",          // テーマカラー（バイオレット）
    color2: "#cdbdf2",
    title: "孤高の旋律",
    male: true,
    palette: {
      hair: "#b3a3c9", hair2: "#8a7aa6", hairHi: "#ddd1ee",
      eye: "#7b5fb0", brow: "#7a6a96",
      ribbon: "#8e6fd6", uniform: "#26283c", collar: "#eef0ff",
    },
  },
};

const SKIN = "#ffe0cb";
const SKIN_SH = "#f2c4a4";
const SKIN_LINE = "#e0a98a";

/* ---------- 表情パーツ ---------- */

/* 目を描く。表情に応じて形を変える。cx は中心X。 */
function svgEye(cx, exp, p) {
  const eyeWhite = "#ffffff";
  const iris = p.eye;
  const irisDark = shade(p.eye, -25);
  switch (exp) {
    case "happy":
    case "smile_closed":
      // にっこり閉じ目（^ ^）
      return `<path d="M ${cx - 16} 168 Q ${cx} 152 ${cx + 16} 168"
                fill="none" stroke="#5a3b28" stroke-width="4.5" stroke-linecap="round"/>`;
    case "wink":
      if (cx < 150) {
        return `<path d="M ${cx - 16} 168 Q ${cx} 152 ${cx + 16} 168"
                  fill="none" stroke="#5a3b28" stroke-width="4.5" stroke-linecap="round"/>`;
      }
      return openEye(cx, iris, irisDark, eyeWhite, 1);
    case "sad":
      return openEye(cx, iris, irisDark, eyeWhite, 0.85, 6, true);
    case "surprise":
      return openEye(cx, iris, irisDark, eyeWhite, 1.18);
    case "angry":
      return openEye(cx, iris, irisDark, eyeWhite, 0.95, -6);
    case "shy":
    case "blush":
      return openEye(cx, iris, irisDark, eyeWhite, 0.9, 4);
    case "normal":
    default:
      return openEye(cx, iris, irisDark, eyeWhite, 1);
  }
}

/* 開いた目（瞳・ハイライト付き） */
function openEye(cx, iris, irisDark, white, scale, lidShift = 0, droop = false) {
  const ry = 22 * scale;
  const rx = 15;
  const cy = 162 + (lidShift || 0);
  const lid = droop
    ? `<path d="M ${cx - rx - 2} ${cy - 4} Q ${cx} ${cy - ry * 0.2} ${cx + rx + 2} ${cy - 2}"
         fill="none" stroke="#5a3b28" stroke-width="3.5" stroke-linecap="round"/>`
    : "";
  return `
    <g>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${white}"/>
      <ellipse cx="${cx}" cy="${cy + 2}" rx="${rx - 2}" ry="${ry - 2}" fill="${iris}"/>
      <circle cx="${cx}" cy="${cy + 5}" r="7" fill="${irisDark}"/>
      <circle cx="${cx - 4}" cy="${cy - 6}" r="5" fill="#ffffff" opacity="0.95"/>
      <circle cx="${cx + 5}" cy="${cy + 7}" r="2.5" fill="#ffffff" opacity="0.7"/>
      <path d="M ${cx - rx - 2} ${cy - ry + 4} Q ${cx} ${cy - ry - 2} ${cx + rx + 2} ${cy - ry + 4}"
        fill="none" stroke="#5a3b28" stroke-width="3.5" stroke-linecap="round"/>
      ${lid}
    </g>`;
}

/* 眉 */
function svgBrows(exp, p) {
  const c = p.brow;
  switch (exp) {
    case "angry":
      return `<path d="M 102 130 L 132 138" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
              <path d="M 198 130 L 168 138" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
    case "sad":
      return `<path d="M 104 132 Q 120 126 134 132" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>
              <path d="M 196 132 Q 180 126 166 132" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
    case "surprise":
      return `<path d="M 104 122 Q 120 118 134 122" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>
              <path d="M 196 122 Q 180 118 166 122" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
    default:
      return `<path d="M 104 128 Q 120 124 134 127" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>
              <path d="M 196 128 Q 180 124 166 127" stroke="${c}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  }
}

/* 口 */
function svgMouth(exp) {
  const c = "#c0584a";
  switch (exp) {
    case "happy":
      return `<path d="M 134 200 Q 150 218 166 200 Q 150 210 134 200 Z" fill="${c}"/>`;
    case "smile":
    case "smile_closed":
    case "wink":
      return `<path d="M 136 200 Q 150 210 164 200" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
    case "sad":
      return `<path d="M 138 206 Q 150 198 162 206" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
    case "surprise":
      return `<ellipse cx="150" cy="203" rx="8" ry="10" fill="${c}"/>`;
    case "angry":
      return `<path d="M 136 204 Q 150 198 164 204" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
    case "shy":
    case "blush":
      return `<path d="M 140 202 Q 150 209 160 202" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/>`;
    case "normal":
    default:
      return `<path d="M 140 201 Q 150 206 160 201" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
  }
}

/* 頬の赤み */
function svgBlush(exp) {
  const strong = (exp === "blush" || exp === "happy" || exp === "shy");
  const op = strong ? 0.55 : (exp === "smile" || exp === "wink" ? 0.28 : 0.18);
  return `
    <ellipse cx="108" cy="182" rx="15" ry="9" fill="#ff8a8a" opacity="${op}"/>
    <ellipse cx="192" cy="182" rx="15" ry="9" fill="#ff8a8a" opacity="${op}"/>`;
}

/* ---------- 髪型（キャラごと） ---------- */

/* 後ろ髪 */
function hairBack(id, p) {
  switch (id) {
    case "saki": // ショート・ボブ
      return `<path d="M 70 150 Q 60 90 150 72 Q 240 90 230 150 L 232 220
                Q 220 210 215 250 L 205 248 Q 210 210 200 195
                L 100 195 Q 90 210 95 248 L 85 250 Q 80 210 68 220 Z"
                fill="${p.hair2}"/>`;
    case "yukino": // ロングストレート（姫カット）
      return `<path d="M 64 150 Q 56 84 150 68 Q 244 84 236 150 L 244 330
                L 210 330 Q 214 230 206 190 L 94 190 Q 86 230 90 330 L 56 330 Z"
                fill="${p.hair2}"/>`;
    case "hinata": // ふわふわロング・ウェーブ
      return `<path d="M 62 150 Q 54 86 150 70 Q 246 86 238 150
                Q 252 200 238 250 Q 250 280 232 320 Q 224 300 222 280
                Q 214 230 206 192 L 94 192 Q 86 230 78 280 Q 76 300 68 320
                Q 50 280 62 250 Q 48 200 62 150 Z"
                fill="${p.hair2}"/>`;
    case "shion": // 男子・ショート（後ろ髪は短め）
      return `<path d="M 72 152 Q 62 84 150 68 Q 238 84 228 152
                L 222 206 Q 214 180 200 190 L 100 190 Q 86 180 78 206 Z"
                fill="${p.hair2}"/>`;
  }
}

/* 前髪 */
function hairFront(id, p) {
  switch (id) {
    case "saki": // ぱっつん寄りの軽い前髪＋アホ毛
      return `
        <path d="M 72 150 Q 66 88 150 72 Q 236 88 228 150
          Q 214 120 188 132 Q 196 108 168 116 Q 150 96 132 116
          Q 104 108 112 132 Q 86 120 72 150 Z" fill="${p.hair}"/>
        <path d="M 150 74 Q 158 56 150 46 Q 168 54 156 76 Z" fill="${p.hair}"/>
        <path d="M 80 150 Q 90 128 108 138 L 100 175 Q 86 168 80 150 Z" fill="${p.hairHi}" opacity="0.5"/>`;
    case "yukino": // 左右に流れるサイド＋まっすぐ前髪
      return `
        <path d="M 66 150 Q 58 86 150 70 Q 242 86 234 150
          Q 226 118 196 126 L 200 196 L 184 196 Q 188 132 168 128
          Q 150 110 132 128 Q 112 132 116 196 L 100 196 L 104 126
          Q 74 118 66 150 Z" fill="${p.hair}"/>
        <path d="M 124 96 Q 150 86 176 96 Q 150 112 124 96 Z" fill="${p.hairHi}" opacity="0.45"/>`;
    case "hinata": // ふわっと割れた前髪
      return `
        <path d="M 68 150 Q 60 88 150 72 Q 240 88 232 150
          Q 220 122 192 134 Q 200 112 174 120 Q 162 100 150 118
          Q 138 100 126 120 Q 100 112 108 134 Q 80 122 68 150 Z" fill="${p.hair}"/>
        <path d="M 150 120 Q 156 108 150 100 Q 144 108 150 120 Z" fill="${p.hair}"/>
        <path d="M 86 150 Q 96 130 112 140 L 106 172 Q 92 166 86 150 Z" fill="${p.hairHi}" opacity="0.5"/>`;
    case "shion": // 男子・サイドに流したクールな前髪＋片目にかかる一房
      return `
        <path d="M 70 152 Q 60 84 150 68 Q 240 84 230 152
          Q 224 112 196 122 Q 206 106 178 116 Q 190 94 156 110
          Q 168 92 138 110 Q 150 96 120 116 Q 128 104 104 122
          Q 80 112 70 152 Z" fill="${p.hair}"/>
        <path d="M 110 118 Q 100 148 114 178 L 124 174 Q 113 146 122 120 Z" fill="${p.hair}"/>
        <path d="M 150 80 Q 178 86 198 122 Q 178 100 150 100 Z" fill="${p.hairHi}" opacity="0.5"/>`;
  }
}

/* リボン・髪飾り */
function hairAccessory(id, p) {
  if (id === "saki") {
    // 右サイドのヘアピン
    return `<g>
      <rect x="196" y="120" width="22" height="7" rx="3" fill="${p.ribbon}"/>
      <circle cx="198" cy="123" r="5" fill="#fff4e0"/>
    </g>`;
  }
  if (id === "yukino") {
    // 黒髪に映える小さなバレッタ
    return `<g>
      <rect x="84" y="118" width="20" height="6" rx="3" fill="${p.ribbon}"/>
    </g>`;
  }
  if (id === "hinata") {
    // 小さな花の髪飾り
    return `<g transform="translate(202,126)">
      ${[0,72,144,216,288].map(a=>`<ellipse cx="${8*Math.cos(a*Math.PI/180)}" cy="${8*Math.sin(a*Math.PI/180)}" rx="6" ry="4" fill="#fff" transform="rotate(${a})"/>`).join("")}
      <circle cx="0" cy="0" r="4" fill="${p.ribbon}"/>
    </g>`;
  }
  return "";
}

/* ---------- 制服（上半身） ---------- */
function bodyOutfit(c) {
  const p = c.palette;
  const base =
    `<rect x="134" y="218" width="32" height="26" fill="${SKIN_SH}"/>
     <path d="M 86 340 Q 96 270 150 262 Q 204 270 214 340 Z" fill="url(#uni_${c.id})"/>`;
  if (c.male) {
    // 詰襟（学ラン）＋金ボタン
    return base + `
      <path d="M 116 258 Q 150 248 184 258 L 182 280 Q 150 270 118 280 Z" fill="${shade(p.uniform, 10)}"/>
      <path d="M 118 263 Q 150 255 182 263" fill="none" stroke="${p.ribbon}" stroke-width="2.5" opacity="0.85"/>
      <line x1="150" y1="272" x2="150" y2="340" stroke="${shade(p.uniform, -16)}" stroke-width="3"/>
      <circle cx="150" cy="292" r="4" fill="#ffcf66" stroke="#caa23a" stroke-width="1"/>
      <circle cx="150" cy="313" r="4" fill="#ffcf66" stroke="#caa23a" stroke-width="1"/>
      <circle cx="150" cy="334" r="4" fill="#ffcf66" stroke="#caa23a" stroke-width="1"/>`;
  }
  // セーラー服＋リボンタイ
  return base + `
    <path d="M 120 268 L 150 300 L 180 268 L 196 280 L 168 330 L 132 330 L 104 280 Z" fill="${p.collar}"/>
    <path d="M 120 268 L 150 300 L 180 268 L 174 264 L 150 286 L 126 264 Z" fill="${shade(p.collar, -12)}"/>
    <path d="M 150 296 l -16 8 l 6 14 l 10 -8 l 10 8 l 6 -14 Z" fill="${p.ribbon}"/>
    <circle cx="150" cy="300" r="5" fill="${shade(p.ribbon, -18)}"/>`;
}

/* ---------- 立ち絵全体 ---------- */

function buildPortrait(charId, exp = "normal") {
  const c = CHARACTERS[charId];
  if (!c) return "";
  const p = c.palette;
  return `
  <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" class="portrait-svg" aria-hidden="true">
    <defs>
      <linearGradient id="uni_${charId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${shade(p.uniform, 12)}"/>
        <stop offset="1" stop-color="${shade(p.uniform, -10)}"/>
      </linearGradient>
    </defs>

    ${hairBack(charId, p)}

    <!-- 首と肩・制服 -->
    ${bodyOutfit(c)}

    <!-- 顔 -->
    <ellipse cx="150" cy="160" rx="76" ry="84" fill="${SKIN}"/>
    <ellipse cx="76" cy="168" rx="9" ry="13" fill="${SKIN}"/>
    <ellipse cx="224" cy="168" rx="9" ry="13" fill="${SKIN}"/>
    <path d="M 150 232 Q 138 240 126 230" fill="none" stroke="${SKIN_LINE}" stroke-width="1.5" opacity="0.5"/>

    ${svgBlush(exp)}
    ${svgBrows(exp, p)}
    ${svgEye(120, exp, p)}
    ${svgEye(180, exp, p)}
    <!-- 鼻 -->
    <path d="M 150 180 l -3 8 l 5 0 Z" fill="${SKIN_SH}" opacity="0.7"/>
    ${svgMouth(exp)}

    ${hairFront(charId, p)}
    ${hairAccessory(charId, p)}
  </svg>`;
}

/* 色を明暗させるユーティリティ */
function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = percent / 100;
  r = Math.round(Math.min(255, Math.max(0, r + 255 * f)));
  g = Math.round(Math.min(255, Math.max(0, g + 255 * f)));
  b = Math.round(Math.min(255, Math.max(0, b + 255 * f)));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* 小さな顔アイコン（好感度パネル等で使用） */
function buildFaceIcon(charId, exp = "smile") {
  return `<div class="face-icon" style="--c:${CHARACTERS[charId].color}">${buildPortrait(charId, exp)}</div>`;
}

window.CHARACTERS = CHARACTERS;
window.buildPortrait = buildPortrait;
window.buildFaceIcon = buildFaceIcon;
