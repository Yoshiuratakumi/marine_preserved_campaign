const initialStats = {
  budget: 12,
  manpower: 10,
  fishery: 0,
  tourism: 0,
  biology: 8,
  sea: 8,
  resource: 8
};

const defaultPolicyCards = [
  {
    id: "p1",
    title: "藻場保全",
    illustration: "🌿🐟",
    cost: { budget: -2, manpower: -2 },
    sales: { fishery: 4, tourism: 0 },
    environment: { biology: 1, sea: 1, resource: 0 },
    tags: ["fishery"]
  },
  {
    id: "p2",
    title: "海辺マルシェ",
    illustration: "🧺🏖️",
    cost: { budget: -2, manpower: -1 },
    sales: { fishery: 1, tourism: 4 },
    environment: { biology: 0, sea: -1, resource: -1 },
    tags: ["tourism"]
  },
  {
    id: "p3",
    title: "エコツアー",
    illustration: "🚶‍♀️🌊",
    cost: { budget: -1, manpower: -1 },
    sales: { fishery: 0, tourism: 3 },
    environment: { biology: 1, sea: 0, resource: 1 },
    tags: ["tourism"]
  },
  {
    id: "p4",
    title: "漁港リブランディング",
    illustration: "⚓✨",
    cost: { budget: -3, manpower: -2 },
    sales: { fishery: 2, tourism: 3 },
    environment: { biology: 0, sea: 0, resource: 0 },
    tags: ["fishery", "tourism"]
  },
  {
    id: "p5",
    title: "海洋ごみ回収",
    illustration: "🧹🫧",
    cost: { budget: -1, manpower: -2 },
    sales: { fishery: 1, tourism: 1 },
    environment: { biology: 1, sea: 2, resource: 1 },
    tags: ["fishery", "tourism"]
  },
  {
    id: "p6",
    title: "親子体験漁業",
    illustration: "👨‍👩‍👧‍👦🎣",
    cost: { budget: -2, manpower: -2 },
    sales: { fishery: 2, tourism: 2 },
    environment: { biology: 0, sea: -1, resource: 0 },
    tags: ["fishery", "tourism"]
  },
  {
    id: "p7",
    title: "サンゴ育成研究",
    illustration: "🪸🔬",
    cost: { budget: -3, manpower: -1 },
    sales: { fishery: 0, tourism: 1 },
    environment: { biology: 2, sea: 1, resource: 0 },
    tags: ["tourism"]
  },
  {
    id: "p8",
    title: "特産品開発",
    illustration: "🍔🐠",
    cost: { budget: -2, manpower: -1 },
    sales: { fishery: 3, tourism: 2 },
    environment: { biology: 0, sea: 0, resource: -1 },
    tags: ["fishery", "tourism"]
  },
  {
    id: "p9",
    title: "海の学習教室",
    illustration: "📘🐚",
    cost: { budget: -1, manpower: -1 },
    sales: { fishery: 0, tourism: 2 },
    environment: { biology: 1, sea: 1, resource: 1 },
    tags: ["tourism"]
  },
  {
    id: "p10",
    title: "養殖技術導入",
    illustration: "🧪🐟",
    cost: { budget: -2, manpower: -2 },
    sales: { fishery: 4, tourism: 0 },
    environment: { biology: 0, sea: 0, resource: 1 },
    tags: ["fishery"]
  },
  {
    id: "p11",
    title: "海カフェ開業",
    illustration: "☕🌴",
    cost: { budget: -3, manpower: -1 },
    sales: { fishery: 0, tourism: 4 },
    environment: { biology: 0, sea: -1, resource: -1 },
    tags: ["tourism"]
  },
  {
    id: "p12",
    title: "漁師コラボイベント",
    illustration: "🦐🎉",
    cost: { budget: -2, manpower: -2 },
    sales: { fishery: 3, tourism: 3 },
    environment: { biology: 0, sea: 0, resource: 0 },
    tags: ["fishery", "tourism"]
  }
];

