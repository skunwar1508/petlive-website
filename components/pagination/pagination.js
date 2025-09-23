"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFastBackward, faStepBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons";

export default function PageModule(props) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);

  useEffect(() => {
    setCurrentPage(Number(pageParam) || 1);
  }, [pageParam]);

  const totalItems = props.totalItems ?? 10;
  const itemsPerPage = props.itemsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const range = props.range ?? 3;
  const url = props.pageUrl ?? "/users?";
  const theme = props.theme ?? "";

  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(totalPages, currentPage + range);

  const handlePageChange = (pageNo) => {
    if (pageNo < 1 || pageNo > totalPages) return;
    setCurrentPage(pageNo);
    if (props.pageChange) props.pageChange(pageNo);
  };

  const pageItems = [];
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <li key={i} className={`page-item${currentPage === i ? " active" : ""}`}>
        <a
          title={`Page No ${i}`}
          className="page-link"
          href={`${url}page=${i}`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i);
          }}
        >
          <span>
            <b>{i}</b>
          </span>
        </a>
      </li>
    );
  }

  return (
    <div className={`table_botm_paging ${theme}`}>
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <a
            title="First Page"
            className="page-link"
            href={`${url}page=1`}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faFastBackward} />
            </span>
          </a>
        </li>
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <a
            title="Previous Page"
            className="page-link"
            href={`${url}page=${Math.max(1, currentPage - 1)}`}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.max(1, currentPage - 1));
            }}
          >
            <span>
              <FontAwesomeIcon icon={faStepBackward} />
            </span>
          </a>
        </li>
        {pageItems}
        <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
          <a
            title="Next Page"
            className="page-link"
            href={`${url}page=${Math.min(totalPages, currentPage + 1)}`}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.min(totalPages, currentPage + 1));
            }}
          >
            <span>
              <FontAwesomeIcon icon={faStepForward} />
            </span>
          </a>
        </li>
        <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
          <a
            title="Last Page"
            className="page-link"
            href={`${url}page=${totalPages}`}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faFastForward} />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
