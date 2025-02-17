import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, numberOfPages, prevPage, nextPage, changeCPage }) => {
  // ✅ Inline styles
  const styles = {
    paginationContainer: {
      display: 'flex',
      marginTop: '15px',
      listStyle: 'none',
      padding: 0,
      borderRadius: '5px',
      overflow: 'hidden',
    
    },
    pageItem: {
      padding: '10px 15px',
      cursor: 'pointer',
      borderRight: '1px solid #ccc',
      textDecoration: 'none',
      color: '#007bff',
      backgroundColor: '#fff',
      fontSize: '16px',
      transition: '0.3s',
    },
    activePage: {
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
    },
    disabledPage: {
      color: '#ccc',
      cursor: 'not-allowed',
    },
    lastItem: {
      borderRight: 'none',
    },
  };

  // ✅ Get Pagination Numbers with "..."
  const getPaginationNumbers = () => {
    const pages = [];
    if (numberOfPages <= 5) {
      return Array.from({ length: numberOfPages }, (_, i) => i + 1);
    }

    if (currentPage > 3) pages.push(1, '...'); // Show "..." for skipped pages

    let start = Math.max(1, currentPage - 1);
    let end = Math.min(numberOfPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < numberOfPages - 2) pages.push('...', numberOfPages); // Show "..." before last page

    return pages;
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <nav>
      <ul style={styles.paginationContainer}>
        {/* Prev Button */}
        <li>
          <a
            href='#'
            style={currentPage === 1 ? { ...styles.pageItem, ...styles.disabledPage } : styles.pageItem}
            onClick={currentPage > 1 ? prevPage : undefined}
          >
            Prev
          </a>
        </li>

        {/* Page Numbers */}
        {paginationNumbers.map((n, i) => (
          <li key={i}>
            {n === '...' ? (
              <span style={{ ...styles.pageItem, ...styles.disabledPage }}>{n}</span>
            ) : (
              <a
                href='#'
                style={currentPage === n ? { ...styles.pageItem, ...styles.activePage } : styles.pageItem}
                onClick={() => changeCPage(n)}
              >
                {n}
              </a>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <a
            href='#'
            style={currentPage === numberOfPages ? { ...styles.pageItem, ...styles.disabledPage } : styles.pageItem}
            onClick={currentPage < numberOfPages ? nextPage : undefined}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

// ✅ Add PropTypes validation
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  changeCPage: PropTypes.func.isRequired,
};

export default Pagination;
