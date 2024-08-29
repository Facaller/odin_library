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
    createForm()
    console.log('this works')
});

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
        }
    } else {
        addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, readValue);
    }
    
    cardForm.style.display = "none";
    if (overlay) {
        document.body.removeChild(overlay);
    }

    form.reset();
    form.removeAttribute('data-edit-id');
});

mainContent.addEventListener('click', (event) => {
    let editForm = event.target.closest('card');
    if (editForm) {
        const oldTitle = card.getAttribute('data-title');
        const oldAuthor = card.getAttribute('data-author');
        const oldYear = card.getAttribute('data-year');
        const oldPages = card.getAttribute('data-pages');

        title.value  = oldTitle;
        author.value = oldAuthor;
        year.value   = oldYear;
        pages.value  = oldPages;
    }
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

function createForm () {
    cardForm.style.display = 'block';
    overlay = document.createElement('section');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    overlay.classList.add('overlay');
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
            editBook(bookBtn2, book);

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

function editBook (edit, book) {
    edit.addEventListener('click', () => {
        title.value = book.title;
        author.value = book.author;
        year.value = book.year;
        pages.value = book.pages;

        createForm();

        form.setAttribute('data-edit-id', createBookID(book));
    });
};

//GPT suggestion

// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();