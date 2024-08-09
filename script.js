const myLibrary = [];
const author = document.getElementById('author').value;
const title = document.getElementById('title').value;
const year = document.getElementById('year').value;
const pages = document.getElementById('pages').value;
const read = document.getElementById('read').value;

document.getElementById('cardAuthor').textContent = `Author: ${author}`
document.getElementById('cardAuthor').textContent = `Title: ${title}`
document.getElementById('cardAuthor').textContent = `Year: ${year}`
document.getElementById('cardAuthor').textContent = `Pages: ${pages}`
document.getElementById('cardAuthor').textContent = `Read: ${read}`

document.getElementsByClassName("card-form").addEventListener('submit', function (event) {
    event.preventDefault()
})

function Book (author, title, year, pages, read) {
    this.author = author;
    this.title  = title;
    this.year   = year;
    this.pages  = pages;
    this.read   = read;
};

function addBookToLibrary (author, title, year, read) {
    let newBook = new Book(author, title, year, read);
    myLibrary.push(newBook);
};

addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");

function displayBook () {
    let displayText = '';
    for (const obj of myLibrary) {
        displayText += `Author: ${obj.author}, Title: ${obj.title}, Year: ${obj.year}, Read: ${obj.read}\n`;
    }
    
};

displayBook();

console.log(myLibrary);