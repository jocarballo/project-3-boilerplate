import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList(props) {
  const notes = props.notes ? props.notes : []

  return (
    <div>
      {notes.map((note) => (
              <NoteCard note={note} />
            ))}
    </div>
  );
}
