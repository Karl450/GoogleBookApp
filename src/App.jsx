import { useState, useEffect } from 'react';
import { searchBooks } from './GoogleBooksService';
import './App.css';


function App() {

  const [query, setQuery] = useState('')
  const [ books, setBooks ] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleSearch = async (page = 0) => {
    const startIndex = page * itemsPerPage;
    const result = await searchBooks(query, itemsPerPage, startIndex);
    setBooks(result.items)
  }

  console.log(books)

  useEffect(() => {
    if (query.length > 0) {
      handleSearch();
    }
    else {
      setBooks([])
    }
  }, [query]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch(newPage);
  };

  return (
    <>
      <h1>Search for a book!</h1>
      <input 
        className='searchBar'
        type="text"
        value={query}
        onChange={ e => setQuery(e.target.value) }
      />

      <ol id='bookList'>
        {books.map(book => (
          <li key={book.id} className="bookEntry">
            <div
              className='thumbnail'
              style={{ 
                backgroundImage: `url(${book.volumeInfo.imageLinks?.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
             <div className="bookInfo">
                {book.volumeInfo.title} | {book.volumeInfo.authors?.join(', ')} |
                {book.saleInfo?.retailPrice?.amount ? `${book.saleInfo.retailPrice.amount}$` : ' Not for sale'} |
                {book.saleInfo?.buyLink &&
                  <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">Buy Here!</a>
                }
              </div>
          </li>
        ))}
      </ol>

      <div className="pagination">
        {currentPage > 0 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>


    </>
  )

}

export default App;
