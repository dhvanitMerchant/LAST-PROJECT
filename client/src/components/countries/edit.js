import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/countries/${props.match.params.id}`)
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/countries/update", {
      id: props.match.params.id,
      ...inputs
    })
      .then(resp => setRedirect(true))
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value
      };
    });
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1>Edit Country Post</h1>
      </header>
      <div>
        <form action="/countries" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.name}
            />
          </div>

          <div className="form-group">
            <label>Population</label>
            <textarea
              className="form-control"
              name="population"
              onChange={handleInputChange}
              value={inputs.population}
            />
          </div>

          <div className="form-group">
            <label>Export</label>
            <select
              className="form-control"
              name="export"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.export}
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

export default Edit;
