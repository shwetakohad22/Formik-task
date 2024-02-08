import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editingAuthor, setEditingAuthor] = useState(null);

  const initialValues = {
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
    name: "",
    birthDate: "",
    biography: "",
  };

  const bookSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string().required("ISBN number is required"),
    publicationDate: Yup.date().required("Publication date is required"),
  });

  const authorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    birthDate: Yup.date().required("Birth date is required"),
    biography: Yup.string().required("Biography is required"),
  });

  const handleSubmitBook = (values, { setSubmitting }) => {
    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.isbn === editingBook.isbn ? values : book
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } else {
      setBooks([...books, values]);
    }
    setSubmitting(false);
  };

  const handleSubmitAuthor = (values, { setSubmitting }) => {
    if (editingAuthor) {
      const updatedAuthors = authors.map((author) =>
        author.name === editingAuthor.name ? values : author
      );
      setAuthors(updatedAuthors);
      setEditingAuthor(null);
    } else {
      setAuthors([...authors, values]);
    }
    setSubmitting(false);
  };

  const handleDeleteBook = (isbn) => {
    const updatedBooks = books.filter((book) => book.isbn !== isbn);
    setBooks(updatedBooks);
  };

  const handleDeleteAuthor = (name) => {
    const updatedAuthors = authors.filter((author) => author.name !== name);
    setAuthors(updatedAuthors);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Library Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Books</h2>
          <Formik
            initialValues={editingBook || initialValues}
            validationSchema={bookSchema}
            onSubmit={handleSubmitBook}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="isbn"
                    placeholder="ISBN number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="isbn"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="date"
                    name="publicationDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="publicationDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-6">
          <h2>Authors</h2>
          <Formik
            initialValues={editingAuthor || initialValues}
            validationSchema={authorSchema}
            onSubmit={handleSubmitAuthor}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="date"
                    name="birthDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="biography"
                    placeholder="Biography"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {editingAuthor ? "Update Author" : "Add Author"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Books List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN number</th>
                <th>Publication date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.isbn}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publicationDate}</td>
                  <td>
                    <button
                      onClick={() => handleEditBook(book)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.isbn)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h2>Authors List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth date</th>
                <th>Biography</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.birthDate}</td>
                  <td>{author.biography}</td>
                  <td>
                    <button
                      onClick={() => handleEditAuthor(author)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAuthor(author.name)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
