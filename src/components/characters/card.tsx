import React, { useState } from "react";
import CardDetails from "./cardDetails";

type Character = {
  name: string;
  species: string;
  image: string;
  type: string;
  created: string;
  gender: string;
  episode: Array<string>;
  origin: {
    name: string;
  };
};

const Card = ({ character }: { character: Character }) => {
  if (character === null || character === undefined) {
    return null;
  }

  const { name, species, image, type, created, ...details } = character;
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="card" onClick={toggleDetails}>
      <div className="card__info">
        <img src={image} width="60px" height="60px" />
        <div className="info__details">
          <p className="info__item">name: {name}</p>
          <p className="info__item">species: {species}</p>
          <p className="info__item">type: {type}</p>
          <p className="details__item">
            created on: {new Date(created).toLocaleDateString()}
          </p>
        </div>
      </div>
      {showDetails && <CardDetails details={details} />}
    </div>
  );
};

export default Card;
