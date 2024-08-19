const myLibrary = [];
const displayedBooks = new Set();

let title  = document.getElementById('title');
let author = document.getElementById('author');
let year   = document.getElementById('year');
let pages  = document.getElementById('pages');
let read   = document.getElementById('read');

let addBook     = document.getElementById('addBook');
let cardForm    = document.getElementById('cardForm');
let mainContent = document.getElementById('mainContent');
let submit      = document.getElementById('submit');
let form        = document.getElementById('form');

let overlay;
let titleValue;
let authorValue;
let yearValue;
let pagesValue;
let readValue;

// Event listeners for books
addBook.addEventListener('click', () => {
    cardForm.style.display = "block";
    overlay = document.createElement('section');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    overlay.classList.add('overlay');
    console.log('this works')
});

submit.addEventListener('click', (event) => {
    event.preventDefault();
    titleValue  = title.value;
    authorValue = author.value;
    yearValue   = year.value;
    pagesValue  = pages.value;
    readValue   = read.value;

    addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, readValue);

    document.getElementById('cardTitle').textContent  = `Title: ${titleValue}`;
    document.getElementById('cardAuthor').textContent = `Author: ${authorValue}`;
    document.getElementById('cardYear').textContent   = `Year: ${yearValue}`;
    document.getElementById('cardPages').textContent  = `Pages: ${pagesValue}`;
    document.getElementById('cardRead').textContent   = `Read: ${readValue}`;
    
    cardForm.style.display = "none";
    if (overlay) {
        document.body.removeChild(overlay);
    }

    form.reset();
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
    displayNewBook(newBook);
};

function createBookID (book) {
    return `${book.title}-${book.author}-${book.year}-${book.pages}`;
};

function displayNewBook () {
    myLibrary.forEach(book => {
        const bookID = createBookID(book);

        if (!displayedBooks.has(createBookID)); {
        
            let bookCard = document.createElement('div');
            bookCard.classList.add('card');

            let bookTitle = document.createElement('h2');
            bookTitle.textContent = book.title;
            bookCard.appendChild(bookTitle);

            let bookAuthor = document.createElement('p');
            bookAuthor.textContent = book.author;
            bookCard.appendChild(bookAuthor);

            let bookYear = document.createElement('p');
            bookYear.textContent = book.year;
            bookCard.appendChild(bookYear);

            let bookPages = document.createElement('p');
            bookPages.textContent = book.pages;
            bookCard.appendChild(bookPages);

            let bookRead = document.createElement('p');
            bookRead.textContent = book.read;
            bookCard.appendChild(bookRead);

            mainContent.appendChild(bookCard);
        }
    })
};

//GPT suggestion

// // Assuming you have this array somewhere in your code
// const myLibrary = []; 

// // A Set to keep track of displayed book identifiers
// const displayedBooks = new Set();

// function Book(title, author, year, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.year = year;
//     this.pages = pages;
//     this.read = read;
// }

// function addBookToLibrary(title, author, year, pages, read) {
//     let newBook = new Book(title, author, year, pages, read);
//     myLibrary.push(newBook);
//     displayNewBooks(); // Display only new or updated books
// }

// function generateBookIdentifier(book) {
//     // Generate a unique identifier for each book
//     return `${book.title}-${book.author}-${book.year}`;
// }

// function displayNewBooks() {
//     // Get the main content container
//     const mainContent = document.getElementById('main-content');
    
//     // Iterate over each book in the library
//     myLibrary.forEach(book => {
//         const bookIdentifier = generateBookIdentifier(book);
        
//         // Check if the book is already displayed
//         if (!displayedBooks.has(bookIdentifier)) {
//             // Create and append new book card
//             let bookCard = document.createElement('div');
//             bookCard.classList.add('card');

//             // Title
//             let bookTitle = document.createElement('h2');
//             bookTitle.textContent = book.title;
//             bookCard.appendChild(bookTitle);

//             // Author
//             let bookAuthor = document.createElement('p');
//             bookAuthor.textContent = book.author;
//             bookCard.appendChild(bookAuthor);

//             // Year
//             let bookYear = document.createElement('p');
//             bookYear.textContent = book.year;
//             bookCard.appendChild(bookYear);

//             // Pages
//             let bookPages = document.createElement('p');
//             bookPages.textContent = book.pages;
//             bookCard.appendChild(bookPages);

//             // Read status
//             let bookRead = document.createElement('p');
//             bookRead.textContent = book.read ? 'Read' : 'Not Read';
//             bookCard.appendChild(bookRead);

//             // Append the book card to the main content
//             mainContent.appendChild(bookCard);
            
//             // Add the book identifier to the set of displayed books
//             displayedBooks.add(bookIdentifier);
//         }
//     });
// }





// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();

// console.log(myLibrary);