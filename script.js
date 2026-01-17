const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.style.display === "flex";
  navMenu.style.display = isOpen ? "none" : "flex";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

// Close menu when clicking a link (mobile)
navMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && window.innerWidth <= 720) {
    navMenu.style.display = "none";
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Toast
const toast = document.getElementById("toast");
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

document.getElementById("demoToastBtn")?.addEventListener("click", () => {
  showToast("דמו: כך נראית הנגשה — נתון + הסבר + משמעות + שאלה אזרחית.");
});

document.getElementById("fakeSendBtn")?.addEventListener("click", () => {
  showToast("נשלח (דמו). אם תרצי, נחבר את הטופס למערכת אמיתית.");
});

// Topic modal data
const topics = {
  housing: {
    title: "🏠 דיור",
    desc: "הבנה של מגמות מחירים, היצע, ושינויים בין שכונות — ומה זה אומר על נגישות לדיור בעיר.",
    questions: [
      "האם יש פערים גדולים במחירי שכירות בין שכונות?",
      "איפה יש יותר בנייה חדשה ואיפה פחות?",
      "האם יש תוכניות שמגדילות דיור בר־השגה?"
    ]
  },
  transport: {
    title: "🚍 תחבורה",
    desc: "תדירות קווים, זמני המתנה וכיסוי שכונות — כדי להבין האם השירות באמת נגיש לכולם.",
    questions: [
      "האם תדירות הקווים שווה בין שכונות מרכז לפריפריה?",
      "איפה זמני ההמתנה הארוכים ביותר?",
      "האם יש אזורים עם כיסוי תחבורתי נמוך?"
    ]
  },
  education: {
    title: "🎓 חינוך",
    desc: "צפיפות בכיתות, נגישות למסגרות והקצאת משאבים — ומה זה אומר על שוויון הזדמנויות.",
    questions: [
      "האם יש פערים בצפיפות הכיתות בין אזורים?",
      "מה המרחק הממוצע למסגרות חינוך בשכונות שונות?",
      "איך נראית הקצאת משאבים לאורך זמן?"
    ]
  },
  environment: {
    title: "🌱 סביבה",
    desc: "איכות אוויר, פסולת ושטחים ירוקים — נתונים שמתחברים לבריאות ולאיכות חיים.",
    questions: [
      "איפה יש יותר שטחים ירוקים לנפש?",
      "האם יש מוקדים חוזרים של מפגעים סביבתיים?",
      "מה המגמות באיכות האוויר לאורך השנה?"
    ]
  },
  safety: {
    title: "🛡️ ביטחון אישי",
    desc: "תאורה, מוקדי סיכון ודיווחים ציבוריים (בהתאם לזמינות נתונים) — כדי לשפר תחושת ביטחון בעיר.",
    questions: [
      "איפה חסרה תאורה ציבורית?",
      "האם יש אזורים עם ריבוי דיווחים לאורך זמן?",
      "אילו פעולות עירוניות עשויות להשפיע על תחושת הביטחון?"
    ]
  },
  services: {
    title: "🏛️ שירותים עירוניים",
    desc: "זמני טיפול בפניות, ניקיון, נגישות ושירות — כדי להבין יעילות ושקיפות בשירותי העירייה.",
    questions: [
      "כמה זמן לוקח בממוצע לטפל בפנייה?",
      "האם זמני טיפול שונים בין שכונות?",
      "באילו תחומים יש הכי הרבה פניות חוזרות?"
    ]
  }
};

// Modal behavior
const modal = document.getElementById("topicModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalQuestions = document.getElementById("modalQuestions");

function openTopic(topicKey) {
  const t = topics[topicKey];
  if (!t || !modal) return;

  modalTitle.textContent = t.title;
  modalDesc.textContent = t.desc;

  modalQuestions.innerHTML = "";
  t.questions.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = q;
    modalQuestions.appendChild(li);
  });

  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "true"); // fallback
}

document.querySelectorAll(".topic").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openTopic(el.dataset.topic);
  });
});

document.getElementById("modalClose")?.addEventListener("click", () => modal?.close());
document.getElementById("modalBack")?.addEventListener("click", () => modal?.close());

