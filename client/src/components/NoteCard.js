import React from "react";

export default function NoteCard(props) {
  const note = props.note;
  const createdAt = note.createdAt

  const date =  new Date(createdAt)
  date.toDateString()


  return (
    <div className="col-3 mt-4">
      <div className="note-card">
        <div
          className="card-body rounded-top rounded-4"
          style={{ background: "white" }}
        >
          <h5>{date.toDateString()}</h5>
          <h5 className="card-title">{note.plant}</h5>
          <p className="card-text">{note.text}</p>
        </div>
      </div>
    </div>
  );
}
