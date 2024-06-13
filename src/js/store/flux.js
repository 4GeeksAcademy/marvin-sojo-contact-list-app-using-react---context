import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      //Crea la agenda en caso de no estar creada
      postAgenda: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/marvinsojo",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            toast.error("There are no agendas created");
          }
        } catch (e) {
          console.log(e);
        }
      },

      //Obtiene todos los contactos de la agenda
      getContact: async () => {
        const actions = getActions();
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/marvinsojo/contacts"
          );
          if (response.status == 404) {
            actions.postAgenda();
          } else {
            const data = await response.json();
            setStore({ contacts: data.contacts });
          }
        } catch (e) {
          console.log(e);
        }
      },

      //Crea un contacto nuevo en la agenda
      postContact: async (contact) => {
        const store = getStore();
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/marvinsojo/contacts",
          {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setStore({ contacts: [...store.contacts, data] });
          toast.success("Created User");
          return true;
        }
      },

      //Edita el contacto seleccionado de la agenda
      editContact: async (id, contactEdit) => {
        const actions = getActions();

        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/marvinsojo/contacts/${id}`,
            {
              method: "PUT",
              body: JSON.stringify(contactEdit),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getContact();
            toast.success("Edited User");
            return true;
          }
        } catch (e) {
          console.log(e);
        }
      },

      //Elimina un contacto seleccionado de la agenda
      deleteContact: async (id) => {
        try {
          const store = getStore();
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/marvinsojo/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            alert("No se puede borrar :(");
            throw new Error("No se pudo borrar");
          } else {
            const filterContact = store.contacts.filter(
              (contact) => contact.id !== id
            );
            setStore({ contacts: filterContact });
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
};

export default getState;