// Close modal on outside click
modal?.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const inDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;

  if (!inDialog) modal.close();
});
// ---------- Simple "auth" + feedback storage (DEMO only) ----------
const AUTH_PASS = "1111"; // demo only

const authorityPasswordBox = document.getElementById("authorityPasswordBox");
const authorityPass = document.getElementById("authorityPass");
const citySelect = document.getElementById("citySelect");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginStateHint = document.getElementById("loginStateHint");

const authorityDashboard = document.getElementById("authorityDashboard");
const dashCityName = document.getElementById("dashCityName");
const feedbackList = document.getElementById("feedbackList");

const identityMode = document.getElementById("identityMode");
const nameBox = document.getElementById("nameBox");
const senderName = document.getElementById("senderName");

const feedbackCity = document.getElementById("feedbackCity");
const feedbackMessage = document.getElementById("feedbackMessage");
const sendFeedbackBtn = document.getElementById("sendFeedbackBtn");

const addCityDataBtn = document.getElementById("addCityDataBtn");
const cityDataTitle = document.getElementById("cityDataTitle");
const cityDataBody = document.getElementById("cityDataBody");
const cityDataList = document.getElementById("cityDataList");

function getRole() {
  const checked = document.querySelector('input[name="role"]:checked');
  return checked ? checked.value : "resident";
}

function setSession(session) {
  localStorage.setItem("oc_session", JSON.stringify(session));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("oc_session") || "null");
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("oc_session");
}

function readFeedbacks() {
  try {
    return JSON.parse(localStorage.getItem("oc_feedbacks") || "[]");
  } catch {
    return [];
  }
}

function writeFeedbacks(items) {
  localStorage.setItem("oc_feedbacks", JSON.stringify(items));
}

function readCityData() {
  try {
    return JSON.parse(localStorage.getItem("oc_citydata") || "[]");
  } catch {
    return [];
  }
}

function writeCityData(items) {
  localStorage.setItem("oc_citydata", JSON.stringify(items));
}

function renderAuthorityView() {
  const session = getSession();

  if (!session || session.role !== "authority") {
    authorityDashboard?.classList.add("hidden");
    loginStateHint.textContent = session
      ? `מחובר/ת כ-${session.role === "resident" ? "תושב/ת" : "אורח"} • עיר: ${session.city}`
      : "לא מחובר/ת";
    return;
  }

  authorityDashboard?.classList.remove("hidden");
  dashCityName.textContent = session.city;

  // Feedback list filtered by city
  const all = readFeedbacks();
  const cityItems = all.filter(x => x.city === session.city).sort((a,b)=> b.ts - a.ts);

  if (cityItems.length === 0) {
    feedbackList.innerHTML = `<div class="item">אין עדיין משובים לעיר הזו.</div>`;
  } else {
    feedbackList.innerHTML = cityItems.map(item => {
      const when = new Date(item.ts).toLocaleString("he-IL");
      const nameLine = item.mode === "named" ? `מאת: ${escapeHtml(item.name || "")}` : "אנונימי";
      return `
        <div class="item">
          <strong>${nameLine}</strong>
          <div>${escapeHtml(item.message)}</div>
          <small>${when}</small>
        </div>
      `;
    }).join("");
  }

  // City data list filtered by city
  renderCityDataList(session.city);
}

function renderCityDataList(city) {
  const items = readCityData().filter(x => x.city === city).sort((a,b)=> b.ts - a.ts);
  if (!cityDataList) return;

  if (items.length === 0) {
    cityDataList.innerHTML = `<div class="item">עוד לא נוסף מידע לעיר הזו.</div>`;
    return;
  }

  cityDataList.innerHTML = items.map(i => {
    const when = new Date(i.ts).toLocaleString("he-IL");
    return `
      <div class="item">
        <strong>${escapeHtml(i.title)}</strong>
        <div>${escapeHtml(i.body)}</div>
        <small>${when}</small>
      </div>
    `;
  }).join("");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[s]));
}

