//add this. and elements. to relevant areas

class Book {
    constructor (title, author, year, pages, read, id) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

class Library {
    constructor () {
        this.myLibrary = [];
        this.displayedBooks = new Set();
        this.bookCounter = 1;
        this.overlay;
        this.elements = {
            title       : document.getElementById('title'),
            author      : document.getElementById('author'),
            year        : document.getElementById('year'),
            pages       : document.getElementById('pages'),
            read        : document.getElementById('read'),
            addBook     : document.getElementById('addBook'),
            cardForm    : document.getElementById('cardForm'),
            mainContent : document.getElementById('mainContent'),
            submit      : document.getElementById('submit'),
            form        : document.getElementById('form'),
            closeForm   : document.getElementById('closeForm')
        };
        this.initializeEventListeners ();
    }

    initializeEventListeners () {
        this.elements.addBook.addEventListener('click', () => this.renderForm());
        this.elements.closeForm.addEventListener('click', () => this.removeForm());
        this.elements.submit.addEventListener('click', (event) => this.submitBook(event));
        
        this.elements.mainContent.addEventListener('click', (event) => {
            if (event.target.classList.contains('read-button')) {
                const bookID = event.target.closest('.card').dataset.id;
                const book = this.myLibrary.find(book => book.id === bookID);
                if (book) {
                    book.read = book.read === 'Read' ? 'Not Read' : 'Read';
                    event.target.classList.toggle('active');
                    this.updateBookDisplay(book);
                }
            }
        
            if (event.target.classList.contains('remove-button')) {
                const bookCard = event.target.closest('.card')
                const bookID = bookCard.dataset.id
                bookCard.remove();
                this.displayedBooks.delete(bookID);
                
                const bookIndex = this.myLibrary.findIndex(book => book.id === bookID);
                if (bookIndex !== - 1) {
                    this.myLibrary.splice(bookIndex, 1);
                }
            }

            if (event.target.classList.contains('edit-button')) {
                const bookID = event.target.closest('.card').dataset.id;
                const book = this.myLibrary.find(book => book.id == bookID);
                
                this.elements.title.value  = book.title;
                this.elements.author.value = book.author;
                this.elements.year.value   = book.year;
                this.elements.pages.value  = book.pages;
                this.elements.form.setAttribute('data-edit-id', book.id);
                this.renderForm();
            }
        })
    }

    addBookToLibrary (title, author, year, pages, read) {
        if (this.bookExisits(title, author, year, pages)) {
            alert("This book is already in the library.")
            return;
        }

        const id = this.generateUniqueId();
        const newBook = new Book(title, author, year, pages, read, id);
        this.myLibrary.push(newBook);
        this.displayBook(newBook);
    }

    submitBook (event) {
            event.preventDefault();

            if (this.elements.cardForm.style.display === 'none') {
                return;
            }

            const titleValue  = this.elements.title.value.trim();
            const authorValue = this.elements.author.value.trim();
            const yearValue   = this.elements.year.value.trim();
            const pagesValue  = this.elements.pages.value.trim();
            const readValue   = this.elements.read.checked;

            if (!titleValue || !authorValue || !yearValue || !pagesValue) {
                alert("Please fill in all fields!");
                return;
            }

            if (this.bookExisits(titleValue, authorValue, yearValue, pagesValue)) {
                alert("This book is already in the library.")
                return;
            }
        
            const editId = this.elements.form.getAttribute('data-edit-id');
        
            if (editId) {
                const bookToUpdate = this.myLibrary.find(book => book.id == editId);
                if (bookToUpdate) {
                    bookToUpdate.title  = titleValue;
                    bookToUpdate.author = authorValue;
                    bookToUpdate.year   = yearValue;
                    bookToUpdate.pages  = pagesValue;
                    bookToUpdate.read   = readValue;
        
                    this.updateBookDisplay(bookToUpdate);
                }
            } else {
                this.addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, readValue);
            }
            this.removeForm();
    }

    bookExisits (title, author, year, pages) {
        return this.myLibrary.some(book => 
            book.title   === title  &&
            book.author  === author &&
            book.year    === year   &&
            book.pages   === pages
        );
    }

    renderForm () {
        this.elements.cardForm.style.display = 'block';
        if (!this.overlay) {
            this.overlay = document.createElement('section');
            this.overlay.id = 'overlay';
            this.overlay.classList.add('overlay');
            document.body.appendChild(this.overlay);
        }
    }
    
    removeForm () {
        this.elements.title.value  = '';
        this.elements.author.value = '';
        this.elements.year.value   = '';
        this.elements.pages.value  = '';
        this.elements.read.value   = '';
    
        this.elements.cardForm.style.display = 'none'
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
        this.elements.form.removeAttribute('data-edit-id');
    }

    displayBook (book) {
        const bookID = book.id;

        if (!this.displayedBooks.has(bookID)) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('card');
            bookCard.setAttribute('data-id', bookID);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            bookCard.appendChild(cardContent);

            const bookTitle = document.createElement('h2');
            bookTitle.textContent = book.title;
            cardContent.appendChild(bookTitle);

            const bookAuthor = document.createElement('p');
            bookAuthor.textContent = book.author;
            cardContent.appendChild(bookAuthor);

            const bookYear = document.createElement('p');
            bookYear.textContent = book.year;
            cardContent.appendChild(bookYear);

            const bookPages = document.createElement('p');
            bookPages.textContent = book.pages;
            cardContent.appendChild(bookPages);

            const bookRead = document.createElement('p');
            bookRead.textContent = book.read;
            cardContent.appendChild(bookRead);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('card-buttons');
            bookCard.appendChild(buttonsContainer);

            const readButton = document.createElement('button');
            readButton.textContent = 'Read';
            readButton.classList.add('read-button');
            buttonsContainer.appendChild(readButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            buttonsContainer.appendChild(editButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            buttonsContainer.appendChild(removeButton);

            this.elements.mainContent.appendChild(bookCard);
            this.displayedBooks.add(bookID);
        }
    }

    generateUniqueId () {
        return this.bookCounter++;
    }

    updateBookDisplay (book) {
        const bookID = book.id;
        const existingBookCard = this.elements.mainContent.querySelector(`.card[data-id='${bookID}']`)
        
        if (existingBookCard) {
            const cardContent = existingBookCard.querySelector('.card-content');
            const h2 = cardContent.querySelector('h2');
            const pTags = cardContent.querySelectorAll('p');
    
            h2.textContent = book.title;
            pTags[0].textContent = book.author;
            pTags[1].textContent = book.year;
            pTags[2].textContent = book.pages;
            pTags[3].textContent = book.read;
        } else {
            console.log('No card found to update')
            return;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const myLibrary = new Library();
});