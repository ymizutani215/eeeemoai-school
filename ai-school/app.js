const COURSE_URL = "./courses.json";
const COURSE_CACHE_KEY = "eeemo-ai-school-courses-cache";
const SESSION_KEY = "eeemo-ai-school-session";
const PROGRESS_DB_KEY = "eeemo-ai-school-progress-db";
const DEPARTMENT_DB_KEY = "eeemo-ai-school-dept-db";
const TEST_DB_KEY = "eeemo-ai-school-test-db";
const NOTIFICATION_KEY = "eeemo-ai-school-manager-notifications";
const INTEGRATION_KEY = "eeemo-ai-school-integration";
const TEST_TEMPLATE_DB_KEY = "eeemo-ai-school-test-template-db";
const TEST_POLICY_KEY = "eeemo-ai-school-test-policy";
const CHAT_MEMORY_KEY = "eeemo-ai-school-chat-memory";
const CHAT_KNOWLEDGE_KEY = "eeemo-ai-school-chat-knowledge";
const AI_CHAT_CONFIG_KEY = "eeemo-ai-school-ai-chat-config";
const AI_GEMINI_USAGE_KEY = "eeemo-ai-school-ai-gemini-usage";
const USERS_DB_KEY = "eeemo-ai-school-users-db";
const CURRICULUM_ITEMS = [
  "営業",
  "Amazon運用",
  "楽天運用",
  "自社サイト運用",
  "新人研修",
  "プロンプト集",
  "マーケティング用"
];
const TEST_TEMPLATES = {
  "営業": [
    q("営業提案書ドラフト作成で最初に定義すべき要素は？", ["担当者の好み", "顧客課題・提案目的・成果指標", "最近の雑談内容", "社内行事"], 1),
    q("商談メールをAIで作るとき、返信率向上に最も有効なのは？", ["件名と冒頭で要点を明確化", "文量を増やす", "結論を最後に隠す", "定型文を固定する"], 0),
    q("AI下書きを営業送信前に必ず行うべきことは？", ["事実と数字の照合", "そのまま送信", "語尾調整のみ", "改行だけ調整"], 0),
    q("顧客別最適化で正しい運用は？", ["業界・課題・役職をプロンプトに含める", "全社共通文を使う", "担当者名を省略", "過去提案を無視"], 0),
    q("社内ルール上、禁止される入力はどれ？", ["顧客個人情報の原文入力", "公開済み商品情報", "社内テンプレ", "匿名化した課題"], 0)
  ],
  "Amazon運用": [
    q("Amazon商品ページ改善で最初に見るべき観点は？", ["検索意図と訴求一致", "背景色", "部署構成", "更新担当者名"], 0),
    q("広告運用分析で優先確認する指標は？", ["ACOS・ROAS・CVR", "会議回数", "出勤率", "フォント種類"], 0),
    q("AIで商品説明を作る際に必要な入力は？", ["仕様・利用シーン・差別化要素", "社内雑談", "私物リスト", "席表"], 0),
    q("改善提案の実行順として適切なのは？", ["仮説→小さく実行→結果確認", "全要素同時変更", "検証せず採用", "競合無視"], 0),
    q("安全運用として正しいのは？", ["未公開データを除外して入力", "管理画面画像をそのまま送信", "社内PW入力", "顧客個人情報入力"], 0)
  ],
  "楽天運用": [
    q("楽天RPP運用で最重要の調整対象は？", ["検索語ごとの入札単価", "文字色", "SKU削除", "店舗ロゴ"], 0),
    q("ページ文言改善で有効な考え方は？", ["購入理由を先に提示", "説明文をなくす", "見出し削除", "情報を減らす"], 0),
    q("AI提案を反映する前に必要なのは？", ["売上指標での比較検証", "即時全反映", "担当者感覚のみで判断", "競合調査を省略"], 0),
    q("運用の継続改善で正しいのは？", ["週次でレビューして調整", "年1回のみ見直し", "固定運用", "広告停止"], 0),
    q("評価指標として優先すべきは？", ["CVR・CPC・売上", "会議回数", "担当者年齢", "投稿数"], 0)
  ],
  "自社サイト運用": [
    q("FAQ作成に最適な元データは？", ["問い合わせログ", "雑談メモ", "個人メモ", "イベント案内"], 0),
    q("LP改善案で効果が出やすい構成は？", ["課題→解決策→根拠→CTA", "価格だけ記載", "画像だけ配置", "結論を省略"], 0),
    q("AI案採用前に確認すべき事項は？", ["ブランドトーンと事実整合", "即公開", "誤字のみ確認", "リンク削除"], 0),
    q("自社サイト運用で重視するKPIは？", ["CVR・離脱率・滞在時間", "会議時間", "出社率", "席数"], 0),
    q("FAQ品質維持で正しい運用は？", ["問い合わせ増減に応じ定期更新", "固定文のみ運用", "質問削減", "回答短文化のみ"], 0)
  ],
  "新人研修": [
    q("新人が最初に理解すべきAI運用は？", ["安全利用ルールと承認フロー", "画像編集手順", "会議室予約", "席替えルール"], 0),
    q("機密情報入力で正しい行動は？", ["匿名化・要約化して入力", "顧客名をそのまま入力", "契約書全文貼付", "未公開財務情報貼付"], 0),
    q("AI利用の基本手順は？", ["目的設定→入力→検証→提出", "入力→送信で完了", "模倣→提出", "公開→共有"], 0),
    q("新人向け推奨運用は？", ["社内テンプレ活用", "独自手順のみ", "手順省略", "確認不要"], 0),
    q("提出前に必要なのは？", ["上長確認と根拠明示", "確認なし提出", "ログ削除", "体裁のみ修正"], 0)
  ],
  "プロンプト集": [
    q("要約プロンプトで有効なのは？", ["出力フォーマット指定", "指示なし", "目的未記載", "文字数指定なし"], 0),
    q("分析プロンプトで必須なのは？", ["評価軸・対象期間の明記", "曖昧条件", "対象不明", "背景省略"], 0),
    q("再利用テンプレ設計で正しいのは？", ["変数化して汎用化", "固定文のみ", "手順省略", "入力制限なし"], 0),
    q("品質向上に有効なのは？", ["追質問で精度を上げる", "1回で固定", "検証省略", "データなし実行"], 0),
    q("出力安全確認で適切なのは？", ["事実確認と機密確認", "即転送", "誤字のみ確認", "装飾のみ確認"], 0)
  ],
  "マーケティング用": [
    q("戦略立案時にAIへ最初に渡す情報は？", ["目的・KPI・ターゲット像", "社内雑談", "座席表", "飲食履歴"], 0),
    q("SNS案量産で重要なのは？", ["ブランドトーン統一", "毎回別人格", "確認なし投稿", "目的なし投稿"], 0),
    q("施策比較で適切な判断軸は？", ["仮説ごとにKPI比較", "感覚で決定", "担当者好み", "予算無視"], 0),
    q("安全運用で正しい入力は？", ["匿名化した分析データ", "個人情報原本", "契約全文", "未公開財務情報"], 0),
    q("改善サイクルで必要なのは？", ["実行後レビューと次施策更新", "実行のみ", "年1回レビュー", "検証省略"], 0)
  ]
};

const DEFAULT_INTEGRATION = {
  chatworkRelayUrl: "",
  chatworkRoomId: ""
};
const DEFAULT_TEST_POLICY = {
  passScore: 80,
  retakeLimit: 5
};
const DEFAULT_AI_CHAT_CONFIG = {
  mode: "hybrid",
  relayUrl: "",
  model: "gemini-1.5-flash",
  dailyLimitPerUser: 20
};
const FALLBACK_COURSES = [
  { id: "fb-sales-001", title: "営業提案書ドラフト自動化", category: "営業", duration: "18分", description: "提案下書き生成の基本。", departments: ["営業"], video: "./videos/ai-sales-001.mp4" },
  { id: "fb-amz-001", title: "Amazon商品ページ改善", category: "Amazon運用", duration: "22分", description: "訴求とキーワード最適化。", departments: ["運用"], video: "./videos/ai-amz-001.mp4" },
  { id: "fb-rkt-001", title: "楽天RPP改善", category: "楽天運用", duration: "21分", description: "入札調整と効果検証。", departments: ["運用"], video: "./videos/ai-rkt-001.mp4" },
  { id: "fb-site-001", title: "自社サイトFAQ生成", category: "自社サイト運用", duration: "13分", description: "問い合わせ起点のFAQ整備。", departments: ["運用", "その他"], video: "./videos/ai-site-001.mp4" },
  { id: "fb-newbie-001", title: "新人向けAI活用基礎", category: "新人研修", duration: "15分", description: "安全利用の入門。", departments: ["新人研修", "その他"], video: "./videos/ai-newbie-001.mp4" },
  { id: "fb-prompt-001", title: "要約プロンプト集", category: "プロンプト集", duration: "11分", description: "再利用可能なテンプレート。", departments: ["営業", "運用", "経理・総務", "その他", "新人研修"], video: "./videos/ai-prompt-001.mp4" },
  { id: "fb-mkt-001", title: "マーケ戦略立案高速化", category: "マーケティング用", duration: "23分", description: "目的/KPI起点の施策案作成。", departments: ["運用", "営業"], video: "./videos/ai-mkt-001.mp4" }
];

function q(question, options, answer) {
  return { question, options, answer };
}

const DEFAULT_USERS = [
  {
    id: "u-admin",
    name: "管理者",
    email: "admin@eeeemo.co.jp",
    password: "admin123",
    role: "admin",
    department: "その他"
  },
  {
    id: "u-sales",
    name: "営業 田中",
    email: "sales@eeeemo.co.jp",
    password: "user123",
    role: "member",
    department: "営業"
  },
  {
    id: "u-marketing",
    name: "マーケ 鈴木",
    email: "marketing@eeeemo.co.jp",
    password: "user123",
    role: "member",
    department: "運用"
  },
  {
    id: "u-dev",
    name: "総務 佐藤",
    email: "dev@eeeemo.co.jp",
    password: "user123",
    role: "member",
    department: "経理・総務"
  }
];

