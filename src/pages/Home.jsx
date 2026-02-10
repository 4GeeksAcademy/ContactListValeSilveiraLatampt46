import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const { store, actions } = useGlobalReducer();

  // state pra modal
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    actions.get_contacts();
  }, []);

  // Abrir modal
  const openDeleteModal = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  // Cerrar modal
  const closeDeleteModal = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  // Confirmar borrar
  const confirmDelete = async () => {
    if (contactToDelete) {
      await actions.deleteContact(contactToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact">
          <button className="btn btn-success px-4">Add new contact</button>
        </Link>
      </div>

      <div className="d-flex flex-column">
        {store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => openDeleteModal(contact)}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeDeleteModal}
                ></button>
              </div>

              <div className="modal-body">
                {contactToDelete ? (
                  <p className="mb-0">
                    If you delete <b>{contactToDelete.name}</b>, you will not be
                    able to recover it.
                  </p>
                ) : (
                  <p className="mb-0">
                    If you delete this contact, you will not be able to recover
                    it.
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={closeDeleteModal}>
                  Oh no!
                </button>

                <button className="btn btn-secondary" onClick={confirmDelete}>
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
