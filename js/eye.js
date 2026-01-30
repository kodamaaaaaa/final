"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const passInput = document.getElementById("passText");
  const toggleBtn = document.querySelector(".pw-toggle");
  if (!passInput || !toggleBtn) return;

  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    const isHidden = passInput.type === "password";

    passInput.type = isHidden ? "text" : "password";

    if (icon) {
      if (!isHidden) {

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    toggleBtn.setAttribute("aria-pressed", String(isHidden));
    toggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");

    passInput.focus();
  });
});
