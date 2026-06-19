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
      "――星河（せいか）学園、高等部。今日から、ここがわたしの新しい居場所だ。",
    ], next: "name_in",
  },

  name_in: {
    bg: "schoolgate", who: "", nameInput: true,
    text: ["（まずは、自分の名前を思い出そう……）"],
    next: "p_1",
  },

  p_1: {
    bg: "schoolgate", who: "player", exp: "normal", text: [
      "（{name}……それがわたしの名前だ。）",
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
      "ぶつかった拍子に、彼の手から教科書がぱさりと落ちた。",
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
      "彼は教科書を受け取りながら、わたしの顔をじっと見つめた。",
      "その大きな瞳が、ふいに揺れた気がした。",
    ], next: "p_6",
  },
  p_5b: {
    bg: "schoolgate_petals", who: "saki", exp: "smile", text: [
      "「うん、平気平気！ こっちこそごめんね、走ってて……」",
      "彼はぺこりと頭を下げてから、わたしの顔をじっと見た。",
    ], next: "p_6",
  },
  p_5c: {
    bg: "schoolgate_petals", who: "saki", exp: "normal", text: [
      "「……えっと、固まっちゃってるけど、大丈夫？」",
      "彼は首をかしげながら、わたしの顔をのぞき込んだ。",
    ], next: "p_6",
  },

  p_6: {
    bg: "schoolgate_petals", who: "saki", exp: "surprise", text: [
      "「……ねえ。もしかして、転校生さん？」",
      "「うわ、やっぱり！ 俺、結城 陽！ よろしくっ！」",
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
      "教室に着くと、はるは「またあとでね！」と自分の席へ駆けていった。",
      "担任に紹介され、黒板に名前を書く。視線が集まって、また心臓がはねる。",
      "席についた、その隣――凛とした空気をまとう、黒髪の少年がいた。",
    ], next: "p_9",
  },
  p_9: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「……転校生。君の席はそこだ。」",
      "「僕は氷室 怜（ひむろ ゆきの）。生徒会長で、このクラスの委員長。」",
      "「分からないことがあれば聞けばいい。……効率的に、な。」",
    ],
    choices: [
      { label: "「よろしく、頼りにしてる」と笑う", eff: { yukino: 2 }, next: "p_10a" },
      { label: "「会長で委員長……すごいね」と素直に驚く", eff: { yukino: 1 }, next: "p_10b" },
      { label: "緊張して「は、はい」とだけ返す", eff: { yukino: 0 }, next: "p_10c" },
    ],
  },
  p_10a: {
    bg: "classroom", who: "yukino", exp: "shy", text: [
      "「た、頼りに……？ ……ふん。当然だろう。」",
      "そう言って彼はすっと前を向いた。けれど、耳がほんの少し赤い。",
    ], next: "p_11",
  },
  p_10b: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「別に、すごくはない。やるべきことをやっているだけだ。」",
      "言葉は素っ気ない。でも、目はちゃんとわたしを見ていた。",
    ], next: "p_11",
  },
  p_10c: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「……そう。緊張しなくていい。誰だって最初はそうだ。」",
      "意外にも、その声は少しだけ柔らかかった。",
    ], next: "p_11",
  },

  p_11: {
    bg: "courtyard", who: "", text: [
      "昼休み。人混みに疲れて、わたしは中庭の隅へ逃げ込んだ。",
      "桜の木の下。スケッチブックを広げ、ひとりで絵を描く女の子がいた。",
      "彼はわたしに気づくと、ふわりと顔を上げた。",
    ], next: "p_12",
  },
  p_12: {
    bg: "courtyard", who: "hinata", exp: "smile", text: [
      "「……あ。きみが、今日の風の匂いを変えた人だ。」",
      "「ふふ。僕は七瀬 ひなた。美術部……みたいなもの。」",
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
      "となりに座ると、彼は満足そうに目を細めた。花びらが二人の間に落ちた。",
    ], next: "p_shion_1",
  },
  p_13b: {
    bg: "courtyard", who: "hinata", exp: "smile", text: [
      "「ないしょ。……まだ、完成してないから。」",
      "スケッチブックをそっと胸に抱いて、彼はいたずらっぽく笑った。",
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
      "放課後。ざわめきから逃れたくて、わたしは屋上へ続く階段を上った。",
      "重い扉を押し開けると、夕陽が目を刺す。フェンスにもたれ、空を見上げる人影。",
      "――月城シオン先輩。三年で、学園中の女子がざわめく“高嶺の花”。",
      "噂以上に整った、息を呑むほど綺麗な横顔。なのに、いつも一人。",
      "（……うそ。なんで、こんなところに。）心臓が、勝手に跳ねた。",
      "彼はこちらを見もせず、低く澄んだ声で言った。",
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
      "彼は初めて、こちらを見た。夕陽を映した切れ長の瞳が、わずかに見開かれる。",
      "（め、目が合った……!）その視線だけで、息が止まりそうになる。",
      "「……景色、ね。」 ふっと、形のいい唇が小さく弧を描いた。",
      "「月城シオンだ。噂くらい、聞いてるんだろ。……物好きなやつ。覚えておく。」",
      "去っていく後ろ姿。なのに、その一瞬の微笑みが、胸に焼きついて離れなかった。",
    ], next: "p_14",
  },
  p_shion_3b: {
    bg: "rooftop_sunset", who: "shion", exp: "smile", text: [
      "「……素直なやつだ。」 ふっと、彼の端正な口元が緩んだ。その仕草ひとつが、絵になる。",
      "「月城シオンだ。引き止めて悪かったな。……また、気が向いたら来い。」",
      "（“また来い”って……! わたし、シオン先輩に……?）顔が、勝手に熱くなる。",
    ], next: "p_14",
  },
  p_shion_3c: {
    bg: "rooftop_sunset", who: "shion", exp: "normal", text: [
      "彼は皮肉っぽく、けれど少しだけ楽しそうに笑った。「質問に質問で返すか。……嫌いじゃない。」",
      "「月城シオンだ。お前は?」 ――そう問われ、わたしは上ずった声で名前を告げた。",
      "「{name}、か。……覚えておく。」 たったそれだけで、心臓がうるさいくらい鳴っていた。",
    ], next: "p_14",
  },

  p_14: {
    bg: "hallway_sunset", who: "", text: [
      "屋上からの帰り道。茜色に染まる廊下を、わたしはひとり歩く。",
      "たった一日で、三人の少年と、一人の――特別な先輩に出会った。",
      "眩しいはる。凛とした怜。儚いひなた。そして、学園中の憧れ、シオン先輩。",
      "（……シオン先輩の、あの目。あの笑い方。……だめだ、思い出すと胸が苦しい。）",
      "（この学校での毎日。なんだか、少しだけ――ううん、すごく楽しみだ。）",
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
      "翌朝、校門ではるが駆け寄ってきた。息を切らしながら、満面の笑み。",
      "「ねえねえ、一緒に行こ？ ……だめ？」",
    ],
    choices: [
      { label: "「もちろん。行こう」", eff: { saki: 2 }, next: "d1_2a" },
      { label: "「随分なつかれたね」とからかう", eff: { saki: 1 }, next: "d1_2b" },
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
      "頬をふくらませてから、彼はぽつりと尋ねた。",
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
      { label: "「ねえ、何か知ってるの？」と聞き返す", eff: { saki: 1 }, flag: { saki_hint: true }, next: "d1_4b" },
    ],
  },
  d1_4: {
    bg: "schoolgate_petals", who: "saki", exp: "sad", text: [
      "「……そっか。うん、だよね。……ううん、なんでもないっ！」",
      "一瞬だけ寂しそうに笑って、はるはまた元気いっぱいに駆け出した。",
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
      "二限目。配られたプリントが、わたしのところで一枚足りなかった。",
      "「……無いのか？ 仕方ないな。」",
      "怜は自分のプリントを、すっと半分に折って差し出した。",
      "「半分こ、だ。……次からは、僕が予備を持っておく。」",
    ],
    choices: [
      { label: "「ありがとう、助かるよ」と笑顔で受け取る", eff: { yukino: 2 }, next: "d1_6a" },
      { label: "「会長にこんなことさせちゃってごめんね」", eff: { yukino: 1 }, next: "d1_6b" },
    ],
  },
  d1_6a: {
    bg: "classroom", who: "yukino", exp: "shy", text: [
      "「……っ。そ、そんなに嬉しそうにされると……調子が狂う。」",
      "彼はぷいと前を向いたが、肩がほんの少しこわばっていた。",
    ], next: "d1_7",
  },
  d1_6b: {
    bg: "classroom", who: "yukino", exp: "normal", text: [
      "「会長だから、じゃない。困っている人がいたら、助ける。当たり前だろう。」",
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
      "「あ、{name}さん。見てくれる？ ……ここに、何を描くと思う？」",
      "彼が指さしたのは、絵の中の真っ白な空白。",
    ],
    choices: [
      { label: "「君が一番描きたいもの、かな」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d1_9a" },
      { label: "「桜の木……とか？」", eff: { hinata: 1 }, next: "d1_9b" },
    ],
  },
  d1_9a: {
    bg: "artroom", who: "hinata", exp: "shy", text: [
      "「……僕が、一番描きたいもの。」",
      "彼は少し驚いた顔をして、それから、とても優しく微笑んだ。",
      "「うん。……まだ、描けないんだけどね。勇気が出たら、描くんだ。」",
    ], next: "d1_shion_1",
  },
  d1_9b: {
    bg: "artroom", who: "hinata", exp: "smile", text: [
      "「ふふ、おしい。桜は、ここ。空白は……ひみつ。」",
      "彼は手のひらで空白をそっと隠した。何かを大切に守るみたいに。",
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
      "わたしの気配に気づくと、彼は弾かれたように立ち上がった。",
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
      "彼は驚いたようにわたしを見て、それから目を伏せた。",
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
      "（あのしおりの“約束”。はるの意味ありげな言葉。ひなたの空白の絵。）",
      "（……まだ、何も分からない。でも、知りたいと思っている自分がいる。）",
    ], next: "day2_title",
  },

  /* ===================== Day 2 ===================== */
  day2_title: { startDay: 2, dayTitle: "二日目 ―― ふれた本音", next: "d2_1" },

  d2_1: {
    bg: "gym", who: "", text: [
      "昼休み。体育館の前を通ると、ボールを撞く乾いた音が響いていた。",
      "ひとり、シュート練習を続けるはる。汗を光らせ、何度も、何度も。",
      "けれど――右肩を押さえて、ふいに顔をしかめた。",
    ], next: "d2_2",
  },
  d2_2: {
    bg: "gym", who: "saki", exp: "sad", text: [
      "「……っ。だい、じょうぶ。まだ、いける……」",
      "わたしの足音に気づくと、彼は慌てて笑顔をつくった。",
      "「あっ、{name}! み、見てた? あはは、サボりじゃないよ、自主練!」",
    ],
    choices: [
      { label: "「肩、痛むの？無理しないで」", eff: { saki: 2 }, flag: { saki_injury: true }, next: "d2_3a" },
      { label: "「すごい練習量だね」と感心する", eff: { saki: 1 }, next: "d2_3b" },
    ],
  },
  d2_3a: {
    bg: "gym", who: "saki", exp: "surprise", text: [
      "「……気づいて、たんだ。」",
      "彼は驚いた顔をして、それから、力なく笑った。",
      "「去年さ、大事な試合で肩こわしちゃって。……エースだったのに、ね。」",
      "「でも、もう平気だから! ……平気って、思いたいだけかもだけど。」",
    ], next: "d2_4",
  },
  d2_3b: {
    bg: "gym", who: "saki", exp: "smile", text: [
      "「えへへ、でしょ? 俺、努力だけは負けないんだ。」",
      "明るく胸を張る。でも、押さえた肩からは、手を離さないままだった。",
    ], next: "d2_4",
  },
  d2_4: {
    bg: "gym", who: "saki", exp: "normal", text: [
      "「……ねえ、{name}。俺ね、こわいんだ。」",
      "「がんばっても、また置いていかれるんじゃないかって。……大切なものに。」",
      "ぽつりとこぼれた本音は、わたしの知らない過去の影を帯びていた。",
    ], next: "d2_5",
  },
  d2_5: {
    bg: "library", who: "", text: [
      "放課後。静まりかえった図書室の奥で、怜が一人、何かを書いていた。",
      "近づくと、彼はノートをぱたんと閉じた。……教科書ではない、何か。",
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
      "「……どうして、分かるんだ。」",
      "観念したように、彼は深く息をついた。",
      "「ああ。書いてる、物語を。……誰にも言ったこと、なかったのに。」",
      "「家は代々、医者の家系。僕の進路は、生まれた時から決まっている。」",
      "「“小説家になりたい”なんて――言えるわけ、ないだろう。」",
    ], next: "d2_8",
  },
  d2_7b: {
    bg: "library", who: "yukino", exp: "shy", text: [
      "「……気を遣わせて、悪いな。」",
      "「君は、人の境界線を尊重するんだな。……少し、意外だ。」",
      "閉じたノートの上に、彼はそっと手を重ねた。守るように。",
    ], next: "d2_8",
  },
  d2_8: {
    bg: "library", who: "yukino", exp: "normal", text: [
      "「完璧でいなきゃいけない。みんなそう思ってる。僕自身も。」",
      "「……でも、この物語の中でだけは、僕は自由になれるの。」",
      "夕陽に照らされた横顔は、いつもの“氷の会長”とは別人みたいだった。",
    ], next: "d2_9",
  },
  d2_9: {
    bg: "rooftop_sunset", who: "", text: [
      "ふと屋上へ続く階段を上ると、扉の外にひなたがいた。",
      "夕焼けの中、彼はただ、空をじっと見上げていた。",
    ], next: "d2_10",
  },
  d2_10: {
    bg: "rooftop_sunset", who: "hinata", exp: "smile", text: [
      "「{name}さん。……ねえ、夕焼けって、どうしてこんなに胸が苦しいのかな。」",
      "「きれいなものほど、すぐ消えちゃうからかも、しれないね。」",
    ],
    choices: [
      { label: "「消えても、見てた人の中に残るよ」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d2_11a" },
      { label: "「だから今、一緒に見てるんじゃない？」", eff: { hinata: 2 }, flag: { hinata_bond: true }, next: "d2_11b" },
    ],
  },
  d2_11a: {
    bg: "rooftop_sunset", who: "hinata", exp: "shy", text: [
      "「……残る、かな。」",
      "彼は少しだけ目を見開いて、それから、泣きそうな顔で笑った。",
      "「うん。……だといいな。そう思えたら、こわくないのにな。」",
    ], next: "d2_shion_1",
  },
  d2_11b: {
    bg: "rooftop_sunset", who: "hinata", exp: "blush", text: [
      "「……いっしょに、見てる。」",
      "彼はそっと、わたしのとなりに半歩、距離を詰めた。",
      "「ふふ。じゃあ、この夕焼けは、僕と{name}さんのだね。」",
    ], next: "d2_shion_1",
  },
  d2_shion_1: {
    bg: "courtyard_sunset", who: "", text: [
      "帰り道、中庭のベンチにシオンがいた。膝の上に、一枚の古びた写真。",
      "写っていたのは、彼と、よく似た面差しの少年だった。",
    ], next: "d2_shion_2",
  },
  d2_shion_2: {
    bg: "courtyard_sunset", who: "shion", exp: "sad", text: [
      "「……姉だ。」 わたしの視線に気づいて、彼はぽつりと言った。",
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
      "（はるの“置いていかれる怖さ”。怜の“縛られた夢”。ひなたの“消える儚さ”。シオンの“凍った指”。）",
      "（わたしに、何ができるだろう。……でも、放っておけない。誰のことも。）",
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
      "はるは「文化祭の準備、手伝って!」と。",
      "怜は「生徒会の仕事を見てほしい」と。",
      "ひなたは「行きたい場所がある」と。",
      "（……今日は、誰と過ごそう。きっと、これが分かれ道になる。）",
    ],
    choices: [
      { label: "はると、文化祭の準備をする", eff: { saki: 3 }, next: "d3_saki" },
      { label: "怜の、生徒会の仕事を手伝う", eff: { yukino: 3 }, next: "d3_yukino" },
      { label: "ひなたの、行きたい場所へ付き添う", eff: { hinata: 3 }, next: "d3_hinata" },
      { label: "シオンの、音楽室に付き合う", eff: { shion: 3 }, next: "d3_shion" },
    ],
  },

  d3_saki: {
    bg: "classroom", who: "saki", exp: "happy", text: [
      "「来てくれてありがと! ……正直ね、{name}が来てくれたら、って思ってた。」",
      "二人で看板を作り、飾りつけをする。何気ない時間が、やけに楽しい。",
      "ふと手が触れて――はるが、真っ赤になって固まった。",
      "「……っ、ご、ごめんっ。俺、ほんとは……ううん、なんでもない!」",
    ], next: "d3_join",
  },
  d3_yukino: {
    bg: "library", who: "yukino", exp: "shy", text: [
      "「……ありがとう。君となら、仕事も、その。……はかどる。」",
      "書類を片付けながら、二人きりの時間が静かに流れる。",
      "ふと、彼が書きかけの物語のノートを、そっとわたしのほうへ押し出した。",
      "「……一行だけ。読んで、感想を……くれないか。」",
    ], next: "d3_join",
  },
  d3_hinata: {
    bg: "riverside_sunset", who: "hinata", exp: "smile", text: [
      "彼が連れて行ってくれたのは、川沿いの、桜並木だった。",
      "「ここね、僕の一番好きな場所。……来られて、よかった。」",
      "「{name}さんと見られて、よかった。……今日のこと、わすれないでね。」",
      "夕陽の中、彼の横顔が、泣きたくなるほどきれいだった。",
    ], next: "d3_join",
  },

  d3_shion: {
    bg: "musicroom_sunset", who: "shion", exp: "smile", text: [
      "「……来たのか。物好きめ。」 口ではそう言いながら、彼は少しだけ嬉しそうだった。",
      "誰もいない音楽室で、二人、ただ静かに時間を過ごした。",
      "彼は弾かなかったけれど、鍵盤に置いた指をわたしがそっと見ていると、彼は小さく笑った。",
      "「お前がいると……いつか、また弾ける気がするから、不思議だ。」",
    ], next: "d3_join",
  },

  d3_join: {
    bg: "home_evening", who: "player", text: [
      "（楽しい時間は、あっという間に過ぎていく。）",
      "（気づけばわたしの心は、誰かに、強く惹かれ始めていた。）",
      "（文化祭まで、あと四日。――この気持ちの行き先を、確かめたい。）",
    ], next: "route_branch",
  },

  route_branch: { branch: "route" },

  /* ===================== はるルート ===================== */
  saki_4_title: { startDay: 4, dayTitle: "四日目 ―― 結城 陽", next: "saki_4_1" },
  saki_4_1: {
    bg: "schoolgate_petals", who: "saki", exp: "smile", text: [
      "「{name}、今日さ……放課後、ちょっとだけ時間くれない?」",
      "「行きたいとこ、あるんだ。……俺の、たいせつな場所。」",
    ], next: "saki_4_2",
  },
  saki_4_2: {
    bg: "park_sakura", who: "", text: [
      "放課後、はるが連れてきたのは、小さな公園だった。",
      "中央に、一本の大きな桜の木。古びたブランコ。見覚えのある――気がする。",
    ], next: "saki_4_3",
  },
  saki_4_3: {
    bg: "park_sakura", who: "saki", exp: "normal", text: [
      "「ここね、俺が小さい頃、毎日来てた公園。」",
      "「……あのさ、{name}。俺、ずっと言いたかったことがあるんだ。」",
      "「俺たち、初めましてじゃ、ないんだよ。」",
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
      "あの押し花のしおりを差し出すと、はるの目が大きく見開かれた。",
      "「……それ。俺が、{name}にあげたやつ……! 持ってて、くれたの……?」",
      "ぽろり、と涙がこぼれた。",
      "『さくらの き の した で、また あおうね。やくそく。』――あの字は、幼いはるのものだった。",
    ], next: "saki_4_6",
  },
  saki_4_5b: {
    bg: "park_sakura", who: "saki", exp: "shy", text: [
      "「……うん。幼なじみ。十年前まで、毎日いっしょに遊んでた。」",
      "「俺が引っ越すって決まった日、この木の下で、約束したんだ。」",
    ], next: "saki_4_6",
  },
  saki_4_6: {
    bg: "park_sunset", who: "saki", exp: "sad", text: [
      "「『大きくなったら、また絶対ここで会おうね』って。指切りもした。」",
      "「でも……再会したのに、{name}は俺のこと、覚えてなくて。」",
      "「だから俺、こわかったんだ。言ったら、困らせちゃうかもって。」",
      "「あの頃みたいに、また……俺だけが、置いてかれるんじゃないかって。」",
    ], next: "saki_4_7",
  },
  saki_4_7: {
    bg: "park_sunset", who: "player", text: [
      "（思い出した。小さなわたしは、泣きじゃくるはるに、約束したんだ。）",
      "（“ぜったい忘れない”って。なのに、わたしは――）",
    ],
    choices: [
      { label: "「ごめん。でも、もう絶対に忘れない」と抱きしめる", eff: { saki: 4 }, flag: { saki_b1: true }, next: "saki_4_8" },
      { label: "「置いていったりしない。今度はわたしがそばにいる」", eff: { saki: 3 }, next: "saki_4_8" },
    ],
  },
  saki_4_8: {
    bg: "park_sunset", who: "saki", exp: "blush", text: [
      "はるは、わたしの胸で、子どものように泣いた。それから、顔を上げて笑った。",
      "「……えへへ。なんか、ずるいよ、{name}。そんなこと言われたら……」",
      "「俺、もう……後戻りできないじゃん。」",
    ], next: "saki_5_title",
  },

  saki_5_title: { startDay: 5, dayTitle: "五日目 ―― もう一度の約束", next: "saki_5_1" },
  saki_5_1: {
    bg: "gym", who: "saki", exp: "normal", text: [
      "翌日。はるは、ずっと避けていた体育館に、自分から足を運んだ。",
      "「……俺、決めた。文化祭のバスケ、出る。逃げるの、やめる。」",
      "「{name}が、見ててくれるなら……俺、もう一回、跳べる気がするんだ。」",
    ],
    choices: [
      { label: "「最前列で、君だけを見てる」", eff: { saki: 3 }, next: "saki_5_2" },
      { label: "「無理だけはしないで。あなたが一番大事だから」", eff: { saki: 2 }, flag: { saki_care: true }, next: "saki_5_2" },
    ],
  },
  saki_5_2: {
    bg: "gym_evening", who: "saki", exp: "happy", text: [
      "「……うんっ! ありがと、{name}!」",
      "彼のシュートが、きれいな弧を描いてネットを揺らした。",
      "その横顔は、痛みより、希望でいっぱいに輝いていた。",
    ], next: "saki_mid_1",
  },

  /* --- 五日目 追加イベント：つないだ手と、消えない不安 --- */
  saki_mid_1: {
    bg: "town_day", who: "saki", exp: "smile", text: [
      "放課後、文化祭の買い出しに、はると街へ出かけた。",
      "人混みではぐれかけた瞬間、はるがぱっとわたしの手を取った。",
      "「……っと。迷子になるなよ?」 そう言って笑う彼の手は、思ったよりずっと大きい。",
      "つないだ手の体温に、心臓がうるさいくらい鳴る。",
    ],
    choices: [
      { label: "「……このまま、つないでていい?」", eff: { saki: 3 }, flag: { saki_date: true }, next: "saki_mid_2a" },
      { label: "慌てて手を離してしまう", eff: { saki: 1 }, next: "saki_mid_2b" },
    ],
  },
  saki_mid_2a: {
    bg: "town_day", who: "saki", exp: "blush", text: [
      "「……つ、繋いでていいって……」 はるの耳が、みるみる赤くなる。",
      "「ずるいなあ、{name}は。昔っから、俺の心臓に悪いんだ。」",
      "結局、家に着くまで、つないだ手はほどけなかった。",
    ], next: "saki_mid_3",
  },
  saki_mid_2b: {
    bg: "town_day", who: "saki", exp: "smile", text: [
      "「あはは、照れんなって。……でも、ちょっとだけ、残念。」",
      "はるはおどけてみせたけど、その横顔は、少しだけ寂しそうだった。",
    ], next: "saki_mid_3",
  },
  saki_mid_3: {
    bg: "park_sunset", who: "saki", exp: "normal", text: [
      "帰り道、あの公園を通った。茜色の光が、古いブランコを長く照らしている。",
      "「なあ、{name}。」 はるが、ふいに足を止めた。",
      "「俺さ……正直、まだちょっとこわいんだ。また、当たり前みたいに、君がいなくなったら……って。」",
      "幼い日に置いていかれた記憶が、彼の中に、まだ棘のように残っている。",
    ],
    choices: [
      { label: "「もう、どこにも行かない。ずっとそばにいるよ」", eff: { saki: 3 }, flag: { saki_promise2: true }, next: "saki_mid_4" },
      { label: "はるの手を、ぎゅっと握り返す", eff: { saki: 3 }, next: "saki_mid_4" },
    ],
  },
  saki_mid_4: {
    bg: "park_sunset", who: "saki", exp: "happy", text: [
      "はるは、泣き笑いみたいな顔で、わたしの頭をくしゃっと撫でた。",
      "「……うん。信じる。今度こそ、ずっと、だからな。」",
      "夕陽の中、二人の影が、ぴったり寄り添って伸びていた。",
    ], next: "saki_6_title",
  },

  saki_6_title: { startDay: 6, dayTitle: "六日目 ―― 言えない一言", next: "saki_6_1" },
  saki_6_1: {
    bg: "riverside_sunset", who: "saki", exp: "shy", text: [
      "文化祭、前夜。川沿いを二人で歩いた。沈黙が、くすぐったい。",
      "「……ねえ、{name}。明日、文化祭が終わったら……話したいこと、あるんだ。」",
      "「俺の、ずっと前からの、気持ち。……ちゃんと、言葉にするから。」",
    ], next: "saki_6_2",
  },
  saki_6_2: {
    bg: "riverside_night", who: "player", text: [
      "（明日。きっと、はるは――。）",
      "（わたしの答えは、もう、決まっている。）",
    ], next: "saki_night",
  },
  saki_night: {
    bg: "riverside_night", who: "player", text: [
      "（文化祭、前夜。眠れないまま、明日のことを思う。）",
      "（はるの気持ちも、わたしの答えも、もう決まってる。あとは、どんな自分で踏み出すか。）",
    ],
    choices: [
      { label: "わくわくしながら、その時を待つ", flag: { saki_b4: 0 }, next: "saki_climax" },
      { label: "少し不安。でも、ちゃんと向き合う", flag: { saki_b4: 1 }, next: "saki_climax" },
      { label: "覚悟を決める。わたしから動こう", flag: { saki_b4: 2 }, next: "saki_climax" },
    ],
  },
  saki_climax: {
    bg: "festival_night", who: "saki", exp: "blush", text: [
      "――文化祭、最終日の夜。後夜祭のキャンプファイヤーが、夜空を焦がす。",
      "試合をやり遂げたはるが、わたしの手を取って、人混みの外へと駆け出した。",
      "桜の木の下――あの公園と同じ場所に、二人は立っていた。",
      "「{name}。俺、もう逃げない。だから……ちゃんと言うね。」",
      "「俺、{name}のことが、ずっと――子どもの頃から、ずっと好きでした。」",
    ],
    choices: [
      { label: "「わたしも好き。今度こそ、ずっと一緒にいようね」", eff: { saki: 3 }, next: "saki_end_branch" },
      { label: "「ありがとう。でも、まだ友達のままで」", eff: { saki: -2 }, flag: { saki_reject: true }, next: "saki_end_branch" },
    ],
  },
  saki_end_branch: { branch: "ending:saki" },

  saki_true: {
    bg: "park_sakura_day", ending: true, who: "saki", exp: "happy",
    endTitle: "トゥルーエンド ―― 「ずっと、きみの隣で」",
    text: [
      "わたしの答えに、はるは、泣きながら、世界で一番の笑顔を見せた。",
      "「やったあ……! 俺、ずっとこの日を、待ってたんだから……!」",
      "――それから、何度目かの春。",
      "あの桜の木の下で、わたしたちは今も、並んで笑っている。",
      "今度の約束は、もう、ほどけない。指切りした小指を、固く繋いだまま。",
      "「ねえ{name}。来年も、再来年も……ずっと、ここで会おうね。」",
      "「うん。――約束だ。」",
    ],
  },
  saki_good: {
    bg: "park_sunset", ending: true, who: "saki", exp: "shy",
    endTitle: "グッドエンド ―― 「これからの、ふたり」",
    text: [
      "差し出した手を、はるはぎゅっと握り返した。少し照れながら、でも確かに。",
      "「……まだ、ぎこちないけどさ。これから、ゆっくり知っていこ?」",
      "「うん。俺と{name}の、新しい約束。一個ずつ、増やしていこう。」",
      "再会から始まった物語は、ここから本当の意味で動き出す。",
      "桜は、また来年も咲く。二人で見上げる、その日まで。",
    ],
  },
  saki_bad: {
    bg: "park_night", ending: true, who: "saki", exp: "sad",
    endTitle: "ノーマルエンド ―― 「桜の下で、もう一度」",
    text: [
      "わたしの言葉に、はるは、しばらく黙ってから、ふっと笑った。",
      "「……そっか。うん、わかってた、かも。」",
      "「でもね、{name}。俺、諦めないから。」",
      "「だって、十年待ったんだよ? ……ちょっとくらい、待たせてよね。」",
      "強がりの涙を拭って、彼は前を向いた。物語は、まだ終わらない。",
      "（……わたしは、本当にこれでよかったのか。桜の花びらが、答えを攫っていった。）",
    ],
  },

  /* ===================== 怜ルート ===================== */
  yukino_4_title: { startDay: 4, dayTitle: "四日目 ―― 氷室 怜", next: "yukino_4_1" },
  yukino_4_1: {
    bg: "library", who: "yukino", exp: "normal", text: [
      "「{name}。少し、付き合ってほしいところがあるんだ。」",
      "放課後、彼に連れられて来たのは、街外れの小さな書店だった。",
    ], next: "yukino_4_2",
  },
  yukino_4_2: {
    bg: "bookstore", who: "yukino", exp: "shy", text: [
      "「ここ、僕の秘密基地。誰にも教えたこと、なかったんだ。」",
      "棚から一冊の文庫を取り出すと、怜の表情がふっと和らいだ。",
      "「この作家に憧れて、僕は物語を書き始めた。……バカみたいだろう。」",
    ],
    choices: [
      { label: "「バカじゃない。素敵な夢だよ」", eff: { yukino: 3 }, flag: { yukino_dream: true }, next: "yukino_4_3a" },
      { label: "「君の物語、わたしはもっと読みたい」", eff: { yukino: 3 }, flag: { yukino_dream: true }, next: "yukino_4_3b" },
    ],
  },
  yukino_4_3a: {
    bg: "bookstore", who: "yukino", exp: "blush", text: [
      "「……っ。君は、いつも、まっすぐすぎる。」",
      "彼は本で顔を半分隠した。けれど、その瞳は潤んで、揺れていた。",
    ], next: "yukino_4_4",
  },
  yukino_4_3b: {
    bg: "bookstore", who: "yukino", exp: "shy", text: [
      "「僕の、物語を……? ……君に読まれるのは、心の中を見られるみたいで。」",
      "「……でも。君になら、読んでほしいと、思ってしまう。」",
    ], next: "yukino_4_4",
  },
  yukino_4_4: {
    bg: "bookstore_sunset", who: "yukino", exp: "sad", text: [
      "「でもな。明日、父が来るんだ。僕の進路の“最終確認”のために。」",
      "「医学部の推薦。願書には、もう僕の名前が書いてある。」",
      "「……夢を、しまう時が来たんだ。大人になるって、そういうことだろう。」",
    ], next: "yukino_4_5",
  },
  yukino_4_5: {
    bg: "bookstore_sunset", who: "player", text: [
      "（諦めた顔で笑う怜を、見ていられなかった。）",
      "（彼の物語は、こんな所で終わっていいものじゃない。）",
    ],
    choices: [
      { label: "「自分の人生だよ。本当の望み、お父さんに言うべきだよ」", eff: { yukino: 4 }, flag: { yukino_b1: true }, next: "yukino_4_6a" },
      { label: "「君が決めることだよ。でも、わたしは君の味方でいるから」", eff: { yukino: 3 }, next: "yukino_4_6b" },
    ],
  },
  yukino_4_6a: {
    bg: "bookstore_sunset", who: "yukino", exp: "surprise", text: [
      "「……本当の、望み。」",
      "「言って、いいの……? 我儘だと、わかっていても。」",
      "彼の声が、初めて、子どものように震えた。",
    ], next: "yukino_4_7",
  },
  yukino_4_6b: {
    bg: "bookstore_sunset", who: "yukino", exp: "blush", text: [
      "「味方……。君が、いてくれるのか。」",
      "「その言葉だけで……僕、もう少しだけ、強くなれる気がする。」",
    ], next: "yukino_4_7",
  },
  yukino_4_7: {
    bg: "library_night", who: "yukino", exp: "normal", text: [
      "「決めた。明日、父にちゃんと話す。僕の言葉で、僕の夢を。」",
      "「……ねえ、{name}。もし、僕が全部失っても。」",
      "「君は、僕の隣に……いてくれるか?」",
    ],
    choices: [
      { label: "「当たり前だよ。どんな君でも、隣にいるから」", eff: { yukino: 3 }, next: "yukino_5_title" },
      { label: "そっと手を重ねて頷く", eff: { yukino: 3 }, flag: { yukino_care: true }, next: "yukino_5_title" },
    ],
  },

  yukino_5_title: { startDay: 5, dayTitle: "五日目 ―― 凛として、立つ", next: "yukino_5_1" },
  yukino_5_1: {
    bg: "schoolgate", who: "", text: [
      "翌日。校門の前に、黒塗りの車。降りてきたのは、怜の父だった。",
      "怜は、まっすぐに背筋を伸ばし、父の前に立った。",
    ], next: "yukino_5_2",
  },
  yukino_5_2: {
    bg: "schoolgate", who: "yukino", exp: "normal", text: [
      "「お父様。僕、医学部には行きません。」",
      "「僕は、物語を書きたい。文学の道に、進みたいんです。」",
      "「初めて言います。これが――僕の、本当の願いです。」",
      "凛とした声が、桜の風に、まっすぐ響いた。",
    ], next: "yukino_5_3",
  },
  yukino_5_3: {
    bg: "schoolgate_petals", who: "yukino", exp: "shy", text: [
      "父は、長い沈黙のあと、ただ一言「……考え直す時間をくれ」と言って去った。",
      "完全な勝利じゃない。けれど、怜は確かに、自分の足で立っていた。",
      "「……言えた。{name}、僕、言えた。」",
      "振り向いた彼の頬を、涙が一筋、伝っていた。",
    ], next: "yukino_mid_1",
  },

  /* --- 五日目 追加イベント：物語のモデルと、最後通牒 --- */
  yukino_mid_1: {
    bg: "cafe_day", who: "yukino", exp: "shy", text: [
      "放課後、怜に誘われて、静かな喫茶店に入った。彼の“もう一つの秘密基地”らしい。",
      "ノートを広げた怜が、めずらしく、少し照れたように切り出した。",
      "「新作の主人公のことなんだが。……モデルが、いる。」",
      "「明るくて、まっすぐで、僕の凍った世界に色をつけた人物だ。……誰のことか、言わせるな。」",
    ],
    choices: [
      { label: "「それって……わたしのこと?」と聞く", eff: { yukino: 3 }, flag: { yukino_date: true }, next: "yukino_mid_2" },
      { label: "嬉しくて、顔がほころんでしまう", eff: { yukino: 3 }, next: "yukino_mid_2" },
    ],
  },
  yukino_mid_2: {
    bg: "library_night", who: "yukino", exp: "sad", text: [
      "だが数日後。怜の様子が、目に見えておかしくなった。",
      "父から、最後通牒が届いたのだという。「文学の道を選ぶなら、一切の援助はしない」と。",
      "「……僕の我儘で、家を捨てるのか。それとも、夢を殺すのか。」",
      "完璧だったはずの彼が、初めて、途方に暮れた子どものような顔をしていた。",
    ],
    choices: [
      { label: "「夢も家族も、諦めなくていい。一緒に道を探そう」", eff: { yukino: 3 }, flag: { yukino_support: true }, next: "yukino_mid_3" },
      { label: "「どっちを選んでも、わたしは怜の味方だよ」", eff: { yukino: 3 }, next: "yukino_mid_3" },
    ],
  },
  yukino_mid_3: {
    bg: "library_sunset", who: "yukino", exp: "normal", text: [
      "わたしの言葉に、怜はしばらく黙り込み、それから、ふっと肩の力を抜いた。",
      "「……君といると、不思議だ。絶望さえ、次の物語の一行に変えられる気がする。」",
      "「ありがとう。もう少しだけ、足掻いてみる。僕の言葉で、もう一度父を説得するよ。」",
      "夕陽に照らされた横顔は、もう迷っていなかった。",
    ], next: "yukino_6_title",
  },

  yukino_6_title: { startDay: 6, dayTitle: "六日目 ―― 一行目の告白", next: "yukino_6_1" },
  yukino_6_1: {
    bg: "library_sunset", who: "yukino", exp: "shy", text: [
      "文化祭前夜。怜は、一冊のノートをわたしに手渡した。新作の物語。",
      "「文化祭で、文芸部として展示するんだ。……人生で初めての、発表。」",
      "「最後のページだけ、まだ空白なんだ。明日、君に、読んでほしくて。」",
    ], next: "yukino_night",
  },
  yukino_night: {
    bg: "library_night", who: "player", text: [
      "（文化祭、前夜。怜の物語の、最後のページ。明日、わたしはそれを受け取る。）",
      "（どんな気持ちで、その言葉を聞きに行こう。）",
    ],
    choices: [
      { label: "期待を胸に、明日を待つ", flag: { yukino_b4: 0 }, next: "yukino_climax" },
      { label: "少し緊張しながら、心を決める", flag: { yukino_b4: 1 }, next: "yukino_climax" },
      { label: "覚悟を決めて、まっすぐ向き合う", flag: { yukino_b4: 2 }, next: "yukino_climax" },
    ],
  },
  yukino_climax: {
    bg: "festival_night", who: "yukino", exp: "blush", text: [
      "――文化祭、最終日の夜。展示を終えた怜が、わたしを屋上へと呼び出した。",
      "夜風の中、彼はあのノートの、最後のページを開いた。そこには――",
      "「『そうして彼は、生まれて初めて、誰かにこの言葉を捧げた』」",
      "「……ここから先は、口で言わせて。」",
      "「{name}。君を、愛してる。僕の物語の、主人公は君だけだ。」",
    ],
    choices: [
      { label: "「わたしも愛してる。君の物語、隣で読ませて」", eff: { yukino: 3 }, next: "yukino_end_branch" },
      { label: "「うれしい。でも、その気持ちには応えられない」", eff: { yukino: -2 }, flag: { yukino_reject: true }, next: "yukino_end_branch" },
    ],
  },
  yukino_end_branch: { branch: "ending:yukino" },

  yukino_true: {
    bg: "library_day", ending: true, who: "yukino", exp: "happy",
    endTitle: "トゥルーエンド ―― 「僕たちの、続きの物語」",
    text: [
      "わたしの答えに、氷の会長と呼ばれた彼が、花のようにほどけて笑った。",
      "「ふっ。……これは、僕の物語史上、最高のハッピーエンドだ。」",
      "――数年後。書店の棚に、一冊の本が並んだ。新人賞を獲った、彼のデビュー作。",
      "献辞のページには、こう書かれている。『僕に“本当の願い”を教えてくれた、あなたへ』。",
      "「次回作の主人公も、君だ。……一生、僕の隣で、取材させてもらうからな。」",
      "凛と微笑む彼の左手で、小さな指輪が光っていた。",
    ],
  },
  yukino_good: {
    bg: "library_sunset", ending: true, who: "yukino", exp: "shy",
    endTitle: "グッドエンド ―― 「最初のページ」",
    text: [
      "わたしが頷くと、怜は照れたように、けれど嬉しそうに目を細めた。",
      "「不器用なんだ、知ってるだろう。だから……ゆっくり、進ませてくれ。」",
      "「僕と君の物語は、まだ一行目。これから、二人で書いていこう。」",
      "夢へ踏み出した彼の隣に、わたしはいる。それだけで、明日が待ち遠しかった。",
    ],
  },
  yukino_bad: {
    bg: "library_night", ending: true, who: "yukino", exp: "sad",
    endTitle: "ノーマルエンド ―― 「物語は、続く」",
    text: [
      "わたしの答えを聞いた怜は、静かに、ノートを閉じた。",
      "「……そう。これも、ひとつの結末だな。」",
      "「でも、覚えておいて。物語の結末は、書き直せるものなんだ。」",
      "「僕は僕の道を行く。いつか、もっといい言葉で書けたら……また、読ませて。」",
      "凛とした背中が、夜の中へ消えていく。わたしは、その意味を、長く考えることになる。",
    ],
  },

  /* ===================== ひなたルート ===================== */
  hinata_4_title: { startDay: 4, dayTitle: "四日目 ―― 七瀬 ひなた", next: "hinata_4_1" },
  hinata_4_1: {
    bg: "artroom", who: "hinata", exp: "smile", text: [
      "「{name}さん。今日はね、僕の“ひみつ”を見せてあげる。」",
      "美術室で、彼はあの描きかけの絵を、そっとイーゼルに戻した。",
    ], next: "hinata_4_2",
  },
  hinata_4_2: {
    bg: "artroom_sunset", who: "hinata", exp: "normal", text: [
      "「この絵ね、三年前から、ずっと描いてるの。」",
      "「中央が、白いままでしょう? ……ここに描くものが、決められないんだ。」",
      "「僕、体が弱くてね。入院ばっかりの子どもだったんだ。」",
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
      "（彼はずっと、“消えてしまうもの”の影に、おびえていたんだ。）",
    ],
    choices: [
      { label: "「完成は終わりじゃない。新しい始まりだよ」", eff: { hinata: 4 }, flag: { hinata_b1: true }, next: "hinata_4_5a" },
      { label: "「その空白、わたしと一緒に埋めよう」", eff: { hinata: 4 }, next: "hinata_4_5b" },
    ],
  },
  hinata_4_5a: {
    bg: "artroom_sunset", who: "hinata", exp: "surprise", text: [
      "「新しい、始まり……。」",
      "彼は、ずっと閉じていた何かが、ほどけたような顔をした。",
      "「{name}さんは、こわくないの? ……大切なものが、変わっていくの。」",
    ], next: "hinata_4_6",
  },
  hinata_4_5b: {
    bg: "artroom_sunset", who: "hinata", exp: "blush", text: [
      "「いっしょに……?」",
      "彼は筆を握る手を、そっとわたしの手に重ねた。あたたかかった。",
      "「{name}さんと一緒なら……描けるかも、しれない。」",
    ], next: "hinata_4_6",
  },
  hinata_4_6: {
    bg: "riverside_sunset", who: "hinata", exp: "smile", text: [
      "その日、二人で川沿いの桜を見に行った。彼は、たくさんスケッチをした。",
      "「ねえ、{name}さん。僕、決めた。あの絵、文化祭までに完成させる。」",
      "「ちゃんと、“今”を描く。逃げないで、ぜんぶ。」",
    ], next: "hinata_5_title",
  },

  hinata_5_title: { startDay: 5, dayTitle: "五日目 ―― 白を、塗る", next: "hinata_5_1" },
  hinata_5_1: {
    bg: "artroom", who: "hinata", exp: "normal", text: [
      "翌日から、ひなたは取り憑かれたように筆を進めた。",
      "白かった中央に、少しずつ、色が宿っていく。それは――人の輪郭だった。",
      "「もう少しで、わかると思う。僕が、本当に描きたかったもの。」",
    ],
    choices: [
      { label: "「そばで、見ててもいい?」", eff: { hinata: 3 }, next: "hinata_5_2" },
      { label: "「君が描く姿、すごくきれい」", eff: { hinata: 3 }, flag: { hinata_care: true }, next: "hinata_5_2" },
    ],
  },
  hinata_5_2: {
    bg: "artroom_sunset", who: "hinata", exp: "happy", text: [
      "「……えへへ。{name}さんが見ててくれると、筆が、軽いの。」",
      "夕陽が、彼と、生まれかけの絵を、やさしく照らしていた。",
    ], next: "hinata_mid_1",
  },

  /* --- 五日目 追加イベント：わたしの絵と、倒れた君 --- */
  hinata_mid_1: {
    bg: "riverside_sunset", who: "hinata", exp: "smile", text: [
      "放課後、ひなたと川沿いを歩いた。彼は今日も、小さなスケッチブックを抱えている。",
      "「ね、{name}さん。少しだけ、動かないで。」",
      "さらさらと鉛筆が走る。やがて見せてくれたのは――やわらかく笑う、わたしの絵だった。",
      "「世界で一番、描きたかった顔。……やっと、描けた。」",
    ],
    choices: [
      { label: "「わたしも、ひなたを描いてほしいな。ずっと」", eff: { hinata: 3 }, flag: { hinata_date: true }, next: "hinata_mid_2" },
      { label: "照れて「上手すぎるよ」と笑う", eff: { hinata: 2 }, next: "hinata_mid_2" },
    ],
  },
  hinata_mid_2: {
    bg: "infirmary", who: "", text: [
      "その翌日だった。美術室で、ひなたが筆を取り落とし、ふらりと床に崩れ落ちた。",
      "「ひなた!? ひなた、しっかり……!」 血の気の引いた顔。氷みたいに冷たい指先。",
      "運ばれた保健室で、彼は薄く目を開けて、申し訳なさそうに笑った。",
      "「ごめんね。……昔の病気が、たまに、いたずらするんだ。」",
    ], next: "hinata_mid_3",
  },
  hinata_mid_3: {
    bg: "infirmary", who: "hinata", exp: "sad", text: [
      "「こういう体だからさ……ずっと、完成の“その先”を見るのが、こわかった。」",
      "「でも今は、ちがう。{name}さんと見たい“その先”が、たくさん、あるんだ。」",
      "震える手を、わたしはそっと両手で包んだ。彼の手に、少しずつ熱が戻っていく。",
    ],
    choices: [
      { label: "「一緒に見よう。何枚でも、何年でも」", eff: { hinata: 3 }, flag: { hinata_support: true }, next: "hinata_mid_4" },
      { label: "「無理しないで。わたしがずっとそばにいるから」", eff: { hinata: 3 }, next: "hinata_mid_4" },
    ],
  },
  hinata_mid_4: {
    bg: "artroom_sunset", who: "hinata", exp: "happy", text: [
      "数日後、すっかり元気になったひなたは、また絵筆を握っていた。",
      "「決めた。あの絵、絶対に完成させる。逃げないで、“今”を、全部。」",
      "その瞳には、もう、怯えの色はなかった。",
    ], next: "hinata_6_title",
  },

  hinata_6_title: { startDay: 6, dayTitle: "六日目 ―― 完成の、前に", next: "hinata_6_1" },
  hinata_6_1: {
    bg: "rooftop_sunset", who: "hinata", exp: "shy", text: [
      "文化祭前夜。屋上で、ひなたはぽつりと言った。",
      "「絵ね、明日の朝には完成するの。文化祭で、初めて、みんなに見せる。」",
      "「完成したら……{name}さんに、いちばん最初に、伝えたいことがあるんだ。」",
    ], next: "hinata_night",
  },
  hinata_night: {
    bg: "home_evening", who: "player", text: [
      "（文化祭、前夜。ひなたの絵が、明日みんなの前に飾られる。）",
      "（“いちばん最初に伝えたいこと”って、なんだろう。どんな自分で、聞きに行こう。）",
    ],
    choices: [
      { label: "わくわくしながら、明日を待つ", flag: { hinata_b4: 0 }, next: "hinata_climax" },
      { label: "少し不安。でも、ちゃんと隣にいる", flag: { hinata_b4: 1 }, next: "hinata_climax" },
      { label: "覚悟を決めて、受け止める", flag: { hinata_b4: 2 }, next: "hinata_climax" },
    ],
  },
  hinata_climax: {
    bg: "festival_night", who: "hinata", exp: "blush", text: [
      "――文化祭、最終日の夜。展示室の真ん中に、完成したその絵が飾られていた。",
      "桜の木の下。白かった中央に描かれていたのは――手を繋ぐ、二人の姿。",
      "一人は、ひなた。そしてもう一人は、紛れもなく、わたしだった。",
      "「これが、僕の“今、いちばん描きたかったもの”。」",
      "「{name}さん。僕ね、きみといる“今”が、大好き。……きみが、好き。」",
    ],
    choices: [
      { label: "「わたしも好き。これからの“今”を、全部一緒に」", eff: { hinata: 3 }, next: "hinata_end_branch" },
      { label: "「ありがとう。でも、応えることはできない」", eff: { hinata: -2 }, flag: { hinata_reject: true }, next: "hinata_end_branch" },
    ],
  },
  hinata_end_branch: { branch: "ending:hinata" },

  hinata_true: {
    bg: "artroom_day", ending: true, who: "hinata", exp: "happy",
    endTitle: "トゥルーエンド ―― 「未完成の、その先へ」",
    text: [
      "わたしの答えに、ひなたは、はじけるように笑って、ぽろぽろ泣いた。",
      "「やった……。僕、“この先”が、見たくなっちゃった。{name}さんと。」",
      "――それから、彼の絵は、街のコンクールで大きな賞をとった。",
      "タイトルは『はじまりの桜』。あの、二人で繋いだ手の絵。",
      "「ねえ。次はね、結婚式の絵を描くんだ。……ずっと先の、僕たちの“今”を。」",
      "もう、彼は終わりにおびえていない。今日も、明日も、その手を握って描いていく。",
    ],
  },
  hinata_good: {
    bg: "riverside_sunset", ending: true, who: "hinata", exp: "shy",
    endTitle: "グッドエンド ―― 「色づく毎日」",
    text: [
      "わたしが頷くと、ひなたは照れたように、わたしの手をきゅっと握った。",
      "「これからね、毎日を、一枚ずつ描いていきたいな。{name}さんと。」",
      "「完成しても、こわくないよ。だって、次の絵が、待ってるんだから。」",
      "白かったキャンバスに色が宿るように、二人の毎日も、少しずつ色づいていく。",
    ],
  },
  hinata_bad: {
    bg: "artroom_night", ending: true, who: "hinata", exp: "sad",
    endTitle: "ノーマルエンド ―― 「絵の中の、約束」",
    text: [
      "わたしの答えに、ひなたは、少しだけ寂しそうに、でも穏やかに微笑んだ。",
      "「ふふ。……そっか。うん、いいんだ。絵は、完成したから。」",
      "「僕、もう、こわくないよ。“今”を生きるって、決めたから。」",
      "「この絵は、ずっと残るよ。僕が、{name}さんを好きだった“今”も、ずっと。」",
      "彼は前を向いて歩き出した。その背中は、出会った頃より、ずっと強く見えた。",
    ],
  },

  /* ===================== シオンルート ===================== */
  shion_4_title: { startDay: 4, dayTitle: "四日目 ―― 月城 シオン", next: "shion_4_1" },
  shion_4_1: {
    bg: "musicroom", who: "shion", exp: "normal", text: [
      "放課後、シオンに呼び出された。彼は音楽室の鍵を、わたしの手のひらにのせた。",
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
      { label: "「君のせいじゃない。お姉さんは、君の音を信じてた」", eff: { shion: 4 }, flag: { shion_b1: true }, next: "shion_4_5a" },
      { label: "「その約束、今からでも果たせる。わたしが聴くから」", eff: { shion: 4 }, next: "shion_4_5b" },
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
      { label: "「無理はしないで。でも、君なら弾けるよ」", eff: { shion: 2 }, flag: { shion_care: true }, next: "shion_5_2" },
    ],
  },
  shion_5_2: {
    bg: "musicroom_sunset", who: "shion", exp: "smile", text: [
      "「……ふっ。お前は、いつもまっすぐだな。」",
      "鍵盤を撫でる彼の指は、もう、震えていなかった。",
    ], next: "shion_mid_1",
  },

  /* --- 五日目 追加イベント：重ねた指と、震える手 --- */
  shion_mid_1: {
    bg: "musicroom_sunset", who: "shion", exp: "normal", text: [
      "放課後の音楽室。シオンが、ピアノの椅子を半分空けて、わたしを手招きした。",
      "「隣に座れ。……一音だけ、教えてやる。」",
      "重ねた手の上から、彼の長い指がそっと導く。鳴ったのは、たった一つの、澄んだ音。",
      "耳元で聞こえる低い声に、心臓が痛いくらい高鳴った。",
    ],
    choices: [
      { label: "「先輩の隣……すごく、落ち着きます」", eff: { shion: 3 }, flag: { shion_date: true }, next: "shion_mid_2" },
      { label: "ドキドキを隠して、もう一音ねだる", eff: { shion: 3 }, next: "shion_mid_2" },
    ],
  },
  shion_mid_2: {
    bg: "auditorium_night", who: "shion", exp: "sad", text: [
      "けれど、後夜祭のステージが近づくほど、シオンの指は強張っていった。",
      "誰もいないホールで、彼は鍵盤の前に座ったまま、動けずにいた。",
      "「……だめだ。大舞台に立つと、姉さんの最後の顔が、また浮かぶ。」",
      "「俺はやっぱり、あの日から、一歩も進めていないのかもしれない。」",
    ],
    choices: [
      { label: "「一人で背負わないで。わたしが客席にいるから」", eff: { shion: 3 }, flag: { shion_support: true }, next: "shion_mid_3" },
      { label: "そっと隣に座り、彼の手に手を重ねる", eff: { shion: 3 }, next: "shion_mid_3" },
    ],
  },
  shion_mid_3: {
    bg: "musicroom_sunset", who: "shion", exp: "shy", text: [
      "わたしの体温が移るまで、シオンは黙って、手を預けていた。",
      "「……不思議だな。お前がいると、こわさより、聴かせたい気持ちが勝つ。」",
      "やがて、彼の指がひとりでに動き出す。途切れない旋律が、夕暮れのホールに満ちた。",
      "「決めた。本番、姉さんと――お前に、最高の演奏を捧げる。」",
    ], next: "shion_6_title",
  },

  shion_6_title: { startDay: 6, dayTitle: "六日目 ―― 言葉にならない音", next: "shion_6_1" },
  shion_6_1: {
    bg: "rooftop_sunset", who: "shion", exp: "shy", text: [
      "文化祭前夜。屋上で、シオンは夜風に髪をなびかせていた。初めて出会った、あの場所。",
      "「明日、弾く曲な。……まだ、誰にも言ってないタイトルがある。」",
      "「聴けば、わかる。俺の、今の気持ちが全部。……ちゃんと、受け取ってくれ。」",
    ], next: "shion_night",
  },
  shion_night: {
    bg: "rooftop_sunset", who: "player", text: [
      "（文化祭、前夜。明日、シオン先輩は三年ぶりに、人前で弾く。）",
      "（あの曲のタイトルの意味を、わたしは明日、知ることになる。）",
    ],
    choices: [
      { label: "楽しみに、その瞬間を待つ", flag: { shion_b4: 0 }, next: "shion_climax" },
      { label: "少し不安。でも、客席で見守る", flag: { shion_b4: 1 }, next: "shion_climax" },
      { label: "覚悟を決めて、受け止める", flag: { shion_b4: 2 }, next: "shion_climax" },
    ],
  },
  shion_climax: {
    bg: "auditorium_night", who: "shion", exp: "blush", text: [
      "――文化祭、最終日の夜。後夜祭のステージに、スポットライトが灯る。",
      "グランドピアノの前に座ったシオンが、客席のわたしを、まっすぐに見つめた。",
      "流れ出したのは、優しく、切なく、そして温かい旋律。三年間、閉じ込められていた音。",
      "弾き終えた彼はマイクを取り、静かに、はっきりと言った。",
      "「今の曲のタイトルは――『君に出会えた』。」",
      "「{name}。お前が、俺の凍った指を、心を、溶かした。……好きだ。俺の隣で、この音を聴き続けてくれ。」",
    ],
    choices: [
      { label: "「わたしも好き。君の音を、ずっと隣で聴かせて」", eff: { shion: 3 }, next: "shion_end_branch" },
      { label: "「うれしい。でも、その気持ちには応えられない」", eff: { shion: -2 }, flag: { shion_reject: true }, next: "shion_end_branch" },
    ],
  },
  shion_end_branch: { branch: "ending:shion" },

  shion_true: {
    bg: "auditorium_day", ending: true, who: "shion", exp: "happy",
    endTitle: "トゥルーエンド ―― 「ふたりのための、旋律」",
    text: [
      "満員の客席が、割れんばかりの拍手に包まれた。その中で、シオンはわたしだけを見て微笑んだ。",
      "ステージを降りた彼は、人目もはばからず、わたしを強く抱きしめた。",
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
      "わたしが頷くと、シオンは照れたように目をそらし、それから、そっと手を握ってきた。",
      "「不器用なんだ、俺は。……だから、ゆっくりでいいか。」",
      "「お前と過ごす毎日を、一音ずつ、曲にしていく。……悪くない、だろう?」",
      "凍えていた指は、もう自由だ。彼の奏でる音は、これからきっと、もっと優しくなる。",
    ],
  },
  shion_bad: {
    bg: "auditorium_night", ending: true, who: "shion", exp: "sad",
    endTitle: "ノーマルエンド ―― 「残響」",
    text: [
      "わたしの答えに、シオンは、しばらく目を閉じてから、静かに微笑んだ。",
      "「……そうか。ふられちまったな。」",
      "「でも、後悔はしてない。お前のおかげで、俺はまた弾けるようになったんだから。」",
      "「この曲は、お前に出会えた証だ。……それだけで、十分だよ。」",
      "彼は再び鍵盤に向かう。その音は、少しだけ寂しくて、でも、もう凍ってはいなかった。",
    ],
  },
};

window.STORY = STORY;
window.STORY_START = "start";
