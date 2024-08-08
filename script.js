const myLibrary = [];

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
console.log(myLibrary);