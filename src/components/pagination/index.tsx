import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import classNames from "classnames";

const range = (from: number, to: number): Array<number> =>
  new Array(to - from + 1).fill(0).map((_, i) => from + i);

type PaginationProps = {
  itemsPerPage: number;
  totalCount: number;
  linksNumber?: number;
  onClick: (pageInedx: number) => void;
};

const Pagination = ({
  itemsPerPage,
  totalCount,
  onClick,
  linksNumber = 5,
}: PaginationProps) => {
  const pagesCount = Math.ceil(totalCount / itemsPerPage);
  const [paginationInfo, setPaginationInfo] = useState({
    from: 1,
    to: linksNumber, // 5, // Math.min(pagesCount, 5),
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const pages = range(paginationInfo.from, paginationInfo.to);

  const setNext = () => {
    const { to } = paginationInfo;
    if (to < pagesCount) {
      setPaginationInfo({
        from: to + 1,
        to: to + linksNumber,
      });
    }
  };

  const setPrev = () => {
    const { from } = paginationInfo;
    if (from > 1) {
      setPaginationInfo({
        from: from - linksNumber,
        to: from - 1,
      });
    }
  };

  const handelClick = (pageIndex: number, forceUpdate: Boolean = false) => {
    if (pageIndex !== currentPageIndex || forceUpdate) {
      setCurrentPageIndex(pageIndex);
      onClick(pages[pageIndex]);
    }
  };
  const firstUpdate = useRef(true);
  // always make the middle item selected by default
  useLayoutEffect(() => {
    // escape it for the first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    handelClick(Math.floor(linksNumber / 2), true);
  }, [paginationInfo.from]);

  // set the page to the first pasge in case the data is refreshed
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [totalCount]);

  let links = pages.map((page, index) => (
    <li
      className={classNames("page", {
        "page--selected": currentPageIndex === index,
      })}
      onClick={() => handelClick(index)}
    >
      {page}
    </li>
  ));

  links = [
    <li className="page" onClick={setPrev}>
      {"<<"}
    </li>,
    ...links,
    <li className="page" onClick={setNext}>
      {">>"}
    </li>,
  ];

  return <ul className="pagination">{links}</ul>;
};

export default Pagination;
