import React, { useEffect, useState } from "react";

const Card = ({ name, species, image, type, created }) => {
  return (
    <div className="card">
      <img src={image} width="60px" height="60px" />
      <div className="details">
        <p className="details__item">name: {name}</p>
        <p className="details__item">species: {species}</p>
        <p className="details__item">
          type: {type.length > 0 ? type : "unknowmn"}
        </p>
        <p className="details__item">
          created on: {new Date(created).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const fetchByPage = (page) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => res.json())
      .then(({ info, results }) => {
        setCharacters(results.slice(0, 10));
      });
  };
  useEffect(() => {
    fetchByPage(1);
  }, []);

  return (
    <div className="container">
      {characters.map((c) => (
        <Card {...c} />
      ))}
    </div>
  );
};

export default Characters;
