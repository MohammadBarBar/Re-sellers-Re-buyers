import React, { useState } from "react";
import "./form.css";
import config from "../../services/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyInput from "../MyInput/MyInput";
import { useParams } from "react-router-dom";

function ResellerRebuyerForm() {
  const { id } = useParams(); //  Read the url params and check for ID
  const [formData, setFormData] = useState({
    reSeller: id,
    reBuyer: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      const api = config.serverApi + "/" + id; // call the ResellerRebuyers/:id
      console.log(id);
      console.log(formData);
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          if (!response.ok) {
            // If the response status is not OK (e.g., 400 Bad Request, 500 Internal Server Error),
            const data = await response.json();
            throw new Error(data.error);
          }
          return response.json();
        })
        .then((data) => {
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
          setFormData({
            ...formData,
            reBuyer: "",
          });
        })
        .catch((error) => {
          toast.error(`Error : ${error}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
        });
    } else {
      fetch(config.serverApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          if (!response.ok) {
            // If the response status is not OK (e.g., 400 Bad Request, 500 Internal Server Error),
            const data = await response.json();
            throw new Error(data.error);
          }
          return response.json();
        })
        .then((data) => {
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
          setFormData({
            reSeller: "",
            reBuyer: "",
          });
        })
        .catch((error) => {
          toast.error(`Error : ${error}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
        });
    }
    //Send the POST request
  }
  if (id) {
    // Conditinal Rendering If we have ID value So we need to update contents
    return (
      <div className="container centered-form">
        <ToastContainer /> {/* Add toast notification */}
        <div className="form-container">
          <h2 className="mb-4 form-title">Update Re-Seller/Re-buyer</h2>
          <form onSubmit={handleSubmit}>
            <MyInput
              name="reSeller"
              type="text"
              placeholder="Add a new reSeller that not exist"
              label="Re-Seller"
              value={id}
              onChange={handleInputChange}
              disabledFlag={true}
            />
            <MyInput
              name="reBuyer"
              type="text"
              placeholder="Add a new reBuyer that not exist"
              label="Re-Buyer"
              value={formData.reBuyer}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-info">
              Update record
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container centered-form">
        <ToastContainer />
        <div className="form-container">
          <h2 className="mb-4 form-title">Add Re-Seller/Re-buyer</h2>
          <form onSubmit={handleSubmit}>
            <MyInput
              name="reSeller"
              type="text"
              placeholder="Add a new reSeller that not exist"
              label="Re-Seller"
              value={formData.reSeller}
              onChange={handleInputChange}
            />
            <MyInput
              name="reBuyer"
              type="text"
              placeholder="Add a new reBuyer that not exist"
              label="Re-Buyer"
              value={formData.reBuyer}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-info">
              Add record
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ResellerRebuyerForm;
