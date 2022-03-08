import React from "react";


export default function NoteCard(props) {
  
    const note = props.note;

  return (
    <div className="col-3 mt-4">
      <div className="plant-card shadow rounded">
        <div
          className="card-body rounded-top rounded-4"
          style={{ background: "white" }}
        >
          <h5 className="card-title">{note.plantId}</h5>
          <p className="card-text">{note.text}</p>
        </div>
      </div>
    </div>
  );
}
