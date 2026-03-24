import type { CelebrityPersona, InterviewPhase, AvatarEmotion } from "./types";

/** ユーザー入力を分析して文脈に合ったレスポンスを生成 */
export function generateSmartResponse(
  persona: CelebrityPersona,
  phase: InterviewPhase,
  userMessage: string,
  turnInPhase: number
): { text: string; emotion: AvatarEmotion } {
  const { values, name } = persona;
  const ending = pick(values.speechRhythm.sentenceEnding);
  const filler = pick(values.speechRhythm.fillerWords);
  const catchphrase = pick(values.catchphrases);

  const len = userMessage.length;
  const isShort = len < 50;
  const isLong = len > 300;
  const hasNumbers = /\d+/.test(userMessage);
  const hasConcreteExample = /例えば|具体的|実際に|\d+人|\d+%|\d+万|\d+年/.test(userMessage);

  // Phase + turn specific responses with input awareness
  const responses = getPhaseResponses(
    persona, phase, turnInPhase,
    { isShort, isLong, hasNumbers, hasConcreteExample, filler, ending, catchphrase }
  );

  return responses;
}

interface InputContext {
  isShort: boolean;
  isLong: boolean;
  hasNumbers: boolean;
  hasConcreteExample: boolean;
  filler: string;
  ending: string;
  catchphrase: string;
}

function getPhaseResponses(
  persona: CelebrityPersona,
  phase: InterviewPhase,
  turn: number,
  ctx: InputContext
): { text: string; emotion: AvatarEmotion } {
  const { filler, ending, catchphrase, isShort, isLong, hasNumbers, hasConcreteExample } = ctx;
  const style = persona.interviewStyle;

  // Short answer feedback
  if (isShort) {
    const shortFeedbacks: { text: string; emotion: AvatarEmotion }[] = [
      { text: `${filler}、ちょっと短いかな。もう少し具体的に聞かせて${ending}。面接官はもっと深い話を聞きたいんだよ。`, emotion: "confused" },
      { text: `うーん、もう少し肉付けが欲しいな${ending}。エピソードを一つ添えるだけで印象がガラッと変わるよ。`, emotion: "serious" },
      { text: `${catchphrase} 簡潔なのはいいけど、面接ではもう2〜3文プラスして${ending}。`, emotion: "thinking" },
    ];
    return pick(shortFeedbacks);
  }

  // Long answer feedback
  if (isLong) {
    const longFeedbacks: { text: string; emotion: AvatarEmotion }[] = [
      { text: `熱意は伝わるけど、ちょっと長いかな${ending}。結論→理由→具体例の順で、もっとコンパクトにまとめてみて。`, emotion: "thinking" },
      { text: `${filler}、情報量は十分。でも面接官は1分以内で聞きたい${ending}。ポイントを3つに絞ろう。`, emotion: "serious" },
    ];
    return pick(longFeedbacks);
  }

  // Phase-specific responses
  switch (phase) {
    case "intro":
      return getIntroResponse(persona, turn, ctx);
    case "gakuchika":
      return getGakuchikaResponse(persona, turn, ctx);
    case "motivation":
      return getMotivationResponse(persona, turn, ctx);
    case "strength":
      return getStrengthResponse(persona, turn, ctx);
    case "future":
      return getFutureResponse(persona, turn, ctx);
    case "reverse":
      return getReverseResponse(persona, turn, ctx);
    default:
      return { text: `${filler}、なるほどね${ending}。`, emotion: "smile" };
  }
}

function getIntroResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, filler, hasConcreteExample } = ctx;
  if (turn === 0) {
    if (hasConcreteExample) {
      return { text: `おっ、具体的でいいね${ending}。じゃあもう一つ聞くけど、何が一番の強み？一言で。`, emotion: "impressed" as AvatarEmotion };
    }
    return { text: `${filler}、ありがとう。もうちょっと「あなたらしさ」が見えると良いかな${ending}。何が一番のウリ？`, emotion: "thinking" as AvatarEmotion };
  }
  return { text: `OK、つかみはOK${ending}。じゃあ次いこう。`, emotion: "smile" as AvatarEmotion };
}

function getGakuchikaResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, filler, catchphrase, hasNumbers, hasConcreteExample } = ctx;
  const responses: { text: string; emotion: AvatarEmotion }[][] = [
    // turn 0
    [
      hasConcreteExample
        ? { text: `お、数字や具体例が入ってていい${ending}。で、一番の壁は何だった？`, emotion: "impressed" }
        : { text: `${filler}、面白そうだね。でも数字が欲しい${ending}。「何人」「何%」とか、具体的に。で、壁にぶつかった場面は？`, emotion: "thinking" },
    ],
    // turn 1
    [
      { text: `${catchphrase} その困難をどう乗り越えた${ending}？プロセスが一番大事だよ。`, emotion: "serious" },
    ],
    // turn 2
    [
      { text: `なるほど、いい経験してるね。次のテーマに進もう${ending}。`, emotion: "smile" },
    ],
  ];
  const pool = responses[Math.min(turn, responses.length - 1)];
  return pick(pool);
}

function getMotivationResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, filler, catchphrase } = ctx;
  if (turn === 0) {
    return pick([
      { text: `${filler}、それは他の会社にも言えない？もっとユニークな理由が欲しい${ending}。`, emotion: "confused" as AvatarEmotion },
      { text: `なるほどね。でもそれ、本当に「この会社じゃなきゃダメ」な理由？${ending}`, emotion: "serious" as AvatarEmotion },
    ]);
  }
  if (turn === 1) {
    return { text: `${catchphrase} そうきたか。その想い、面接官に届くと思うよ${ending}。`, emotion: "impressed" as AvatarEmotion };
  }
  return { text: `志望動機OK。次いくよ${ending}。`, emotion: "smile" as AvatarEmotion };
}

function getStrengthResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, filler } = ctx;
  if (turn === 0) {
    return pick([
      { text: `弱みを正直に言えるのは好印象${ending}。で、その弱みどう克服してる？`, emotion: "thinking" as AvatarEmotion },
      { text: `${filler}、強みはわかった。でも根拠となるエピソードは？${ending}`, emotion: "serious" as AvatarEmotion },
    ]);
  }
  return { text: `いいね、自己分析できてる${ending}。次のテーマに行こう。`, emotion: "smile" as AvatarEmotion };
}

function getFutureResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, catchphrase, hasConcreteExample } = ctx;
  if (turn === 0) {
    if (hasConcreteExample) {
      return { text: `おっ、具体的なビジョンがあるね${ending}。そのために今何してるの？`, emotion: "impressed" as AvatarEmotion };
    }
    return { text: `ビジョンは大事${ending}。でも「具体的に何をする」のか、もう一歩踏み込んで。`, emotion: "thinking" as AvatarEmotion };
  }
  return { text: `${catchphrase} 将来が楽しみだ${ending}。最後のパートに行こう。`, emotion: "encouraging" as AvatarEmotion };
}

function getReverseResponse(p: CelebrityPersona, turn: number, ctx: InputContext) {
  const { ending, filler } = ctx;
  if (turn === 0) {
    return { text: `いい質問だね${ending}。${filler}、そうだな…自分を信じて突き進む力が一番大事だと思うよ。他にある？`, emotion: "smile" as AvatarEmotion };
  }
  return { text: `ありがとう${ending}。じゃあ、面接はこれで終了！お疲れさまでした。`, emotion: "encouraging" as AvatarEmotion };
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
