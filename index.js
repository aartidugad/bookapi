// Framework
const express = require("express");

// Database
const database = require("./database/index");

// Initializing express
const shapeAI = express();

// Configurations

shapeAI.use(express.json());

/*
Route          /
Description    to get all books
Access         PUBLIC
Parameters     NONE
Method         GET
 */
shapeAI.get("/", (req, res) => {
    return res.json({  books: database.books });
});

/*
Route          /is
Description    to get specific  books based on ISBN
Access         PUBLIC
Parameters     isbn
Method         GET
 */
shapeAI.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn

    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({ books: getSpecificBook});
});

/*
Route          /c
Description    to get specific books based on category
Access         PUBLIC
Parameters     category
Method         GET
 */

shapeAI.get("/c/:category", (req , res ) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)

    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({ books: getSpecificBook});
});
/*
Route          /author
Description    to get all authors
Access         PUBLIC
Parameters     none
Method         GET
 */
shapeAI.get("/author", (req, res) => {
    return res.json({ authors: database.authors });
});
/*
Route          /author
Description    to get aa list of authors based on a book's ISBN
Access         PUBLIC
Parameters     isbn
Method         GET
 */
shapeAI.get("/author/:isbn", (req , res ) => {
    const getSpecificBook = database.authors.filter(
        author.book.includes(req.params.isbn)

    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No author found for the book ${req.params.category}`,
        });
    }
    return res.json({ authors: getSpecificBook});
});
/*
Route          /publications
Description    to get all publications
Access         PUBLIC
Parameters     NONE
Method         GET
 */
shapeAI.get("/publications", (req, res) => {
    return res.json({ publications: database.publications});
});
/*
Route          /book/new
Description    add new books
Access         PUBLIC
Parameters     NONE
Method         POST
 */
shapeAI.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books, message : "book was added!!"});
});
/*
Route          /author/new
Description    add new author
Access         PUBLIC
Parameters     NONE
Method         POST
 */
shapeAI.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors, message : "author was added!!"});
});
/*
Route          /publication/new
Description    add new author
Access         PUBLIC
Parameters     NONE
Method         POST
 */
shapeAI.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({ publications: database.publications, message : "publication was added!!"});
});
/*
Route          /book/update
Description    update title of book
Access         PUBLIC
Parameters     isbn
Method         PUT
 */
shapeAI.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({ books: database.books });
});
/*
Route          /book/author/update/:isbn
Description    update/add new author
Access         PUBLIC
Parameters     isbn
Method         PUT
 */
shapeAI.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) 
        return book.authors.push(req.body.newAuthor);
    });
    // update the author database
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books,
         authors: database.authors,
         message: "New author was added"});
});
/*
Route          /publication/update/book
Description    update/add book to publication
Access         PUBLIC
Parameters     isbn
Method         PUT
 */
shapeAI.put("/publication/update/book/:isbn" , (req, res) => {
    //update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });
    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    }); 

    return res.json ({
        books: database.books,
        publications: database.publications,
        message: "sucessfully updated publication"
    });

});

/*
Route          /book/delete
Description    delete a book
Access         PUBLIC
Parameters     isbn
Method         DELETE
 */

shapeAI.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({ books: database.books });

});

/*
Route          /book/delete/author
Description    delete an author from book
Access         PUBLIC
Parameters     isbn, author id
Method         DELETE
 */
shapeAI.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
             (author) => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)) {
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );
            author.books = newBooksList;
            return;
        }
    });
    return res.json({
         message: "Author was deleted from book",
         book: database.books, 
         author: database.authors
    });
});
/*
Route          /book/delete/publication
Description    delete a book from publication
Access         PUBLIC
Parameters     isbn, publication id
Method         DELETE
 */
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req, res) =>{
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter(
                (book) => book !== req.params.isbn
            );
            publication.books = newBooksList;
            return;
        }
    });
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });
    return res.json({
        book: database.books, 
        publications: database.publications
   });

});

shapeAI.listen(3000, () => console.log("Server is Running"));