const defaultHappeningCards = [
  {
    id: "h1",
    title: "赤潮発生",
    illustration: "⚡🌊",
    condition: "海が5以下",
    counter: "海洋ごみ回収",
    effect: { biology: -2, sea: -2, resource: -1, fishery: -2 }
  },
  {
    id: "h2",
    title: "観光バズ",
    illustration: "⚡📸",
    condition: "観光が5以上",
    counter: "エコツアー",
    effect: { tourism: 2, resource: -1, sea: -1 }
  },
  {
    id: "h3",
    title: "台風接近",
    illustration: "⚡🌀",
    condition: "無条件",
    counter: "漁港リブランディング",
    effect: { sea: -2, tourism: -1, fishery: -1 }
  },
  {
    id: "h4",
    title: "希少生物発見",
    illustration: "⚡🐢",
    condition: "生物が8以上",
    counter: "無条件",
    effect: { tourism: 2, biology: 1 }
  },
  {
    id: "h5",
    title: "人手不足",
    illustration: "⚡🧍",
    condition: "人手が4以下",
    counter: "親子体験漁業",
    effect: { manpower: -2, tourism: -1, fishery: -1 }
  },
  {
    id: "h6",
    title: "資源枯渇の兆し",
    illustration: "⚡🪵",
    condition: "資源が4以下",
    counter: "海の学習教室",
    effect: { resource: -2, fishery: -1 }
  }
];

const state = {
  page: "title",
  phase: "select",
  playerName: "Player",
  stats: { ...initialStats },
  turn: 1,
  policyPool: loadPolicyCards(),
  happeningPool: loadHappeningCards(),
  policyDeck: [],
  happeningDeck: [],
  hand: [],
  selectedCards: [],
  usedCards: [],
  currentHappening: null,
  log: [],
  ranking: loadRanking(),
  discardMode: false,
  editingPolicyId: null,
  editingHappeningId: null
};

const labels = {
  budget: "予算",
  manpower: "人手",
  fishery: "漁業",
  tourism: "観光",
  biology: "生物",
  sea: "海",
  resource: "資源"
};

function loadPolicyCards() {
  const saved = localStorage.getItem("umimamori-policy-cards");
  return saved ? JSON.parse(saved) : structuredClone(defaultPolicyCards);
}

function loadHappeningCards() {
  const saved = localStorage.getItem("umimamori-happening-cards");
  return saved ? JSON.parse(saved) : structuredClone(defaultHappeningCards);
}

function savePolicyCards() {
  localStorage.setItem("umimamori-policy-cards", JSON.stringify(state.policyPool));
}

function saveHappeningCards() {
  localStorage.setItem("umimamori-happening-cards", JSON.stringify(state.happeningPool));
}

function loadRanking() {
  const saved = localStorage.getItem("umimamori-ranking");
  return saved ? JSON.parse(saved) : [];
}

function saveRanking() {
  localStorage.setItem("umimamori-ranking", JSON.stringify(state.ranking));
}

function structuredClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function prettyEffect(obj, keys) {
  return keys
    .map((key) => {
      const value = obj && typeof obj[key] === "number" ? obj[key] : 0;
      return `${labels[key]}${value >= 0 ? "+" : ""}${value}`;
    })
    .join(" / ");
}

function applyEffects(stats, effect) {
  const next = { ...stats };
  if (!effect) return next;

  for (const [key, value] of Object.entries(effect)) {
    const current = next[key] || 0;
    const max = ["biology", "sea", "resource"].includes(key) ? 10 : 99;
    next[key] = clamp(current + value, 0, max);
  }
  return next;
}

function evaluateCondition(card, stats) {
  if (!card) return false;
  switch (card.condition) {
    case "無条件":
      return true;
    case "海が5以下":
      return stats.sea <= 5;
    case "観光が5以上":
      return stats.tourism >= 5;
    case "生物が8以上":
      return stats.biology >= 8;
    case "人手が4以下":
      return stats.manpower <= 4;
    case "資源が4以下":
      return stats.resource <= 4;
    default:
      return false;
  }
}

function getPolicyCardClass(tags) {
  const hasFishery = tags.includes("fishery");
  const hasTourism = tags.includes("tourism");
  if (hasFishery && hasTourism) return "card-policy-both";
  if (hasFishery) return "card-policy-fishery";
  return "card-policy-tourism";
}

