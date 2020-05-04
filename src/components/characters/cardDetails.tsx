import React from "react";

type Details = {
  gender: string;
  episode: Array<string>;
  origin: {
    name: string;
  };
};

const CardDetails = ({ details }: { details: Details }) => {
  const { origin, gender, episode } = details;
  return (
    <div className="card__details">
      <p>Details</p>
      <p>{gender}</p>
      <p>origin {origin.name}</p>
      <div className="episode">
        {episode.map((e) => (
          <a className="episode__link" href={e}>
            {e}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
