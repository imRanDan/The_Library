//Book Class: Represents a Book
class Book{
   constructor(title, author, pages) {
      this.title = title;
      this.author = author;
      this.pages = pages;
   }
}


//UI Class: Handle UI Tasks
class UI {
   static displayBooks() {
      const books = Store.getBooks();

      books.forEach((book) => UI.addBookToList(book));
   }

   static addBookToList(book) {
      const list = document.querySelector('#book-list');

      const row = document.createElement('tr');

      row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.pages}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
   }

   static deleteBook(el) {
      if(el.classList.contains('delete')) {
         el.parentElement.parentElement.remove();
      }
   }

   static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);

      // Message vanishes in 5 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 5000);
   }

   static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
   }
}

// Store Class: Handles Storage
class Store {
   static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
   }

   static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
   }

   static removeBook(pages) {
      const books = Store.getBooks();

      books.forEach((book, index) => {
         if(book.pages === pages) {
            books.splice(index, 1);
         }
      });

      localStorage.setItem('books', JSON.stringify(books));
   }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
   //Prevent default
   e.preventDefault();
   
   //Get form values
   const title = document.querySelector('#title').value; 
   const author = document.querySelector('#author').value;
   const pages = document.querySelector('#pages').value;

   //validates book addition
   if(title === '' || author === '' || pages === '') {
      UI.showAlert('Please fill in all three fields', 'danger');
   } else {
      // Instatiate book
      const book = new Book(title, author, pages);

      //Add Book to UI
      UI.addBookToList(book);

      //Add book to store
      Store.addBook(book);

      //Show success message
      UI.showAlert('Book Added', 'success');

      //Clear Fields
      UI.clearFields();
   }
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {

   //Removes book from the UI
   UI.deleteBook(e.target)

   //Removes book from the localStorage
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   //Show's success message for removing a book
   UI.showAlert('Book Removed', 'success');
});

 