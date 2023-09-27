import { useState } from "react";
import "./form.css";
import config from "../../services/config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import MyForm from "../MyForm/MyForm";

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
  if (id) return MyForm({ id, formData, handleInputChange, handleSubmit });
  else return MyForm({ formData, handleInputChange, handleSubmit });
}

export default ResellerRebuyerForm;
