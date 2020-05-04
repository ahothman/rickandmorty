import React from "react";

type Details = {
  gender: string;
  episode: Array<string>;
  origin: {
    name: string;
  };
};

const CardDetails = ({ details }: { details: Details }) => {
  if (details === null || details === undefined) {
    return null;
  }

  const { origin, gender, episode } = details;
  return (
    <div className="card__details">
      <p>Details</p>
      <p>{gender}</p>
      <p>origin {origin && origin.name}</p>
      <div className="episode">
        {episode.map((e, i) => (
          <a key={i} className="episode__link" href={e}>
            {e}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardDetails;
