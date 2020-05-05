import React, { useEffect, useState } from "react";
import Paginaton from "../pagination";
import Card from "./card";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isFilteredByDate, setIsFilteredByDate] = useState(false);
  const [info, setInfo] = useState({
    totalCount: 0,
    pages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    speices: "",
    type: "all",
    from: "",
    to: "",
  });
  const fetchByPage = (page: number, filters: string = "") => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}${filters}`)
      .then((res) => res.json())
      .then(({ info, results }) => {
        setCharacters(results);
        setFilteredCharacters(results.slice(0, 10));
        setInfo({ totalCount: info.count, pages: info.pages });
      })
      .catch((err) => {
        console.log(err);
        // set character to an empty array in case of 404 response.
        setInfo({ totalCount: 0, pages: 0 });
        setCharacters([]);
      });
  };

  const handleChange = ({ target }) => {
    setFilter({
      ...filter,
      [target.name]: target.value,
    });
  };

  const statusOptions = ["all", "alive", "dead", "unknown"].map((s, i) => (
    <option key={i} value={s}>
      {s}
    </option>
  ));

  const getFilterQueryStr = () => {
    let filterStr = "";
    if (filter.speices.length > 0) {
      filterStr += `&speices=${filter.speices}`;
    }
    if (filter.type !== "all") {
      filterStr += `&status=${filter.type}`;
    }
    return filterStr;
  };

  const handelClick = (pageIndex: number) => {
    setIsFilteredByDate(false);
    if (pageIndex - currentPage === 1) {
      // no need to fetch the data again as the data is alread there.=
      setFilteredCharacters(characters.slice(10));
    } else {
      const index =
        pageIndex > info.pages ? Math.ceil(pageIndex / 2) : pageIndex;
      setCurrentPage(pageIndex);
      fetchByPage(index, getFilterQueryStr());
    }
  };

  const filterCharacters = () => {
    if (filter.from !== "" && filter.to !== "") {
      const filteredData = characters.filter((c) => {
        const created = new Date(c.created.split("T")[0]).getTime();
        const from = new Date(filter.from).getTime();
        const to = new Date(filter.to).getTime();
        return created >= from && created <= to;
      });

      setFilteredCharacters(filteredData);
      // hide tha pagination if it is filtered by the date
      setIsFilteredByDate(true);
    }
  };

  const clearFilter = () => {
    setFilter({
      ...filter,
      from: "",
      to: "",
    });
    handelClick(currentPage);
  };

  useEffect(() => {
    fetchByPage(1);
  }, []);

  return (
    <>
      <div className="container">
        <div className="controls">
          <input
            type="text"
            name="speices"
            className="controls__item"
            value={filter.speices}
            onChange={handleChange}
          />
          <select
            name="type"
            className="controls__item"
            value={filter.type}
            onChange={handleChange}
          >
            {statusOptions}
          </select>
          <button
            id="search"
            className="controls__item"
            onClick={() => handelClick(1)}
          >
            search
          </button>
        </div>
        <div className="controls">
          <input
            id="from"
            type="date"
            name="from"
            placeholder="YYYY-MM-DD"
            className="controls__item"
            value={filter.from}
            onChange={handleChange}
          />
          <input
            id="to"
            type="date"
            name="to"
            placeholder="YYYY-MM-DD"
            className="controls__item"
            value={filter.to}
            onChange={handleChange}
          />
          <button
            id="filter"
            className="controls__item"
            onClick={filterCharacters}
          >
            filter
          </button>
          <button
            id="clearfilter"
            className="controls__item"
            onClick={clearFilter}
          >
            clear Filter
          </button>
        </div>
        <div>
          {filteredCharacters.map((c, i) => (
            <Card key={i} character={c} />
          ))}
        </div>
      </div>
      {!isFilteredByDate && (
        <Paginaton
          itemsPerPage={10}
          totalCount={info.totalCount}
          onClick={(i) => handelClick(i)}
        />
      )}
    </>
  );
};

export default Characters;
