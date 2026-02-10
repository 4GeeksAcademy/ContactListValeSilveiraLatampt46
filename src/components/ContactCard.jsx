import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPencilAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const ContactCard = ({ contact, onDelete }) => {
  const avatarUrl = `https://randomuser.me/api/portraits/lego/${contact.id % 10}.jpg`;

  return (
    <div className="d-flex justify-content-between align-items-start border rounded p-3 bg-white shadow-sm">
     
      <div className="d-flex  ps-3 gap-3 align-items-center">
        <img
          src={avatarUrl}
          alt="avatar"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h5 className="mb-2 fw-bold">{contact.name}</h5>

           <p className="mb-0 text-muted">
            <FaMapMarkerAlt className="me-2" />
            {contact.address}
          </p>

          <p className="mb-1 text-muted">
            <FaPhone className="me-2" />
            {contact.phone}
          </p>

           <p className="mb-1 text-muted">
            <FaEnvelope className="me-2" />
            {contact.email}
          </p>
        </div>
      </div>

      
      <div className="d-flex gap-3 align-items-start" 
       style={{ paddingRight: "60px" }}>
        <Link
          to={`/edit-contact/${contact.id}`}
          className="text-dark"
          style={{ fontSize: "16px", paddingRight: "15px"}}
        >
          <FaPencilAlt />
        </Link>

        <button
          onClick={onDelete}
          className="btn p-0 text-dark"
          style={{ fontSize: "16px"}}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
