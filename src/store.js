export const initialStore = () => {
  return {
    contacts: [],
    currentContact: null,
    loading: false,
    error: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "get_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

      case "get_contact":
      return {
        ...store,
        currentContact: action.payload,
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id
            ? action.payload
            : contact
        ),
      };

    default:
      return store;
  }
}
