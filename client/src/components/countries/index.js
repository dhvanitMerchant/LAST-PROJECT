import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Axios.get("/api/countries")
      .then(result => setCountries(result.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>All Countries</h1>
      </header>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {countries.map(country => (
              <tr key={country._id}>
                <td>
                  <Link to={`/${country._id}`}>{country.name}</Link>
                </td>
                <td>{country.export}</td>
                
                <td>
                  <Link to={`/${country._id}/edit`}>edit</Link>|
                  <Link to={`/${country._id}/destroy`}>delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
