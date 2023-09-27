import React from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer if needed
import MyInput from "../MyInput/MyInput"; // Import your MyInput component

function MyForm({ id, formData, handleInputChange, handleSubmit }) {
  const isUpdate = !!id; // Check if there is an ID (truthy) for conditional rendering
  return (
    <div className="container centered-form">
      <ToastContainer /> {/* Add toast notification */}
      <div className="form-container">
        <h2 className="mb-4 form-title">
          {isUpdate ? "Update" : "Add"} Re-Seller/Re-buyer
        </h2>
        <form onSubmit={handleSubmit}>
          <MyInput
            name="reSeller"
            type="text"
            placeholder="Add a new reSeller that not exist"
            label="Re-Seller"
            value={isUpdate ? id : formData.reSeller}
            onChange={handleInputChange}
            disabledFlag={isUpdate}
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
            {isUpdate ? "Update record" : "Add record"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