const els = {
  loginView: document.getElementById("loginView"),
  appView: document.getElementById("appView"),
  loginForm: document.getElementById("loginForm"),
  emailInput: document.getElementById("emailInput"),
  passwordInput: document.getElementById("passwordInput"),
  loginError: document.getElementById("loginError"),
  logoutBtn: document.getElementById("logoutBtn"),
  userMeta: document.getElementById("userMeta"),
  tabs: document.querySelectorAll(".tab"),
  panes: {
    learn: document.getElementById("learnTab"),
    history: document.getElementById("historyTab"),
    curriculum: document.getElementById("curriculumTab"),
    assistant: document.getElementById("assistantTab")
  },
  adminOnly: document.querySelectorAll(".admin-only"),
  searchInput: document.getElementById("searchInput"),
  categorySelect: document.getElementById("categorySelect"),
  departmentFilter: document.getElementById("departmentFilter"),
  courseSummary: document.getElementById("courseSummary"),
  categoryLegend: document.getElementById("categoryLegend"),
  courseList: document.getElementById("courseList"),
  emptyState: document.getElementById("emptyState"),
  courseDetail: document.getElementById("courseDetail"),
  detailTitle: document.getElementById("detailTitle"),
  detailCategory: document.getElementById("detailCategory"),
  detailDuration: document.getElementById("detailDuration"),
  detailDepartments: document.getElementById("detailDepartments"),
  detailDescription: document.getElementById("detailDescription"),
  videoPlayer: document.getElementById("videoPlayer"),
  completeBtn: document.getElementById("completeBtn"),
  historyUserSelect: document.getElementById("historyUserSelect"),
  historySummaryBody: document.getElementById("historySummaryBody"),
  historyDetailList: document.getElementById("historyDetailList"),
  exportHistoryBtn: document.getElementById("exportHistoryBtn"),
  resetUserBtn: document.getElementById("resetUserBtn"),
  assignUserSelect: document.getElementById("assignUserSelect"),
  assignDepartmentSelect: document.getElementById("assignDepartmentSelect"),
  assignBtn: document.getElementById("assignBtn"),
  curriculumCards: document.getElementById("curriculumCards")
  ,
  startTestBtn: document.getElementById("startTestBtn"),
  testStatus: document.getElementById("testStatus"),
  testDialog: document.getElementById("testDialog"),
  testForm: document.getElementById("testForm"),
  testTitle: document.getElementById("testTitle"),
  testQuestions: document.getElementById("testQuestions"),
  closeTestBtn: document.getElementById("closeTestBtn"),
  testSummaryBody: document.getElementById("testSummaryBody"),
  notificationList: document.getElementById("notificationList")
  ,
  chatworkRelayUrl: document.getElementById("chatworkRelayUrl"),
  chatworkRoomId: document.getElementById("chatworkRoomId"),
  saveIntegrationBtn: document.getElementById("saveIntegrationBtn"),
  testIntegrationBtn: document.getElementById("testIntegrationBtn"),
  integrationTestResult: document.getElementById("integrationTestResult"),
  historyKpi: document.getElementById("historyKpi"),
  videoReadinessBody: document.getElementById("videoReadinessBody"),
  categoryPassBody: document.getElementById("categoryPassBody"),
  pendingUserList: document.getElementById("pendingUserList"),
  nextCourseCard: document.getElementById("nextCourseCard"),
  passScoreInput: document.getElementById("passScoreInput"),
  retakeLimitInput: document.getElementById("retakeLimitInput"),
  savePolicyBtn: document.getElementById("savePolicyBtn"),
  testCategorySelect: document.getElementById("testCategorySelect"),
  testQuestionEditor: document.getElementById("testQuestionEditor"),
  loadQuestionBtn: document.getElementById("loadQuestionBtn"),
  saveQuestionBtn: document.getElementById("saveQuestionBtn"),
  resetQuestionBtn: document.getElementById("resetQuestionBtn"),
  exportBackupBtn: document.getElementById("exportBackupBtn"),
  weeklyExportBtn: document.getElementById("weeklyExportBtn"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  importBackupBtn: document.getElementById("importBackupBtn"),
  importBackupInput: document.getElementById("importBackupInput"),
  chatMessages: document.getElementById("chatMessages"),
  chatInput: document.getElementById("chatInput"),
  sendChatBtn: document.getElementById("sendChatBtn"),
  clearChatBtn: document.getElementById("clearChatBtn"),
  chatHint: document.getElementById("chatHint"),
  knowledgeTitleInput: document.getElementById("knowledgeTitleInput"),
  knowledgeTagsInput: document.getElementById("knowledgeTagsInput"),
  knowledgeContentInput: document.getElementById("knowledgeContentInput"),
  saveKnowledgeBtn: document.getElementById("saveKnowledgeBtn"),
  knowledgeList: document.getElementById("knowledgeList"),
  aiModeSelect: document.getElementById("aiModeSelect"),
  aiRelayUrlInput: document.getElementById("aiRelayUrlInput"),
  aiModelInput: document.getElementById("aiModelInput"),
  aiDailyLimitInput: document.getElementById("aiDailyLimitInput"),
  saveAiConfigBtn: document.getElementById("saveAiConfigBtn"),
  aiConfigHint: document.getElementById("aiConfigHint"),
  newUserNameInput: document.getElementById("newUserNameInput"),
  newUserEmailInput: document.getElementById("newUserEmailInput"),
  newUserDepartmentSelect: document.getElementById("newUserDepartmentSelect"),
  newUserPasswordInput: document.getElementById("newUserPasswordInput"),
  newUserRoleSelect: document.getElementById("newUserRoleSelect"),
  createUserBtn: document.getElementById("createUserBtn"),
  bulkUserCsvInput: document.getElementById("bulkUserCsvInput"),
  importUsersCsvBtn: document.getElementById("importUsersCsvBtn"),
  userIssueResult: document.getElementById("userIssueResult"),
  userAccountBody: document.getElementById("userAccountBody")
};

let courses = [];
let session = loadJSON(SESSION_KEY, null);
let usersDB = normalizeUsers(loadJSON(USERS_DB_KEY, DEFAULT_USERS));
let progressDB = asObject(loadJSON(PROGRESS_DB_KEY, {}));
let departmentDB = asObject(loadJSON(DEPARTMENT_DB_KEY, {}));
let testDB = asObject(loadJSON(TEST_DB_KEY, {}));
let notifications = asArray(loadJSON(NOTIFICATION_KEY, []));
let integration = {
  ...DEFAULT_INTEGRATION,
  ...asObject(loadJSON(INTEGRATION_KEY, DEFAULT_INTEGRATION))
};
let testTemplates = normalizeTemplates(loadJSON(TEST_TEMPLATE_DB_KEY, TEST_TEMPLATES));
let testPolicy = normalizePolicy(loadJSON(TEST_POLICY_KEY, DEFAULT_TEST_POLICY));
let chatMemory = normalizeChatMemory(loadJSON(CHAT_MEMORY_KEY, []));
let chatKnowledge = normalizeChatKnowledge(loadJSON(CHAT_KNOWLEDGE_KEY, []));
let aiChatConfig = normalizeAiChatConfig(loadJSON(AI_CHAT_CONFIG_KEY, DEFAULT_AI_CHAT_CONFIG));
let aiGeminiUsage = normalizeGeminiUsage(loadJSON(AI_GEMINI_USAGE_KEY, {}));
let selectedCourseId = null;
let activeTestCourseId = null;
const videoAvailabilityCache = {};
let shouldAutoScrollChat = false;

init();

async function init() {
  await loadCourses();
  hydrateStores();
  bindEvents();

  if (session && findUserById(session.userId)) {
    showApp();
  } else {
    session = null;
    localStorage.removeItem(SESSION_KEY);
    showLogin();
  }
}

async function loadCourses() {
  try {
    const res = await fetch(COURSE_URL);
    if (!res.ok) throw new Error("load failed");
    courses = await res.json();
    localStorage.setItem(COURSE_CACHE_KEY, JSON.stringify(courses));
  } catch {
    const cached = asArray(loadJSON(COURSE_CACHE_KEY, []));
    if (cached.length) {
      courses = cached;
      alert("courses.json の読み込みに失敗したため、前回キャッシュのコースを使用します。");
      return;
    }
    courses = FALLBACK_COURSES;
    alert("courses.json の読み込みに失敗したため、内蔵サンプルコースで起動しました。ローカルサーバー経由で開くと本データを読み込めます。");
  }
}

function hydrateStores() {
  usersDB.forEach((u) => {
    if (!progressDB[u.id]) progressDB[u.id] = {};
    if (!departmentDB[u.id]) departmentDB[u.id] = u.department;
    if (!testDB[u.id]) testDB[u.id] = {};
  });
  persistStores();
}

function persistStores() {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
  localStorage.setItem(PROGRESS_DB_KEY, JSON.stringify(progressDB));
  localStorage.setItem(DEPARTMENT_DB_KEY, JSON.stringify(departmentDB));
  localStorage.setItem(TEST_DB_KEY, JSON.stringify(testDB));
  localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications));
  localStorage.setItem(INTEGRATION_KEY, JSON.stringify(integration));
  localStorage.setItem(TEST_TEMPLATE_DB_KEY, JSON.stringify(testTemplates));
  localStorage.setItem(TEST_POLICY_KEY, JSON.stringify(testPolicy));
  localStorage.setItem(CHAT_MEMORY_KEY, JSON.stringify(chatMemory));
  localStorage.setItem(CHAT_KNOWLEDGE_KEY, JSON.stringify(chatKnowledge));
  localStorage.setItem(AI_CHAT_CONFIG_KEY, JSON.stringify(aiChatConfig));
  localStorage.setItem(AI_GEMINI_USAGE_KEY, JSON.stringify(aiGeminiUsage));
}

function bindEvents() {
  els.loginForm.addEventListener("submit", handleLogin);
  els.logoutBtn.addEventListener("click", logout);

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  els.searchInput.addEventListener("input", renderCourseList);
  els.categorySelect.addEventListener("change", renderCourseList);
  els.departmentFilter.addEventListener("change", renderCourseList);
  els.completeBtn.addEventListener("click", toggleComplete);
  els.startTestBtn.addEventListener("click", openTestDialog);
  els.closeTestBtn.addEventListener("click", () => els.testDialog.close());
  els.testForm.addEventListener("submit", submitTest);
  els.videoPlayer.addEventListener("ended", onVideoEnded);

  els.historyUserSelect.addEventListener("change", renderHistoryDetail);
  els.exportHistoryBtn.addEventListener("click", exportHistory);
  els.resetUserBtn.addEventListener("click", resetSelectedUserHistory);

  els.assignBtn.addEventListener("click", assignDepartmentToUser);
  els.saveIntegrationBtn.addEventListener("click", saveIntegration);
  els.testIntegrationBtn.addEventListener("click", testIntegration);
  els.savePolicyBtn.addEventListener("click", saveTestPolicy);
  els.testCategorySelect.addEventListener("change", loadTestEditorFromCategory);
  els.loadQuestionBtn.addEventListener("click", loadTestEditorFromCategory);
  els.saveQuestionBtn.addEventListener("click", saveTestEditorToCategory);
  els.resetQuestionBtn.addEventListener("click", resetTestCategoryToDefault);
  els.exportBackupBtn.addEventListener("click", exportBackupJson);
  els.weeklyExportBtn.addEventListener("click", exportWeeklyBackup);
  els.exportCsvBtn.addEventListener("click", exportAdminCsv);
  els.importBackupBtn.addEventListener("click", () => els.importBackupInput.click());
  els.importBackupInput.addEventListener("change", importBackupJson);
  els.sendChatBtn.addEventListener("click", sendChatMessage);
  els.chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChatMessage();
    }
  });
  els.clearChatBtn.addEventListener("click", clearChatMemory);
  els.saveKnowledgeBtn.addEventListener("click", saveKnowledgeEntry);
  els.saveAiConfigBtn.addEventListener("click", saveAiChatConfig);
  els.createUserBtn.addEventListener("click", createSingleUser);
  els.importUsersCsvBtn.addEventListener("click", importUsersFromCsv);
}