function getHappeningCardBackground(effect) {
  const colors = [];
  if ((effect.biology || 0) !== 0) colors.push("rgba(251, 207, 232, 0.88)");
  if ((effect.sea || 0) !== 0) colors.push("rgba(56, 189, 248, 0.88)");
  if ((effect.resource || 0) !== 0) colors.push("rgba(253, 230, 138, 0.88)");
  if (!colors.length) colors.push("rgba(191, 219, 254, 0.88)");
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}

function parseEffectString(text, allowedKeys) {
  const map = {
    予算: "budget",
    人手: "manpower",
    漁業: "fishery",
    観光: "tourism",
    生物: "biology",
    海: "sea",
    資源: "resource"
  };

  const result = {};
  const chunks = text.split("/").map((item) => item.trim());

  chunks.forEach((chunk) => {
    const match = chunk.match(/(予算|人手|漁業|観光|生物|海|資源)\s*([+-]\d+)/);
    if (match) {
      const key = map[match[1]];
      if (!allowedKeys || allowedKeys.includes(key)) {
        result[key] = Number(match[2]);
      }
    }
  });

  return result;
}

function startGame() {
  state.stats = { ...initialStats };
  state.turn = 1;
  state.phase = "select";
  state.selectedCards = [];
  state.usedCards = [];
  state.currentHappening = null;
  state.discardMode = false;
  state.log = ["ゲーム開始：施策カード5枚を配布"];

  state.policyDeck = shuffle(state.policyPool);
  state.happeningDeck = shuffle(state.happeningPool);
  state.hand = state.policyDeck.splice(0, 5);
  state.page = "game";

  render();
}

function setPage(page) {
  state.page = page;
  render();
}

function toggleSelectCard(cardId) {
  if (state.phase === "discard") {
    discardCard(cardId);
    return;
  }

  if (state.phase !== "select") return;

  const selected = state.selectedCards.includes(cardId);
  if (selected) {
    state.selectedCards = state.selectedCards.filter((id) => id !== cardId);
  } else {
    if (state.selectedCards.length >= 2) return;
    state.selectedCards.push(cardId);
  }

  render();
}

function applySelectedPolicies() {
  if (state.selectedCards.length !== 2) return;

  const chosen = state.hand.filter((card) => state.selectedCards.includes(card.id));
  let nextStats = { ...state.stats };

  chosen.forEach((card) => {
    nextStats = applyEffects(nextStats, card.cost);
    nextStats = applyEffects(nextStats, card.sales);
    nextStats = applyEffects(nextStats, card.environment);
  });

  state.stats = nextStats;
  state.usedCards.push(...chosen);
  state.hand = state.hand.filter((card) => !state.selectedCards.includes(card.id));
  state.log.push(`ターン${state.turn}：施策「${chosen.map((c) => c.title).join("」「")}」を実行`);
  state.selectedCards = [];
  state.discardMode = true;
  state.phase = "discard";

  checkGameEnd();
  render();
}

function discardCard(cardId) {
  state.hand = state.hand.filter((card) => card.id !== cardId);

  const draws = state.policyDeck.splice(0, 3);
  state.hand.push(...draws);

  state.log.push(`ターン${state.turn}：カードを1枚捨て、3枚補充`);
  state.discardMode = false;
  state.phase = "happening";

  drawHappening();
  render();
}

function drawHappening() {
  if (state.happeningDeck.length === 0) {
    state.happeningDeck = shuffle(state.happeningPool);
  }
  state.currentHappening = state.happeningDeck.shift();
}

function resolveHappening() {
  const card = state.currentHappening;
  if (!card) return;

  const conditionMet = evaluateCondition(card, state.stats);
  const latestUsed = state.usedCards.slice(-2);
  const countered =
    card.counter === "無条件" ||
    latestUsed.some((usedCard) => usedCard.title === card.counter);

  if (conditionMet && !countered) {
    state.stats = applyEffects(state.stats, card.effect);
    state.log.push(`ハプニング「${card.title}」発動`);
  } else {
    state.log.push(`ハプニング「${card.title}」は回避`);
  }

  state.stats.budget = clamp(state.stats.budget + 2, 0, 99);
  state.stats.manpower = clamp(state.stats.manpower + 2, 0, 99);
  state.phase = "happeningResult";

  checkGameEnd();
  render();
}

