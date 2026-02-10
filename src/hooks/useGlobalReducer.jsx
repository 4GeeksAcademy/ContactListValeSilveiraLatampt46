import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

export const StoreContext = createContext();


export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const AGENDA_SLUG = "vale_agenda";

  const actions = {
    createContact: async (contact) => {
      try {
        const contactToSend = {
          name: contact.full_name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: "vale_agenda",
        };

        console.log(
          "JSON enviado a la API:",
          JSON.stringify(contactToSend, null, 2)
        );

        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/vale_agenda/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactToSend),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error API detalle:", JSON.stringify(data, null, 2));
        }
        await actions.get_contacts();
        return true;

      } catch (error) {
        console.error("Error creating contact:", error.message);
        return false;
      }
    },


    deleteContact: async (id) => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/vale_agenda/contacts/${id}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Error deleting contact");
        }

        dispatch({
          type: "delete_contact",
          payload: id
        });
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    },

    get_contact: async (id) => {
      try {
        console.log("ID recibido en get_contact:", id);
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/vale_agenda/contacts/${id}`
        );

        if (!response.ok) {
          throw new Error("Error getting contact");
        }

        const data = await response.json();

        dispatch({
          type: "get_contact",
          payload: data
        });

      } catch (error) {
        console.error("Error getting contact:", error);
      }
    },

    update_contact: async (id, contact) => {
      try {
        const contactToSend = {
          name: contact.full_name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: "vale_agenda",
        };

        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/vale_agenda/contacts/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactToSend),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error updating contact:", data);
          return false;
        }

        await actions.get_contacts();
        return true;

      } catch (error) {
        console.error("Error updating contact:", error.message);
        return false;
      }
    },


    get_contacts: async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
        );

        if (!response.ok) throw new Error("Error getting contacts");

        const data = await response.json();

        dispatch({
          type: "get_contacts",
          payload: data.contacts,
        });
      } catch (error) {
        console.error("Error getting contacts:", error);
      }
    },


    createAgendaIfNotExists: async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`,
          {
            method: "POST",

          }
        );
        if (response.status === 400) {
          // Agenda ya existe, no mostrar nada en consola
          return;
        }

        if (!response.ok) {
          console.error("Error creando agenda:", response.statusText);
        } else {
          console.log("Agenda creada o ya existe:", AGENDA_SLUG);
        }
      } catch (error) {
        console.error("Error en la request de la agenda:", error);
      }
    },



  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const { store, actions } = useContext(StoreContext);
  return { store, actions };
}
