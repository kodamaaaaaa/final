'use strict';

const APPROACH_DAYS = 3;

const data = {
  lending: [
    {
      bookId:"b104",
      title:"世界をアップデートする方法",
      url:"book_D.html",
      borrowedAt:"2026-01-22",
      returnedAt:null
    },
    {
      bookId:"b109",
      title:"一汁三菜",
      url:"book_I.html",
      borrowedAt:"2026-01-23",
      returnedAt:null
    },
    {
      bookId:"b106",
      title:"マスカレード・ナイト",
      url:"book_F.html",
      borrowedAt:"2026-01-29",
      returnedAt:null
    },
    {
      bookId:"b108",
      title:"水田の小言を熟読するほど 一生ものの自炊力が身につく",
      url:"book_H.html",
      borrowedAt:"2026-01-29",
      returnedAt:null
    },
    {
      bookId:"b105",
      title:"哲学のはじまり",
      url:"book_E.html",
      borrowedAt:"2026-01-29",
      returnedAt:null
    },
  ],

  returned: [

  { bookId:"b110", title:"大戸屋", url:"book_J.html", borrowedAt:"2023-10-21", returnedAt:"2023-11-03" },
  { bookId:"b109", title:"一汁三菜", url:"book_I.html", borrowedAt:"2024-12-01", returnedAt:"2024-12-10" },
  { bookId:"b102", title:"C言語入門", url:"book_B.html", borrowedAt:"2025-02-17", returnedAt:"2025-03-07" },
  { bookId:"b104", title:"世界をアップデートする方法", url:"book_D.html", borrowedAt:"2024-06-25", returnedAt:"2024-07-06" },
  { bookId:"b110", title:"大戸屋", url:"book_J.html", borrowedAt:"2024-01-13", returnedAt:"2024-01-22" },
  { bookId:"b106", title:"マスカレード・ナイト", url:"book_F.html", borrowedAt:"2023-01-28", returnedAt:"2023-02-14" },
  { bookId:"b108", title:"水田の小言を熟読するほど 一生ものの自炊力が身につく", url:"book_H.html", borrowedAt:"2024-09-09", returnedAt:"2024-09-24" },
  { bookId:"b101", title:"C++", url:"book_A.html", borrowedAt:"2023-12-19", returnedAt:"2023-12-29" },
  { bookId:"b105", title:"哲学のはじまり", url:"book_E.html", borrowedAt:"2024-11-17", returnedAt:"2024-12-02" },
  { bookId:"b109", title:"一汁三菜", url:"book_I.html", borrowedAt:"2023-03-11", returnedAt:"2023-03-24" },
  { bookId:"b103", title:"プロになるJava", url:"book_C.html", borrowedAt:"2024-10-05", returnedAt:"2024-10-14" },
  { bookId:"b107", title:"マスカレード・ホテル", url:"book_G.html", borrowedAt:"2025-09-04", returnedAt:"2025-09-25" },
  { bookId:"b108", title:"水田の小言を熟読するほど 一生ものの自炊力が身につく", url:"book_H.html", borrowedAt:"2023-04-23", returnedAt:"2023-05-04" },
  { bookId:"b106", title:"マスカレード・ナイト", url:"book_F.html", borrowedAt:"2024-08-03", returnedAt:"2024-08-18" },
  { bookId:"b105", title:"哲学のはじまり", url:"book_E.html", borrowedAt:"2025-01-09", returnedAt:"2025-01-28" },
  { bookId:"b101", title:"C++", url:"book_A.html", borrowedAt:"2025-08-15", returnedAt:"2025-08-26" },
  { bookId:"b107", title:"マスカレード・ホテル", url:"book_G.html", borrowedAt:"2023-08-27", returnedAt:"2023-09-14" },
  { bookId:"b106", title:"マスカレード・ナイト", url:"book_F.html", borrowedAt:"2025-04-02", returnedAt:"2025-04-12" },
  { bookId:"b104", title:"世界をアップデートする方法", url:"book_D.html", borrowedAt:"2023-05-30", returnedAt:"2023-06-20" },
  { bookId:"b102", title:"C言語入門", url:"book_B.html", borrowedAt:"2024-05-02", returnedAt:"2024-05-17" },
  { bookId:"b109", title:"一汁三菜", url:"book_I.html", borrowedAt:"2024-03-09", returnedAt:"2024-03-14" },
  { bookId:"b110", title:"大戸屋", url:"book_J.html", borrowedAt:"2024-06-01", returnedAt:"2024-06-07" },
  { bookId:"b103", title:"プロになるJava", url:"book_C.html", borrowedAt:"2023-09-06", returnedAt:"2023-09-13" },
  { bookId:"b108", title:"水田の小言を熟読するほど 一生ものの自炊力が身につく", url:"book_H.html", borrowedAt:"2025-03-18", returnedAt:"2025-03-31" },
  { bookId:"b101", title:"C++", url:"book_A.html", borrowedAt:"2023-03-29", returnedAt:"2023-04-14" },
],

}



