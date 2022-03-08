import axios from "axios";
import React from "react";
import NotesList from "./NotesList";

export default function NotesSection(props) {
  const plants = props.plants;
  const notes = props.notes;

  const storedToken = localStorage.getItem("authToken");

  const submitNote = (e) => {
    e.preventDefault();
    let plantId = e.target[0].value;
    let text = e.target[1].value;

    console.log("plantId", plantId);
    console.log("text", text);

    axios
      .post(
        "/notes",
        {
          text: text,
          plantId: plantId,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log("created note with success");
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
              <form onSubmit={submitNote}>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    style={({ height: 100 }, { width: 500 })}
                  >
                    <option defaultValue>Choose your plant</option>
                    {plants.map((plant) => (
                      <option value={plant._id}>{plant.common_name}</option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">Works with selects</label>
                </div>
                <p></p>
                <div class="form-floating">
                  <textarea
                    className="form-control text-area-garden-note"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea">Leave a note here</label>
                </div>
                <div className="mb-3 upload-photo-garden-note">
                  <label for="formFileSm" className="form-label"></label>
                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                  />
                </div>
                <button type="submit" class="btn btn-outline-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div col-6>
            <NotesList notes={notes}/>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="row">
        <div className="col-6">
          <div className="notes-container">
            <h1>Notes</h1>
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                style={({ height: 100 }, { width: 500 })}
              >
                <option defaultValue>Choose your plant</option>
                {plants.map((plant, i) => (
                  <option defaultValue={i}>{plant.common_name}</option>
                ))}
              </select>
              <label htmlFor="floatingSelect">Works with selects</label>
            </div>
            <p></p>
            <div class="form-floating">
              <textarea
                className="form-control text-area-garden-note"
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label for="floatingTextarea">Leave a note here</label>
            </div>
            <div className="mb-3 upload-photo-garden-note">
              <label for="formFileSm" className="form-label"></label>
              <input
                className="form-control form-control-sm"
                id="formFileSm"
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
            <img className="botanic-image" src="/images/botanic.jpeg" alt="" />
        </div>
      </div> */
}
