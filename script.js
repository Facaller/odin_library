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
            toggleRead(bookBtn1)

            let bookBtn2 = document.createElement('button');
            bookBtn2.textContent = 'Edit';
            buttonsContainer.appendChild(bookBtn2);
            editBook(bookBtn2, book.title, book.author, book.year, book.pages,
                {
                    title:  book.title,
                    author: book.author,
                    year:   book.year,
                    year:   book.pages
                }
            )

            let bookBtn3 = document.createElement('button');
            bookBtn3.textContent = 'Remove';
            buttonsContainer.appendChild(bookBtn3);
            removeBook(bookBtn3, bookCard, bookID);

            mainContent.appendChild(bookCard);
            displayedBooks.add(bookID);
        }
    })
};

function removeBook (remove, element, currentBook) {
    remove.addEventListener('click', () => {
        element.parentNode.removeChild(element)
        if (displayedBooks.has(currentBook)) {
            displayedBooks.delete(currentBook)
        }
    })
};

function toggleRead (isRead) {
    isRead.addEventListener('click', () => {
        isRead.classList.toggle('active');
    })
};

function editBook (edit, oldTitle, oldAuthor, oldYear, oldPages, newBookData) {
    edit.addEventListener('click', () => {
        cardForm.style.display = 'block';
        overlay = document.createElement('section');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
        overlay.classList.add('overlay');
        for (const edits of myLibrary) {
            if (edits.title === oldTitle
                && edits.author === oldAuthor
                && edits.year === oldYear
                && edits.pages === oldPages) {
                Object.assign(edits, newBookData)
                break;
            }
        }
    })
};

//GPT suggestion

// // Initialize the Set with some book objects
// let books = new Set([
//     { title: 'Book Title 1', author: 'Author 1' },
//     { title: 'Book Title 2', author: 'Author 2' }
// ]);

// // Function to handle editing a book
// function editBook(oldTitle, oldAuthor, newBookData) {
//     for (const book of books) {
//         if (book.title === oldTitle && book.author === oldAuthor) {
//             // Update the properties of the book object
//             Object.assign(book, newBookData);
//             break;
//         }
//     }
// }

// // Example usage
// editBook('Book Title 1', 'Author 1', { title: 'Updated Title', author: 'Updated Author' });

// // Log the Set to see the changes
// console.log(books);

// Initialize the Set with some book objects
// let books = new Set([
//     { id: 1, title: 'Book Title 1', author: 'Author 1' },
//     { id: 2, title: 'Book Title 2', author: 'Author 2' }
// ]);

// // Function to handle editing a book
// function editBook(bookId, newBookData) {
//     for (const book of books) {
//         if (book.id === bookId) {
//             // Update the properties of the book object
//             Object.assign(book, newBookData);
//             break;
//         }
//     }
// }

// // Example usage
// editBook(1, { title: 'Updated Title', author: 'Updated Author' });

// // Log the Set to see the changes
// console.log(books);


// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();