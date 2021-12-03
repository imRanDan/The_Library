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
      const StoredBooks = [
         {
            title: 'Book One',
            author: 'John Doe',
            pages: '75'
         },
         {
            title: 'Book Two',
            author: 'Jane Doe',
            pages: '75' 
         }
      ];

      const books = StoredBooks;

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

   static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pages').value = '';
   }
}

// Store Class: Handles Storage

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

   // Instatiate Book
   const book = new Book(title, author, pages);
   
   // Add Book to UI
   UI.addBookToList(book);


   //Clear fields
   UI.clearFields();

});

//Event: Remove a Book