import React, { useEffect, useState } from "react";
import UserService from "../service/user.service";
import type {Contact} from "@/lib/interface/contact.interface"


export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getAllContact()
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des contacts :", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      {loading ? (
        <div>Chargement...</div>
      ) : contacts.length === 0 ? (
        <div>Aucun contact enregistré</div>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              <strong>{contact.username}</strong><br />
              Téléphone : {contact.phonenumber}<br />
              Adresse : {contact.adresse}<br />
              Propriétaire : {contact.ownerEmail}<br />
              Créé le : {new Date(contact.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}