// Show/hide password box depending on role
document.querySelectorAll('input[name="role"]').forEach(r => {
  r.addEventListener("change", () => {
    const role = getRole();
    if (role === "authority") authorityPasswordBox?.classList.remove("hidden");
    else authorityPasswordBox?.classList.add("hidden");
  });
});

// Login
loginBtn?.addEventListener("click", () => {
  const role = getRole();
  const city = citySelect?.value || "Nazareth";

  if (role === "authority") {
    const pass = authorityPass?.value || "";
    if (pass !== AUTH_PASS) {
      showToast("סיסמה לא נכונה (בדמו: 1111).");
      return;
    }
    setSession({ role: "authority", city });
    showToast(`התחברת כרשות מקומית • עיר: ${city}`);
  } else {
    setSession({ role: "resident", city });
    showToast(`התחברת כתושב/ת • עיר: ${city}`);
  }

  renderAuthorityView();
window.location.href = "city.html";

});

// Logout
logoutBtn?.addEventListener("click", () => {
  clearSession();
  showToast("התנתקת.");
  renderAuthorityView();
});

// Feedback: name toggle
identityMode?.addEventListener("change", () => {
  const mode = identityMode.value;
  if (mode === "named") nameBox?.classList.remove("hidden");
  else nameBox?.classList.add("hidden");
});

// Submit feedback
sendFeedbackBtn?.addEventListener("click", () => {
  const city = feedbackCity?.value || "Nazareth";
  const mode = identityMode?.value || "anon";
  const msg = (feedbackMessage?.value || "").trim();

  if (!msg) {
    showToast("כתבי קודם את ההודעה 🙂");
    return;
  }

  const name = mode === "named" ? (senderName?.value || "").trim() : "";
  if (mode === "named" && !name) {
    showToast("אם בחרת 'עם שם' — צריך למלא שם.");
    return;
  }

  const all = readFeedbacks();
  all.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random(),
    city,
    mode,
    name,
    message: msg,
    ts: Date.now()
  });
  writeFeedbacks(all);

  feedbackMessage.value = "";
  if (senderName) senderName.value = "";

  showToast("המשוב נשמר ונשלח לרשות שלך (בדמו).");

  // If authority is logged in to the same city, refresh list immediately
  renderAuthorityView();
});

// Add city data (authority only)
addCityDataBtn?.addEventListener("click", () => {
  const session = getSession();
  if (!session || session.role !== "authority") {
    showToast("רק רשות מקומית יכולה להוסיף מידע (לאחר התחברות).");
    return;
  }

  const title = (cityDataTitle?.value || "").trim();
  const body = (cityDataBody?.value || "").trim();

  if (!title || !body) {
    showToast("מלאי כותרת ותיאור כדי להוסיף מידע.");
    return;
  }

  const items = readCityData();
  items.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random(),
    city: session.city,
    title,
    body,
    ts: Date.now()
  });
  writeCityData(items);

  cityDataTitle.value = "";
  cityDataBody.value = "";

  showToast("מידע נוסף לעיר (בדמו).");
  renderCityDataList(session.city);
});