function handleLogin(e) {
  e.preventDefault();
  const email = els.emailInput.value.trim().toLowerCase();
  const password = els.passwordInput.value;
  const user = usersDB.find((u) => u.email.toLowerCase() === email && u.password === password);

  if (!user) {
    els.loginError.textContent = "ログイン情報が正しくありません。";
    els.loginError.classList.remove("hidden");
    return;
  }
  if (user.active === false) {
    els.loginError.textContent = "このアカウントは停止中です。管理者へ連絡してください。";
    els.loginError.classList.remove("hidden");
    return;
  }

  els.loginError.classList.add("hidden");
  els.loginError.textContent = "ログイン情報が正しくありません。";
  session = { userId: user.id };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  showApp();
}

function logout() {
  session = null;
  selectedCourseId = null;
  localStorage.removeItem(SESSION_KEY);
  showLogin();
}

function showLogin() {
  els.appView.classList.add("hidden");
  els.loginView.classList.remove("hidden");
}

function showApp() {
  const user = currentUser();
  if (!user) return;

  els.loginView.classList.add("hidden");
  els.appView.classList.remove("hidden");
  els.userMeta.textContent = `${user.name} (${departmentOf(user.id)}) / ${user.role === "admin" ? "管理者" : "一般"}`;

  toggleAdminSections(user.role === "admin");
  fillCategoryOptions();
  fillDepartmentFilter();
  fillAdminSelectors();
  renderIntegrationSettings();
  renderTestAdminSettings();

  switchTab("learn");
  renderCourseList();
  renderNextCourseCard();
  renderTestStatus();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderHistoryKpis();
  renderVideoReadinessPanel();
  renderUserAdminPanel();
  renderCurriculumCards();
  renderAssistantPanel();
}

function toggleAdminSections(isAdmin) {
  els.adminOnly.forEach((el) => {
    el.classList.toggle("hidden", !isAdmin);
  });

  if (!isAdmin && currentTab() === "history") {
    switchTab("learn");
  }
}

function switchTab(tabName) {
  els.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  Object.entries(els.panes).forEach(([key, pane]) => {
    pane.classList.toggle("active", key === tabName);
  });

  if (tabName === "history") {
    renderHistorySummary();
    renderHistoryDetail();
    renderAdminTestPanel();
    renderHistoryKpis();
    renderVideoReadinessPanel();
    renderUserAdminPanel();
    renderTestAdminSettings();
  }
  if (tabName === "curriculum") {
    renderCurriculumCards();
  }
  if (tabName === "assistant") {
    renderAssistantPanel();
  }
}

function currentTab() {
  const active = Array.from(els.tabs).find((tab) => tab.classList.contains("active"));
  return active ? active.dataset.tab : "learn";
}

function fillCategoryOptions() {
  const current = els.categorySelect.value;
  const categories = [...new Set(courses.map((c) => c.category))];
  els.categorySelect.innerHTML = '<option value="all">すべて</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.categorySelect.appendChild(option);
  });

  els.categorySelect.value = categories.includes(current) ? current : "all";
}

function fillDepartmentFilter() {
  const user = currentUser();
  const departments = allDepartments();
  els.departmentFilter.innerHTML = '<option value="all">全部署</option>';

  departments.forEach((dep) => {
    const option = document.createElement("option");
    option.value = dep;
    option.textContent = dep;
    els.departmentFilter.appendChild(option);
  });

  if (user.role === "admin") {
    els.departmentFilter.disabled = false;
    if (!els.departmentFilter.value) els.departmentFilter.value = "all";
  } else {
    els.departmentFilter.disabled = true;
    els.departmentFilter.value = departmentOf(user.id);
  }
}

function fillAdminSelectors() {
  const user = currentUser();
  if (user.role !== "admin") return;

  const members = usersDB.filter((u) => u.role !== "admin");
  const departments = allDepartments();

  els.historyUserSelect.innerHTML = "";
  els.assignUserSelect.innerHTML = "";
  members.forEach((member) => {
    const optionA = document.createElement("option");
    optionA.value = member.id;
    optionA.textContent = `${member.name} (${departmentOf(member.id)})`;
    els.historyUserSelect.appendChild(optionA);

    const optionB = optionA.cloneNode(true);
    els.assignUserSelect.appendChild(optionB);
  });

  els.assignDepartmentSelect.innerHTML = "";
  departments.forEach((dep) => {
    const option = document.createElement("option");
    option.value = dep;
    option.textContent = dep;
    els.assignDepartmentSelect.appendChild(option);
  });

  if (members.length) {
    const initialUserId = els.assignUserSelect.value || members[0].id;
    els.assignUserSelect.value = initialUserId;
    els.historyUserSelect.value = initialUserId;
    els.assignDepartmentSelect.value = departmentOf(initialUserId);

    els.assignUserSelect.onchange = () => {
      els.assignDepartmentSelect.value = departmentOf(els.assignUserSelect.value);
    };
  }
}

function renderCourseList() {
  const filtered = getFilteredCourses();
  renderLearnSummary(filtered);
  renderCategoryLegend(filtered);
  renderNextCourseCard();

  if (selectedCourseId && !filtered.find((course) => course.id === selectedCourseId)) {
    selectedCourseId = null;
    closeCourseDetail();
  }

  els.courseList.innerHTML = "";
  if (!filtered.length) {
    els.courseList.innerHTML = "<li>一致するコースがありません。</li>";
    return;
  }

  filtered.forEach((course) => {
    const item = document.createElement("li");
    item.className = `course-item ${isCourseDone(course.id) ? "done" : ""}`;
    const done = isCourseDone(course.id);
    const departments = escapeHtml((course.departments || []).join(" / "));

    const button = document.createElement("button");
    button.type = "button";
    button.className = selectedCourseId === course.id ? "active" : "";
    button.innerHTML = `
      <div class="course-row-top">
        <div class="title">${escapeHtml(course.title)}</div>
        <span class="duration-pill">${escapeHtml(course.duration)}</span>
      </div>
      <div class="course-meta">
        <span class="meta-pill meta-category">${escapeHtml(course.category)}</span>
        <span class="meta-pill meta-department">${departments}</span>
        <span class="meta-pill ${done ? "meta-done" : "meta-pending"}">${done ? "完了" : "未完了"}</span>
      </div>
      <div class="sub">${escapeHtml(course.description)}</div>
    `;
    button.addEventListener("click", () => openCourse(course.id));

    item.appendChild(button);
    els.courseList.appendChild(item);
  });
}

function getFilteredCourses() {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const category = els.categorySelect.value;
  const depFilter = els.departmentFilter.value;

  return courses.filter((course) => {
    const keywordMatch =
      course.title.toLowerCase().includes(keyword) ||
      course.description.toLowerCase().includes(keyword);
    const categoryMatch = category === "all" || course.category === category;
    const departmentMatch =
      depFilter === "all" ||
      (course.departments || []).includes(depFilter);

    return keywordMatch && categoryMatch && departmentMatch;
  });
}

function renderLearnSummary(filtered) {
  const user = currentUser();
  if (!user || !els.courseSummary) return;

  const completed = filtered.filter((course) => isCourseDone(course.id)).length;
  const total = filtered.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  els.courseSummary.innerHTML = `
    <article class="summary-card">
      <p>表示中コース</p>
      <strong>${total}件</strong>
    </article>
    <article class="summary-card">
      <p>完了</p>
      <strong>${completed}件</strong>
    </article>
    <article class="summary-card">
      <p>達成率</p>
      <strong>${percent}%</strong>
    </article>
  `;
}

function renderCategoryLegend(filtered) {
  if (!els.categoryLegend) return;
  const grouped = {};
  filtered.forEach((course) => {
    grouped[course.category] = (grouped[course.category] || 0) + 1;
  });
  const chips = Object.entries(grouped)
    .sort((a, b) => a[0].localeCompare(b[0], "ja"))
    .map(([name, count]) => `<span class="legend-chip">${escapeHtml(name)} ${count}</span>`)
    .join("");

  els.categoryLegend.innerHTML = chips || '<span class="legend-chip">該当なし</span>';
}

function openCourse(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;

  selectedCourseId = courseId;
  els.emptyState.classList.add("hidden");
  els.courseDetail.classList.remove("hidden");

  els.detailTitle.textContent = course.title;
  els.detailCategory.textContent = course.category;
  els.detailDuration.textContent = course.duration;
  els.detailDepartments.textContent = (course.departments || []).join(" / ");
  els.detailDescription.textContent = course.description;
  els.videoPlayer.src = course.video;

  syncCompleteButton();
  renderTestStatus();
  renderCourseList();
}

function closeCourseDetail() {
  els.videoPlayer.src = "";
  els.courseDetail.classList.add("hidden");
  els.emptyState.classList.remove("hidden");
  els.testStatus.classList.add("hidden");
}

function toggleComplete() {
  if (!selectedCourseId) return;
  const user = currentUser();
  if (!user) return;

  const userProgress = progressDB[user.id] || {};
  if (userProgress[selectedCourseId]) {
    delete userProgress[selectedCourseId];
  } else {
    userProgress[selectedCourseId] = new Date().toISOString();
  }

  progressDB[user.id] = userProgress;
  persistStores();

  syncCompleteButton();
  renderTestStatus();
  renderCourseList();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderHistoryKpis();
  renderCurriculumCards();
}

function syncCompleteButton() {
  const done = isCourseDone(selectedCourseId);
  els.completeBtn.textContent = done ? "完了を解除" : "受講完了にする";
  els.completeBtn.classList.toggle("btn-primary", !done);
  els.completeBtn.classList.toggle("btn-ghost", done);
}

