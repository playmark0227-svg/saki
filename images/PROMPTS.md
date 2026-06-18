# 🎨 立ち絵 生成プロンプト集（イケメン4人）

Gemini（画像生成）などにそのまま貼って使えるプロンプトです。
生成した画像を **このフォルダに下記のファイル名で保存** すると、ゲームが自動で立ち絵に使います（無ければSVGにフォールバック）。

| キャラ | 内部ID | 保存ファイル名 |
|--------|--------|----------------|
| 結城 陽（はる） | saki | `images/haru.png` |
| 氷室 怜（れい） | yukino | `images/rei.png` |
| 七瀬 ひなた | hinata | `images/hinata.png` |
| 月城 シオン | shion | `images/shion.png` |

> **おすすめ設定**：背景は透過PNG（VNの立ち絵として重ねるため）／縦長 3:4／頭が上のほうに来る半身（腰上）／高解像度（例 1024×1365 以上）。
> **絵柄を揃えるコツ**：まず「陽」を生成 → その画像を参照に添付して「この絵柄・同じ画角・同じ照明で」と指定して残り3人を作ると、4人がシリーズものとして揃います。

---

## 共通スタイル（各プロンプトの末尾に付けてください）

```
anime visual-novel character sprite, Japanese bishonen (handsome boy), clean cel shading,
soft rim lighting, highly detailed expressive eyes, waist-up half body, facing the viewer
at a slight 3/4 angle, gentle natural expression, plain transparent background (PNG cutout),
head not cropped, vertical 3:4 portrait, high resolution, consistent art style across all four
characters, otome dating-sim aesthetic, no text, no watermark, no signature
```

---

## 1. 結城 陽（はる）／`images/haru.png` ― 元気な幼なじみ

```
A handsome, cheerful Japanese high-school boy, age 17, the energetic childhood-friend type.
Short tousled warm chestnut-brown hair with a small playful cowlick, bright warm amber eyes,
a sunny wide grin full of energy, athletic and approachable boy-next-door vibe.
Wearing a navy school blazer uniform with a slightly loosened coral-orange necktie and the
top button open, sporty and relaxed. Warm coral / orange color accents.
+ 共通スタイル
```

## 2. 氷室 怜（れい）／`images/rei.png` ― クールな生徒会長（ツンデレ）

```
A cool, elegant Japanese high-school boy, age 17, the student-council-president honor student,
tsundere type. Neat sleek black hair with a clean side part, sharp cool ice-blue eyes,
a composed, slightly aloof and intelligent expression, refined "cold prince" aura.
Wearing an immaculate dark navy school uniform worn perfectly, with a student-council armband;
optional thin-framed glasses. Ice-blue / silver color accents.
+ 共通スタイル
```

## 3. 七瀬 ひなた／`images/hinata.png` ― やわらかな美術部男子

```
A gentle, soft-looking Japanese high-school boy, age 17, the dreamy art-club healing type.
Fluffy soft light milk-tea / ash-blond wavy hair with airy bangs, tender mint-green eyes,
a serene, calm, gentle smile, delicate and slightly ethereal beauty.
Wearing a slightly loose school uniform under a beige art smock with faint paint smudges,
softly holding a slim paintbrush. Soft mint-green color accents. Warm, kind, a little fragile.
+ 共通スタイル
```

## 4. 月城 シオン／`images/shion.png` ― 憧れの先輩・ピアニスト

```
A stunningly beautiful Japanese high-school boy, age 18, an older senpai, a prodigy pianist,
the "unreachable flower" prince. Stylish ash-lavender / silver-violet hair, side-swept with a
single strand falling over one eye, captivating violet eyes, a cool, elegant, faintly
melancholic expression. Wearing a refined dark stand-collar gakuran uniform worn stylishly,
with a graceful aristocratic aura. Violet / amethyst color accents. Mysterious, princely bishonen.
+ 共通スタイル
```

---

## （任意）表情ちがいを作る場合

同じキャラで表情だけ変えて複数枚作ると、シーンに合わせて表情が変わって豪華になります。
プロンプト中の表情の一文を差し替えてください：

- normal（通常）: `calm gentle expression`
- smile（笑顔）: `bright happy smile`
- blush（照れ）: `shy blushing expression, faint pink cheeks, looking away`
- sad（哀しい）: `sad downcast expression`
- surprise（驚き）: `surprised wide-eyed expression`

ファイル名を `haru_smile.png` `haru_blush.png` … のようにして、
`js/characters.js` の `CHAR_ART` をオブジェクト指定に変えれば表情ごとに切り替わります（例は下記）。

```js
// js/characters.js の CHAR_ART を、表情ごとに使い分ける例
const CHAR_ART = {
  saki: { normal: "images/haru.png", smile: "images/haru_smile.png", blush: "images/haru_blush.png" },
  // ...
};
```

---

## 反映のしかた

1. 上記プロンプトで画像を生成（背景透過PNG推奨）
2. このフォルダに `haru.png` / `rei.png` / `hinata.png` / `shion.png` として保存
3. コミット＆プッシュ（またはClaudeに画像URL/ファイルを渡す）

→ ゲームの立ち絵・エンディング絵が自動でAIイラストに切り替わります。画像が無い／読み込めない場合は、これまでのSVG立ち絵が表示されます。
