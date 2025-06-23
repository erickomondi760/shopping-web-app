import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPagination = () => {
  const { meta } = useLoaderData();

  const { pageCount, page } = meta.pagination;

  const { pathname, search } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    ``;
  };

  const createPageButtons = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs md:btn-md join-item ${
          activeClass ? "border-base-300 bg-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const pages = () => {
    const myPages = [];

    // page 1
    myPages.push(createPageButtons({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 2) {
      //dots
      myPages.push(
        <button key="dot-1" className="join-item btn btn-xs md:btn-md">
          ...
        </button>
      );
    }

    //current page
    if (page !== 1 && page !== pageCount) {
      myPages.push(createPageButtons({ pageNumber: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      //dots
      myPages.push(
        <button key="dot-2" className="join-item btn btn-xs md:btn-md">
          ...
        </button>
      );
    }

    //last page
    myPages.push(
      createPageButtons({
        pageNumber: pageCount,
        activeClass: page === pageCount,
      })
    );

    return myPages;
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="join-item btn btn-xs md:btn-md"
          onClick={() => {
            let newPage = page - 1;

            if (newPage < 2) newPage = pageCount;
            handlePageChange(newPage);
          }}
        >
          Prev
        </button>
        {pages()}
        <button
          className="join-item btn btn-xs md:btn-md"
          onClick={() => {
            let newPage = page + 1;

            if (newPage > pageCount) newPage = 1;

            handlePageChange(newPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPagination;
