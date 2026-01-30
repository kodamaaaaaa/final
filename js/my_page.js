'use strict';

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");

const username = document.getElementById("username");
const password = document.getElementById("password");
const togglePw = document.getElementById("togglePw");
const toast = document.getElementById("pwToast");

const rowUsername = document.getElementById("row-username");
const rowPassword = document.getElementById("row-password");

let editing = false;
let original = { username: "", password: "" };

(function restore(){
  if(!username || !password) return;

  const savedU = sessionStorage.getItem("myPage.username");
  const savedP = sessionStorage.getItem("myPage.password");

  if(savedU !== null) username.value = savedU;
  if(savedP !== null && savedP !== "") password.value = savedP;

  original.username = username.value;
  original.password = password.value;
})();

function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove("show"),1500);
}

function setEditing(on){
  if(on && !editing){
    original.username = username.value;
    original.password = password.value;
  }

  if(!on && editing){
    username.value = original.username;
    password.value = original.password;
    password.type = "password";
    const icon = togglePw?.querySelector("i");
    if(icon){
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    }
  }

  editing = on;
  username.disabled = !on;
  password.disabled = !on;
  saveBtn.disabled = !on;

  rowUsername?.classList.toggle("is-editing", on);
  rowPassword?.classList.toggle("is-editing", on);

  if(editBtn) editBtn.textContent = on ? "Cancel" : "Edit";
}

editBtn?.addEventListener("click", ()=>setEditing(!editing));

saveBtn?.addEventListener("click", ()=>{
  const typedPw = password.value.trim();

  original.username = username.value;

  if(typedPw){
    original.password = password.value;
    showToast("Change your password");
  }else{
    password.value = original.password;
    showToast("Saved");
  }
  sessionStorage.setItem("myPage.username", original.username);
  sessionStorage.setItem("myPage.password", original.password);

  setEditing(false);
});

togglePw?.addEventListener("click", ()=>{
  if(!password || !togglePw) return;

  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";

  const icon = togglePw.querySelector("i");
  if(icon){
    icon.classList.toggle("fa-eye", hidden);
    icon.classList.toggle("fa-eye-slash", !hidden);
  }
});