function renderTestStatus() {
  const user = currentUser();
  const course = courses.find((c) => c.id === selectedCourseId);
  els.startTestBtn.classList.remove("btn-primary");
  els.startTestBtn.classList.add("btn-ghost");
  if (!user || !course || !els.testStatus) {
    els.testStatus.classList.add("hidden");
    return;
  }

  const record = testDB[user.id] && testDB[user.id][course.id];
  if (!record) {
    els.testStatus.className = "test-status";
    els.testStatus.innerHTML = `未受験です。動画視聴後に <strong>テストを実行</strong> してください。（合格ライン: ${testPolicy.passScore}点）`;
    els.testStatus.classList.remove("hidden");
    return;
  }

  const passText = record.passed ? "合格" : "再受験が必要";
  els.testStatus.className = `test-status ${record.passed ? "pass" : "fail"}`;
  els.testStatus.innerHTML = `
    直近スコア: <strong>${record.score}点</strong>（${passText}）<br>
    受験日時: ${formatDate(record.testedAt)}<br>
    受験回数: ${(record.attempts || []).length}/${testPolicy.retakeLimit}
    ${record.passed ? `<br>${testPolicy.passScore}点以上のため修了証対象です。` : ""}
  `;
  els.testStatus.classList.remove("hidden");
}

function openTestDialog() {
  const user = currentUser();
  const course = courses.find((c) => c.id === selectedCourseId);
  if (!user || !course) return;

  activeTestCourseId = course.id;
  const questions = getTestQuestions(course);
  els.testTitle.textContent = `${course.title} - 理解度テスト`;
  els.testQuestions.innerHTML = questions
    .map(
      (item, idx) => `
      <article class="test-question">
        <p>Q${idx + 1}. ${escapeHtml(item.question)}</p>
        <div class="test-options">
          ${item.options
            .map(
              (opt, optIdx) => `
              <label>
                <input type="radio" name="q${idx}" value="${optIdx}" required />
                <span>${escapeHtml(opt)}</span>
              </label>
            `
            )
            .join("")}
        </div>
      </article>
    `
    )
    .join("");

  els.testDialog.showModal();
}

async function submitTest(e) {
  e.preventDefault();
  const user = currentUser();
  const course = courses.find((c) => c.id === activeTestCourseId);
  if (!user || !course) return;

  const questions = getTestQuestions(course);
  if (!questions.length) {
    alert("このカテゴリの問題が設定されていません。管理画面で問題を登録してください。");
    return;
  }
  const previous = testDB[user.id] && testDB[user.id][course.id];
  const attempts = previous && Array.isArray(previous.attempts) ? previous.attempts : [];
  if (!previous?.passed && attempts.length >= testPolicy.retakeLimit) {
    alert(`再受験上限（${testPolicy.retakeLimit}回）に達しています。管理者へ連絡してください。`);
    els.testDialog.close();
    renderTestStatus();
    return;
  }

  let correct = 0;
  for (let i = 0; i < questions.length; i += 1) {
    const selected = els.testForm.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) return;
    if (Number(selected.value) === questions[i].answer) correct += 1;
  }

  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= testPolicy.passScore;
  const prev = testDB[user.id] && testDB[user.id][course.id];
  if (!testDB[user.id]) testDB[user.id] = {};
  const testedAt = new Date().toISOString();
  const nextAttempts = [...attempts, { score, passed, testedAt }];
  testDB[user.id][course.id] = {
    score,
    passed,
    testedAt,
    attempts: nextAttempts
  };

  if (!progressDB[user.id]) progressDB[user.id] = {};
  progressDB[user.id][course.id] = new Date().toISOString();

  if (passed && (!prev || !prev.passed)) {
    issueCertificate(user, course, score);
    await notifyManager(user, course, score);
    autoOpenNextCourse(course);
  }

  persistStores();
  els.testDialog.close();
  renderTestStatus();
  renderCourseList();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderCurriculumCards();
}

function getTestQuestions(course) {
  return (testTemplates[course.category] || testTemplates["プロンプト集"] || []).slice(0, 10);
}

