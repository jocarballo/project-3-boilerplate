import React from "react";

export default function QuestionFormulaire({plants}) {

  return (
    <div className="botanic-formulaire rounded-3">
      <h4 className="question-garden-title">If you want to make a question to our Botanic, you can do it here 🌱</h4>
        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            style={{height: 100}, {width: 500}}
          >
            <option defaultValue>Choose your plant</option>
            {plants.map((plant, i) => (
              <option defaultValue={i}>{plant.common_name}</option>
            ))}
          </select>
          <label htmlFor="floatingSelect">Works with selects</label>
        </div>
        <p></p>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Write your question here"
            id="floatingTextarea2"
            style={{height: 100}, {width: 500}}
          >
          </textarea>
          <label htmlFor="floatingTextarea2">Write your question here:</label>
        </div>
        <p></p>
        <div class="d-grid">
                <button type="submit" class="btn btn-outline-success btn-block">
                  Send to botanic
                </button>
              </div>
      </div>
  );
}