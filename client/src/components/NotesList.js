import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList(props) {
  const notes = props.notes ? props.notes : []

 const sortedNotes = notes.sort(function(note1, note2){
    const date1 = new Date(note1.createdAt);
    const date2 = new Date(note2.createdAt);

    return date2 - date1  
});

  return (
    <div>
      {sortedNotes.map((note, i) => (
              <NoteCard key={i} note={note} />
            ))}
    </div>
  );
}