// Initial load
(function initAuthUI() {
  const role = getRole();
  if (role === "authority") authorityPasswordBox?.classList.remove("hidden");
  else authorityPasswordBox?.classList.add("hidden");

  const session = getSession();
  if (session?.city && citySelect) citySelect.value = session.city;
  if (session?.city && feedbackCity) feedbackCity.value = session.city;

  renderAuthorityView();
})();
// ---------- City page rendering (city.html) ----------
(function initCityPage() {
  const cityNameTitle = document.getElementById("cityNameTitle");
  const cityRoleBadge = document.getElementById("cityRoleBadge");
  const citySubtitle = document.getElementById("citySubtitle");
  const cityIntro = document.getElementById("cityIntro");

  const residentActions = document.getElementById("residentActions");
  const authorityActions = document.getElementById("authorityActions");
  const authorityPanel = document.getElementById("authorityPanel");

  const cityCards = document.getElementById("cityCards");
  const cityDataPreview = document.getElementById("cityDataPreview");

  const stat1 = document.getElementById("cityStat1");
  const stat2 = document.getElementById("cityStat2");
  const stat3 = document.getElementById("cityStat3");
  const stat1Label = document.getElementById("cityStat1Label");
  const stat2Label = document.getElementById("cityStat2Label");
  const stat3Label = document.getElementById("cityStat3Label");

  // If not on city.html - exit
  if (!cityNameTitle || !cityCards || !cityDataPreview) return;

  const session = (function getSessionSafe() {
    try { return JSON.parse(localStorage.getItem("oc_session") || "null"); }
    catch { return null; }
  })();

  if (!session) {
    // Not logged in
    cityNameTitle.textContent = "לא מחובר/ת";
    cityRoleBadge.textContent = "יש להתחבר כדי לראות את הדף";
    citySubtitle.textContent = "עברי לדף הבית והתחברי";
    cityIntro.textContent = "הדף הזה מוצג רק לאחר בחירה של מי את ומה העיר.";
    cityCards.innerHTML = `
      <div class="topic">
        <h3>התחברות</h3>
        <p>כדי לראות “עיר שלי”, יש לבצע התחברות אנונימית בדף הבית.</p>
        <div class="mt"><a class="btn btn--small" href="index.html#login">מעבר להתחברות</a></div>
      </div>
    `;
    return;
  }

  const city = session.city || "Nazareth";
  const role = session.role || "resident";

  // Role UI
  const roleLabel = role === "authority" ? "רשות מקומית" : "תושב/ת";
  cityNameTitle.textContent = city;
  cityRoleBadge.textContent = `מחובר/ת כ-${roleLabel}`;
  citySubtitle.textContent = "נתונים מותאמים לפי העיר שנבחרה";
  cityIntro.textContent = role === "authority"
    ? "כאן תוכלי לראות נתונים לעיר + משובים של תושבים + להוסיף מידע לעיר (דמו)."
    : "כאן תמצאי נתונים והסברים לעיר שלך. ניתן גם להשאיר משוב אנונימי לרשות.";

  if (role === "authority") {
    residentActions?.classList.add("hidden");
    authorityActions?.classList.remove("hidden");
    authorityPanel?.classList.remove("hidden");
  } else {
    residentActions?.classList.remove("hidden");
    authorityActions?.classList.add("hidden");
    authorityPanel?.classList.add("hidden");
  }

  // Demo city-specific stats (you can replace later with real data)
  const cityStats = {
    "Nazareth": { a:["64%", "שימוש בתחבורה ציבורית (דמו)"], b:["18", "מוסדות חינוך (דמו)"], c:["7.2", "מדד שטחים ירוקים (דמו)"] },
    "Tel Aviv-Yafo": { a:["71%", "שימוש בתחבורה ציבורית (דמו)"], b:["52", "מוסדות חינוך (דמו)"], c:["5.1", "מדד שטחים ירוקים (דמו)"] },
    "Jerusalem": { a:["58%", "שימוש בתחבורה ציבורית (דמו)"], b:["60", "מוסדות חינוך (דמו)"], c:["6.0", "מדד שטחים ירוקים (דמו)"] },
    "Ashkelon": { a:["49%", "שימוש בתחבורה ציבורית (דמו)"], b:["22", "מוסדות חינוך (דמו)"], c:["6.8", "מדד שטחים ירוקים (דמו)"] },
    "Umm al-Fahm": { a:["46%", "שימוש בתחבורה ציבורית (דמו)"], b:["20", "מוסדות חינוך (דמו)"], c:["6.4", "מדד שטחים ירוקים (דמו)"] },
    "Haifa": { a:["62%", "שימוש בתחבורה ציבורית (דמו)"], b:["35", "מוסדות חינוך (דמו)"], c:["7.0", "מדד שטחים ירוקים (דמו)"] },
    "Beer Sheva": { a:["44%", "שימוש בתחבורה ציבורית (דמו)"], b:["28", "מוסדות חינוך (דמו)"], c:["6.2", "מדד שטחים ירוקים (דמו)"] },
  };

  const s = cityStats[city] || cityStats["Nazareth"];
  if (stat1 && stat1Label) { stat1.textContent = s.a[0]; stat1Label.textContent = s.a[1]; }
  if (stat2 && stat2Label) { stat2.textContent = s.b[0]; stat2Label.textContent = s.b[1]; }
  if (stat3 && stat3Label) { stat3.textContent = s.c[0]; stat3Label.textContent = s.c[1]; }

  // City cards (demo “data+meaning+question”)
  const demoCards = [
    { icon:"🏠", title:"דיור בעיר", desc:"מגמות מחירים/שכירות ופערים בין אזורים (דמו).", q:"האם יש שכונות שבהן קשה יותר למצוא דיור נגיש?" },
    { icon:"🚍", title:"תחבורה בעיר", desc:"תדירות קווים וזמני המתנה (דמו).", q:"האם כל השכונות מקבלות שירות תחבורה דומה?" },
    { icon:"🎓", title:"חינוך בעיר", desc:"צפיפות בכיתות ונגישות למסגרות (דמו).", q:"איפה יש עומסים גבוהים יותר?" },
    { icon:"🌱", title:"סביבה בעיר", desc:"שטחים ירוקים/פסולת/איכות אוויר (דמו).", q:"האם יש פערים בכמות שטחים ירוקים בין אזורים?" },
    { icon:"🛡️", title:"ביטחון אישי", desc:"תאורה ציבורית ומוקדי סיכון (דמו).", q:"איפה תושבים מדווחים על תחושת חוסר ביטחון?" },
    { icon:"🏛️", title:"שירותים עירוניים", desc:"זמני טיפול בפניות ותפקוד שירותים (דמו).", q:"כמה זמן לוקח לטפל בפנייה בשכונות שונות?" },
  ];

  cityCards.innerHTML = demoCards.map(c => `
    <div class="topic">
      <h3>${c.icon} ${c.title}</h3>
      <p>${c.desc}</p>
      <p class="muted mt"><strong>שאלה אזרחית:</strong> ${c.q}</p>
      <div class="mt">
        <a class="btn btn--small" href="index.html#feedback">שליחת משוב לעיר</a>
      </div>
    </div>
  `).join("");

  cityDataPreview.innerHTML = `
    <div class="mini"><span class="mini__label">מה רואים?</span><span class="mini__value">מדדים עירוניים לפי ${escapeHtml(city)} (דמו)</span></div>
    <div class="mini"><span class="mini__label">למה זה חשוב?</span><span class="mini__value">כי זה משפיע על החלטות יומיומיות של תושבים</span></div>
    <div class="mini"><span class="mini__label">שאלה אזרחית</span><span class="mini__value">איפה יש פערים ומה אפשר לשפר?</span></div>
  `;

  // If authority, render authority widgets (reuse existing functions if they exist)
  if (role === "authority") {
    const dashCityName = document.getElementById("dashCityName");
    if (dashCityName) dashCityName.textContent = city;

    // Refresh lists using existing renderAuthorityView if available
    if (typeof renderAuthorityView === "function") {
      renderAuthorityView();
    } else {
      // Minimal fallback: show a hint
      const feedbackList = document.getElementById("feedbackList");
      if (feedbackList) feedbackList.innerHTML = `<div class="item">טיפ: ודאי שהוספת את בלוק ההתחברות הקודם ב-script.js כדי לראות משובים.</div>`;
    }
  }

  // Sync “משוב לעיר שלי” dropdown to city (nice UX)
  const feedbackCitySelect = document.getElementById("feedbackCity");
  if (feedbackCitySelect) feedbackCitySelect.value = city;

})();
// ---------- Real datasets by city (CKAN-based) ----------
const CKAN_SOURCES = {
  // Jerusalem portal is CKAN (confirmed on the site footer)
  "Jerusalem": { base: "https://jerusalem.datacity.org.il", mode: "ckan", query: 'ירושלים' },

  // Tel Aviv + Nazareth: use Israel Government Data portal CKAN
  "Tel Aviv-Yafo": { base: "https://data.gov.il", mode: "ckan", query: 'תל אביב OR תל אביב-יפו OR תל-אביב' },
  "Nazareth": { base: "https://data.gov.il", mode: "ckan", query: 'נצרת' },
};

