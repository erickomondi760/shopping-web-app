import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();

  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { pathname, search } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
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
        {pages.map((curr) => {
          return (
            <button
              key={curr}
              onClick={() => handlePageChange(curr)}
              className={`btn btn-xs md:btn-md join-item ${
                curr === page ? "border-base-300 bg-base-300" : ""
              }`}
            >
              {curr}
            </button>
          );
        })}
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
export default PaginationContainer;
