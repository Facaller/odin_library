const myLibrary = [];

let author  = document.getElementById('title');
let title   = document.getElementById('author');
let year    = document.getElementById('year');
let pages   = document.getElementById('pages');
let read    = document.getElementById('read');

let addBook     = document.getElementById('addBook');
let cardForm    = document.getElementById('cardForm');
let mainContent = document.getElementById('mainContent');
let submit      = document.getElementById('submit');

document.getElementById('cardTitle').textContent = `Title: ${authorValue}`;
document.getElementById('cardAuthor').textContent = `Author: ${titleValue}`;
document.getElementById('cardYear').textContent = `Year: ${yearValue}`;
document.getElementById('cardPages').textContent = `Pages: ${pagesValue}`;
document.getElementById('cardRead').textContent = `Read: ${readValue}`;

// Event listeners for books
addBook.addEventListener('click', () => {
    document.getElementById('cardForm').style.display = "block";
    let overlay = document.createElement('section');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    document.getElementById('overlay').classList.add('overlay');
    console.log('this works')
});

submit.addEventListener('click', () => {
    let authorValue = author.value;
    let titleValue  = title.value;
    let yearValue   = year.value;
    let pagesValue  = pages.value;
    let readValue   = read.value;
    addBookToLibrary(authorValue, titleValue, yearValue, pagesValue, readValue);
    console.log(myLibrary);
});

// Functions for books and form
function Book (title, author, year, pages, read) {
    this.title  = title;
    this.author = author;
    this.year   = year;
    this.pages  = pages;
    this.read   = read;
};

function addBookToLibrary (title, author, year, pages, read) {
    let newBook = new Book(title, author, year, pages, read);
    myLibrary.push(newBook);
};

function displayBook () {
    let displayText = '';
    for (const obj of myLibrary) {
        displayText += `Title: ${obj.title}, Author: ${obj.author}, Year: ${obj.year}, Pages: ${obj.pages}, Read: ${obj.read}\n`;
    }
    
};

addBookToLibrary

// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();

// console.log(myLibrary);