function ckanAction(base, action, params = {}) {
  const url = new URL(`${base}/api/3/action/${action}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return fetch(url.toString())
    .then(r => r.json())
    .then(j => {
      if (!j || j.success !== true) throw new Error("CKAN API error");
      return j.result;
    });
}

function fmtDate(iso) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("he-IL"); } catch { return "—"; }
}

function esc(str) {
  return String(str || "").replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[s]));
}

async function loadCityDatasets(city) {
  const cfg = CKAN_SOURCES[city];
  if (!cfg) return { datasets: [], total: 0, totalResources: 0, lastUpdated: null, sourceBase: null };

  // Get up to 30 datasets (you can increase later)
  const res = await ckanAction(cfg.base, "package_search", {
    q: cfg.query,
    rows: 30,
    sort: "metadata_modified desc",
  });

  const results = Array.isArray(res.results) ? res.results : [];
  const total = res.count || results.length;

  let totalResources = 0;
  let lastUpdated = null;

  const datasets = results.map(ds => {
    const resources = Array.isArray(ds.resources) ? ds.resources : [];
    totalResources += resources.length;

    const modified = ds.metadata_modified || ds.metadata_created || null;
    if (!lastUpdated || (modified && modified > lastUpdated)) lastUpdated = modified;

    const dsUrl = `${cfg.base}/dataset/${encodeURIComponent(ds.name)}`;

    return {
      title: ds.title || ds.name || "ללא שם",
      notes: ds.notes || "",
      modified,
      url: dsUrl,
      resources: resources.map(r => ({
        name: r.name || r.format || "קובץ",
        format: r.format || "",
        url: r.url || "",
      })),
    };
  });

  return { datasets, total, totalResources, lastUpdated, sourceBase: cfg.base };
}

(function initCityPage_REAL() {
  // Detect city.html by element existence
  const cityNameTitle = document.getElementById("cityNameTitle");
  const cityRoleBadge = document.getElementById("cityRoleBadge");
  const cityCards = document.getElementById("cityCards");
  const cityDataPreview = document.getElementById("cityDataPreview");

  if (!cityNameTitle || !cityCards || !cityDataPreview) return;

  // Session
  let session = null;
  try { session = JSON.parse(localStorage.getItem("oc_session") || "null"); } catch {}
  if (!session) {
    cityNameTitle.textContent = "לא מחובר/ת";
    cityRoleBadge.textContent = "יש להתחבר כדי לראות נתונים";
    cityCards.innerHTML = `
      <div class="topic">
        <h3>התחברות</h3>
        <p>כדי לראות נתונים אמיתיים לעיר, צריך להתחבר בדף הבית.</p>
        <div class="mt"><a class="btn btn--small" href="index.html#login">מעבר להתחברות</a></div>
      </div>
    `;
    cityDataPreview.innerHTML = "";
    return;
  }

  const city = session.city;
  const role = session.role;

  cityNameTitle.textContent = city;
  cityRoleBadge.textContent = role === "authority" ? "מחובר/ת כרשות מקומית" : "מחובר/ת כתושב/ת";

  // Replace “demo stats” with real counts
  const stat1 = document.getElementById("cityStat1");
  const stat2 = document.getElementById("cityStat2");
  const stat3 = document.getElementById("cityStat3");

  // Show loading state
  cityDataPreview.innerHTML = `
    <div class="mini"><span class="mini__label">טוען נתונים…</span><span class="mini__value">מושך מאגרים רשמיים לפי העיר</span></div>
  `;
  cityCards.innerHTML = `
    <div class="topic"><h3>טוען…</h3><p>מושכים נתונים ממקור רשמי.</p></div>
  `;

  loadCityDatasets(city)
    .then(({ datasets, total, totalResources, lastUpdated, sourceBase }) => {
      if (stat1) stat1.textContent = String(total || 0);
      if (stat2) stat2.textContent = String(totalResources || 0);
      if (stat3) stat3.textContent = fmtDate(lastUpdated);

      const sourceText = sourceBase ? `מקור: ${sourceBase}` : "מקור: —";
      cityDataPreview.innerHTML = `
        <div class="mini"><span class="mini__label">מה מוצג?</span><span class="mini__value">רשימת מאגרים רשמיים לעיר + קישורים לקבצים</span></div>
        <div class="mini"><span class="mini__label">עדכון</span><span class="mini__value">${esc(sourceText)}</span></div>
        <div class="mini"><span class="mini__label">למה זה חשוב?</span><span class="mini__value">כדי שתושבים ורשויות יעבדו עם נתונים אמיתיים, שקופים ומבוססים</span></div>
      `;

      if (!datasets.length) {
        cityCards.innerHTML = `
          <div class="topic">
            <h3>לא נמצאו מאגרים לעיר</h3>
            <p>ייתכן שאין התאמה בחיפוש או שהמאגרים לא מתויגים בשם העיר.</p>
            <p class="muted mt">אפשר לשפר את החיפוש (מילות מפתח) כדי להביא יותר תוצאות.</p>
          </div>
        `;
        return;
      }

      // Build clean cards
      cityCards.innerHTML = datasets.map(ds => {
        const topResources = ds.resources.slice(0, 4).map(r => {
          const rName = esc(r.name);
          const rFmt = r.format ? ` (${esc(r.format)})` : "";
          const rUrl = r.url ? esc(r.url) : "";
          return rUrl
            ? `<li><a href="${rUrl}" target="_blank" rel="noopener">${rName}${rFmt}</a></li>`
            : `<li>${rName}${rFmt}</li>`;
        }).join("");

        return `
          <div class="topic">
            <h3>${esc(ds.title)}</h3>
            <p>${esc(ds.notes).slice(0, 220)}${ds.notes && ds.notes.length > 220 ? "…" : ""}</p>
            <p class="muted mt"><strong>עודכן:</strong> ${fmtDate(ds.modified)}</p>
            <p class="muted"><strong>קבצים:</strong></p>
            <ul class="muted" style="margin:0; padding-right:18px;">
              ${topResources || "<li>אין משאבים להצגה</li>"}
            </ul>
            <div class="mt">
              <a class="btn btn--small" href="${esc(ds.url)}" target="_blank" rel="noopener">פתיחה במקור הרשמי</a>
            </div>
          </div>
        `;
      }).join("");
    })
    .catch(() => {
      cityDataPreview.innerHTML = `
        <div class="mini"><span class="mini__label">שגיאה</span><span class="mini__value">לא הצלחנו למשוך נתונים כרגע.</span></div>
      `;
      cityCards.innerHTML = `
        <div class="topic">
          <h3>שגיאה בטעינת נתונים</h3>
          <p>לפעמים פורטלים חוסמים בקשות (CORS) או יש עומס זמני.</p>
          <p class="muted mt">אם תרצי—נעבור לפתרון יציב עם קובץ JSON שמתעדכן אוטומטית בשרת.</p>
        </div>
      `;
    });
})();
// ---------- i18n (HE/AR/EN) ----------
const I18N = {
  he: {
    home_title: "OPEN CITY",
    home_subtitle: "העיר הפתוחה: נתונים מדברים",
    city_data_title: "הנתונים של העיר שלי",
    city_data_desc: "רשימת מאגרי מידע וקבצי נתונים זמינים לעיר שנבחרה."
  },
  ar: {
    home_title: "OPEN CITY",
    home_subtitle: "المدينة المفتوحة: البيانات تتحدث",
    city_data_title: "بيانات مدينتي",
    city_data_desc: "قائمة قواعد البيانات والملفات المتاحة للمدينة المختارة."
  },
  en: {
    home_title: "OPEN CITY",
    home_subtitle: "The Open City: Data Speaks",
    city_data_title: "My City Data",
    city_data_desc: "A list of official datasets and resources available for the selected city."
  }
};

function setLanguage(lang) {
  if (!I18N[lang]) lang = "he";
  localStorage.setItem("oc_lang", lang);

  // Set document language + direction
  const rtl = (lang === "he" || lang === "ar");
  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";

  // Update buttons state
  document.querySelectorAll(".lang__btn").forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  // Replace texts
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang][key];
    if (typeof val === "string") el.textContent = val;
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang__btn");
  if (!btn) return;
  setLanguage(btn.dataset.lang);
});

(function initLanguage() {
  const saved = localStorage.getItem("oc_lang") || "he";
  setLanguage(saved);
})();
// ---------- Municipality links + explanations per dataset ----------
const MUNICIPALITY_URLS = {
  "Tel Aviv-Yafo": "https://www.tel-aviv.gov.il/",
  "Jerusalem": "https://www.jerusalem.muni.il/",
  "Nazareth": "https://www.nazareth.muni.il/" // אם יש אתר אחר לנצרת — תגידי ואעדכן
};

// תבניות הסבר כלליות (אפשר לשדרג בהמשך לפי סוגי מאגרים)
function buildExplanation(datasetTitle, city) {
  return {
    means: `הנתון מציג מידע רשמי הקשור ל“${datasetTitle}” בעיר ${city}, כפי שהוא מופיע במאגר נתונים פתוח.`,
    notMeans: `הנתון לא בהכרח משקף את כל המציאות בשטח בזמן אמת, ולא תמיד כולל הסבר על סיבות/איכות שירות/חוויה של תושבים.`,
    impact: `המידע יכול לעזור לתושבים להבין מה קיים בעיר, להשוות בין אזורים/שכונות כשיש פירוט, ולזהות פערים או צרכים לשיפור בשירותים עירוניים.`
  };
}

function setMunicipalityLink(city) {
  const link = document.getElementById("municipalityLink");
  if (!link) return;

  const url = MUNICIPALITY_URLS[city] || "index.html#contact";
  link.href = url;

  // אם אין לנו אתר עיר — נשנה טקסט כדי לא לבלבל
  if (!MUNICIPALITY_URLS[city]) {
    link.textContent = "לא נמצא אתר עיר (חזרה ליצירת קשר)";
    link.target = "_self";
  } else {
    link.textContent = "אתר הרשות המקומית";
    link.target = "_blank";
    link.rel = "noopener";
  }
}

// אם קיים initCityPage_REAL אצלך – נוסיף עליו “הרחבה” בלי לשבור כלום:
(function enhanceCityCardsWithMeaning() {
  const cityNameTitle = document.getElementById("cityNameTitle");
  const cityCards = document.getElementById("cityCards");
  if (!cityNameTitle || !cityCards) return; // לא ב-city.html

  let session = null;
  try { session = JSON.parse(localStorage.getItem("oc_session") || "null"); } catch {}
  if (!session) return;

  const city = session.city || "Nazareth";
  setMunicipalityLink(city);

  // “Hook” קטן: אם הכרטיסים כבר נבנו ע"י הקוד שמושך CKAN,
  // נוסיף לכל כרטיס את חלקי הפירוש (אם עדיין לא קיימים).
  const observer = new MutationObserver(() => {
    const cards = cityCards.querySelectorAll(".topic");
    if (!cards.length) return;

    cards.forEach(card => {
      // אם כבר הוספנו פעם אחת — לא להוסיף שוב
      if (card.querySelector(".explain")) return;

      const titleEl = card.querySelector("h3");
      const dsTitle = titleEl ? titleEl.textContent.trim() : "המאגר";
      const exp = buildExplanation(dsTitle, city);

      const box = document.createElement("div");
      box.className = "explain mt";
      box.innerHTML = `
        <div class="explain__item">
          <strong>פירוש — מה הנתון אומר:</strong>
          <div>${escapeHtml(exp.means)}</div>
        </div>
        <div class="explain__item mt">
          <strong>מה הוא <span class="accent">לא</span> אומר:</strong>
          <div>${escapeHtml(exp.notMeans)}</div>
        </div>
        <div class="explain__item mt">
          <strong>משמעות יומיומית:</strong>
          <div>${escapeHtml(exp.impact)}</div>
        </div>
      `;

      card.appendChild(box);
    });

    // אחרי שמוסיפים פעם אחת, אפשר לנתק observer (כדי לא לעבוד קשה)
    observer.disconnect();
  });

  observer.observe(cityCards, { childList: true, subtree: true });
})();