function nextTurn() {
  if (state.turn >= 10) {
    finishGame();
    return;
  }

  state.turn += 1;
  state.phase = "select";
  state.selectedCards = [];
  state.currentHappening = null;
  render();
}

function checkGameEnd() {
  const won = state.stats.fishery >= 15 && state.stats.tourism >= 15;
  const lost =
    state.stats.biology <= 0 ||
    state.stats.sea <= 0 ||
    state.stats.resource <= 0 ||
    state.stats.budget <= 0 ||
    state.stats.manpower <= 0;

  if (won || lost) {
    finishGame(won ? "win" : "lose");
  }
}

function finishGame(forcedResult) {
  const result =
    forcedResult ||
    (state.stats.fishery >= 15 && state.stats.tourism >= 15 ? "win" : "lose");

  const today = new Date().toLocaleDateString("ja-JP");
  const score = result === "win" ? state.turn : 99;

  state.ranking.push({
    name: state.playerName || "Player",
    score,
    result,
    date: today
  });

  state.ranking = state.ranking
    .filter((item) => item.date === today)
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  saveRanking();
  state.page = "result";
  render();
}

function addPolicyCard() {
  const title = document.getElementById("policy-title").value.trim();
  const illustration = document.getElementById("policy-illustration").value.trim() || "🌿";
  const cost = document.getElementById("policy-cost").value.trim();
  const sales = document.getElementById("policy-sales").value.trim();
  const environment = document.getElementById("policy-environment").value.trim();
  const tagsRaw = document.getElementById("policy-tags").value.trim();

  const card = {
    id: state.editingPolicyId || `p${Date.now()}`,
    title: title || "新しい施策",
    illustration,
    cost: parseEffectString(cost, ["budget", "manpower"]),
    sales: parseEffectString(sales, ["fishery", "tourism"]),
    environment: parseEffectString(environment, ["biology", "sea", "resource"]),
    tags: tagsRaw ? tagsRaw.split(",").map((s) => s.trim()) : ["tourism"]
  };

  if (state.editingPolicyId) {
    const idx = state.policyPool.findIndex((c) => c.id === state.editingPolicyId);
    state.policyPool[idx] = card;
    state.editingPolicyId = null;
  } else {
    state.policyPool.push(card);
  }

  savePolicyCards();
  clearPolicyForm();
  render();
}

