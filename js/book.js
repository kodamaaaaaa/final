const reserveBtn = document.getElementById("reserveBtn");
const modal = document.getElementById("reserveModal");
const confirmBtn = document.getElementById("confirmReserve");
const toast = document.getElementById("toast");
const stockText = document.getElementById("stockText");

function openModal(){ modal.classList.add("open"); }
function closeModal(){ modal.classList.remove("open"); }
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
}

function getStock(){
  const ds = stockText.dataset.stock;
  if(ds !== undefined && ds !== "") return parseInt(ds, 10);
  return parseInt(stockText.textContent.trim(), 10);
}

function setStock(n){
  stockText.dataset.stock = n;
  stockText.textContent = n;
}

reserveBtn.addEventListener("click", openModal);

modal.addEventListener("click", (e) => {
  if(e.target.dataset.close === "1") closeModal();
});

confirmBtn.addEventListener("click", () => {
  let stock = getStock();

  if(stock > 0){
    stock--;
    setStock(stock);
    showToast("Reserved");
  }else{
    showToast("Out of Stock");
  }
  closeModal();
});


const favBtn = document.getElementById("favBtn");
favBtn.addEventListener("click", () => {
  const isActive = favBtn.classList.toggle("active");
  favBtn.setAttribute("aria-pressed", isActive);

  if (isActive) {
    favBtn.querySelector(".star").textContent = "★";
    showToast("Add to Favorite");
  } else {
    favBtn.querySelector(".star").textContent = "☆";
    showToast("Remove from Favorite");
  }
});
