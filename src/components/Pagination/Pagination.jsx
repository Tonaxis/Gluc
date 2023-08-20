import React from 'react';
import './Pagination.scss';

function Pagination({ page, totalPages, handlePageChange }) {
  const maxVisiblePages = 7;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  let start = Math.max(2, page - halfMaxVisiblePages);
  let end = Math.min(totalPages - 1, page + halfMaxVisiblePages);

  if (end - start < maxVisiblePages - 1) {
    if (start === 2) {
      end = Math.min(totalPages - 1, end + (maxVisiblePages - 1 - (end - start)));
    } else if (end === totalPages - 1) {
      start = Math.max(2, start - (maxVisiblePages - 1 - (end - start)));
    }
  }

  const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <div className="pagination">
      {page > 1 && (
        <button
          className="page-button"
          onClick={() => handlePageChange(page - 1)}
        >
          ◁
        </button>
      )}

      <button
        className={`page-button ${1 === page ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>

      {pageNumbers.map(p => (
        <button
          key={p}
          className={`page-button ${p === page ? 'active' : ''}`}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={`page-button ${totalPages === page ? 'active' : ''}`}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </button>

      {page < totalPages && (
        <button
          className="page-button"
          onClick={() => handlePageChange(page + 1)}
        >
          ▷
        </button>
      )}
    </div>
  );
}

export default Pagination;
