import React from "react";

export default function PlantCharacteristics(props) {

  const image = props.image;
  const title = props.title;
  const description = props.description;

  return (
    <div className="plant-characteristic">
      <img
        src={image}
        className="plant-characteristic-img"
        alt="..."
      />
      <div className="plant-characteristic-title">{title}</div>
      <div className="plant-characteristic-description">{description}</div>
    </div>
  );
}
