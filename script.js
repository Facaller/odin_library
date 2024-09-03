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
let closeForm   = document.getElementById('closeForm');

let overlay;

// Event listeners for books
addBook.addEventListener('click', renderForm);

submit.addEventListener('click', (event) => {
    event.preventDefault();
    titleValue  = title.value;
    authorValue = author.value;
    yearValue   = year.value;
    pagesValue  = pages.value;
    readValue   = read.value;

    const editId = form.getAttribute('data-edit-id');

    if (editId) {
        const bookToUpdate = myLibrary.find(book => createBookID(book) === editId);
        if (bookToUpdate) {
            bookToUpdate.title  = titleValue;
            bookToUpdate.author = authorValue;
            bookToUpdate.year   = yearValue;
            bookToUpdate.pages  = pagesValue;
            bookToUpdate.read   = readValue;

            updateBookDisplay(bookToUpdate);
        }
    } else {
        addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, readValue);
    }
    
    removeForm();
});

closeForm.addEventListener('click', removeForm);

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
    displayBook(newBook);
};

function renderForm () {
    cardForm.style.display = 'block';
    if (!overlay) {
        overlay = document.createElement('section');
        overlay.id = 'overlay';
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }
};

function removeForm () {
    title.value  = '';
    author.value = '';
    year.value   = '';
    pages.value  = '';
    read.value   = '';

    cardForm.style.display = 'none'
    if (overlay) {
        document.body.removeChild(overlay);
        overlay = null;
    }
    form.removeAttribute('data-edit-id');
};

function createBookID (book) {
    return `${book.title}-${book.author}-${book.year}-${book.pages}`.replace(/\s+/g, '-').toLowerCase();
};

function displayBook (book) {
        const bookID = createBookID(book);

        if (!displayedBooks.has(bookID)) {
            let bookCard = document.createElement('div');
            bookCard.classList.add('card');
            bookCard.setAttribute('data-id', bookID);

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

            let readButton = document.createElement('button');
            readButton.textContent = 'Read';
            buttonsContainer.appendChild(readButton);
            toggleRead(readButton)

            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            buttonsContainer.appendChild(editButton);
            editBook(editButton, book);

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            buttonsContainer.appendChild(removeButton);
            removeBook(removeButton, bookCard, bookID);

            mainContent.appendChild(bookCard);
            displayedBooks.add(bookID);
        }
};

function updateBookDisplay (book) {
    const bookID = createBookID(book);
    console.log(bookID)
    const existingBookCard = mainContent.querySelector(`.card[data-id='${bookID}']`)
    console.log(existingBookCard);
    if (existingBookCard) {
        const cardContent = existingBookCard.querySelector('.card-content');
        const h2 = cardContent.querySelector('h2');
        const pTags = cardContent.querySelectorAll('p');
        console.log(pTags)

        h2.textContent = book.title;
        pTags[0].textContent = book.author;
        pTags[1].textContent = book.year;
        pTags[2].textContent = book.pages;
        pTags[3].textContent = book.read;
    } else {
        console.log('No card foudn to update')
    }
};

function removeBook (removeButton, bookCard, bookID) {
    removeButton.addEventListener('click', () => {
        bookCard.remove();

        displayedBooks.delete(bookID);
        const bookToRemove = myLibrary.findIndex(book => createBookID(book) === bookID);
        if (bookToRemove !== -1) {
            myLibrary.splice(bookToRemove, 1);
        }
    })
};

function toggleRead (readButton) {
    readButton.addEventListener('click', () => {
        readButton.classList.toggle('active');
    })
};

function editBook (editButton, book) {
    editButton.addEventListener('click', () => {
        title.value  = book.title;
        author.value = book.author;
        year.value   = book.year;
        pages.value  = book.pages;

        renderForm();
        form.setAttribute('data-edit-id', createBookID(book));
    });
};

//GPT suggestion

// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();