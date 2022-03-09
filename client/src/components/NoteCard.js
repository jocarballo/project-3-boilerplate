import React, { useState } from "react";
import axios from "axios";

export default function NoteCard(props) {
  const note = props.note;
  const createdAt = note.createdAt;

  const date = new Date(createdAt);

  return (
    <><div className="col-3 mt-4">
      <div className="note-card">
        <div
          className="card-body rounded-top rounded-4"
          style={{ background: "white" }}
        >
          <h5>{date.toDateString()}</h5>
          <h5 className="card-title">{note.plant.common_name}</h5>
          <p className="card-text">{note.text}</p>
        </div>
        { (note.watered || note.soil_changed) && (
          <div className="d-flex">
          {note.watered && (
            <div className="me-4 badge-button">
              <span className="badge rounded-pill bg-warning text-dark">Watered</span>
            </div>
          )}
          {note.soil_changed && (
            <div className="me-4 badge-button">
              <span className="badge rounded-pill bg-warning text-dark">
                Soil changed
              </span>
            </div>
          )}
        </div>
          )}
        

      </div>
    </div><hr className="note-line-break"/></>
  );
}