const $ = (id) => document.getElementById(id);

function toDate_(iso){
  const [y,m,d] = iso.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  dt.setHours(0,0,0,0);
  return dt;
}

function diffDays_(a, b){
  const ms = 24*60*60*1000;
  return Math.floor((b.getTime() - a.getTime()) / ms);
}

function esc_(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

function classify_(rows){
  const today = new Date();
  today.setHours(0,0,0,0);

  const LIMIT_DAYS = 7; 
  const over=[], approach=[], lending=[];

  for(const r of rows){
    const borrowed = toDate_(r.borrowedAt);
    const elapsed = diffDays_(borrowed, today); 
    const left = LIMIT_DAYS - elapsed;
    const x = { ...r, left, elapsed };
    if(left < 0) over.push(x);
    else if(left <= APPROACH_DAYS) approach.push(x);
    else lending.push(x);
  }

  over.sort((a,b)=>a.left-b.left);
  approach.sort((a,b)=>a.left-b.left);
  lending.sort((a,b)=>a.left-b.left);
  return { over, approach, lending };
}

function renderItem_(r){
  const due = addDays_(r.borrowedAt, 8);
  const href = r.url || `book.html?id=${encodeURIComponent(r.bookId)}`;

  const pill =
    (r.left < 0) ? `<span class="pill pill-danger">Overdue ${Math.abs(r.left)} day</span>`
    : (r.left <= APPROACH_DAYS) ? `<span class="pill pill-warn">${r.left} day left</span>`
    : `<span class="pill">${r.left} day remaining</span>`;

  return `
    <div class="item">
      <div class="item-top">
        <h4 class="item-title">
          <a href="${href}">${esc_(r.title)}</a>
        </h4>
        ${pill}
      </div>
      <div class="item-meta">
        <span>Borrowed: ${esc_(r.borrowedAt)}</span>
        <span>Due: ${esc_(due)}</span>
      </div>
    </div>
  `;
}


function renderReturnedRow_(r){
  const href = r.url || `book.html?id=${encodeURIComponent(r.bookId)}`;

  return `
    <tr>
      <td>${esc_(r.borrowedAt)}</td>
      <td>${esc_(r.returnedAt)}</td>
      <td>
        <a href="${href}">
          ${esc_(r.title)}
        </a>
      </td>
    </tr>
  `;
}

function setCount_(id, n){
  const el = $(id);
  if(el) el.textContent = String(n);
}

function paint(){
  const { over, approach, lending } = classify_(data.lending);

  $("listOver").innerHTML = over.map(renderItem_).join("") || `<div class="item">None</div>`;
  $("listApproach").innerHTML = approach.map(renderItem_).join("") || `<div class="item">None</div>`;
  $("listLending").innerHTML = lending.map(renderItem_).join("") || `<div class="item">None</div>`;

  setCount_("cntOver", over.length);
  setCount_("cntApproach", approach.length);
  setCount_("cntLending", lending.length);

  $("tbodyReturned").innerHTML =
  data.returned.map(renderReturnedRow_).join("") ||
  `<tr><td colspan="3">No history</td></tr>`;

  setCount_("cntReturned", data.returned.length);
}

function addDays_(iso, days){
  const d = toDate_(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}


document.addEventListener("DOMContentLoaded", paint);