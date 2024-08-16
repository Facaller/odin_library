const myLibrary = [];

let title   = document.getElementById('title');
let author  = document.getElementById('author');
let year    = document.getElementById('year');
let pages   = document.getElementById('pages');
let read    = document.getElementById('read');

let addBook     = document.getElementById('addBook');
let cardForm    = document.getElementById('cardForm');
let mainContent = document.getElementById('mainContent');
let submit      = document.getElementById('submit');

let overlay;



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
    let titleValue  = title.value;
    let authorValue = author.value;
    let yearValue   = year.value;
    let pagesValue  = pages.value;
    let readValue   = read.value;

    console.log(`Title: ${titleValue}, Author: ${authorValue}, Year: ${yearValue}, Pages: ${pagesValue}, Read: ${readValue}`);

    addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, readValue);

    document.getElementById('cardTitle').textContent = `Title: ${titleValue}`;
    document.getElementById('cardAuthor').textContent = `Author: ${authorValue}`;
    document.getElementById('cardYear').textContent = `Year: ${yearValue}`;
    document.getElementById('cardPages').textContent = `Pages: ${pagesValue}`;
    document.getElementById('cardRead').textContent = `Read: ${readValue}`;
    
    console.log('Library:', myLibrary);

    cardForm.style.display = "none";
    if (overlay) {
        document.body.removeChild(overlay);
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
};

function displayBook () {
    let displayText = '';
    for (const obj of myLibrary) {
        displayText += `Title: ${obj.title}, Author: ${obj.author}, Year: ${obj.year}, Pages: ${obj.pages}, Read: ${obj.read}\n`;
    } 
};

// addBookToLibrary ("LOTR", "Tolkein", 1950, 342, "No")
// addBookToLibrary ("Thus Spoke Zarathustra", "Nietzsche", 1940, 213, "Yes");
// addBookToLibrary ("Stranger", "Camus", 1939, 125, "Yes");
// displayBook();

// console.log(myLibrary);