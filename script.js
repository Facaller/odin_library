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
    cardForm.style.display = 'block';
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

        if (!displayedBooks.has(bookID)) {
        
            let bookCard = document.createElement('div');
            bookCard.classList.add('card');

            let cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            bookCard.appendChild(cardContent);

            let bookTitle = document.createElement('h2');
            bookTitle.textContent = book.title;
            cardContent.appendChild(bookTitle);

            let bookAuthor = document.createElement('p');
            bookAuthor.textContent = book.author;
            cardContent.appendChild(bookAuthor);

            let bookYear = document.createElement('p');
            bookYear.textContent = book.year;
            cardContent.appendChild(bookYear);

            let bookPages = document.createElement('p');
            bookPages.textContent = book.pages;
            cardContent.appendChild(bookPages);

            let bookRead = document.createElement('p');
            bookRead.textContent = book.read;
            cardContent.appendChild(bookRead);

            let buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('card-buttons');
            bookCard.appendChild(buttonsContainer);

            let bookBtn1 = document.createElement('button');
            bookBtn1.textContent = 'Read';
            buttonsContainer.appendChild(bookBtn1);

            let bookBtn2 = document.createElement('button');
            bookBtn2.textContent = 'Edit';
            buttonsContainer.appendChild(bookBtn2);

            let bookBtn3 = document.createElement('button');
            bookBtn3.textContent = 'Remove';
            buttonsContainer.appendChild(bookBtn3);

            mainContent.appendChild(bookCard);
            displayedBooks.add(bookID);
        }
    })
};

//GPT suggestion

// document.getElementById('cardTitle').textContent  = `Title: ${titleValue}`;
// document.getElementById('cardAuthor').textContent = `Author: ${authorValue}`;
// document.getElementById('cardYear').textContent   = `Year: ${yearValue}`;
// document.getElementById('cardPages').textContent  = `Pages: ${pagesValue}`;
// document.getElementById('cardRead').textContent   = `Read: ${readValue}`;

// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();

// console.log(myLibrary);