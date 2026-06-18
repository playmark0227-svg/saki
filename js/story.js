/* =====================================================================
 * story.js  —  『桜舞う、きみとの七日間』 シナリオデータ
 *
 * シーン定義（STORY オブジェクト）。各シーンの形式:
 *   bg      : 背景キー（style.css の .bg-xxx に対応）
 *   who     : 話者。"" = 地の文 / "player" = 主人公 / それ以外はキャラID
 *   exp     : 立ち絵の表情
 *   text    : セリフ配列（1要素=1ページ）
 *   eff     : このシーンに入った時に加算する好感度 {charId:delta}
 *   flag    : このシーンに入った時に立てるフラグ {key:value}
 *   choices : 選択肢 [{label, eff, flag, next}]
 *   next    : 次シーンID（choices が無い時）
 *   branch  : "route"（共通→個別ルート分岐） / "ending:<char>"（結末判定）
 *   nameInput / startDay / ending : 特殊ノード
 * ===================================================================== */

const STORY = {
  /* ===================== プロローグ ===================== */
  start: {
    bg: "schoolgate", who: "", text: [
      "四月。坂の上の高校へと続く道は、満開の桜でできたトンネルだった。",
      "風が吹くたび、淡い花びらが雪のように舞い落ちる。",
      "――星河（せいか）学園、高等部。今日から、ここが僕の新しい居場所だ。",
    ], next: "name_in",
  },

  name_in: {
    bg: "schoolgate", who: "", nameInput: true,
    text: ["（まずは、自分の名前を思い出そう……）"],
    next: "p_1",
  },

  p_1: {
    bg: "schoolgate", who: "player", exp: "normal", text: [
      "（{name}……それが僕の名前だ。）",
      "（転校なんて、人生で初めてだ。緊張で心臓がうるさい。）",
    ], next: "p_2",
  },

  p_2: {
    bg: "schoolgate_petals", who: "", text: [
      "桜の坂道を上りきった、その時だった。",
      "強い風。視界いっぱいに舞い上がる花びら。",
      "そして――どこからか、全力で走ってくる足音。",
    ], next: "p_3",
  },

  p_3: {
    bg: "schoolgate_petals", who: "saki", exp: "surprise", text: [
      "「わわっ、危ないっ……！」",
    ], next: "p_4",
  },

  p_4: {
    bg: "schoolgate_petals", who: "", text: [
      "どんっ、と柔らかい衝撃。目の前に、栗色の髪の女の子。",
      "ぶつかった拍子に、彼女の手から教科書がぱさりと落ちた。",
    ],
    choices: [
      { label: "落ちた教科書を拾ってあげる", eff: { saki: 2 }, flag: { saki_first: "kind" }, next: "p_5a" },
      { label: "「ごめん、大丈夫？」と声をかける", eff: { saki: 1 }, next: "p_5b" },
      { label: "驚いて固まってしまう", eff: { saki: 0 }, next: "p_5c" },
    ],
  },
  p_5a: {
    bg: "schoolgate_petals", who: "saki", exp: "happy", text: [
      "「あ……ありがと！ ……って、あれ？」",
      "彼女は教科書を受け取りながら、僕の顔をじっと見つめた。",
      "その大きな瞳が、ふいに揺れた気がした。",
    ], next: "p_6",
  },
  p_5b: {
    bg: "schoolgate_petals", who: "saki", exp: "smile", text: [
      "「うん、平気平気！ こっちこそごめんね、走ってて……」",
      "彼女はぺこりと頭を下げてから、僕の顔をじっと見た。",
    ], next: "p_6",
  },
  p_5c: {
    bg: "schoolgate_petals", who: "saki", exp: "normal", text: [
      "「……えっと、固まっちゃってるけど、大丈夫？」",
      "彼女は首をかしげながら、僕の顔をのぞき込んだ。",
    ], next: "p_6",
  },

  p_6: {
    bg: "schoolgate_petals", who: "saki", exp: "surprise", text: [
      "「……ねえ。もしかして、転校生さん？」",
      "「うわ、やっぱり！ あたし、結城 咲（ゆうき さき）！ よろしくっ！」",
      "太陽みたいな笑顔。なのに――その奥に、何か言いたげな色がよぎった。",
    ], next: "p_7",
  },
  p_7: {
    bg: "schoolgate_petals", who: "saki", exp: "smile", text: [
      "「（……ほんとに、気づいてないんだ。まあ、そうだよね。）」",
      "「……なんでもない！ ほら、もうすぐ予鈴鳴るよ。急ご急ご！」",
    ], next: "p_8",
  },

  p_8: {
    bg: "classroom", who: "", text: [
      "教室に着くと、咲は「またあとでね！」と自分の席へ駆けていった。",
      "担任に紹介され、黒板に名前を書く。視線が集まって、また心臓がはねる。",
      "席についた、その隣――凛とした空気をまとう、黒髪の少女がいた。",
    ], next: "p_9",
  },
  p_9: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「……転校生。あなたの席はそこよ。」",
      "「私は氷室 雪乃（ひむろ ゆきの）。生徒会長で、このクラスの委員長。」",
      "「分からないことがあれば聞きなさい。……効率的に、ね。」",
    ],
    choices: [
      { label: "「よろしく、頼りにしてる」と笑う", eff: { yukino: 2 }, next: "p_10a" },
      { label: "「会長で委員長……すごいね」と素直に驚く", eff: { yukino: 1 }, next: "p_10b" },
      { label: "緊張して「は、はい」とだけ返す", eff: { yukino: 0 }, next: "p_10c" },
    ],
  },
  p_10a: {
    bg: "classroom", who: "yukino", exp: "shy", text: [
      "「た、頼りに……？ ……ふん。当然でしょう。」",
      "そう言って彼女はすっと前を向いた。けれど、耳がほんの少し赤い。",
    ], next: "p_11",
  },
  p_10b: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「別に、すごくはないわ。やるべきことをやっているだけ。」",
      "言葉は素っ気ない。でも、目はちゃんと僕を見ていた。",
    ], next: "p_11",
  },
  p_10c: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「……そう。緊張しなくていいわ。誰だって最初はそうよ。」",
      "意外にも、その声は少しだけ柔らかかった。",
    ], next: "p_11",
  },

  p_11: {
    bg: "courtyard", who: "", text: [
      "昼休み。人混みに疲れて、僕は中庭の隅へ逃げ込んだ。",
      "桜の木の下。スケッチブックを広げ、ひとりで絵を描く女の子がいた。",
      "彼女は僕に気づくと、ふわりと顔を上げた。",
    ], next: "p_12",
  },
  p_12: {
    bg: "courtyard", who: "hinata", exp: "smile", text: [
      "「……あ。あなたが、今日の風の匂いを変えた人だ。」",
      "「ふふ。わたしは七瀬 ひなた。美術部……みたいなもの。」",
      "「ねえ。ここ、特等席なの。よかったら、座っていく？」",
    ],
    choices: [
      { label: "「お邪魔します」と隣に座る", eff: { hinata: 2 }, next: "p_13a" },
      { label: "「何を描いてるの？」と尋ねる", eff: { hinata: 1 }, flag: { hinata_art: true }, next: "p_13b" },
      { label: "「邪魔しちゃ悪いから」と遠慮する", eff: { hinata: 0 }, next: "p_13c" },
    ],
  },
  p_13a: {
    bg: "courtyard", who: "hinata", exp: "happy", text: [
      "「えへへ。素直な人、好きだなあ。」",
      "となりに座ると、彼女は満足そうに目を細めた。花びらが二人の間に落ちた。",
    ], next: "p_shion_1",
  },
  p_13b: {
    bg: "courtyard", who: "hinata", exp: "smile", text: [
      "「ないしょ。……まだ、完成してないから。」",
      "スケッチブックをそっと胸に抱いて、彼女はいたずらっぽく笑った。",
      "（“まだ”……？ なんだか、引っかかる言い方だった。）",
    ], next: "p_shion_1",
  },
  p_13c: {
    bg: "courtyard", who: "hinata", exp: "normal", text: [
      "「ふふ、やさしいね。……でも、ひとりは、ちょっとさみしいんだ。」",
      "その一言が、なぜか胸の奥に小さく残った。",
    ], next: "p_shion_1",
  },

  p_shion_1: {
    bg: "rooftop_sunset", who: "", text: [
      "放課後。ざわめきから逃れたくて、僕は屋上へ続く階段を上った。",
      "重い扉を押し開けると、夕陽が目を刺す。フェンスにもたれ、空を見上げる人影。",
      "制服を着崩した、息を呑むほど整った顔立ちの男子生徒。彼は振り向きもせず、低い声で言った。",
    ], next: "p_shion_2",
  },
  p_shion_2: {
    bg: "rooftop_sunset", who: "shion", exp: "normal", text: [
      "「……ここは、騒がしいのが嫌いな人間の場所だ。」",
      "「迷い込んだ転校生か。物珍しさで来たなら、帰った方がいい。」",
    ],
    choices: [
      { label: "「景色が、きれいだったので」と正直に言う", eff: { shion: 2 }, flag: { shion_first: "honest" }, next: "p_shion_3a" },
      { label: "「すみません、すぐ出ます」と引き返す", eff: { shion: 1 }, next: "p_shion_3b" },
      { label: "「先輩こそ、一人で何を?」と聞き返す", eff: { shion: 1 }, next: "p_shion_3c" },
    ],
  },
  p_shion_3a: {
    bg: "rooftop_sunset", who: "shion", exp: "surprise", text: [
      "彼は初めて、こちらを見た。夕陽を映した瞳が、わずかに見開かれる。",
      "「……景色、ね。」",
      "「月城シオン。三年だ。……物好きなやつ。覚えておく。」",
      "そう言って彼は去った。なのに、その横顔が、やけに胸に残った。",
    ], next: "p_14",
  },
  p_shion_3b: {
    bg: "rooftop_sunset", who: "shion", exp: "smile", text: [
      "「……素直なやつだ。」 ふっと、彼の口元が緩んだ気がした。",
      "「月城シオン。引き止めて悪かったな。……また、気が向いたら来い。」",
    ], next: "p_14",
  },
  p_shion_3c: {
    bg: "rooftop_sunset", who: "shion", exp: "normal", text: [
      "彼は皮肉っぽく笑った。「質問に質問で返すか。……嫌いじゃない。」",
      "「月城シオン、三年。お前は?」 ――そう問われ、僕は名前を告げた。",
      "「{name}、か。……覚えておく。」 それだけ言って、彼は背を向けた。",
    ], next: "p_14",
  },

  p_14: {
    bg: "hallway_sunset", who: "", text: [
      "屋上からの帰り道。茜色に染まる廊下を、僕はひとり歩く。",
      "たった一日で、三人の少女と、一人の不思議な先輩に出会った。",
      "眩しい咲。凛とした雪乃。儚いひなた。そして――どこか影のある、シオン。",
      "（……この学校での毎日、なんだか少しだけ楽しみだ。）",
    ], next: "p_15",
  },
  p_15: {
    bg: "hallway_sunset", who: "", text: [
      "下駄箱で靴を履き替えていると、一枚の紙が落ちているのに気づいた。",
      "古びた、桜の押し花のしおり。裏に、子どもの字でこう書いてある。",
      "『さくらの き の した で、また あおうね。やくそく。』",
      "（……約束。誰の、なんの約束だろう。）",
    ], flag: { found_bookmark: true }, next: "day1_title",
  },

  /* ===================== Day 1 ===================== */
  day1_title: { startDay: 1, dayTitle: "一日目 ―― はじまりの距離", next: "d1_1" },

  d1_1: {
    bg: "schoolgate", who: "saki", exp: "happy", text: [
      "「{name}、おはよー！ あっ、待ってよー！」",
      "翌朝、校門で咲が駆け寄ってきた。息を切らしながら、満面の笑み。",
      "「ねえねえ、一緒に行こ？ ……だめ？」",
    ],
    choices: [
      { label: "「もちろん。行こう」", eff: { saki: 2 }, next: "d1_2a" },
      { label: "「随分なつかれたな」とからかう", eff: { saki: 1 }, next: "d1_2b" },
    ],
  },
  d1_2a: {
    bg: "schoolgate_petals", who: "saki", exp: "happy", text: [
      "「やった！ ……えへへ。なんか、こうやって並んで歩くの、いいな。」",
      "「ね、{name}って、引っ越しとか……したこと、ある？」",
    ], next: "d1_3",
  },
  d1_2b: {
    bg: "schoolgate_petals", who: "saki", exp: "shy", text: [
      "「な、なついてなんかないし！ ……ちょっとだけだし。」",
      "頬をふくらませてから、彼女はぽつりと尋ねた。",
      "「……ねえ。{name}って、昔のこと、よく覚えてるほう？」",
    ], next: "d1_3",
  },
  d1_3: {
    bg: "schoolgate_petals", who: "player", text: [
      "（昔のこと……。引っ越しは、小さい頃に一度だけ。）",
      "（でも、あの頃の記憶は、霧がかかったみたいにぼんやりしている。）",
    ],
    choices: [
      { label: "「正直、あんまり覚えてないんだ」", eff: { saki: 0 }, next: "d1_4" },
      { label: "「君、何か知ってるの？」と聞き返す", eff: { saki: 1 }, flag: { saki_hint: true }, next: "d1_4b" },
    ],
  },
  d1_4: {
    bg: "schoolgate_petals", who: "saki", exp: "sad", text: [
      "「……そっか。うん、だよね。……ううん、なんでもないっ！」",
      "一瞬だけ寂しそうに笑って、咲はまた元気いっぱいに駆け出した。",
    ], next: "d1_5",
  },
  d1_4b: {
    bg: "schoolgate_petals", who: "saki", exp: "surprise", text: [
      "「えっ!? ……な、なんにも知らないよ! あはは!」",
      "「……いつか、思い出してくれたら、いいなって。それだけ。」",
      "最後の一言は、風にさらわれて、よく聞こえなかった。",
    ], flag: { saki_hint: true }, next: "d1_5",
  },

  d1_5: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "二限目。配られたプリントが、僕のところで一枚足りなかった。",
      "「……無い、の？ 仕方ないわね。」",
      "雪乃は自分のプリントを、すっと半分に折って差し出した。",
      "「半分こ。……次からは、私が予備を持っておくわ。」",
    ],
    choices: [
      { label: "「ありがとう、助かるよ」と笑顔で受け取る", eff: { yukino: 2 }, next: "d1_6a" },
      { label: "「会長にこんなことさせて悪いな」", eff: { yukino: 1 }, next: "d1_6b" },
    ],
  },
  d1_6a: {
    bg: "classroom", who: "yukino", exp: "shy", text: [
      "「……っ。そ、そんなに嬉しそうにされると……調子が狂うわ。」",
      "彼女はぷいと前を向いたが、肩がほんの少しこわばっていた。",
    ], next: "d1_7",
  },
  d1_6b: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「会長だから、じゃないわ。困っている人がいたら、助ける。当たり前でしょう。」",
      "ぴしゃりと言い切る横顔は、不思議と頼もしかった。",
    ], next: "d1_7",
  },
  d1_7: {
    bg: "artroom", who: "", text: [
      "放課後。窓から夕陽の差す美術室で、ひなたが絵筆を握っていた。",
      "イーゼルには、描きかけのキャンバス。中央が、まだ真っ白なまま。",
    ], next: "d1_8",
  },
  d1_8: {
    bg: "artroom", who: "hinata", exp: "smile", text: [
      "「あ、{name}くん。見てくれる？ ……ここに、何を描くと思う？」",
      "彼女が指さしたのは、絵の中の真っ白な空白。",
    ],
    choices: [
      { label: "「君が一番描きたいもの、かな」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d1_9a" },
      { label: "「桜の木……とか？」", eff: { hinata: 1 }, next: "d1_9b" },
    ],
  },
  d1_9a: {
    bg: "artroom", who: "hinata", exp: "shy", text: [
      "「……わたしが、一番描きたいもの。」",
      "彼女は少し驚いた顔をして、それから、とても優しく微笑んだ。",
      "「うん。……まだ、描けないんだけどね。勇気が出たら、描くんだ。」",
    ], next: "d1_shion_1",
  },
  d1_9b: {
    bg: "artroom", who: "hinata", exp: "smile", text: [
      "「ふふ、おしい。桜は、ここ。空白は……ひみつ。」",
      "彼女は手のひらで空白をそっと隠した。何かを大切に守るみたいに。",
    ], next: "d1_shion_1",
  },
  d1_shion_1: {
    bg: "musicroom_sunset", who: "", text: [
      "帰り際、音楽室の前を通りかかった。",
      "中から、ピアノの音が――ほんの数小節だけ響いて、ふいに途切れた。",
      "そっと覗くと、鍵盤の前に座るシオンがいた。指は、鍵に触れたまま、動かない。",
    ], next: "d1_shion_2",
  },
  d1_shion_2: {
    bg: "musicroom_sunset", who: "shion", exp: "surprise", text: [
      "僕の気配に気づくと、彼は弾かれたように立ち上がった。",
      "「……聞いたのか。」",
      "「忘れろ。俺はもう、弾かない。……弾けないんだ。」",
    ],
    choices: [
      { label: "「さっきの音、すごく綺麗でした」", eff: { shion: 2 }, flag: { shion_piano: true }, next: "d1_shion_3a" },
      { label: "「勝手に聞いて、ごめんなさい」", eff: { shion: 1 }, next: "d1_shion_3b" },
    ],
  },
  d1_shion_3a: {
    bg: "musicroom_sunset", who: "shion", exp: "sad", text: [
      "彼は驚いたように僕を見て、それから目を伏せた。",
      "「……綺麗、か。そんな風に言われたのは、ずいぶん久しぶりだ。」",
      "一瞬だけ覗いた寂しげな表情を、彼はすぐに、冷たい仮面で覆い隠した。",
    ], next: "d1_end",
  },
  d1_shion_3b: {
    bg: "musicroom_sunset", who: "shion", exp: "normal", text: [
      "「……いや。こっちこそ、悪かった。」",
      "彼は静かに、鍵盤の蓋を閉じた。その手が、かすかに震えていた。",
    ], next: "d1_end",
  },

  d1_end: {
    bg: "home_evening", who: "player", text: [
      "（一日目が終わった。それぞれの距離が、少しずつ動き出した気がする。）",
      "（あのしおりの“約束”。咲の意味ありげな言葉。ひなたの空白の絵。）",
      "（……まだ、何も分からない。でも、知りたいと思っている自分がいる。）",
    ], next: "day2_title",
  },

  /* ===================== Day 2 ===================== */
  day2_title: { startDay: 2, dayTitle: "二日目 ―― ふれた本音", next: "d2_1" },

  d2_1: {
    bg: "gym", who: "", text: [
      "昼休み。体育館の前を通ると、ボールを撞く乾いた音が響いていた。",
      "ひとり、シュート練習を続ける咲。汗を光らせ、何度も、何度も。",
      "けれど――右肩を押さえて、ふいに顔をしかめた。",
    ], next: "d2_2",
  },
  d2_2: {
    bg: "gym", who: "saki", exp: "sad", text: [
      "「……っ。だい、じょうぶ。まだ、いける……」",
      "僕の足音に気づくと、彼女は慌てて笑顔をつくった。",
      "「あっ、{name}! み、見てた? あはは、サボりじゃないよ、自主練!」",
    ],
    choices: [
      { label: "「肩、痛むのか？無理するな」", eff: { saki: 2 }, flag: { saki_injury: true }, next: "d2_3a" },
      { label: "「すごい練習量だな」と感心する", eff: { saki: 1 }, next: "d2_3b" },
    ],
  },
  d2_3a: {
    bg: "gym", who: "saki", exp: "surprise", text: [
      "「……気づいて、たんだ。」",
      "彼女は驚いた顔をして、それから、力なく笑った。",
      "「去年さ、大事な試合で肩こわしちゃって。……エースだったのに、ね。」",
      "「でも、もう平気だから! ……平気って、思いたいだけかもだけど。」",
    ], next: "d2_4",
  },
  d2_3b: {
    bg: "gym", who: "saki", exp: "smile", text: [
      "「えへへ、でしょ? あたし、努力だけは負けないんだ。」",
      "明るく胸を張る。でも、押さえた肩からは、手を離さないままだった。",
    ], next: "d2_4",
  },
  d2_4: {
    bg: "gym", who: "saki", exp: "normal", text: [
      "「……ねえ、{name}。あたしね、こわいんだ。」",
      "「がんばっても、また置いていかれるんじゃないかって。……大切なものに。」",
      "ぽつりとこぼれた本音は、僕の知らない過去の影を帯びていた。",
    ], next: "d2_5",
  },
  d2_5: {
    bg: "library", who: "", text: [
      "放課後。静まりかえった図書室の奥で、雪乃が一人、何かを書いていた。",
      "近づくと、彼女はノートをぱたんと閉じた。……教科書ではない、何か。",
    ], next: "d2_6",
  },
  d2_6: {
    bg: "library", who: "yukino", exp: "surprise", text: [
      "「……っ、{name}。気配を消して近づかないでくれる。」",
      "「これは……べ、勉強。そう、勉強のノートよ。」",
      "明らかに動揺している。隠したノートの表紙が、ちらりと見えた――『物語』。",
    ],
    choices: [
      { label: "「もしかして、小説書いてる？」と優しく聞く", eff: { yukino: 2 }, flag: { yukino_novel: true }, next: "d2_7a" },
      { label: "「見なかったことにするよ」と気を遣う", eff: { yukino: 1 }, next: "d2_7b" },
    ],
  },
  d2_7a: {
    bg: "library", who: "yukino", exp: "sad", text: [
      "「……どうして、分かるのよ。」",
      "観念したように、彼女は深く息をついた。",
      "「ええ。書いているわ、物語を。……誰にも言ったこと、なかったのに。」",
      "「家は代々、医者の家系。私の進路は、生まれた時から決まっている。」",
      "「“小説家になりたい”なんて――言えるわけ、ないでしょう。」",
    ], next: "d2_8",
  },
  d2_7b: {
    bg: "library", who: "yukino", exp: "shy", text: [
      "「……気を遣わせて、ごめんなさい。」",
      "「あなたって、人の境界線を尊重するのね。……少し、意外。」",
      "閉じたノートの上に、彼女はそっと手を重ねた。守るように。",
    ], next: "d2_8",
  },
  d2_8: {
    bg: "library", who: "yukino", exp: "normal", text: [
      "「完璧でいなきゃいけない。みんなそう思ってる。私自身も。」",
      "「……でも、この物語の中でだけは、私は自由になれるの。」",
      "夕陽に照らされた横顔は、いつもの“氷の会長”とは別人みたいだった。",
    ], next: "d2_9",
  },
  d2_9: {
    bg: "rooftop_sunset", who: "", text: [
      "ふと屋上へ続く階段を上ると、扉の外にひなたがいた。",
      "夕焼けの中、彼女はただ、空をじっと見上げていた。",
    ], next: "d2_10",
  },
  d2_10: {
    bg: "rooftop_sunset", who: "hinata", exp: "smile", text: [
      "「{name}くん。……ねえ、夕焼けって、どうしてこんなに胸が苦しいのかな。」",
      "「きれいなものほど、すぐ消えちゃうからかも、しれないね。」",
    ],
    choices: [
      { label: "「消えても、見てた人の中に残るよ」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d2_11a" },
      { label: "「だから今、一緒に見てるんじゃないか」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d2_11b" },
    ],
  },
  d2_11a: {
    bg: "rooftop_sunset", who: "hinata", exp: "shy", text: [
      "「……残る、かな。」",
      "彼女は少しだけ目を見開いて、それから、泣きそうな顔で笑った。",
      "「うん。……だといいな。そう思えたら、こわくないのにな。」",
    ], next: "d2_shion_1",
  },
  d2_11b: {
    bg: "rooftop_sunset", who: "hinata", exp: "blush", text: [
      "「……いっしょに、見てる。」",
      "彼女はそっと、僕のとなりに半歩、距離を詰めた。",
      "「ふふ。じゃあ、この夕焼けは、わたしと{name}くんのだね。」",
    ], next: "d2_shion_1",
  },
  d2_shion_1: {
    bg: "courtyard_sunset", who: "", text: [
      "帰り道、中庭のベンチにシオンがいた。膝の上に、一枚の古びた写真。",
      "写っていたのは、彼と、よく似た面差しの少女だった。",
    ], next: "d2_shion_2",
  },
  d2_shion_2: {
    bg: "courtyard_sunset", who: "shion", exp: "sad", text: [
      "「……姉だ。」 僕の視線に気づいて、彼はぽつりと言った。",
      "「ピアノを教えてくれたのは、姉さんだった。俺の演奏を、世界で一番、好きだと言ってくれた。」",
      "「でも――もう、いない。最後に弾く“約束”を、俺は守れなかった。」",
    ],
    choices: [
      { label: "「だから、弾けなくなったんですね」", eff: { shion: 2 }, flag: { shion_sister: true }, next: "d2_shion_3a" },
      { label: "何も言わず、そっと隣に座る", eff: { shion: 2 }, flag: { shion_sister: true }, next: "d2_shion_3b" },
    ],
  },
  d2_shion_3a: {
    bg: "courtyard_sunset", who: "shion", exp: "normal", text: [
      "「……鋭いな。」 彼は自嘲気味に笑った。",
      "「鍵盤の前に座ると、姉さんの最後の顔が浮かぶ。指が、凍りつくんだ。」",
      "「情けないだろう。“天才”なんて、もてはやされた男が。」",
    ], next: "d2_shion_4",
  },
  d2_shion_3b: {
    bg: "courtyard_sunset", who: "shion", exp: "surprise", text: [
      "彼は少し驚いた顔をして、それから、ふっと肩の力を抜いた。",
      "「……何も聞かないんだな。」",
      "「お前のそういうところ、調子が狂う。……嫌いじゃない、けどな。」",
    ], next: "d2_shion_4",
  },
  d2_shion_4: {
    bg: "courtyard_sunset", who: "shion", exp: "shy", text: [
      "夕陽が、二人の影を長く伸ばす。",
      "「悪いな、辛気くさい話をして。……でも、少しだけ、楽になった。」",
      "彼がふと見せた、ほんの少しの素顔。それが、やけに眩しかった。",
    ], next: "d2_end",
  },

  d2_end: {
    bg: "home_evening", who: "player", text: [
      "（二日目。みんな、笑顔の裏に、それぞれの痛みを抱えていた。）",
      "（咲の“置いていかれる怖さ”。雪乃の“縛られた夢”。ひなたの“消える儚さ”。シオンの“凍った指”。）",
      "（僕に、何ができるだろう。……でも、放っておけない。誰のことも。）",
    ], next: "day3_title",
  },

  /* ===================== Day 3（共通最終日／分岐） ===================== */
  day3_title: { startDay: 3, dayTitle: "三日目 ―― 選んだ手のぬくもり", next: "d3_1" },

  d3_1: {
    bg: "hallway", who: "", text: [
      "三日目。学校では、来週末の文化祭の話題で持ちきりだった。",
      "クラスの出し物、部活の発表、後夜祭……。みんな、どこか浮き足立っている。",
      "そんな中、放課後の予定が、偶然にも三人と重なってしまった。",
    ], next: "d3_2",
  },
  d3_2: {
    bg: "hallway_sunset", who: "player", text: [
      "咲は「文化祭の準備、手伝って!」と。",
      "雪乃は「生徒会の仕事を見てほしい」と。",
      "ひなたは「行きたい場所がある」と。",
      "（……今日は、誰と過ごそう。きっと、これが分かれ道になる。）",
    ],
    choices: [
      { label: "咲と、文化祭の準備をする", eff: { saki: 3 }, next: "d3_saki" },
      { label: "雪乃の、生徒会の仕事を手伝う", eff: { yukino: 3 }, next: "d3_yukino" },
      { label: "ひなたの、行きたい場所へ付き添う", eff: { hinata: 3 }, next: "d3_hinata" },
      { label: "シオンの、音楽室に付き合う", eff: { shion: 3 }, next: "d3_shion" },
    ],
  },

  d3_saki: {
    bg: "classroom", who: "saki", exp: "happy", text: [
      "「来てくれてありがと! ……正直ね、{name}が来てくれたら、って思ってた。」",
      "二人で看板を作り、飾りつけをする。何気ない時間が、やけに楽しい。",
      "ふと手が触れて――咲が、真っ赤になって固まった。",
      "「……っ、ご、ごめんっ。あたし、ほんとは……ううん、なんでもない!」",
    ], next: "d3_join",
  },
  d3_yukino: {
    bg: "library", who: "yukino", exp: "shy", text: [
      "「……ありがとう。あなたとなら、仕事も、その。……はかどるわ。」",
      "書類を片付けながら、二人きりの時間が静かに流れる。",
      "ふと、彼女が書きかけの物語のノートを、そっと僕のほうへ押し出した。",
      "「……一行だけ。読んで、感想を……くれない、かしら。」",
    ], next: "d3_join",
  },
  d3_hinata: {
    bg: "riverside_sunset", who: "hinata", exp: "smile", text: [
      "彼女が連れて行ってくれたのは、川沿いの、桜並木だった。",
      "「ここね、わたしの一番好きな場所。……来られて、よかった。」",
      "「{name}くんと見られて、よかった。……今日のこと、わすれないでね。」",
      "夕陽の中、彼女の横顔が、泣きたくなるほどきれいだった。",
    ], next: "d3_join",
  },

  d3_shion: {
    bg: "musicroom_sunset", who: "shion", exp: "smile", text: [
      "「……来たのか。物好きめ。」 口ではそう言いながら、彼は少しだけ嬉しそうだった。",
      "誰もいない音楽室で、二人、ただ静かに時間を過ごした。",
      "彼は弾かなかったけれど、鍵盤に置いた指を僕がそっと見ていると、彼は小さく笑った。",
      "「お前がいると……いつか、また弾ける気がするから、不思議だ。」",
    ], next: "d3_join",
  },

  d3_join: {
    bg: "home_evening", who: "player", text: [
      "（楽しい時間は、あっという間に過ぎていく。）",
      "（気づけば僕の心は、誰かに、強く惹かれ始めていた。）",
      "（文化祭まで、あと四日。――この気持ちの行き先を、確かめたい。）",
    ], next: "route_branch",
  },

  route_branch: { branch: "route" },

  /* ===================== 咲ルート ===================== */
  saki_4_title: { startDay: 4, dayTitle: "四日目 ―― 結城 咲", next: "saki_4_1" },
  saki_4_1: {
    bg: "schoolgate_petals", who: "saki", exp: "smile", text: [
      "「{name}、今日さ……放課後、ちょっとだけ時間くれない?」",
      "「行きたいとこ、あるんだ。……あたしの、たいせつな場所。」",
    ], next: "saki_4_2",
  },
  saki_4_2: {
    bg: "park_sakura", who: "", text: [
      "放課後、咲が連れてきたのは、小さな公園だった。",
      "中央に、一本の大きな桜の木。古びたブランコ。見覚えのある――気がする。",
    ], next: "saki_4_3",
  },
  saki_4_3: {
    bg: "park_sakura", who: "saki", exp: "normal", text: [
      "「ここね、あたしが小さい頃、毎日来てた公園。」",
      "「……あのね、{name}。あたし、ずっと言いたかったことがあるの。」",
      "「あたしたち、初めましてじゃ、ないんだよ。」",
    ], next: "saki_4_4",
  },
  saki_4_4: {
    bg: "park_sakura", who: "player", text: [
      "（初めまして、じゃない……? この公園。この桜の木。)",
      "（霧がかった記憶の奥で、何かが、ゆっくりと形を取り戻していく。）",
    ],
    choices: [
      { label: "ポケットのしおりを取り出す", eff: { saki: 3 }, flag: { saki_remember: true }, next: "saki_4_5a" },
      { label: "「もしかして……幼なじみ?」", eff: { saki: 2 }, next: "saki_4_5b" },
    ],
  },
  saki_4_5a: {
    bg: "park_sakura", who: "saki", exp: "surprise", text: [
      "あの押し花のしおりを差し出すと、咲の目が大きく見開かれた。",
      "「……それ。あたしが、{name}にあげたやつ……! 持ってて、くれたの……?」",
      "ぽろり、と涙がこぼれた。",
      "『さくらの き の した で、また あおうね。やくそく。』――あの字は、幼い咲のものだった。",
    ], next: "saki_4_6",
  },
  saki_4_5b: {
    bg: "park_sakura", who: "saki", exp: "shy", text: [
      "「……うん。幼なじみ。十年前まで、毎日いっしょに遊んでた。」",
      "「あたしが引っ越すって決まった日、この木の下で、約束したんだ。」",
    ], next: "saki_4_6",
  },
  saki_4_6: {
    bg: "park_sunset", who: "saki", exp: "sad", text: [
      "「『大きくなったら、また絶対ここで会おうね』って。指切りもした。」",
      "「でも……再会したのに、{name}はあたしのこと、覚えてなくて。」",
      "「だからあたし、こわかったんだ。言ったら、困らせちゃうかもって。」",
      "「あの頃みたいに、また……あたしだけが、置いてかれるんじゃないかって。」",
    ], next: "saki_4_7",
  },
  saki_4_7: {
    bg: "park_sunset", who: "player", text: [
      "（思い出した。小さな僕は、泣きじゃくる咲に、約束したんだ。）",
      "（“ぜったい忘れない”って。なのに、僕は――）",
    ],
    choices: [
      { label: "「ごめん。でも、もう絶対に忘れない」と抱きしめる", eff: { saki: 4 }, flag: { saki_trust: true }, next: "saki_4_8" },
      { label: "「置いていったりしない。今度は僕がそばにいる」", eff: { saki: 3 }, flag: { saki_trust: true }, next: "saki_4_8" },
    ],
  },
  saki_4_8: {
    bg: "park_sunset", who: "saki", exp: "blush", text: [
      "咲は、僕の胸で、子どものように泣いた。それから、顔を上げて笑った。",
      "「……えへへ。なんか、ずるいよ、{name}。そんなこと言われたら……」",
      "「あたし、もう……後戻りできないじゃん。」",
    ], next: "saki_5_title",
  },

  saki_5_title: { startDay: 5, dayTitle: "五日目 ―― もう一度の約束", next: "saki_5_1" },
  saki_5_1: {
    bg: "gym", who: "saki", exp: "normal", text: [
      "翌日。咲は、ずっと避けていた体育館に、自分から足を運んだ。",
      "「……あたし、決めた。文化祭のバスケ、出る。逃げるの、やめる。」",
      "「{name}が、見ててくれるなら……あたし、もう一回、跳べる気がするんだ。」",
    ],
    choices: [
      { label: "「最前列で、君だけを見てる」", eff: { saki: 3 }, next: "saki_5_2" },
      { label: "「無理だけはするな。君が一番大事だ」", eff: { saki: 2 }, flag: { saki_care: true }, next: "saki_5_2" },
    ],
  },
  saki_5_2: {
    bg: "gym_evening", who: "saki", exp: "happy", text: [
      "「……うんっ! ありがと、{name}!」",
      "彼女のシュートが、きれいな弧を描いてネットを揺らした。",
      "その横顔は、痛みより、希望でいっぱいに輝いていた。",
    ], next: "saki_6_title",
  },

  saki_6_title: { startDay: 6, dayTitle: "六日目 ―― 言えない一言", next: "saki_6_1" },
  saki_6_1: {
    bg: "riverside_sunset", who: "saki", exp: "shy", text: [
      "文化祭、前夜。川沿いを二人で歩いた。沈黙が、くすぐったい。",
      "「……ねえ、{name}。明日、文化祭が終わったら……話したいこと、あるんだ。」",
      "「あたしの、ずっと前からの、気持ち。……ちゃんと、言葉にするから。」",
    ], next: "saki_6_2",
  },
  saki_6_2: {
    bg: "riverside_night", who: "player", text: [
      "（明日。きっと、咲は――。）",
      "（僕の答えは、もう、決まっている。）",
    ], next: "saki_climax",
  },
  saki_climax: {
    bg: "festival_night", who: "saki", exp: "blush", text: [
      "――文化祭、最終日の夜。後夜祭のキャンプファイヤーが、夜空を焦がす。",
      "試合をやり遂げた咲が、僕の手を取って、人混みの外へと駆け出した。",
      "桜の木の下――あの公園と同じ場所に、二人は立っていた。",
      "「{name}。あたし、もう逃げない。だから……ちゃんと言うね。」",
      "「あたし、{name}のことが、ずっと――子どもの頃から、ずっと好きでした。」",
    ],
    choices: [
      { label: "「僕も好きだ。今度こそ、ずっと一緒にいよう」", eff: { saki: 3 }, next: "saki_end_branch" },
      { label: "「ありがとう。でも、まだ友達のままで」", eff: { saki: -2 }, flag: { saki_reject: true }, next: "saki_end_branch" },
    ],
  },
  saki_end_branch: { branch: "ending:saki" },

  saki_true: {
    bg: "park_sakura_day", ending: true, who: "saki", exp: "happy",
    endTitle: "トゥルーエンド ―― 「ずっと、きみの隣で」",
    text: [
      "僕の答えに、咲は、泣きながら、世界で一番の笑顔を見せた。",
      "「やったあ……! あたし、ずっとこの日を、待ってたんだから……!」",
      "――それから、何度目かの春。",
      "あの桜の木の下で、僕たちは今も、並んで笑っている。",
      "今度の約束は、もう、ほどけない。指切りした小指を、固く繋いだまま。",
      "「ねえ{name}。来年も、再来年も……ずっと、ここで会おうね。」",
      "「うん。――約束だ。」",
    ],
  },
  saki_good: {
    bg: "park_sunset", ending: true, who: "saki", exp: "shy",
    endTitle: "グッドエンド ―― 「これからの、ふたり」",
    text: [
      "差し出した手を、咲はぎゅっと握り返した。少し照れながら、でも確かに。",
      "「……まだ、ぎこちないけどさ。これから、ゆっくり知っていこ?」",
      "「うん。あたしと{name}の、新しい約束。一個ずつ、増やしていこう。」",
      "再会から始まった物語は、ここから本当の意味で動き出す。",
      "桜は、また来年も咲く。二人で見上げる、その日まで。",
    ],
  },
  saki_bad: {
    bg: "park_night", ending: true, who: "saki", exp: "sad",
    endTitle: "ノーマルエンド ―― 「桜の下で、もう一度」",
    text: [
      "僕の言葉に、咲は、しばらく黙ってから、ふっと笑った。",
      "「……そっか。うん、わかってた、かも。」",
      "「でもね、{name}。あたし、諦めないから。」",
      "「だって、十年待ったんだよ? ……ちょっとくらい、待たせてよね。」",
      "強がりの涙を拭って、彼女は前を向いた。物語は、まだ終わらない。",
      "（……僕は、本当にこれでよかったのか。桜の花びらが、答えを攫っていった。）",
    ],
  },

  /* ===================== 雪乃ルート ===================== */
  yukino_4_title: { startDay: 4, dayTitle: "四日目 ―― 氷室 雪乃", next: "yukino_4_1" },
  yukino_4_1: {
    bg: "library", who: "yukino", exp: "normal", text: [
      "「{name}。少し、付き合ってほしいところがあるの。」",
      "放課後、彼女に連れられて来たのは、街外れの小さな書店だった。",
    ], next: "yukino_4_2",
  },
  yukino_4_2: {
    bg: "bookstore", who: "yukino", exp: "shy", text: [
      "「ここ、私の秘密基地。誰にも教えたこと、なかったの。」",
      "棚から一冊の文庫を取り出すと、雪乃の表情がふっと和らいだ。",
      "「この作家に憧れて、私は物語を書き始めた。……バカみたいでしょう。」",
    ],
    choices: [
      { label: "「バカじゃない。素敵な夢だよ」", eff: { yukino: 3 }, flag: { yukino_dream: true }, next: "yukino_4_3a" },
      { label: "「君の物語、僕はもっと読みたい」", eff: { yukino: 3 }, flag: { yukino_dream: true }, next: "yukino_4_3b" },
    ],
  },
  yukino_4_3a: {
    bg: "bookstore", who: "yukino", exp: "blush", text: [
      "「……っ。あなたは、いつも、まっすぐすぎるわ。」",
      "彼女は本で顔を半分隠した。けれど、その瞳は潤んで、揺れていた。",
    ], next: "yukino_4_4",
  },
  yukino_4_3b: {
    bg: "bookstore", who: "yukino", exp: "shy", text: [
      "「私の、物語を……? ……あなたに読まれるのは、心の中を見られるみたいで。」",
      "「……でも。あなたになら、読んでほしいと、思ってしまう。」",
    ], next: "yukino_4_4",
  },
  yukino_4_4: {
    bg: "bookstore_sunset", who: "yukino", exp: "sad", text: [
      "「でもね。明日、父が来るの。私の進路の“最終確認”のために。」",
      "「医学部の推薦。願書には、もう私の名前が書いてある。」",
      "「……夢を、しまう時が来たのよ。大人になるって、そういうことでしょう。」",
    ], next: "yukino_4_5",
  },
  yukino_4_5: {
    bg: "bookstore_sunset", who: "player", text: [
      "（諦めた顔で笑う雪乃を、見ていられなかった。）",
      "（彼女の物語は、こんな所で終わっていいものじゃない。）",
    ],
    choices: [
      { label: "「自分の人生だ。本当の望みを、お父さんに言うべきだ」", eff: { yukino: 4 }, flag: { yukino_trust: true }, next: "yukino_4_6a" },
      { label: "「君が決めることだ。でも、僕は君の味方でいる」", eff: { yukino: 3 }, flag: { yukino_trust: true }, next: "yukino_4_6b" },
    ],
  },
  yukino_4_6a: {
    bg: "bookstore_sunset", who: "yukino", exp: "surprise", text: [
      "「……本当の、望み。」",
      "「言って、いいの……? 我儘だと、わかっていても。」",
      "彼女の声が、初めて、子どものように震えた。",
    ], next: "yukino_4_7",
  },
  yukino_4_6b: {
    bg: "bookstore_sunset", who: "yukino", exp: "blush", text: [
      "「味方……。あなたが、いてくれるの。」",
      "「その言葉だけで……私、もう少しだけ、強くなれる気がする。」",
    ], next: "yukino_4_7",
  },
  yukino_4_7: {
    bg: "library_night", who: "yukino", exp: "normal", text: [
      "「決めたわ。明日、父にちゃんと話す。私の言葉で、私の夢を。」",
      "「……ねえ、{name}。もし、私が全部失っても。」",
      "「あなたは、私の隣に……いてくれる?」",
    ],
    choices: [
      { label: "「当たり前だ。どんな君でも、隣にいる」", eff: { yukino: 3 }, next: "yukino_5_title" },
      { label: "そっと手を重ねて頷く", eff: { yukino: 3 }, flag: { yukino_care: true }, next: "yukino_5_title" },
    ],
  },

  yukino_5_title: { startDay: 5, dayTitle: "五日目 ―― 凛として、立つ", next: "yukino_5_1" },
  yukino_5_1: {
    bg: "schoolgate", who: "", text: [
      "翌日。校門の前に、黒塗りの車。降りてきたのは、雪乃の父だった。",
      "雪乃は、まっすぐに背筋を伸ばし、父の前に立った。",
    ], next: "yukino_5_2",
  },
  yukino_5_2: {
    bg: "schoolgate", who: "yukino", exp: "normal", text: [
      "「お父様。私、医学部には行きません。」",
      "「私は、物語を書きたい。文学の道に、進みたいんです。」",
      "「初めて言います。これが――私の、本当の願いです。」",
      "凛とした声が、桜の風に、まっすぐ響いた。",
    ], next: "yukino_5_3",
  },
  yukino_5_3: {
    bg: "schoolgate_petals", who: "yukino", exp: "shy", text: [
      "父は、長い沈黙のあと、ただ一言「……考え直す時間をくれ」と言って去った。",
      "完全な勝利じゃない。けれど、雪乃は確かに、自分の足で立っていた。",
      "「……言えた。{name}、私、言えたわ。」",
      "振り向いた彼女の頬を、涙が一筋、伝っていた。",
    ], next: "yukino_6_title",
  },

  yukino_6_title: { startDay: 6, dayTitle: "六日目 ―― 一行目の告白", next: "yukino_6_1" },
  yukino_6_1: {
    bg: "library_sunset", who: "yukino", exp: "shy", text: [
      "文化祭前夜。雪乃は、一冊のノートを僕に手渡した。新作の物語。",
      "「文化祭で、文芸部として展示するの。……人生で初めての、発表。」",
      "「最後のページだけ、まだ空白なの。明日、あなたに、読んでほしくて。」",
    ], next: "yukino_climax",
  },
  yukino_climax: {
    bg: "festival_night", who: "yukino", exp: "blush", text: [
      "――文化祭、最終日の夜。展示を終えた雪乃が、僕を屋上へと呼び出した。",
      "夜風の中、彼女はあのノートの、最後のページを開いた。そこには――",
      "「『そうして彼女は、生まれて初めて、誰かにこの言葉を捧げた』」",
      "「……ここから先は、口で言わせて。」",
      "「{name}。あなたを、愛しています。私の物語の、主人公はあなただけ。」",
    ],
    choices: [
      { label: "「僕も愛してる。君の物語を、隣で読ませてくれ」", eff: { yukino: 3 }, next: "yukino_end_branch" },
      { label: "「光栄だ。でも、その気持ちには応えられない」", eff: { yukino: -2 }, flag: { yukino_reject: true }, next: "yukino_end_branch" },
    ],
  },
  yukino_end_branch: { branch: "ending:yukino" },

  yukino_true: {
    bg: "library_day", ending: true, who: "yukino", exp: "happy",
    endTitle: "トゥルーエンド ―― 「私たちの、続きの物語」",
    text: [
      "僕の答えに、氷の会長と呼ばれた彼女が、花のようにほどけて笑った。",
      "「ふふ。……これは、私の物語史上、最高のハッピーエンドだわ。」",
      "――数年後。書店の棚に、一冊の本が並んだ。新人賞を獲った、彼女のデビュー作。",
      "献辞のページには、こう書かれている。『私に“本当の願い”を教えてくれた、あなたへ』。",
      "「次回作の主人公も、あなたよ。……一生、私の隣で、取材させてもらうから。」",
      "凛と微笑む彼女の左手で、小さな指輪が光っていた。",
    ],
  },
  yukino_good: {
    bg: "library_sunset", ending: true, who: "yukino", exp: "shy",
    endTitle: "グッドエンド ―― 「最初のページ」",
    text: [
      "僕が頷くと、雪乃は照れたように、けれど嬉しそうに目を細めた。",
      "「不器用なの、知ってるでしょう。だから……ゆっくり、進ませて。」",
      "「私とあなたの物語は、まだ一行目。これから、二人で書いていきましょう。」",
      "夢へ踏み出した彼女の隣に、僕はいる。それだけで、明日が待ち遠しかった。",
    ],
  },
  yukino_bad: {
    bg: "library_night", ending: true, who: "yukino", exp: "sad",
    endTitle: "ノーマルエンド ―― 「物語は、続く」",
    text: [
      "僕の答えを聞いた雪乃は、静かに、ノートを閉じた。",
      "「……そう。これも、ひとつの結末ね。」",
      "「でも、覚えておいて。物語の結末は、書き直せるものなのよ。」",
      "「私は私の道を行く。いつか、もっといい言葉で書けたら……また、読ませて。」",
      "凛とした背中が、夜の中へ消えていく。僕は、その意味を、長く考えることになる。",
    ],
  },

  /* ===================== ひなたルート ===================== */
  hinata_4_title: { startDay: 4, dayTitle: "四日目 ―― 七瀬 ひなた", next: "hinata_4_1" },
  hinata_4_1: {
    bg: "artroom", who: "hinata", exp: "smile", text: [
      "「{name}くん。今日はね、わたしの“ひみつ”を見せてあげる。」",
      "美術室で、彼女はあの描きかけの絵を、そっとイーゼルに戻した。",
    ], next: "hinata_4_2",
  },
  hinata_4_2: {
    bg: "artroom_sunset", who: "hinata", exp: "normal", text: [
      "「この絵ね、三年前から、ずっと描いてるの。」",
      "「中央が、白いままでしょう? ……ここに描くものが、決められないんだ。」",
      "「わたし、体が弱くてね。入院ばっかりの子どもだったの。」",
    ], next: "hinata_4_3",
  },
  hinata_4_3: {
    bg: "artroom_sunset", who: "hinata", exp: "sad", text: [
      "「病室の窓から、桜を描いた。“来年も見られますように”って祈りながら。」",
      "「でもね、いつからか、こわくなったの。完成させたら――終わっちゃう気がして。」",
      "「だから、ずっと未完成。……ずっと、“途中”のまま。」",
    ], next: "hinata_4_4",
  },
  hinata_4_4: {
    bg: "artroom_sunset", who: "player", text: [
      "（完成が、怖い。終わりが、怖い。）",
      "（彼女はずっと、“消えてしまうもの”の影に、おびえていたんだ。）",
    ],
    choices: [
      { label: "「完成は終わりじゃない。新しい始まりだよ」", eff: { hinata: 4 }, flag: { hinata_trust: true }, next: "hinata_4_5a" },
      { label: "「その空白、僕と一緒に埋めよう」", eff: { hinata: 4 }, flag: { hinata_trust: true }, next: "hinata_4_5b" },
    ],
  },
  hinata_4_5a: {
    bg: "artroom_sunset", who: "hinata", exp: "surprise", text: [
      "「新しい、始まり……。」",
      "彼女は、ずっと閉じていた何かが、ほどけたような顔をした。",
      "「{name}くんは、こわくないの? ……大切なものが、変わっていくの。」",
    ], next: "hinata_4_6",
  },
  hinata_4_5b: {
    bg: "artroom_sunset", who: "hinata", exp: "blush", text: [
      "「いっしょに……?」",
      "彼女は筆を握る手を、そっと僕の手に重ねた。あたたかかった。",
      "「{name}くんと一緒なら……描けるかも、しれない。」",
    ], next: "hinata_4_6",
  },
  hinata_4_6: {
    bg: "riverside_sunset", who: "hinata", exp: "smile", text: [
      "その日、二人で川沿いの桜を見に行った。彼女は、たくさんスケッチをした。",
      "「ねえ、{name}くん。わたし、決めた。あの絵、文化祭までに完成させる。」",
      "「ちゃんと、“今”を描く。逃げないで、ぜんぶ。」",
    ], next: "hinata_5_title",
  },

  hinata_5_title: { startDay: 5, dayTitle: "五日目 ―― 白を、塗る", next: "hinata_5_1" },
  hinata_5_1: {
    bg: "artroom", who: "hinata", exp: "normal", text: [
      "翌日から、ひなたは取り憑かれたように筆を進めた。",
      "白かった中央に、少しずつ、色が宿っていく。それは――人の輪郭だった。",
      "「もう少しで、わかると思う。わたしが、本当に描きたかったもの。」",
    ],
    choices: [
      { label: "「そばで、見ててもいい?」", eff: { hinata: 3 }, next: "hinata_5_2" },
      { label: "「君が描く姿、すごくきれいだ」", eff: { hinata: 3 }, flag: { hinata_care: true }, next: "hinata_5_2" },
    ],
  },
  hinata_5_2: {
    bg: "artroom_sunset", who: "hinata", exp: "happy", text: [
      "「……えへへ。{name}くんが見ててくれると、筆が、軽いの。」",
      "夕陽が、彼女と、生まれかけの絵を、やさしく照らしていた。",
    ], next: "hinata_6_title",
  },

  hinata_6_title: { startDay: 6, dayTitle: "六日目 ―― 完成の、前に", next: "hinata_6_1" },
  hinata_6_1: {
    bg: "rooftop_sunset", who: "hinata", exp: "shy", text: [
      "文化祭前夜。屋上で、ひなたはぽつりと言った。",
      "「絵ね、明日の朝には完成するの。文化祭で、初めて、みんなに見せる。」",
      "「完成したら……{name}くんに、いちばん最初に、伝えたいことがあるんだ。」",
    ], next: "hinata_climax",
  },
  hinata_climax: {
    bg: "festival_night", who: "hinata", exp: "blush", text: [
      "――文化祭、最終日の夜。展示室の真ん中に、完成したその絵が飾られていた。",
      "桜の木の下。白かった中央に描かれていたのは――手を繋ぐ、二人の姿。",
      "一人は、ひなた。そしてもう一人は、紛れもなく、僕だった。",
      "「これが、わたしの“今、いちばん描きたかったもの”。」",
      "「{name}くん。わたしね、あなたといる“今”が、大好き。……あなたが、好き。」",
    ],
    choices: [
      { label: "「僕も好きだ。これからの“今”を、全部一緒に」", eff: { hinata: 3 }, next: "hinata_end_branch" },
      { label: "「ありがとう。でも、応えることはできない」", eff: { hinata: -2 }, flag: { hinata_reject: true }, next: "hinata_end_branch" },
    ],
  },
  hinata_end_branch: { branch: "ending:hinata" },

  hinata_true: {
    bg: "artroom_day", ending: true, who: "hinata", exp: "happy",
    endTitle: "トゥルーエンド ―― 「未完成の、その先へ」",
    text: [
      "僕の答えに、ひなたは、はじけるように笑って、ぽろぽろ泣いた。",
      "「やった……。わたし、“この先”が、見たくなっちゃった。{name}くんと。」",
      "――それから、彼女の絵は、街のコンクールで大きな賞をとった。",
      "タイトルは『はじまりの桜』。あの、二人で繋いだ手の絵。",
      "「ねえ。次はね、結婚式の絵を描くんだ。……ずっと先の、わたしたちの“今”を。」",
      "もう、彼女は終わりにおびえていない。今日も、明日も、その手を握って描いていく。",
    ],
  },
  hinata_good: {
    bg: "riverside_sunset", ending: true, who: "hinata", exp: "shy",
    endTitle: "グッドエンド ―― 「色づく毎日」",
    text: [
      "僕が頷くと、ひなたは照れたように、僕の手をきゅっと握った。",
      "「これからね、毎日を、一枚ずつ描いていきたいな。{name}くんと。」",
      "「完成しても、こわくないよ。だって、次の絵が、待ってるんだもん。」",
      "白かったキャンバスに色が宿るように、二人の毎日も、少しずつ色づいていく。",
    ],
  },
  hinata_bad: {
    bg: "artroom_night", ending: true, who: "hinata", exp: "sad",
    endTitle: "ノーマルエンド ―― 「絵の中の、約束」",
    text: [
      "僕の答えに、ひなたは、少しだけ寂しそうに、でも穏やかに微笑んだ。",
      "「ふふ。……そっか。うん、いいんだ。絵は、完成したから。」",
      "「わたし、もう、こわくないよ。“今”を生きるって、決めたから。」",
      "「この絵は、ずっと残るよ。わたしが、{name}くんを好きだった“今”も、ずっと。」",
      "彼女は前を向いて歩き出した。その背中は、出会った頃より、ずっと強く見えた。",
    ],
  },

  /* ===================== シオンルート ===================== */
  shion_4_title: { startDay: 4, dayTitle: "四日目 ―― 月城 シオン", next: "shion_4_1" },
  shion_4_1: {
    bg: "musicroom", who: "shion", exp: "normal", text: [
      "放課後、シオンに呼び出された。彼は音楽室の鍵を、僕の手のひらにのせた。",
      "「……お前にだけ、見せたいものがある。来い。」",
    ], next: "shion_4_2",
  },
  shion_4_2: {
    bg: "musicroom_sunset", who: "", text: [
      "誰もいない音楽室。彼はグランドピアノの蓋を、ゆっくりと開けた。",
      "「三年ぶりだ。この蓋を、自分の手で開けたのは。」",
    ], next: "shion_4_3",
  },
  shion_4_3: {
    bg: "musicroom_sunset", who: "shion", exp: "sad", text: [
      "「姉さんが死んだのは、俺が出たコンクールの日だった。」",
      "「『終わったら、病室で一番に聴かせて』――そう、約束した。」",
      "「でも俺は、賞をとった高揚で、駆けつけるのが遅れた。……間に合わなかった。」",
      "「姉さんは、俺の演奏を聴けないまま、逝った。俺が、約束を殺したんだ。」",
    ], next: "shion_4_4",
  },
  shion_4_4: {
    bg: "musicroom_sunset", who: "player", text: [
      "（彼はずっと、自分を許せずにいる。三年も、たった一人で。）",
      "（凍りついた指は、本当は、誰よりも音楽を恋しがっているのに。）",
    ],
    choices: [
      { label: "「君のせいじゃない。お姉さんは、君の音を信じてた」", eff: { shion: 4 }, flag: { shion_trust: true }, next: "shion_4_5a" },
      { label: "「その約束、今からでも果たせる。僕が聴くから」", eff: { shion: 4 }, flag: { shion_trust: true }, next: "shion_4_5b" },
    ],
  },
  shion_4_5a: {
    bg: "musicroom_sunset", who: "shion", exp: "surprise", text: [
      "「俺の、せいじゃ……。」",
      "彼の瞳が揺れた。三年間、誰にも言えず凍らせてきた何かが、溶け出すように。",
      "「お前は……ずるいな。そんな言葉、反則だろう。」",
    ], next: "shion_4_6",
  },
  shion_4_5b: {
    bg: "musicroom_sunset", who: "shion", exp: "blush", text: [
      "「お前が、聴く……?」",
      "彼は長い沈黙のあと、震える手を、そっと鍵盤の上に置いた。",
      "「……笑うなよ。三年ぶりだ。指が、震えてる。」",
    ], next: "shion_4_6",
  },
  shion_4_6: {
    bg: "musicroom_sunset", who: "shion", exp: "sad", text: [
      "ぽーん、と一音。たどたどしく、けれど確かに、音楽室に音が満ちた。",
      "途切れ、また鳴り、やがて――途切れがちのメロディが、静かに流れ始めた。",
      "涙をこらえる横顔を、夕陽がやさしく照らしていた。",
      "「……聴いてくれて、ありがとう。お前がいたから、弾けた。」",
    ], next: "shion_5_title",
  },

  shion_5_title: { startDay: 5, dayTitle: "五日目 ―― 凍えた指が、ほどけて", next: "shion_5_1" },
  shion_5_1: {
    bg: "musicroom", who: "shion", exp: "normal", text: [
      "翌日から、シオンは少しずつ、鍵盤に向かう時間を取り戻していった。",
      "「文化祭の後夜祭で、ステージがある。……出ようと思う。」",
      "「三年ぶりに、人前で弾く。姉さんに――そして、お前に、聴かせたい曲があるんだ。」",
    ],
    choices: [
      { label: "「楽しみにしてる。君の音を、最前列で」", eff: { shion: 3 }, next: "shion_5_2" },
      { label: "「無理はするな。でも、君なら弾ける」", eff: { shion: 2 }, flag: { shion_care: true }, next: "shion_5_2" },
    ],
  },
  shion_5_2: {
    bg: "musicroom_sunset", who: "shion", exp: "smile", text: [
      "「……ふっ。お前は、いつもまっすぐだな。」",
      "鍵盤を撫でる彼の指は、もう、震えていなかった。",
    ], next: "shion_6_title",
  },

  shion_6_title: { startDay: 6, dayTitle: "六日目 ―― 言葉にならない音", next: "shion_6_1" },
  shion_6_1: {
    bg: "rooftop_sunset", who: "shion", exp: "shy", text: [
      "文化祭前夜。屋上で、シオンは夜風に髪をなびかせていた。初めて出会った、あの場所。",
      "「明日、弾く曲な。……まだ、誰にも言ってないタイトルがある。」",
      "「聴けば、わかる。俺の、今の気持ちが全部。……ちゃんと、受け取ってくれ。」",
    ], next: "shion_climax",
  },
  shion_climax: {
    bg: "auditorium_night", who: "shion", exp: "blush", text: [
      "――文化祭、最終日の夜。後夜祭のステージに、スポットライトが灯る。",
      "グランドピアノの前に座ったシオンが、客席の僕を、まっすぐに見つめた。",
      "流れ出したのは、優しく、切なく、そして温かい旋律。三年間、閉じ込められていた音。",
      "弾き終えた彼はマイクを取り、静かに、はっきりと言った。",
      "「今の曲のタイトルは――『君に出会えた』。」",
      "「{name}。お前が、俺の凍った指を、心を、溶かした。……好きだ。俺の隣で、この音を聴き続けてくれ。」",
    ],
    choices: [
      { label: "「僕も好きだ。君の音を、ずっと隣で聴かせて」", eff: { shion: 3 }, next: "shion_end_branch" },
      { label: "「光栄だよ。でも、その気持ちには応えられない」", eff: { shion: -2 }, flag: { shion_reject: true }, next: "shion_end_branch" },
    ],
  },
  shion_end_branch: { branch: "ending:shion" },

  shion_true: {
    bg: "auditorium_day", ending: true, who: "shion", exp: "happy",
    endTitle: "トゥルーエンド ―― 「ふたりのための、旋律」",
    text: [
      "満員の客席が、割れんばかりの拍手に包まれた。その中で、シオンは僕だけを見て微笑んだ。",
      "ステージを降りた彼は、人目もはばからず、僕を強く抱きしめた。",
      "「お前のおかげだ。……もう二度と、この手を離さない。」",
      "――数年後。彼は、再びステージに立つピアニストになった。",
      "コンサートの最後、彼は必ずあの曲を弾く。プログラムには、こう記されている。",
      "『“君に出会えた” ―― 最愛のあなたと、空の上の姉に捧ぐ』。",
      "「次の曲も、お前のための曲だ。……一生、隣で聴いてくれよ。」",
    ],
  },
  shion_good: {
    bg: "musicroom_sunset", ending: true, who: "shion", exp: "shy",
    endTitle: "グッドエンド ―― 「これから、紡ぐ音」",
    text: [
      "僕が頷くと、シオンは照れたように目をそらし、それから、そっと手を握ってきた。",
      "「不器用なんだ、俺は。……だから、ゆっくりでいいか。」",
      "「お前と過ごす毎日を、一音ずつ、曲にしていく。……悪くない、だろう?」",
      "凍えていた指は、もう自由だ。彼の奏でる音は、これからきっと、もっと優しくなる。",
    ],
  },
  shion_bad: {
    bg: "auditorium_night", ending: true, who: "shion", exp: "sad",
    endTitle: "ノーマルエンド ―― 「残響」",
    text: [
      "僕の答えに、シオンは、しばらく目を閉じてから、静かに微笑んだ。",
      "「……そうか。ふられちまったな。」",
      "「でも、後悔はしてない。お前のおかげで、俺はまた弾けるようになったんだから。」",
      "「この曲は、お前に出会えた証だ。……それだけで、十分だよ。」",
      "彼は再び鍵盤に向かう。その音は、少しだけ寂しくて、でも、もう凍ってはいなかった。",
    ],
  },
};

window.STORY = STORY;
window.STORY_START = "start";
