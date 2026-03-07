// handling the book data
let bookData = [];
let cardContainer = document.getElementById("cardContainer");
// checking if array is empty
function dataCheck() {
  if (!Array.isArray(bookData) || !bookData.length) {
    arrayIsEmpty(cardContainer);
  }
}

dataCheck();

// adding text to html if the array is empty
function arrayIsEmpty(htmlElement) {
  //create h2 element
  let newElement = document.createElement("h2");
  newElement.className = "book-empty";
  newElement.textContent = "Book data is empty";

  htmlElement.appendChild(newElement);
}

// object constructor
function book(author, title, pages, isRead) {
  let bookId = bookData.length;

  this.bookId = bookId;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isread = isRead;

  bookData.push({ bookId, author, title, pages, isRead });
}

// removing submit default behaviour
document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    showData();
  });

function showData() {
  // fungsi ini berjalan ketika tombol tambah dan tombol delete dihapus

  // getting form data
  const formAuthor = document.getElementById("author").value;
  const formTitle = document.getElementById("title").value;
  const formPages = document.getElementById("pages").value;
  const formIsRead = document.getElementById("hasBeenRead").value;

  book(formAuthor, formTitle, formPages, formIsRead);

  // reseting form after submit
  document.getElementById("inputBook").reset();

  // crearing the div
  cardContainer.innerHTML = "";

  bookData.forEach((element) => {
    let cardData = document.createElement("div");
    cardData.className = "book-card";
    cardData.innerHTML = `
      <h3>${element.title}</h3>
      <hr />
      <p>Author: ${element.author}</p>
      <p>Pages: ${element.pages}</p>
      <p>${element.isRead == "read" ? "Read" : "Not Read"}</p>
      <button id="${element.bookId}" class="deleteBook">Delete</button>`;

    cardContainer.insertAdjacentElement("afterbegin", cardData);
  });

  deleteBook();
}

// adding click event to a every button that has deleteBook class
function deleteBook() {
  let deleteBtns = document.querySelectorAll(".deleteBook");

  for (var i = 0; i < bookData.length; i++) {
    deleteBtns[i].addEventListener("click", function (e) {
      const newBooks = bookData.filter(function (book) {
        return book.bookId != e.target.id;
      });
      bookData = newBooks;

      // delete in the dom
      const card = e.target.closest(".book-card");
      card.remove();
    });
  }
}
