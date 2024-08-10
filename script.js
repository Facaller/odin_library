const myLibrary = [];
let author = document.getElementById('title').value;
let title = document.getElementById('author').value;
let year = document.getElementById('year').value;
let pages = document.getElementById('pages').value;
let read = document.getElementById('read').value;

document.getElementById('cardTitle').textContent = `Title: ${title}`
document.getElementById('cardAuthor').textContent = `Author: ${author}`
document.getElementById('cardYear').textContent = `Year: ${year}`
document.getElementById('cardPages').textContent = `Pages: ${pages}`
document.getElementById('cardRead').textContent = `Read: ${read}`

let addBook = document.getElementById('addBook')
let cardForm = document.getElementById('cardForm')

addBook.addEventListener('click', () => {
    addBook.classList.remove('card-form')
    console.log('this works')
})

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

addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");

function displayBook () {
    let displayText = '';
    for (const obj of myLibrary) {
        displayText += `Title: ${obj.title}, Author: ${obj.author}, Year: ${obj.year}, Pages: ${obj.pages}, Read: ${obj.read}\n`;
    }
    
};

// displayBook();

// console.log(myLibrary);