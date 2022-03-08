import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList(props) {
  const notes = props.notes ? props.notes : []

  return (
    <div>
      {notes.map((note, i) => (
              <NoteCard key={i} note={note} />
            ))}
    </div>
  );
}