function editPolicyCard(id) {
  const card = state.policyPool.find((c) => c.id === id);
  if (!card) return;

  state.editingPolicyId = id;
  document.getElementById("policy-title").value = card.title;
  document.getElementById("policy-illustration").value = card.illustration;
  document.getElementById("policy-cost").value = prettyEffect(card.cost, ["budget", "manpower"]);
  document.getElementById("policy-sales").value = prettyEffect(card.sales, ["fishery", "tourism"]);
  document.getElementById("policy-environment").value = prettyEffect(card.environment, ["biology", "sea", "resource"]);
  document.getElementById("policy-tags").value = card.tags.join(",");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deletePolicyCard(id) {
  state.policyPool = state.policyPool.filter((card) => card.id !== id);
  savePolicyCards();
  render();
}

function clearPolicyForm() {
  document.getElementById("policy-title").value = "";
  document.getElementById("policy-illustration").value = "🌿";
  document.getElementById("policy-cost").value = "予算-2 / 人手-2";
  document.getElementById("policy-sales").value = "漁業+2 / 観光+1";
  document.getElementById("policy-environment").value = "生物+1 / 海+0 / 資源+0";
  document.getElementById("policy-tags").value = "fishery";
}

function addHappeningCard() {
  const title = document.getElementById("happening-title").value.trim();
  const illustration = document.getElementById("happening-illustration").value.trim() || "⚡🌊";
  const condition = document.getElementById("happening-condition").value.trim() || "無条件";
  const counter = document.getElementById("happening-counter").value.trim() || "無条件";
  const effect = document.getElementById("happening-effect").value.trim();

  const card = {
    id: state.editingHappeningId || `h${Date.now()}`,
    title: title || "新しいハプニング",
    illustration,
    condition,
    counter,
    effect: parseEffectString(effect, [
      "biology",
      "sea",
      "resource",
      "fishery",
      "tourism",
      "manpower",
      "budget"
    ])
  };

  if (state.editingHappeningId) {
    const idx = state.happeningPool.findIndex((c) => c.id === state.editingHappeningId);
    state.happeningPool[idx] = card;
    state.editingHappeningId = null;
  } else {
    state.happeningPool.push(card);
  }

  saveHappeningCards();
  clearHappeningForm();
  render();
}

function editHappeningCard(id) {
  const card = state.happeningPool.find((c) => c.id === id);
  if (!card) return;

  state.editingHappeningId = id;
  document.getElementById("happening-title").value = card.title;
  document.getElementById("happening-illustration").value = card.illustration;
  document.getElementById("happening-condition").value = card.condition;
  document.getElementById("happening-counter").value = card.counter;
  document.getElementById("happening-effect").value = prettyEffect(card.effect, [
    "biology",
    "sea",
    "resource",
    "fishery",
    "tourism",
    "manpower",
    "budget"
  ]);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteHappeningCard(id) {
  state.happeningPool = state.happeningPool.filter((card) => card.id !== id);
  saveHappeningCards();
  render();
}

function clearHappeningForm() {
  document.getElementById("happening-title").value = "";
  document.getElementById("happening-illustration").value = "⚡🌊";
  document.getElementById("happening-condition").value = "無条件";
  document.getElementById("happening-counter").value = "無条件";
  document.getElementById("happening-effect").value = "生物-1 / 海-1 / 資源+0";
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTitleScreen() {
  return `
    <section class="screen title-screen">
      <div class="overlay">
        <div class="title-container">
          <div class="title-center">
            <h1 class="game-title">うみまもり大作戦</h1>
            <div class="subtitle">かわいくポップに、海と観光と漁業の未来を育てよう！</div>
            <div class="player-name-box">
              <input id="player-name-input" type="text" value="${escapeHtml(state.playerName)}" placeholder="プレイヤー名" />
            </div>
            <button class="btn btn-green" onclick="handleStartGame()">ゲームをはじめる</button>
          </div>

          <div class="bottom-right-buttons">
            <button class="btn btn-red" onclick="setPage('howto')">あそびかた</button>
            <button class="btn btn-cyan" onclick="setPage('admin')">管理者ページ</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHowtoScreen() {
  return `
    <section class="screen howto-screen">
      <div class="overlay">
        <div class="page-wrapper">
          <div class="panel">
            <h2 class="page-title">あそびかた</h2>
            <div class="text-block">
              <h3>ゲームの進行</h3>
              <p>最初に「施策カード」を5枚配ります。</p>
              <p>各ターンでは、①施策カードを2枚選んで使う → ②費用・売上・環境の効果を反映する → ③不要な施策カードを1枚捨てる → ④山札から施策カードを3枚追加する → ⑤ハプニングカードを1枚引く → ⑥条件に合い、かつ対策できていない場合は効果を反映します。</p>
              <p>これを10ターン目まで繰り返します。</p>

              <div class="section-spacing"></div>

              <h3>勝利条件 / 敗北条件</h3>
              <p>「漁業」と「観光」の値を両方15以上にしたら勝利です。</p>
              <p>「生物」「海」「資源」のいずれかが0になったら敗北です。</p>
              <p>「予算」が0になったら敗北です。初期値は12で、ターン終了時に2追加されます。</p>
              <p>「人手」が0になったら敗北です。初期値は10で、ターン終了時に2追加されます。</p>
              <p>終了時には、勝利までのターン数と使用カード一覧、当日ランキングを表示します。</p>

              <div class="inline-buttons section-spacing">
                <button class="btn btn-cyan" onclick="setPage('title')">タイトルへ戻る</button>
                <button class="btn btn-green" onclick="handleStartGame()">ゲームをはじめる</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStatPill(label, value) {
  return `
    <div class="stat-pill">
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
    </div>
  `;
}

function renderPolicyCards() {
  return state.hand
    .map((card) => {
      const selected = state.selectedCards.includes(card.id) ? "selected" : "";
      const extraClass = getPolicyCardClass(card.tags);
      return `
        <div class="card ${extraClass} ${selected}" onclick="toggleSelectCard('${card.id}')">
          <div class="card-title">${escapeHtml(card.title)}</div>
          <div class="card-illustration">${escapeHtml(card.illustration)}</div>
          <div class="card-body">
            <p>費用：${prettyEffect(card.cost, ["budget", "manpower"])}</p>
            <p>売上：${prettyEffect(card.sales, ["fishery", "tourism"])}</p>
            <p>環境：${prettyEffect(card.environment, ["biology", "sea", "resource"])}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderHappeningCard() {
  if (!state.currentHappening) return "";

  const card = state.currentHappening;
  return `
    <div class="card happening-card" style="background: ${getHappeningCardBackground(card.effect)};">
      <div class="happening-lightning">⚡</div>
      <div class="card-title" style="color:#1f2937; text-shadow:none;">${escapeHtml(card.title)}</div>
      <div class="card-illustration">${escapeHtml(card.illustration)}</div>
      <div class="card-body" style="position:relative;">
        <p>発動条件：${escapeHtml(card.condition)}</p>
        <p>対策：${escapeHtml(card.counter)}</p>
        <p>効果：${prettyEffect(card.effect, ["biology", "sea", "resource", "fishery", "tourism", "manpower", "budget"])}</p>
      </div>
    </div>
  `;
}

function renderGameScreen() {
  const screenClass =
    state.phase === "happening" || state.phase === "happeningResult"
      ? "screen game-screen night"
      : "screen game-screen day";

  let phaseTitle = "";
  let content = "";
  let centerButton = "";

  if (state.phase === "select") {
    phaseTitle = "施策カードを2枚選んでください";
    content = `<div class="card-grid">${renderPolicyCards()}</div>`;
    centerButton = `
      <div class="center-actions">
        <button class="btn btn-green" ${state.selectedCards.length !== 2 ? "disabled" : ""} onclick="applySelectedPolicies()">
          選んだ2枚を実行する
        </button>
      </div>
    `;
  }

  if (state.phase === "discard") {
    phaseTitle = "残りのカードから1枚捨ててください";
    content = `<div class="card-grid">${renderPolicyCards()}</div>`;
  }

  if (state.phase === "happening") {
    phaseTitle = "ハプニングフェーズ";
    content = `<div class="happening-area">${renderHappeningCard()}</div>`;
    centerButton = `
      <div class="center-actions">
        <button class="btn btn-purple" onclick="resolveHappening()">ハプニングを解決する</button>
      </div>
    `;
  }

  if (state.phase === "happeningResult") {
    phaseTitle = "ハプニングフェーズ";
    content = `<div class="happening-area">${renderHappeningCard()}</div>`;
    centerButton = `
      <div class="center-actions">
        <button class="btn btn-cyan" onclick="nextTurn()">次のターンへ進む</button>
      </div>
    `;
  }

  return `
    <section class="${screenClass}">
      <div class="overlay">
        <div class="page-wrapper">
          <div class="top-stats">
            <div class="stat-group">
              ${renderStatPill("漁業", state.stats.fishery)}
              ${renderStatPill("観光", state.stats.tourism)}
            </div>
            <div class="stat-group">
              ${renderStatPill("生物", state.stats.biology)}
              ${renderStatPill("海", state.stats.sea)}
              ${renderStatPill("資源", state.stats.resource)}
            </div>
          </div>

          <div class="game-meta">
            <div class="meta-left">
              <div class="badge">ターン ${state.turn} / 10</div>
              <div class="badge">予算 ${state.stats.budget}</div>
              <div class="badge">人手 ${state.stats.manpower}</div>
              <div class="badge">${
                state.phase === "happening" || state.phase === "happeningResult"
                  ? "ハプニング発生中"
                  : "施策を考えるフェーズ"
              }</div>
            </div>
            <button class="btn btn-cyan" onclick="setPage('title')">タイトルへ</button>
          </div>

          <div class="phase-title">${phaseTitle}</div>

          ${content}
          ${centerButton}

          <div class="panel log-panel">
            <h3 class="page-title" style="font-size:24px;">ログ</h3>
            <div class="log-list">
              ${state.log.map((item) => `<div class="log-item">${escapeHtml(item)}</div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderResultScreen() {
  const finalResult =
    state.stats.fishery >= 15 && state.stats.tourism >= 15 ? "勝利" : "敗北";

  return `
    <section class="screen result-screen">
      <div class="overlay">
        <div class="page-wrapper">
          <div class="result-grid">
            <div class="panel">
              <h2 class="page-title">結果</h2>
              <div class="big-turn">
                <div class="big-turn-label">かかったターン数</div>
                <div class="big-turn-value">${state.turn}</div>
                <div style="font-weight:900; color:${finalResult === "勝利" ? "#16a34a" : "#dc2626"};">${finalResult}</div>
              </div>

              <div class="section-spacing"></div>

              <div class="status-grid">
                ${Object.entries(state.stats)
                  .map(([key, value]) => {
                    return `<div class="status-box">${labels[key]}：${value}</div>`;
                  })
                  .join("")}
              </div>

              <div class="inline-buttons section-spacing">
                <button class="btn btn-green" onclick="handleStartGame()">もう一度遊ぶ</button>
                <button class="btn btn-cyan" onclick="setPage('title')">タイトルへ</button>
              </div>
            </div>

            <div class="panel">
              <h2 class="page-title">使ったカード一覧</h2>
              <div class="list-column">
                ${
                  state.usedCards.length
                    ? state.usedCards
                        .map((card) => {
                          return `
                            <div class="simple-card">
                              <div class="simple-card-title">${escapeHtml(card.title)} ${escapeHtml(card.illustration)}</div>
                              <div style="font-size:13px;">費用：${prettyEffect(card.cost, ["budget", "manpower"])}</div>
                              <div style="font-size:13px;">売上：${prettyEffect(card.sales, ["fishery", "tourism"])}</div>
                              <div style="font-size:13px;">環境：${prettyEffect(card.environment, ["biology", "sea", "resource"])}</div>
                            </div>
                          `;
                        })
                        .join("")
                    : `<div class="simple-card">まだカードは使われていません。</div>`
                }
              </div>
            </div>

            <div class="panel">
              <h2 class="page-title">今日のランキング</h2>
              <div class="list-column">
                ${
                  state.ranking.length
                    ? state.ranking
                        .map((item, index) => {
                          return `
                            <div class="rank-card">
                              <div>
                                <div style="font-weight:900;">${index + 1}位 ${escapeHtml(item.name)}</div>
                                <div style="font-size:12px; color:#64748b;">${escapeHtml(item.date)} / ${item.result === "win" ? "勝利" : "敗北"}</div>
                              </div>
                              <div class="rank-score">${item.score}</div>
                            </div>
                          `;
                        })
                        .join("")
                    : `<div class="simple-card">まだランキングはありません。</div>`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAdminScreen() {
  return `
    <section class="screen admin-screen">
      <div class="overlay">
        <div class="page-wrapper">
          <div class="panel">
            <h2 class="page-title">管理者ページ</h2>
            <div class="admin-layout">
              <div>
                <div class="panel" style="background:rgba(255,255,255,0.72);">
                  <h3 class="page-title" style="font-size:24px;">施策カード管理</h3>
                  <div class="form-grid">
                    <div>
                      <label>タイトル</label>
                      <input id="policy-title" type="text" value="" placeholder="藻場保全" />
                    </div>
                    <div>
                      <label>イラスト</label>
                      <input id="policy-illustration" type="text" value="🌿" />
                    </div>
                    <div>
                      <label>費用</label>
                      <input id="policy-cost" type="text" value="予算-2 / 人手-2" />
                    </div>
                    <div>
                      <label>売上</label>
                      <input id="policy-sales" type="text" value="漁業+2 / 観光+1" />
                    </div>
                    <div>
                      <label>環境</label>
                      <input id="policy-environment" type="text" value="生物+1 / 海+0 / 資源+0" />
                    </div>
                    <div>
                      <label>タグ</label>
                      <input id="policy-tags" type="text" value="fishery" placeholder="fishery,tourism" />
                    </div>
                  </div>
                  <div class="inline-buttons section-spacing">
                    <button class="btn btn-green" onclick="addPolicyCard()">${state.editingPolicyId ? "施策カードを更新" : "施策カードを追加"}</button>
                    <button class="btn btn-cyan" onclick="clearPolicyForm()">入力をクリア</button>
                  </div>

                  <div class="admin-list section-spacing">
                    ${state.policyPool
                      .map((card) => {
                        return `
                          <div class="admin-item">
                            <div>
                              <div style="font-weight:900;">${escapeHtml(card.title)} ${escapeHtml(card.illustration)}</div>
                              <div style="font-size:12px; color:#64748b;">${prettyEffect(card.sales, ["fishery", "tourism"])}</div>
                            </div>
                            <div class="inline-buttons">
                              <button class="small-btn cyan" onclick="editPolicyCard('${card.id}')">編集</button>
                              <button class="small-btn red" onclick="deletePolicyCard('${card.id}')">削除</button>
                            </div>
                          </div>
                        `;
                      })
                      .join("")}
                  </div>
                </div>
              </div>

              <div>
                <div class="panel" style="background:rgba(255,255,255,0.72);">
                  <h3 class="page-title" style="font-size:24px;">ハプニングカード管理</h3>
                  <div class="form-grid">
                    <div>
                      <label>タイトル</label>
                      <input id="happening-title" type="text" value="" placeholder="赤潮発生" />
                    </div>
                    <div>
                      <label>イラスト</label>
                      <input id="happening-illustration" type="text" value="⚡🌊" />
                    </div>
                    <div>
                      <label>発動条件</label>
                      <input id="happening-condition" type="text" value="無条件" />
                    </div>
                    <div>
                      <label>対策</label>
                      <input id="happening-counter" type="text" value="無条件" />
                    </div>
                    <div class="full">
                      <label>効果</label>
                      <input id="happening-effect" type="text" value="生物-1 / 海-1 / 資源+0" />
                    </div>
                  </div>
                  <div class="inline-buttons section-spacing">
                    <button class="btn btn-green" onclick="addHappeningCard()">${state.editingHappeningId ? "ハプニングカードを更新" : "ハプニングカードを追加"}</button>
                    <button class="btn btn-cyan" onclick="clearHappeningForm()">入力をクリア</button>
                  </div>

                  <div class="admin-list section-spacing">
                    ${state.happeningPool
                      .map((card) => {
                        return `
                          <div class="admin-item">
                            <div>
                              <div style="font-weight:900;">${escapeHtml(card.title)} ${escapeHtml(card.illustration)}</div>
                              <div style="font-size:12px; color:#64748b;">${escapeHtml(card.condition)}</div>
                            </div>
                            <div class="inline-buttons">
                              <button class="small-btn cyan" onclick="editHappeningCard('${card.id}')">編集</button>
                              <button class="small-btn red" onclick="deleteHappeningCard('${card.id}')">削除</button>
                            </div>
                          </div>
                        `;
                      })
                      .join("")}
                  </div>
                </div>
              </div>
            </div>

            <div class="inline-buttons section-spacing">
              <button class="btn btn-cyan" onclick="setPage('title')">タイトルへ戻る</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  const app = document.getElementById("app");

  if (state.page === "title") {
    app.innerHTML = renderTitleScreen();
    const input = document.getElementById("player-name-input");
    if (input) {
      input.addEventListener("input", (e) => {
        state.playerName = e.target.value;
      });
    }
    return;
  }

  if (state.page === "howto") {
    app.innerHTML = renderHowtoScreen();
    return;
  }

  if (state.page === "game") {
    app.innerHTML = renderGameScreen();
    return;
  }

  if (state.page === "result") {
    app.innerHTML = renderResultScreen();
    return;
  }

  if (state.page === "admin") {
    app.innerHTML = renderAdminScreen();
    return;
  }
}

function handleStartGame() {
  const input = document.getElementById("player-name-input");
  if (input) {
    state.playerName = input.value.trim() || "Player";
  }
  startGame();
}

render();
