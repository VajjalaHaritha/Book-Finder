import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

export default BookList;
