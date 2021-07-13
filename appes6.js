
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    //Add books to UI.
    addBookToList(book) {

        //table 
        const list = document.getElementById('book-list');

        //New row for book.
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" id="delete">X</a></td>
        `;

        //Add book row to table.
        list.appendChild(row);

    }

    //Clear form fileds.
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    //Show alerts for error and success.
    showAlerts(message, classname) {

        //Create alert.
        const div = document.createElement('div');
        //Appned message.
        div.appendChild(document.createTextNode(message));
        //Add classes.
        div.classList = `alert ${classname}`;
        //Get form & container.
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        //Appned alert div before form in container.
        container.insertBefore(div, form);

        //Set time for 3se
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)

    }

    //Delete book from UI
    // deleteBook(target) {
    //     if (target.id === 'delete') {
    //         target.parentElement.parentElement.remove();
    //     }
    // }

}

class Store {

    //Get all books from localStorage.
    static getBooks() {

        //Declare books var.
        let books;

        //Check for books in localStorage.
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        //Return books.
        return books;

    }

    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => {
            //Create ui obj.
            const ui = new UI();

            ui.addBookToList(book);
        })

    }

    //Add books to localstorage.
    static addBook(book) {

        //get all books.
        const books = Store.getBooks();

        //add new book.
        books.push(book);

        //update the books in localstorage.
        localStorage.setItem('books', JSON.stringify(books));

    }

    static deleteBook(target) {

        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === target.parentElement.previousElementSibling.textContent) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }

}

//Display afer DOM loads.
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listner for form submit.
document.getElementById('book-form').addEventListener('submit', function (e) {

    //Get form info
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Create a new book obj.
    const book = new Book(title, author, isbn);

    //Create a new UI obj.
    const ui = new UI();

    //Validate input.

    if (title === '' || author === '' || isbn === '') {

        //Show Alert
        ui.showAlerts('Please enter all fields!', 'error');

    } else {
        //Add book to list.
        Store.addBook(book);

        //Show Alert
        ui.showAlerts('Book added succesfully!', 'success');

        //Clear the form fields.
        ui.clearFields();
    }

    e.preventDefault();
})

//Delete Eventlistener.
document.getElementById('book-list').addEventListener('click', function (e) {

    //Create a new UI Object.
    const ui = new UI();

    //Delete book.
    Store.deleteBook(e.target);

    ui.showAlerts('Book deleted successfully!', 'success');

    e.preventDefault();
})