function issueCertificate(user, course, score) {
  const now = new Date();
  const certNo = `EAS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${user.id}-${course.id}`;
  const html = `
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>修了証</title>
<style>
  @page { size: A4; margin: 0; }
  body { margin:0; font-family:'Yu Gothic',sans-serif; background:#eef7ff; }
  .sheet {
    width: 210mm; min-height: 297mm; margin:0 auto; background:#fff;
    border: 12px solid #2a7cf8; box-sizing:border-box; padding: 18mm 16mm;
    display:flex; flex-direction:column; gap:8mm;
  }
  .title { font-size: 18pt; font-weight: 800; color:#1a4f8a; text-align:center; letter-spacing:.08em; }
  .subtitle { text-align:center; color:#436f98; }
  .box { border:2px solid #b7d8f9; border-radius:14px; padding:7mm; background:#f8fcff; }
  .label { color:#4d7094; font-size:10pt; }
  .value { font-size:14pt; font-weight:700; color:#173a63; margin-top:2mm; }
  .footer { margin-top:auto; color:#5a7ea3; font-size:10pt; display:flex; justify-content:space-between; }
  .print { text-align:center; margin-top:6mm; }
</style>
</head>
<body>
  <main class="sheet">
    <div class="title">EEEEMO AI SCHOOL 修了証</div>
    <p class="subtitle">以下の受講者が定められた基準を満たし、コースを修了したことを証明します。</p>
    <section class="box">
      <div class="label">受講者</div>
      <div class="value">${escapeHtml(user.name)}</div>
    </section>
    <section class="box">
      <div class="label">修了コース</div>
      <div class="value">${escapeHtml(course.title)}</div>
    </section>
    <section class="box">
      <div class="label">テスト結果</div>
      <div class="value">${score} 点（合格）</div>
    </section>
    <section class="box">
      <div class="label">証明書番号</div>
      <div class="value">${certNo}</div>
    </section>
    <div class="footer">
      <span>発行日時: ${now.toLocaleString("ja-JP", { hour12: false })}</span>
      <span>承認者: AI School 管理者</span>
    </div>
    <div class="print"><button onclick="window.print()">PDFとして保存 / 印刷</button></div>
  </main>
</body>
</html>`;

  const win = window.open("", "_blank", "noopener,noreferrer");
  if (win) {
    win.document.write(html);
    win.document.close();
    return;
  }

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificate-${user.id}-${course.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

async function notifyManager(user, course, score) {
  const notice = {
    id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId: user.id,
    userName: user.name,
    courseId: course.id,
    courseTitle: course.title,
    score,
    message: `${user.name} が ${course.title} に ${score}点で合格`,
    createdAt: new Date().toISOString(),
    delivery: "local"
  };

  const delivered = await sendChatworkNotice(notice);
  if (delivered) {
    notice.delivery = "chatwork";
  } else if (integration.chatworkRelayUrl && integration.chatworkRoomId) {
    notice.delivery = "relay_error";
  }

  notifications.unshift(notice);
  notifications = notifications.slice(0, 200);
}

async function sendChatworkNotice(notice) {
  if (!integration.chatworkRelayUrl || !integration.chatworkRoomId) return false;
  const message = `[info][title]AI School 合格通知[/title]${notice.message}\n受験日時: ${formatDate(notice.createdAt)}[/info]`;
  return postToRelay(message);
}

async function postToRelay(message) {
  if (!integration.chatworkRelayUrl || !integration.chatworkRoomId) return false;
  try {
    const payload = {
      provider: "chatwork",
      roomId: integration.chatworkRoomId,
      message
    };
    const res = await fetch(integration.chatworkRelayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch {
    return false;
  }
}

function autoOpenNextCourse(course) {
  const next = getNextCourse(course.id, course.category);
  if (!next) return;
  openCourse(next.id);
}

function getNextCourse(currentId, category) {
  const inCategory = courses.filter((c) => c.category === category);
  const idx = inCategory.findIndex((c) => c.id === currentId);
  if (idx < 0 || idx === inCategory.length - 1) return null;
  return inCategory[idx + 1];
}

function onVideoEnded() {
  const user = currentUser();
  const course = courses.find((c) => c.id === selectedCourseId);
  if (!user || !course) return;
  const rec = testDB[user.id] && testDB[user.id][course.id];
  if (!rec || !rec.passed) {
    els.testStatus.className = "test-status";
    els.testStatus.innerHTML = `動画視聴が完了しました。<strong>テストを実行</strong>して理解度を確認してください。（合格ライン: ${testPolicy.passScore}点）`;
    els.testStatus.classList.remove("hidden");
    els.startTestBtn.classList.add("btn-primary");
    els.startTestBtn.classList.remove("btn-ghost");
  }
}

function renderNextCourseCard() {
  const user = currentUser();
  if (!user || !els.nextCourseCard) return;
  const next = getRecommendedNextCourse(user.id);
  if (!next) {
    els.nextCourseCard.innerHTML = "<p>次のおすすめコース</p><strong>現在、優先コースはありません。</strong>";
    return;
  }
  els.nextCourseCard.innerHTML = `
    <p>次のおすすめコース</p>
    <strong>${escapeHtml(next.title)}</strong>
    <button type="button" class="btn btn-ghost" id="openNextCourseBtn">開く</button>
  `;
  const btn = document.getElementById("openNextCourseBtn");
  if (btn) btn.onclick = () => openCourse(next.id);
}

function getRecommendedNextCourse(userId) {
  const dep = departmentOf(userId);
  const required = courses.filter((c) => (c.departments || []).includes(dep));
  const doneSet = new Set(Object.keys(progressDB[userId] || {}));
  const pending = required.filter((c) => !doneSet.has(c.id));
  return pending[0] || null;
}

function renderAdminTestPanel() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const rows = [];
  usersDB.filter((u) => u.role !== "admin").forEach((member) => {
    const tests = testDB[member.id] || {};
    Object.entries(tests).forEach(([courseId, rec]) => {
      const course = courses.find((c) => c.id === courseId);
      rows.push({
        userName: member.name,
        courseTitle: course ? course.title : courseId,
        category: course ? course.category : "未分類",
        attempts: (rec.attempts || []).length,
        score: rec.score,
        passed: rec.passed,
        testedAt: rec.testedAt
      });
    });
  });

  rows.sort((a, b) => (a.testedAt < b.testedAt ? 1 : -1));
  els.testSummaryBody.innerHTML = rows.length
    ? rows
      .map(
        (r) => `
      <tr>
        <td>${escapeHtml(r.userName)}</td>
        <td>${escapeHtml(r.courseTitle)}</td>
        <td>${r.attempts}</td>
        <td>${r.score}</td>
        <td>${r.passed ? "合格" : "不合格"}</td>
        <td>${formatDate(r.testedAt)}</td>
      </tr>
    `
      )
      .join("")
    : "<tr><td colspan=\"6\">テスト履歴はありません。</td></tr>";

  els.notificationList.innerHTML = notifications.length
    ? notifications
      .slice(0, 20)
      .map(
        (n) => `
      <li>
        <strong>上長通知</strong><br>
        ${escapeHtml(n.message)}<br>
        配信: ${n.delivery === "chatwork" ? "Chatwork送信済み" : n.delivery === "relay_error" ? "Relay送信失敗（ローカル記録済み）" : "ローカル記録"}<br>
        通知日時: ${formatDate(n.createdAt)}
      </li>
    `
      )
      .join("")
    : "<li>通知はありません。</li>";

  const categoryStats = {};
  rows.forEach((r) => {
    const category = r.category || "未分類";
    if (!categoryStats[category]) categoryStats[category] = { pass: 0, total: 0 };
    categoryStats[category].total += 1;
    if (r.passed) categoryStats[category].pass += 1;
  });
  const categoryRows = Object.entries(categoryStats)
    .sort((a, b) => a[0].localeCompare(b[0], "ja"))
    .map(([cat, s]) => {
      const rate = s.total ? Math.round((s.pass / s.total) * 100) : 0;
      return `<tr><td>${escapeHtml(cat)}</td><td>${s.pass}</td><td>${s.total}</td><td>${rate}%</td></tr>`;
    })
    .join("");
  els.categoryPassBody.innerHTML = categoryRows || "<tr><td colspan=\"4\">受験データはありません。</td></tr>";

  const pendingItems = usersDB.filter((u) => u.role !== "admin").flatMap((member) => {
    const dep = departmentOf(member.id);
    const needed = courses.filter((c) => (c.departments || []).includes(dep));
    const doneSet = new Set(Object.keys(progressDB[member.id] || {}));
    return needed
      .filter((c) => !doneSet.has(c.id))
      .map((c) => `<li><strong>${escapeHtml(member.name)}</strong> / ${escapeHtml(dep)}<br>未受講: ${escapeHtml(c.title)}</li>`);
  });
  els.pendingUserList.innerHTML = pendingItems.length ? pendingItems.join("") : "<li>未受講はありません。</li>";
}

function renderIntegrationSettings() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  els.chatworkRelayUrl.value = integration.chatworkRelayUrl || "";
  els.chatworkRoomId.value = integration.chatworkRoomId || "";
}

function renderTestAdminSettings() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  els.passScoreInput.value = testPolicy.passScore;
  els.retakeLimitInput.value = testPolicy.retakeLimit;
  els.testCategorySelect.innerHTML = CURRICULUM_ITEMS
    .map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`)
    .join("");
  if (!els.testCategorySelect.value) {
    els.testCategorySelect.value = CURRICULUM_ITEMS[0];
  }
  loadTestEditorFromCategory();
}

function saveTestPolicy() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  const passScore = Math.max(0, Math.min(100, Number(els.passScoreInput.value || DEFAULT_TEST_POLICY.passScore)));
  const retakeLimit = Math.max(1, Math.min(20, Number(els.retakeLimitInput.value || DEFAULT_TEST_POLICY.retakeLimit)));
  testPolicy = { passScore, retakeLimit };
  persistStores();
  renderTestStatus();
  alert("採点ポリシーを保存しました。");
}

function loadTestEditorFromCategory() {
  const category = els.testCategorySelect.value || CURRICULUM_ITEMS[0];
  const questions = testTemplates[category] || [];
  els.testQuestionEditor.value = JSON.stringify(questions, null, 2);
}

function saveTestEditorToCategory() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  const category = els.testCategorySelect.value;
  if (!category) return;

  let parsed;
  try {
    parsed = JSON.parse(els.testQuestionEditor.value);
  } catch {
    alert("問題JSONの形式が不正です。");
    return;
  }
  if (!Array.isArray(parsed) || !parsed.every(isValidQuestion)) {
    alert("question/options/answer 形式の配列にしてください。");
    return;
  }
  testTemplates[category] = parsed;
  persistStores();
  alert(`${category} の問題を保存しました。`);
}

function resetTestCategoryToDefault() {
  const category = els.testCategorySelect.value;
  if (!category) return;
  testTemplates[category] = TEST_TEMPLATES[category] ? JSON.parse(JSON.stringify(TEST_TEMPLATES[category])) : [];
  persistStores();
  loadTestEditorFromCategory();
  alert(`${category} の問題を初期化しました。`);
}

function isValidQuestion(item) {
  return (
    item &&
    typeof item.question === "string" &&
    Array.isArray(item.options) &&
    item.options.length >= 2 &&
    Number.isInteger(item.answer) &&
    item.answer >= 0 &&
    item.answer < item.options.length
  );
}

function saveIntegration() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  integration = {
    chatworkRelayUrl: els.chatworkRelayUrl.value.trim(),
    chatworkRoomId: els.chatworkRoomId.value.trim()
  };
  persistStores();
  els.integrationTestResult.textContent = "";
  alert("Chatwork連携設定を保存しました。");
}

async function testIntegration() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const relayUrl = els.chatworkRelayUrl.value.trim();
  const roomId = els.chatworkRoomId.value.trim();
  if (!relayUrl || !roomId) {
    els.integrationTestResult.textContent = "Relay URL と Room ID を設定してください。";
    return;
  }

  const original = { ...integration };
  integration.chatworkRelayUrl = relayUrl;
  integration.chatworkRoomId = roomId;

  els.integrationTestResult.textContent = "送信中...";
  const message = `[info][title]AI School 連携テスト[/title]管理画面からの接続テストです。\n送信日時: ${formatDate(new Date().toISOString())}[/info]`;
  const ok = await postToRelay(message);
  integration = original;
  els.integrationTestResult.textContent = ok
    ? "テスト通知を送信しました。Chatworkルームを確認してください。"
    : "テスト通知の送信に失敗しました。Relay URL または Relay サーバーログを確認してください。";
}

function renderHistoryKpis() {
  const user = currentUser();
  if (!user || user.role !== "admin" || !els.historyKpi) return;

  const members = usersDB.filter((u) => u.role !== "admin");
  const totalRequired = members.reduce((sum, member) => {
    const dep = departmentOf(member.id);
    return sum + courses.filter((c) => (c.departments || []).includes(dep)).length;
  }, 0);
  const totalCompleted = members.reduce((sum, member) => {
    const dep = departmentOf(member.id);
    const requiredIds = new Set(courses.filter((c) => (c.departments || []).includes(dep)).map((c) => c.id));
    const done = Object.keys(progressDB[member.id] || {}).filter((id) => requiredIds.has(id)).length;
    return sum + done;
  }, 0);
  const completionRate = totalRequired ? Math.round((totalCompleted / totalRequired) * 100) : 0;

  let testTotal = 0;
  let testPass = 0;
  Object.values(testDB).forEach((courseMap) => {
    Object.values(courseMap || {}).forEach((rec) => {
      testTotal += 1;
      if (rec.passed) testPass += 1;
    });
  });
  const passRate = testTotal ? Math.round((testPass / testTotal) * 100) : 0;

  const pendingUsers = members.filter((member) => {
    const dep = departmentOf(member.id);
    const requiredIds = courses.filter((c) => (c.departments || []).includes(dep)).map((c) => c.id);
    const doneSet = new Set(Object.keys(progressDB[member.id] || {}));
    return requiredIds.some((id) => !doneSet.has(id));
  }).length;

  els.historyKpi.innerHTML = `
    <article class="summary-card">
      <p>部署別受講率</p>
      <strong>${completionRate}%</strong>
    </article>
    <article class="summary-card">
      <p>テスト合格率</p>
      <strong>${passRate}%</strong>
    </article>
    <article class="summary-card">
      <p>未完了ユーザー</p>
      <strong>${pendingUsers}名</strong>
    </article>
  `;
}

function isCourseDone(courseId) {
  const user = currentUser();
  if (!user || !courseId) return false;
  return Boolean(progressDB[user.id] && progressDB[user.id][courseId]);
}

function renderHistorySummary() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const members = usersDB.filter((u) => u.role !== "admin");
  const rows = members.map((member) => {
    const items = Object.values(progressDB[member.id] || {});
    const lastUpdated = items.length ? formatDate(items.sort().at(-1)) : "-";
    return `
      <tr>
        <td>${escapeHtml(member.name)}</td>
        <td>${escapeHtml(departmentOf(member.id))}</td>
        <td>${items.length}</td>
        <td>${lastUpdated}</td>
      </tr>
    `;
  });

  els.historySummaryBody.innerHTML = rows.join("");
}

function renderHistoryDetail() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const targetUserId = els.historyUserSelect.value;
  if (!targetUserId) {
    els.historyDetailList.innerHTML = "<li>ユーザーを選択してください。</li>";
    return;
  }

  const records = progressDB[targetUserId] || {};
  const items = Object.entries(records)
    .map(([courseId, completedAt]) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return null;
      return {
        title: course.title,
        completedAt,
        category: course.category
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));

  if (!items.length) {
    els.historyDetailList.innerHTML = "<li>受講完了コースはありません。</li>";
    return;
  }

  els.historyDetailList.innerHTML = items
    .map(
      (item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong><br />
        カテゴリ: ${escapeHtml(item.category)}<br />
        完了日時: ${formatDate(item.completedAt)}
      </li>
    `
    )
    .join("");
}

function exportHistory() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  downloadJson(buildBackupPayload(), `ai-school-history-${new Date().toISOString().slice(0, 10)}.json`);
}

function exportBackupJson() {
  const payload = buildBackupPayload();
  downloadJson(payload, `ai-school-backup-${new Date().toISOString().slice(0, 10)}.json`);
}

function exportWeeklyBackup() {
  const payload = buildBackupPayload();
  const week = getIsoWeekNumber(new Date());
  downloadJson(payload, `ai-school-weekly-W${week}-${new Date().toISOString().slice(0, 10)}.json`);
}

