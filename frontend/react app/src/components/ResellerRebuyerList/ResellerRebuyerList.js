import React, { useState, useEffect } from "react";
import "./list.css";
import config from "../../services/config.json";
import { NavLink } from "react-router-dom";

function ResellerRebuyerList() {
  const [ReSellersRebuyers, setReSellerReBuyer] = useState([]);
  // Use useEffect to perform side effects like : fetching data, directly updating the DOM, and timers.
  // UseEffect like componentDidMount in class component .
  useEffect(() => {
    // Fetch data from an API
    fetch(config.serverApi)
      .then((response) => response.json())
      .then((data) => {
        // Handle the fetched data
        const { userData: retreivedData } = data;
        setReSellerReBuyer(retreivedData);
      });
  }, []); // The empty dependency array [] means this effect runs once, like componentDidMount

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavLink to="/addreSellerReBuyer">
            <input
              value="Add Record"
              type="button"
              className="btn btn-info"
            ></input>
          </NavLink>
          <h2 className="list-title">Reselles-Rebuyers</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Re-sellers</th>
                <th>Re-buyers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ReSellersRebuyers.map((reSeller_reBuyers, index) => (
                <tr key={index}>
                  <td>{reSeller_reBuyers.reSeller}</td>
                  <td>{reSeller_reBuyers.reBuyer.join(",")}</td>
                  <td>
                    <NavLink
                      to={"/addreSellerReBuyer/" + reSeller_reBuyers.reSeller}
                    >
                      <input
                        value="Update"
                        type="button"
                        className="btn btn-primary"
                      ></input>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResellerRebuyerList;
