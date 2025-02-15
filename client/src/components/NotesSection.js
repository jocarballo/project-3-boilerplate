import axios from "axios";
import React from "react";
import NotesList from "./NotesList";

export default function NotesSection(props) {
  const plants = props.plants;
  const notes = props.notes;
  const onNoteCreated = props.onNoteCreated;

  const storedToken = localStorage.getItem("authToken");

  const submitNote = (e) => {
    e.preventDefault();
    let plantId = e.target[0].value;
    let text = e.target[1].value;
    let watered = e.target[2].checked;
    let soilChanged = e.target[3].checked;
    
    console.log("e: ", e)
    console.log("plantId", plantId);
    console.log("text", text);
    console.log('watered: ', e.target[2].checked)

    axios
      .post(
        "/notes",
        {
          text: text,
          plantId: plantId,
          watered: watered,
          soil_changed: soilChanged
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log("created note with success");
        onNoteCreated();
        alert("Note submited with success!");
      })

      .catch((err) => {
        console.log(err);
        alert("We've got a problem. Try to submit again!");
      });
  };

  return (
    <div>
      <div className="container notes-container">
        <div className="row">
          <div className="col-6 d-flex justify-content-center">
            <div className="align-self-center">
              <h1>Notes</h1>
              <h4 className="notes-list-firstSubtitle">Create a note </h4>
              <form onSubmit={submitNote}>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    style={({ height: 100 }, { width: 500 })}
                  >
                    <option defaultValue>Choose your plant</option>
                    {plants.map((plant, i) => (
                      <option key={i} value={plant._id}>
                        {plant.common_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">Plant</label>
                </div>
                <p></p>
                <div className="form-floating">
                  <textarea
                    className="form-control text-area-garden-note"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label htmlFor="floatingTextarea">Leave a note here</label>
                </div>
                <p></p>
                <div className="row mb-3">
                  <div className="col">
                    <div className="d-flex">
                      <div className="form-check me-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck1"
                        />
                        <label className="form-check-label" htmlFor="gridCheck1">
                          Watered
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck1"
                        />
                        <label className="form-check-label" htmlFor="gridCheck1">
                          Soil changed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <h4 className="notes-list-title">Your Notes</h4>
        <div className="row">
          <NotesList notes={notes} />
        </div>
      </div>
    </div>
  );
}
