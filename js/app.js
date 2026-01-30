
const popupImg = document.getElementById("popupImg");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupSynopsis = document.getElementById("popupSynopsis");

document.querySelector(".recommend-section")?.addEventListener("click", (e) => {
  const a = e.target.closest("a.item");
  if (!a) return;

  const title = a.querySelector(".name")?.textContent?.trim() || "Title";
  const desc  = a.querySelector(".desc")?.textContent?.trim() || "";
  const imgSrc = a.querySelector("img")?.getAttribute("src") || "";

  popupTitle.textContent = title;
  popupDesc.textContent  = desc;
  popupSynopsis.textContent = a.dataset.synopsis || "—";

  popupImg.src = imgSrc;
  popupImg.alt = title;
});


window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (location.hash === "#book-popup") {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // データ 
  const BOOKS = [
    { title: "C++", tags: ["C++", "programming", "introduction book"], url: "book_1.html" },
    { title: "C言語入門", tags: ["C", "programming","introduction book"], url: "book_2.html" },
    { title: "プロになるJava", tags: ["Java", "programming","introduction book"], url: "book_3.html" },
    { title: "世界をアップデートする方法", tags: ["Philosophy", "humanity", "introduction book"], url: "book_4.html" },
    { title: "哲学のはじまり", tags: ["Philosophy", "humanity", "introduction book"], url: "book_5.html" },
    { title: "マスカレード・ナイト", tags: ["Mystery novel", "Suspense", "Keigo Higashino"], url: "book_6.html" },
    { title: "マスカレード・ホテル", tags: ["Mystery novel", "Suspense", "Keigo Higashino"], url: "book_7.html" },
    { title: "水田の小言を熟読するほど 一生ものの自炊力が身につく", tags: ["cooking", "recipe book", "Shinji Mizuta"], url: "book_8.html" },
    { title: "一汁三菜", tags: ["cooking", "recipe book", "Japanese food"], url: "book_9.html" },
    { title: "大戸屋", tags: ["cooking", "recipe book", "ootoya"], url: "book_10.html" },            
  ];

  const form = document.getElementById("search-form");
  const input = document.getElementById("q");
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!form || !input || !list || !empty) return;

  const normalize = (s) => (s ?? "").toString().trim().toLowerCase();

  function matchBooks(query) {
    const q = normalize(query);
    if (!q) return [];

    const hits = BOOKS.filter((b) => {
      const inTitle = normalize(b.title).includes(q);
      const inTags = (b.tags || []).some((t) => normalize(t).includes(q));
      return inTitle || inTags;
    });

    hits.sort((a, b) => {
      const aTitle = normalize(a.title).includes(q) ? 1 : 0;
      const bTitle = normalize(b.title).includes(q) ? 1 : 0;
      return bTitle - aTitle;
    });

    return hits.slice(0, 8); // 最大8
  }

  function renderSuggestions(items) {
    list.innerHTML = "";
    empty.hidden = true;

    if (!items.length) {
      empty.hidden = false;
      return;
    }

    const frag = document.createDocumentFragment();

    items.forEach((b, idx) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "result-card";
      card.dataset.url = b.url;
      card.dataset.title = b.title;
      card.dataset.index = String(idx);

      card.innerHTML = `
        <div class="result-title">${escapeHtml(b.title)}</div>
        <div class="result-tag">${escapeHtml((b.tags || []).join(" / "))}</div>
      `;

      frag.appendChild(card);
    });

    list.appendChild(frag);
  }

  function escapeHtml(str) {
    return (str ?? "")
      .toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  input.addEventListener("input", () => {
    const items = matchBooks(input.value);
    renderSuggestions(items);
  });

  list.addEventListener("click", (e) => {
    const card = e.target.closest(".result-card");
    if (!card) return;

    const title = card.dataset.title || "";
    const url = card.dataset.url || "";

    input.value = title;      
    list.innerHTML = "";     
    empty.hidden = true;

    if (url) window.location.href = url; 
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const items = matchBooks(input.value);
    if (!items.length) {
      list.innerHTML = "";
      empty.hidden = false;
      return;
    }
    window.location.href = items[0].url;
  });

  document.addEventListener("click", (e) => {
    const inSearch = e.target.closest(".search-area");
    if (!inSearch) {
      list.innerHTML = "";
      empty.hidden = true;
    }
  });
});

