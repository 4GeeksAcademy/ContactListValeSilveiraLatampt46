import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await actions.createContact(contact);

    if (success) {
      setContact({
        full_name: "",
        email: "",
        phone: "",
        address: "",
      });

      navigate("/");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center fw-bold mb-4">Add a new contact</h1>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        
        <div>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="full_name"
            className="form-control"
            placeholder="Full Name"
            value={contact.full_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2">
          save
        </button>
      </form>

      <div className="mt-2">
        <Link to="/" className="text-primary">
          or get back to contacts
        </Link>
      </div>
    </div>
  );
};