function exportAdminCsv() {
  const lines = [
    ["user_id", "user_name", "department", "course_id", "course_title", "category", "completed_at", "test_score", "test_passed", "tested_at"].join(",")
  ];
  usersDB.filter((u) => u.role !== "admin").forEach((member) => {
    const dep = departmentOf(member.id);
    const completed = progressDB[member.id] || {};
    const tests = testDB[member.id] || {};
    const allCourseIds = new Set([...Object.keys(completed), ...Object.keys(tests)]);
    allCourseIds.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      const rec = tests[courseId] || {};
      const row = [
        member.id,
        csvEscape(member.name),
        csvEscape(dep),
        courseId,
        csvEscape(course ? course.title : ""),
        csvEscape(course ? course.category : ""),
        completed[courseId] || "",
        rec.score ?? "",
        rec.passed ?? "",
        rec.testedAt || ""
      ];
      lines.push(row.join(","));
    });
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ai-school-admin-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function importBackupJson(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result || "{}"));
      if (!confirm("バックアップを復元します。現在のデータは上書きされます。よろしいですか？")) return;
      usersDB = normalizeUsers(data.usersDB || usersDB);
      progressDB = asObject(data.progressDB || {});
      departmentDB = asObject(data.departmentDB || {});
      testDB = asObject(data.testDB || {});
      notifications = asArray(data.notifications || []);
      integration = { ...DEFAULT_INTEGRATION, ...asObject(data.integration || integration) };
      testTemplates = normalizeTemplates(data.testTemplates || testTemplates);
      testPolicy = normalizePolicy(data.testPolicy || testPolicy);
      chatMemory = normalizeChatMemory(data.chatMemory || chatMemory);
      chatKnowledge = normalizeChatKnowledge(data.chatKnowledge || chatKnowledge);
      aiChatConfig = normalizeAiChatConfig(data.aiChatConfig || aiChatConfig);
      aiGeminiUsage = normalizeGeminiUsage(data.aiGeminiUsage || aiGeminiUsage);
      hydrateStores();
      renderAllPanels();
      alert("バックアップを復元しました。");
    } catch {
      alert("バックアップJSONの読み込みに失敗しました。");
    } finally {
      els.importBackupInput.value = "";
    }
  };
  reader.readAsText(file);
}

function buildBackupPayload() {
  return {
    exportedAt: new Date().toISOString(),
    usersDB,
    progressDB,
    departmentDB,
    testDB,
    notifications,
    integration,
    testTemplates,
    testPolicy,
    chatMemory,
    chatKnowledge,
    aiChatConfig,
    aiGeminiUsage
  };
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function getIsoWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function csvEscape(v) {
  const s = String(v ?? "");
  return `"${s.replaceAll('"', '""')}"`;
}

function resetSelectedUserHistory() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const targetUserId = els.historyUserSelect.value;
  if (!targetUserId) return;
  if (!confirm("選択ユーザーの受講履歴とテスト履歴を初期化します。よろしいですか？")) return;

  progressDB[targetUserId] = {};
  testDB[targetUserId] = {};
  persistStores();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderHistoryKpis();
}

function assignDepartmentToUser() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const targetUserId = els.assignUserSelect.value;
  const department = els.assignDepartmentSelect.value;
  if (!targetUserId || !department) return;

  departmentDB[targetUserId] = department;
  persistStores();
  fillAdminSelectors();
  renderHistorySummary();
  renderHistoryKpis();
  renderCurriculumCards();
}

function renderUserAdminPanel() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const departments = allDepartments();
  els.newUserDepartmentSelect.innerHTML = departments
    .map((dep) => `<option value="${escapeHtml(dep)}">${escapeHtml(dep)}</option>`)
    .join("");
  if (!els.newUserDepartmentSelect.value) {
    els.newUserDepartmentSelect.value = "その他";
  }

  const rows = usersDB
    .slice()
    .sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name, "ja") : a.role === "admin" ? -1 : 1))
    .map((u) => `
      <tr>
        <td>${escapeHtml(u.name)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${escapeHtml(departmentOf(u.id))}</td>
        <td>${u.role === "admin" ? "管理者" : "一般"}</td>
        <td>${u.active === false ? "<span class=\"status-ng\">停止中</span>" : "<span class=\"status-ok\">有効</span>"}</td>
        <td>
          <button type="button" class="btn btn-ghost" data-reset-user-id="${escapeHtml(u.id)}">PW再発行</button>
          <button type="button" class="btn ${u.active === false ? "btn-primary" : "btn-danger"}" data-toggle-user-id="${escapeHtml(u.id)}">
            ${u.active === false ? "有効化" : "無効化"}
          </button>
          <button type="button" class="btn btn-danger" data-delete-user-id="${escapeHtml(u.id)}">削除</button>
        </td>
      </tr>
    `)
    .join("");
  els.userAccountBody.innerHTML = rows || "<tr><td colspan=\"6\">ユーザーがいません。</td></tr>";

  els.userAccountBody.querySelectorAll("button[data-reset-user-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-reset-user-id");
      resetUserPassword(id);
    });
  });
  els.userAccountBody.querySelectorAll("button[data-toggle-user-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-toggle-user-id");
      toggleUserActive(id);
    });
  });
  els.userAccountBody.querySelectorAll("button[data-delete-user-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-delete-user-id");
      deleteUserAccount(id);
    });
  });
}

function createSingleUser() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const name = (els.newUserNameInput.value || "").trim();
  const email = (els.newUserEmailInput.value || "").trim().toLowerCase();
  const department = (els.newUserDepartmentSelect.value || "その他").trim();
  const password = (els.newUserPasswordInput.value || "user123").trim() || "user123";
  const role = els.newUserRoleSelect.value === "admin" ? "admin" : "member";

  if (!name || !email) {
    els.userIssueResult.textContent = "氏名とメールアドレスを入力してください。";
    return;
  }
  if (!isValidEmail(email)) {
    els.userIssueResult.textContent = "メールアドレス形式が不正です。";
    return;
  }
  if (usersDB.some((u) => u.email.toLowerCase() === email)) {
    els.userIssueResult.textContent = "同じメールアドレスのユーザーが既に存在します。";
    return;
  }

  const id = buildUserIdFromEmail(email);
  usersDB.push({ id, name, email, password, role, department, active: true });
  if (!progressDB[id]) progressDB[id] = {};
  if (!testDB[id]) testDB[id] = {};
  departmentDB[id] = department || "その他";
  persistStores();
  fillAdminSelectors();
  renderUserAdminPanel();
  renderHistorySummary();
  renderHistoryDetail();
  renderHistoryKpis();
  renderCurriculumCards();

  els.newUserNameInput.value = "";
  els.newUserEmailInput.value = "";
  els.newUserPasswordInput.value = "";
  els.newUserRoleSelect.value = "member";
  els.userIssueResult.textContent = `ユーザーを発行しました: ${email} / 初期PW: ${password}`;
}

function importUsersFromCsv() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  const raw = (els.bulkUserCsvInput.value || "").trim();
  if (!raw) {
    els.userIssueResult.textContent = "CSV内容を貼り付けてください。";
    return;
  }

  const rows = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!rows.length) return;
  let start = 0;
  const first = rows[0].toLowerCase();
  if (first.includes("name") && first.includes("email")) {
    start = 1;
  }

  let created = 0;
  const errors = [];
  for (let i = start; i < rows.length; i += 1) {
    const cols = rows[i].split(",").map((x) => x.trim());
    const [name, emailRaw, depRaw, passRaw, roleRaw] = cols;
    const email = String(emailRaw || "").toLowerCase();
    const department = depRaw || "その他";
    const password = passRaw || "user123";
    const role = roleRaw === "admin" ? "admin" : "member";

    if (!name || !email) {
      errors.push(`${i + 1}行目: name/email が不足`);
      continue;
    }
    if (!isValidEmail(email)) {
      errors.push(`${i + 1}行目: email 形式不正`);
      continue;
    }
    if (usersDB.some((u) => u.email.toLowerCase() === email)) {
      errors.push(`${i + 1}行目: 既存emailと重複`);
      continue;
    }

    const id = buildUserIdFromEmail(email);
    usersDB.push({ id, name, email, password, role, department, active: true });
    if (!progressDB[id]) progressDB[id] = {};
    if (!testDB[id]) testDB[id] = {};
    departmentDB[id] = department || "その他";
    created += 1;
  }

  persistStores();
  fillAdminSelectors();
  renderUserAdminPanel();
  renderHistorySummary();
  renderHistoryDetail();
  renderHistoryKpis();
  renderCurriculumCards();
  els.userIssueResult.textContent = errors.length
    ? `CSV発行: ${created}件成功 / ${errors.length}件失敗（例: ${errors.slice(0, 2).join(" / ")}）`
    : `CSV発行: ${created}件成功`;
}

function buildUserIdFromEmail(email) {
  const base = `u-${String(email).split("@")[0].replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "member"}`;
  let id = base;
  let seq = 1;
  while (usersDB.some((u) => u.id === id)) {
    id = `${base}-${seq}`;
    seq += 1;
  }
  return id;
}

function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email || ""));
}

function resetUserPassword(targetUserId) {
  const admin = currentUser();
  if (!admin || admin.role !== "admin") return;
  const target = usersDB.find((u) => u.id === targetUserId);
  if (!target) return;

  const nextPassword = prompt(`${target.name} の新しいパスワードを入力してください`, "user123");
  if (nextPassword == null) return;
  const password = String(nextPassword).trim();
  if (!password) {
    els.userIssueResult.textContent = "パスワードは空にできません。";
    return;
  }
  target.password = password;
  persistStores();
  els.userIssueResult.textContent = `${target.email} のパスワードを再発行しました。`;
}

function toggleUserActive(targetUserId) {
  const admin = currentUser();
  if (!admin || admin.role !== "admin") return;
  const target = usersDB.find((u) => u.id === targetUserId);
  if (!target) return;

  if (target.id === admin.id && target.active !== false) {
    els.userIssueResult.textContent = "ログイン中の管理者アカウントは無効化できません。";
    return;
  }

  if (target.role === "admin" && target.active !== false) {
    const activeAdminCount = usersDB.filter((u) => u.role === "admin" && u.active !== false).length;
    if (activeAdminCount <= 1) {
      els.userIssueResult.textContent = "最後の有効な管理者は無効化できません。";
      return;
    }
  }

  target.active = target.active === false;
  persistStores();
  renderUserAdminPanel();
  els.userIssueResult.textContent = `${target.email} を ${target.active === false ? "停止" : "有効化"} しました。`;
}

function deleteUserAccount(targetUserId) {
  const admin = currentUser();
  if (!admin || admin.role !== "admin") return;
  const idx = usersDB.findIndex((u) => u.id === targetUserId);
  if (idx < 0) return;
  const target = usersDB[idx];

  if (target.id === admin.id) {
    els.userIssueResult.textContent = "ログイン中の管理者アカウントは削除できません。";
    return;
  }
  if (target.role === "admin") {
    const activeAdminCount = usersDB.filter((u) => u.role === "admin" && u.active !== false).length;
    if (activeAdminCount <= 1) {
      els.userIssueResult.textContent = "最後の有効な管理者アカウントは削除できません。";
      return;
    }
  }

  const ok = confirm(`${target.name} (${target.email}) を削除します。よろしいですか？`);
  if (!ok) return;
  exportSingleUserBackupCsv(targetUserId);
  const deleteHistory = confirm("このユーザーの受講履歴・テスト履歴も削除しますか？\nOK: 履歴も削除 / キャンセル: アカウントのみ削除");

  usersDB.splice(idx, 1);
  delete departmentDB[targetUserId];
  if (deleteHistory) {
    delete progressDB[targetUserId];
    delete testDB[targetUserId];
    notifications = notifications.filter((n) => n.userId !== targetUserId);
  }
  delete aiGeminiUsage[targetUserId];

  persistStores();
  fillAdminSelectors();
  renderUserAdminPanel();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderHistoryKpis();
  renderCurriculumCards();

  els.userIssueResult.textContent = `${target.email} を削除しました${deleteHistory ? "（履歴も削除）" : "（履歴は保持）"}。`;
}

