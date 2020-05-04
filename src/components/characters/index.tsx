import React, { useEffect, useState } from "react";
import Paginaton from "../pagination";
import Card from "./card";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [filter, setFilter] = useState({
    speices: "",
    type: "all",
  });
  const fetchByPage = (page: number, filters: string = "") => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}${filters}`)
      .then((res) => res.json())
      .then(({ info, results }) => {
        setCharacters(results.slice(0, 10));
        setItemsCount(info.count);
      })
      .catch((err) => {
        console.log(err);
        // set character to an empty array in case of 404 response.
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
            className="controls__item"
            onClick={() => {
              fetchByPage(1, getFilterQueryStr());
            }}
          >
            search
          </button>
        </div>
        <div>
          {characters.map((c) => (
            <Card character={c} />
          ))}
        </div>
      </div>
      <Paginaton
        itemsPerPage={10}
        totalCount={itemsCount}
        onClick={(i) => fetchByPage(i, getFilterQueryStr())}
      />
    </>
  );
};

export default Characters;
