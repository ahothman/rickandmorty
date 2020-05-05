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
    to: Math.min(pagesCount, linksNumber),
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const pages = range(paginationInfo.from, paginationInfo.to);

  const setNext = () => {
    const { to } = paginationInfo;
    if (to < pagesCount) {
      setPaginationInfo({
        from: to + 1,
        to: to + Math.min(linksNumber, pagesCount - to),
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
    handelClick(0, true);
  }, [paginationInfo.from]);

  // set the page to the first page in case the data is refreshed
  useEffect(() => {
    setCurrentPageIndex(0);
    setPaginationInfo({
      from: 1,
      to: linksNumber,
    });
  }, [totalCount]);

  let links = pages.map((page, index) => (
    <li
      key={index + 1}
      className={classNames("page", {
        "page--selected": currentPageIndex === index,
      })}
      onClick={() => handelClick(index)}
    >
      {page}
    </li>
  ));

  links = [
    <li key={0} className="page" onClick={setPrev}>
      {"<<"}
    </li>,
    ...links,
    <li key={linksNumber + 1} className="page" onClick={setNext}>
      {">>"}
    </li>,
  ];

  return <ul className="pagination">{links}</ul>;
};

export default Pagination;
