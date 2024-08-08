const myLibrary = [];

let mainContent = document.querySelector('.main-content');

function Book (author, title, year, read) {
    this.author = author;
    this.title = title;
    this.year = year;
    this.read = read;
};

function addBookToLibrary (author, title, year, read) {
    let newBook = new Book(author, title, year, read);
    myLibrary.push(newBook);
};

addBookToLibrary ("LOTR", "Tolkein", 1950, "No")
addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, "Yes");
addBookToLibrary ("Stranger", "Camus", 1939, "Yes");

function displayBook () {
    let displayText = '';
    for (const obj of myLibrary) {
        displayText += `Author: ${obj.author}, Title: ${obj.title}, Year: ${obj.year}, Read: ${obj.read}\n`;
    }
    mainContent.textContent = displayText;
};

displayBook();

console.log(myLibrary);