function exportSingleUserBackupCsv(userId) {
  const target = usersDB.find((u) => u.id === userId);
  if (!target) return;

  const dep = departmentOf(target.id);
  const completed = progressDB[target.id] || {};
  const tests = testDB[target.id] || {};
  const allCourseIds = new Set([...Object.keys(completed), ...Object.keys(tests)]);
  const lines = [
    ["user_id", "user_name", "email", "department", "role", "course_id", "course_title", "category", "completed_at", "test_score", "test_passed", "tested_at"].join(",")
  ];

  if (!allCourseIds.size) {
    lines.push([
      csvEscape(target.id),
      csvEscape(target.name),
      csvEscape(target.email),
      csvEscape(dep),
      csvEscape(target.role),
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ].join(","));
  } else {
    allCourseIds.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      const rec = tests[courseId] || {};
      lines.push([
        csvEscape(target.id),
        csvEscape(target.name),
        csvEscape(target.email),
        csvEscape(dep),
        csvEscape(target.role),
        csvEscape(courseId),
        csvEscape(course ? course.title : ""),
        csvEscape(course ? course.category : ""),
        csvEscape(completed[courseId] || ""),
        csvEscape(rec.score ?? ""),
        csvEscape(rec.passed ?? ""),
        csvEscape(rec.testedAt || "")
      ].join(","));
    });
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ai-school-user-backup-${target.id}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderCurriculumCards() {
  const currentDepartment = currentUser() ? departmentOf(currentUser().id) : "";

  els.curriculumCards.innerHTML = "";
  CURRICULUM_ITEMS.forEach((item) => {
    const list = courses
      .filter((course) => course.category === item)
      .slice(0, 5);

    const card = document.createElement("article");
    card.className = "curriculum-card";
    card.innerHTML = `
      <h3>${escapeHtml(item)}</h3>
      <ul>
        ${
          list.length
            ? list
              .map((course) => {
                const deps = escapeHtml((course.departments || []).join(" / "));
                return `<li>${escapeHtml(course.title)} (${escapeHtml(course.duration)})<br><strong>対象部署:</strong> ${deps}${(course.departments || []).includes(currentDepartment) ? " <strong>(あなた向け)</strong>" : ""}</li>`;
              })
              .join("")
            : "<li>該当コースはありません。</li>"
        }
      </ul>
    `;
    els.curriculumCards.appendChild(card);
  });
}

function allDepartments() {
  const fixed = ["新人研修", "営業", "運用", "経理・総務", "その他"];
  const fromCourses = courses.flatMap((course) => course.departments || []);
  const fromUsers = Object.values(departmentDB);
  return [...new Set([...fixed, ...fromCourses, ...fromUsers].filter((dep) => dep))].sort();
}

function departmentOf(userId) {
  return departmentDB[userId] || "未設定";
}

function renderAllPanels() {
  fillCategoryOptions();
  fillDepartmentFilter();
  fillAdminSelectors();
  renderIntegrationSettings();
  renderTestAdminSettings();
  renderCourseList();
  renderNextCourseCard();
  renderTestStatus();
  renderHistorySummary();
  renderHistoryDetail();
  renderAdminTestPanel();
  renderHistoryKpis();
  renderVideoReadinessPanel();
  renderUserAdminPanel();
  renderCurriculumCards();
  renderAssistantPanel();
}

async function renderVideoReadinessPanel() {
  const user = currentUser();
  if (!user || user.role !== "admin" || !els.videoReadinessBody) return;
  if (!courses.length) {
    els.videoReadinessBody.innerHTML = "<tr><td colspan=\"4\">コースがありません。</td></tr>";
    return;
  }

  const checks = await Promise.all(
    courses.map(async (course) => {
      const ok = await isVideoReachable(course.video);
      const status = ok ? "準備OK" : "未配置/未公開";
      const cls = ok ? "status-ok" : "status-ng";
      return `
        <tr>
          <td>${escapeHtml(course.title)}</td>
          <td>${escapeHtml(course.category)}</td>
          <td><code>${escapeHtml(course.video || "")}</code></td>
          <td><span class="${cls}">${status}</span></td>
        </tr>
      `;
    })
  );

  els.videoReadinessBody.innerHTML = checks.join("");
}

async function isVideoReachable(path) {
  const key = String(path || "");
  if (!key) return false;
  if (Object.prototype.hasOwnProperty.call(videoAvailabilityCache, key)) {
    return videoAvailabilityCache[key];
  }

  try {
    const res = await fetch(key, { method: "HEAD", cache: "no-store" });
    videoAvailabilityCache[key] = res.ok;
    return res.ok;
  } catch {
    videoAvailabilityCache[key] = false;
    return false;
  }
}

function renderAssistantPanel() {
  const user = currentUser();
  if (!user || !els.chatMessages) return;

  if (!chatMemory.length) {
    els.chatMessages.innerHTML = `
      <article class="chat-msg bot">
        <div class="chat-role">AIアシスタント</div>
        こんにちは。部署別カリキュラム、テスト、運用ルールの質問に回答できます。
      </article>
    `;
  } else {
    const list = chatMemory.slice(-40);
    els.chatMessages.innerHTML = list
      .map((item) => {
        const sourceLine = item.sources && item.sources.length
          ? `<span class="chat-sources">参照: ${escapeHtml(item.sources.join(" / "))}</span>`
          : "";
        return `
          <article class="chat-msg ${item.role === "user" ? "user" : "bot"}">
            <div class="chat-role">${item.role === "user" ? "あなた" : "AIアシスタント"}</div>
            ${escapeHtml(item.text)}
            ${sourceLine}
          </article>
        `;
      })
      .join("");
  }

  if (els.knowledgeList) {
    renderKnowledgeList();
  }
  renderAiConfigPanel();
  if (shouldAutoScrollChat) {
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
    shouldAutoScrollChat = false;
  } else {
    els.chatMessages.scrollTop = 0;
  }
}

async function sendChatMessage() {
  const user = currentUser();
  if (!user) return;
  const text = (els.chatInput.value || "").trim();
  if (!text) return;

  els.sendChatBtn.disabled = true;
  els.sendChatBtn.textContent = "送信中...";
  try {
    pushChatMessage("user", text);
    const result = await resolveAssistantAnswer(text, user);
    pushChatMessage("bot", result.answer, result.sources);
    els.chatInput.value = "";
    shouldAutoScrollChat = true;
    persistStores();
    renderAssistantPanel();
  } finally {
    els.sendChatBtn.disabled = false;
    els.sendChatBtn.textContent = "送信";
  }
}

function clearChatMemory() {
  if (!confirm("AIチャット履歴を削除します。よろしいですか？")) return;
  chatMemory = [];
  persistStores();
  renderAssistantPanel();
}

function pushChatMessage(role, text, sources = []) {
  const item = {
    id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text: String(text || "").trim(),
    sources: asArray(sources).map((x) => String(x)),
    createdAt: new Date().toISOString(),
    keywords: extractKeywords(text).slice(0, 16)
  };
  chatMemory.push(item);
  if (chatMemory.length > 250) {
    chatMemory = chatMemory.slice(chatMemory.length - 250);
  }
}

function saveKnowledgeEntry() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;

  const title = (els.knowledgeTitleInput.value || "").trim();
  const content = (els.knowledgeContentInput.value || "").trim();
  const tags = (els.knowledgeTagsInput.value || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!title || !content) {
    alert("タイトルと内容を入力してください。");
    return;
  }

  const item = {
    id: `k-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    content,
    tags,
    createdAt: new Date().toISOString(),
    author: user.name
  };
  chatKnowledge.unshift(item);
  chatKnowledge = chatKnowledge.slice(0, 300);
  els.knowledgeTitleInput.value = "";
  els.knowledgeContentInput.value = "";
  els.knowledgeTagsInput.value = "";
  persistStores();
  renderKnowledgeList();
}

function renderKnowledgeList() {
  const user = currentUser();
  if (!els.knowledgeList || !user || user.role !== "admin") return;

  if (!chatKnowledge.length) {
    els.knowledgeList.innerHTML = "<li>ナレッジはまだありません。</li>";
    return;
  }

  els.knowledgeList.innerHTML = chatKnowledge
    .slice(0, 20)
    .map((item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong><br>
        ${escapeHtml(item.content).slice(0, 140)}${item.content.length > 140 ? "..." : ""}<br>
        タグ: ${escapeHtml((item.tags || []).join(", ") || "-")} / 登録: ${formatDate(item.createdAt)}
        <br><button type="button" class="btn btn-ghost" data-knowledge-id="${escapeHtml(item.id)}">削除</button>
      </li>
    `)
    .join("");

  els.knowledgeList.querySelectorAll("button[data-knowledge-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-knowledge-id");
      chatKnowledge = chatKnowledge.filter((x) => x.id !== id);
      persistStores();
      renderKnowledgeList();
    });
  });
}

function renderAiConfigPanel() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  if (!els.aiModeSelect) return;
  els.aiModeSelect.value = aiChatConfig.mode;
  els.aiRelayUrlInput.value = aiChatConfig.relayUrl || "";
  els.aiModelInput.value = aiChatConfig.model || "";
  els.aiDailyLimitInput.value = aiChatConfig.dailyLimitPerUser;
  els.aiConfigHint.textContent = aiChatConfig.relayUrl
    ? `現在: ${aiChatConfig.mode} / ${aiChatConfig.model} / 日次上限: ${formatDailyLimit(aiChatConfig.dailyLimitPerUser)}`
    : "Gemini Relay URL未設定。ローカル回答のみで動作します。";
}

function saveAiChatConfig() {
  const user = currentUser();
  if (!user || user.role !== "admin") return;
  aiChatConfig = normalizeAiChatConfig({
    mode: els.aiModeSelect.value,
    relayUrl: (els.aiRelayUrlInput.value || "").trim(),
    model: (els.aiModelInput.value || "").trim(),
    dailyLimitPerUser: Number(els.aiDailyLimitInput.value || DEFAULT_AI_CHAT_CONFIG.dailyLimitPerUser)
  });
  persistStores();
  renderAiConfigPanel();
  alert("AI連携設定を保存しました。");
}

