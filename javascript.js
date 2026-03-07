// handling the book data
let bookData = [];
let cardContainer = document.getElementById("cardContainer");

// check if bookData is Empty
if (!Array.isArray(bookData) || !bookData.length) {
  arrayIsEmpty(cardContainer);
}

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
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isread = isRead;
  console.log(author, title, pages, isread);
  bookData.push({ author, title, pages, isRead });
}

// removing submit default behaviour
document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // getting form data
    const formAuthor = document.getElementById("author").value;
    const formTitle = document.getElementById("title").value;
    const formPages = document.getElementById("pages").value;
    const formIsRead = document.getElementById("hasBeenRead").value;

    book(formAuthor, formTitle, formPages, formIsRead);

    // reseting form after submit
    document.getElementById("inputBook").reset();

    // adding book data to the html
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
      <button>Delete</button>`;

      cardContainer.insertAdjacentElement("afterbegin", cardData);
    });
  });
