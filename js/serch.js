  const book_serch = ["Java", "JavaScript", "ゲーム開発で学ぶC言語入門 プロのクリエイターが教える基本文法と開発技法", "python", "SQL","KADOKAWA","集英社","松尾芭蕉","夏目漱石","あいうえお"];

  const book2 = document.getElementById("book");
  const suggestions = document.getElementById("suggestions");

  let books = [];

function bookSerch() {

  fetch("csv/book_data.csv")
  .then(r => r.text())
  .then(text => {
    books = text.split('\n').map(books => books.split(','));
  });

  if (books[0][0] === book2 || books[0][1] === book2 || books[0][2] === book2) {
    location.href = 'main.html';
  } else {
    location.href = 'error.html';
  }
}

  book2.addEventListener("input", () => {
    const query = book2.value.trim().toLowerCase();
    suggestions.innerHTML = "";

    if (query.length === 0) return;

    const matches = book_serch.filter(word => word.toLowerCase().startsWith(query));

    matches.forEach(match => {
      const div = document.createElement("div");
      div.textContent = match;
      div.addEventListener("click", () => {
        book2.value = match;
        suggestions.innerHTML = "";
      });
      suggestions.appendChild(div);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target !== book2) {
      suggestions.innerHTML = "";
    }
  });