async function resolveAssistantAnswer(query, user) {
  const mode = aiChatConfig.mode;
  const canUseGemini = Boolean(aiChatConfig.relayUrl);
  const local = generateAssistantAnswer(query, user);
  if (mode === "local" || !canUseGemini) return local;

  if (isGeminiDailyLimitExceeded(user.id)) {
    return {
      answer: `${local.answer}\n\n（本日分のGemini利用上限に達したため、ローカル回答に切り替えました）`,
      sources: [...asArray(local.sources), "日次上限によりローカル切替"]
    };
  }

  try {
    const external = await requestGeminiAnswer(query, user);
    increaseGeminiUsage(user.id);
    if (external && external.answer) {
      if (mode === "hybrid") {
        const hasUsefulLocal = !asArray(local.sources).includes("ナレッジ未登録");
        if (!hasUsefulLocal) {
          return {
            answer: external.answer,
            sources: asArray(external.sources).slice(0, 6)
          };
        }
        return {
          answer: `${external.answer}\n\n[補足]\n${local.answer}`,
          sources: [...asArray(external.sources), ...asArray(local.sources)].slice(0, 6)
        };
      }
      return external;
    }
  } catch (e) {
    const detail = e && e.message ? `（詳細: ${String(e.message).slice(0, 140)}）` : "";
    return {
      answer: `${local.answer}\n\n（Gemini連携に失敗したため、ローカル回答を表示しました）${detail}`,
      sources: [...asArray(local.sources), "Gemini連携失敗"]
    };
  }
  return local;
}

async function requestGeminiAnswer(query, user) {
  const contextDocs = searchKnowledge(query, 6);
  const recent = chatMemory.slice(-8).map((m) => ({ role: m.role, text: m.text }));
  const payload = {
    query,
    user: { id: user.id, name: user.name, department: departmentOf(user.id) },
    policy: testPolicy,
    model: aiChatConfig.model,
    context: contextDocs,
    recent
  };

  const res = await fetch(aiChatConfig.relayUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`relay ${res.status}: ${body.slice(0, 180) || "unknown_error"}`);
  }
  const data = await res.json().catch(() => ({}));
  if (!data || typeof data.answer !== "string" || !data.answer.trim()) {
    throw new Error("relay response invalid");
  }
  return {
    answer: String(data.answer || "").trim(),
    sources: asArray(data.sources).map((x) => String(x))
  };
}

function isGeminiDailyLimitExceeded(userId) {
  const limit = Number(aiChatConfig.dailyLimitPerUser || 0);
  if (limit <= 0) return false;
  const today = todayKey();
  const count = Number((aiGeminiUsage[userId] && aiGeminiUsage[userId][today]) || 0);
  return count >= limit;
}

function increaseGeminiUsage(userId) {
  const today = todayKey();
  if (!aiGeminiUsage[userId]) aiGeminiUsage[userId] = {};
  aiGeminiUsage[userId][today] = Number(aiGeminiUsage[userId][today] || 0) + 1;
}

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDailyLimit(limit) {
  return Number(limit) <= 0 ? "無制限" : `${limit}回`;
}

function generateAssistantAnswer(query, user) {
  const normalized = query.trim();
  const lower = normalized.toLowerCase();

  if (lower.includes("合格") && (lower.includes("ライン") || lower.includes("点"))) {
    return {
      answer: `現在の合格ラインは ${testPolicy.passScore} 点、再受験上限は ${testPolicy.retakeLimit} 回です。`,
      sources: ["テスト運用設定"]
    };
  }

  if (lower.includes("次") && (lower.includes("コース") || lower.includes("おすすめ"))) {
    const next = getRecommendedNextCourse(user.id);
    return next
      ? {
        answer: `次のおすすめは「${next.title}」です。カテゴリは ${next.category}、想定時間は ${next.duration} です。`,
        sources: ["コースデータ"]
      }
      : {
        answer: "現在、あなた向けの未受講おすすめコースはありません。",
        sources: ["受講進捗"]
      };
  }

  const hits = searchKnowledge(normalized, 3);
  if (!hits.length) {
    return {
      answer: "該当情報が少ないため、管理者にナレッジ登録を依頼してください。質問をもう少し具体化すると精度が上がります。",
      sources: ["ナレッジ未登録"]
    };
  }

  const lines = hits.map((h, idx) => `${idx + 1}. ${h.summary}`).join("\n");
  return {
    answer: `関連情報を見つけました。\n${lines}\n\n必要なら「このテーマの手順を詳しく」と続けて質問してください。`,
    sources: hits.map((h) => h.source)
  };
}

function searchKnowledge(query, limit = 3) {
  const keys = extractKeywords(query);
  const docs = buildKnowledgeDocs();
  return docs
    .map((doc) => ({ ...doc, score: scoreDoc(doc.text, keys) }))
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function buildKnowledgeDocs() {
  const docs = [];

  courses.forEach((course) => {
    docs.push({
      source: `コース:${course.title}`,
      text: `${course.title} ${course.category} ${(course.departments || []).join(" ")} ${course.description}`,
      summary: `${course.title}（${course.category}）: ${course.description}`
    });
  });

  Object.entries(testTemplates || {}).forEach(([category, arr]) => {
    const first = Array.isArray(arr) ? arr[0] : null;
    docs.push({
      source: `テスト:${category}`,
      text: `${category} ${(arr || []).map((q) => q.question).join(" ")}`,
      summary: `${category} テスト問題数: ${(arr || []).length}${first ? ` / 例: ${first.question}` : ""}`
    });
  });

  chatKnowledge.forEach((k) => {
    docs.push({
      source: `ナレッジ:${k.title}`,
      text: `${k.title} ${(k.tags || []).join(" ")} ${k.content}`,
      summary: `${k.title}: ${k.content.slice(0, 70)}${k.content.length > 70 ? "..." : ""}`
    });
  });

  chatMemory
    .filter((m) => m.role === "bot")
    .slice(-40)
    .forEach((m) => {
      docs.push({
        source: "過去回答",
        text: m.text,
        summary: m.text.slice(0, 90)
      });
    });

  return docs;
}

function scoreDoc(text, keys) {
  if (!text || !keys.length) return 0;
  const lower = text.toLowerCase();
  let score = 0;
  keys.forEach((k) => {
    const kk = k.toLowerCase();
    if (lower.includes(kk)) score += 2;
  });
  return score;
}

function extractKeywords(text) {
  const tokens = String(text || "").match(/[A-Za-z0-9ぁ-んァ-ヶ一-龠ー]{2,}/g) || [];
  return [...new Set(tokens)];
}

function currentUser() {
  if (!session) return null;
  return findUserById(session.userId);
}

function findUserById(userId) {
  return usersDB.find((user) => user.id === userId) || null;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTemplates(value) {
  const base = JSON.parse(JSON.stringify(TEST_TEMPLATES));
  const src = asObject(value);
  Object.entries(src).forEach(([key, arr]) => {
    if (Array.isArray(arr) && arr.every(isValidQuestion)) {
      base[key] = arr;
    }
  });
  return base;
}

function normalizePolicy(value) {
  const src = asObject(value);
  const passScore = Number.isFinite(Number(src.passScore)) ? Number(src.passScore) : DEFAULT_TEST_POLICY.passScore;
  const retakeLimit = Number.isFinite(Number(src.retakeLimit)) ? Number(src.retakeLimit) : DEFAULT_TEST_POLICY.retakeLimit;
  return {
    passScore: Math.max(0, Math.min(100, passScore)),
    retakeLimit: Math.max(1, Math.min(20, retakeLimit))
  };
}

function normalizeUsers(value) {
  const list = asArray(value);
  const out = [];
  const emailSet = new Set();
  list.forEach((item, idx) => {
    const email = String(item.email || "").trim().toLowerCase();
    if (!email || emailSet.has(email)) return;
    const role = item.role === "admin" ? "admin" : "member";
    const idRaw = String(item.id || "").trim();
    const id = idRaw || `u-import-${idx}`;
    out.push({
      id,
      name: String(item.name || email.split("@")[0] || "user").trim(),
      email,
      password: String(item.password || "user123"),
      role,
      department: String(item.department || "その他").trim() || "その他",
      active: item.active === false ? false : true
    });
    emailSet.add(email);
  });
  if (!out.length) {
    return DEFAULT_USERS.map((u) => ({ ...u }));
  }
  if (!out.some((u) => u.role === "admin")) {
    const sameMail = out.find((u) => u.email.toLowerCase() === DEFAULT_USERS[0].email.toLowerCase());
    if (sameMail) {
      sameMail.role = "admin";
      sameMail.active = true;
    } else {
      out.unshift({ ...DEFAULT_USERS[0] });
    }
  }
  return out;
}

function normalizeChatMemory(value) {
  return asArray(value)
    .map((item) => ({
      id: String(item.id || `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      role: item.role === "user" ? "user" : "bot",
      text: String(item.text || "").trim(),
      sources: asArray(item.sources).map((x) => String(x)),
      createdAt: String(item.createdAt || new Date().toISOString()),
      keywords: asArray(item.keywords).map((x) => String(x))
    }))
    .filter((item) => item.text);
}

function normalizeChatKnowledge(value) {
  return asArray(value)
    .map((item) => ({
      id: String(item.id || `k-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
      title: String(item.title || "").trim(),
      content: String(item.content || "").trim(),
      tags: asArray(item.tags).map((x) => String(x).trim()).filter(Boolean),
      createdAt: String(item.createdAt || new Date().toISOString()),
      author: String(item.author || "admin")
    }))
    .filter((item) => item.title && item.content);
}

function normalizeAiChatConfig(value) {
  const src = asObject(value);
  const mode = ["local", "gemini", "hybrid"].includes(src.mode) ? src.mode : DEFAULT_AI_CHAT_CONFIG.mode;
  const dailyLimitPerUser = Number.isFinite(Number(src.dailyLimitPerUser))
    ? Math.max(0, Math.min(500, Number(src.dailyLimitPerUser)))
    : DEFAULT_AI_CHAT_CONFIG.dailyLimitPerUser;
  return {
    mode,
    relayUrl: String(src.relayUrl || "").trim(),
    model: String(src.model || DEFAULT_AI_CHAT_CONFIG.model).trim() || DEFAULT_AI_CHAT_CONFIG.model,
    dailyLimitPerUser
  };
}

function normalizeGeminiUsage(value) {
  const root = asObject(value);
  const out = {};
  Object.entries(root).forEach(([userId, dayMap]) => {
    const src = asObject(dayMap);
    const next = {};
    Object.entries(src).forEach(([day, count]) => {
      const n = Number(count);
      if (!Number.isNaN(n) && n >= 0 && day.match(/^\d{4}-\d{2}-\d{2}$/)) {
        next[day] = Math.floor(n);
      }
    });
    out[userId] = next;
  });
  return out;
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ja-JP", { hour12: false });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
