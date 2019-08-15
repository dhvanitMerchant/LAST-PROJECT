import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/countries",inputs)
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    event.persist();
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value } = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) return <Redirect to="/countries" />;

  return (
    <div className="container">
      <header>
        <h1>New Country Post</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Population</label>
            <input
              className="form-control"
              name="population"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Export</label>
            <select
              className="form-control"
              name="export"
              required="required"
              onChange={handleInputChange}
            >
              <option value="AGRICULTURE">AGRICULTURE</option>
              <option value="WATER">WATER</option>
              <option value="MINERALS">MINERALS</option>
              <option value="RARE MATERIALS">RARE MATERIALS</option>
              <option value="LUMBER">LUMBER</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
