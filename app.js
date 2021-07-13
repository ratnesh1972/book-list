//Book constructor.
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor.
function UI() { }

//Add book to list.
UI.prototype.addBookToList = function (book) {
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

//Clear form.
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Show Alerts.
UI.prototype.showAlerts = function (message, classname) {

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

//Delete book
UI.prototype.deleteBook = function (target) {
    if (target.id === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


//Event Listner for form submit.
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

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
        ui.addBookToList(book);

        //Show Alert
        ui.showAlerts('Book added succesfully!', 'success');

        //Clear the form fields.
        ui.clearFields();
    }
})

//Delete Eventlistener.
document.getElementById('book-list').addEventListener('click', function (e) {

    //Create a new UI Object.
    const ui = new UI();

    //Delete book.
    ui.deleteBook(e.target);

    ui.showAlerts('Book deleted successfully!', 'success');

    e.preventDefault();
})