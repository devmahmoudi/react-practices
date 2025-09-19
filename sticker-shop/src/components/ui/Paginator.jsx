import { useState } from "react";
import ReactPaginate from "react-paginate";

export const Paginator = ({ total, onPageChange, perPage = 10 }) => {
  const [offset, setOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(perPage);
  const pageCount = Math.ceil(total / perPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newStart = (event.selected * perPage) % total;
    setOffset(newStart);

    const newEnd = newStart + perPage;
    setEndOffset(newEnd);

    onPageChange(newStart, newEnd);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< قبلی"
        renderOnZeroPageCount={null}
        className="flex w-full justify-center gap-2 mt-12 font-primary"
        pageClassName="bg-blue-400 py-1 px-2 text-white rounded-lg"
        activeClassName="bg-blue-600"
        previousClassName="bg-blue-400 py-1 px-2 text-white rounded-lg"
        nextClassName="bg-blue-400 py-1 px-2 text-white rounded-lg"
      />
    </>
  );
};
