'use strict';

const toast = document.getElementById("toast");
const favBtn = document.getElementById("favBtn");

let currentKey = null;

function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove("show"), 1500);
}

function loadFavSet(){
  try{
    const raw = localStorage.getItem("favBooks");
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  }catch{
    return new Set();
  }
}

function saveFavSet(set){
  try{
    localStorage.setItem("favBooks", JSON.stringify([...set]));
  }catch{
  }
}

function makeKeyFromItem(item){
  const title = item.querySelector(".name")?.textContent?.trim() ?? "";
  const src = item.querySelector("img")?.getAttribute("src") ?? "";
  return (title || src) ? `${title}||${src}` : null;
}

function setFavUI(isActive){
  if(!favBtn) return;
  favBtn.classList.toggle("active", isActive);
  favBtn.setAttribute("aria-pressed", String(isActive));

  const star = favBtn.querySelector(".star");
  if(star) star.textContent = isActive ? "★" : "☆";
}

function bindItems(){
  const items = document.querySelectorAll('.recommend-section .item[href="#book-popup"]');
  items.forEach((item) => {
    item.addEventListener("click", () => {
      currentKey = makeKeyFromItem(item);
      const favSet = loadFavSet();
      setFavUI(!!currentKey && favSet.has(currentKey));
    });
  });
}

function bindFav(){
  if(!favBtn) return;

  favBtn.addEventListener("click", () => {
    if(!currentKey){
      showToast("Select a book first");
      return;
    }

    const favSet = loadFavSet();
    const willActive = !favSet.has(currentKey);

    if(willActive){
      favSet.add(currentKey);
      showToast("Add to Favorite");
    }else{
      favSet.delete(currentKey);
      showToast("Remove from Favorite");
    }

    saveFavSet(favSet);
    setFavUI(willActive);
  });
}

bindItems();
bindFav();
