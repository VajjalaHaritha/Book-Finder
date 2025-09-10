import React, { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import BookList from "./Components/BookList";
import "./Styles/Layout.css";
import "./Styles/Themes.css";
import "./Styles/Components.css";

function App() {
  const [query, setQuery] = useState("");      
  const [books, setBooks] = useState([]);      
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");        

  // Auto-hide popup messages after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const searchBooks = async (title) => {
    if (!title) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("❌ No books found.");
      } else {
        const validBooks = data.docs.filter(
          (book) => book.title && book.title.length > 2
        );
        if (validBooks.length === 0) {
          setError("❌ No valid books found.");
        } else {
          setBooks(validBooks.slice(0, 20));
        }
      }
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📚 Book Finder</h1>

      {/* Search bar */}
      <SearchBar query={query} setQuery={setQuery} onSearch={searchBooks} />

      {/* UI States */}
      {loading ? (
        <p className="loading">⏳ Loading...</p>
      ) : error ? (
        <p className="error-popup">{error}</p>
      ) : books.length > 0 ? (
        <BookList books={books} />
      ) : null}
    </div>
  );
}

export default App;
