import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    Axios.get(`/api/countries/${props.match.params.id}`)
      .then(result => setCountry(result.data))
      .catch(err => console.error(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1>{country.name}</h1>
      </header>

      <div>{country.population}</div>
    </div>
  );
}

export default Show;
