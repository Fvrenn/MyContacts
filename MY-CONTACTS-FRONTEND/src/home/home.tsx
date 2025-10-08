import React, { useEffect, useState, useRef } from "react";
import UserService from "../service/user.service";
import type { Contact } from "@/lib/interface/contact.interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddContactFormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  adresseInput: HTMLInputElement;
}
interface AddContactFormElement extends HTMLFormElement {
  readonly elements: AddContactFormElements;
}

export default function Home() {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

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

  async function handleAddContact(
    event: React.FormEvent<AddContactFormElement>
  ) {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const phonenumber = event.currentTarget.elements.phoneInput.value;
    const adresse = event.currentTarget.elements.adresseInput.value;
    try {
      await UserService.addContact(username, phonenumber, adresse);
      const response = await UserService.getAllContact();
      setContacts(response.data);
      closeButtonRef.current?.click();
    } catch (err) {
      console.error("Erreur lors de l'ajout du contact", err);
    }
  }

  async function handlEditContact(
    event: React.FormEvent<AddContactFormElement>
  ) {
    event.preventDefault();
    if (!contactToEdit) return;
    const username = event.currentTarget.elements.usernameInput.value;
    const phonenumber = event.currentTarget.elements.phoneInput.value;
    const adresse = event.currentTarget.elements.adresseInput.value;
    try {
      await UserService.editContact(
        contactToEdit._id,
        username,
        phonenumber,
        adresse
      );
      const response = await UserService.getAllContact();
      setContacts(response.data);
      setEditDialogOpen(false);
      setContactToEdit(null);
    } catch (err) {
      console.error("Erreur lors de la modification du contact", err);
    }
  }

  async function handlDeleteContact() {
    if (!contactToEdit) return;
    try {
      await UserService.deleteContact(contactToEdit._id);
    } catch (err) {
      console.error("Erreur lors de la supression du contact", err);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ajouter un contact</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter un contact</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un contact
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddContact}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input id="usernameInput" name="usernameInput" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Phone number</Label>
                <Input id="phoneInput" name="phoneInput" type="tel" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Adresse</Label>
                <Input id="adresseInput" name="adresseInput" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button ref={closeButtonRef} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour Suprimer */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier un contact</DialogTitle>
            <DialogDescription>
              Modifiez les informations du contact
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlEditContact}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="usernameInput"
                  name="usernameInput"
                  defaultValue={contactToEdit?.username || ""}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Phone number</Label>
                <Input
                  id="phoneInput"
                  name="phoneInput"
                  type="tel"
                  defaultValue={contactToEdit?.phonenumber || ""}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Adresse</Label>
                <Input
                  id="adresseInput"
                  name="adresseInput"
                  defaultValue={contactToEdit?.adresse || ""}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button ref={closeButtonRef} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      
      {/* Dialog pour éditer */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Suprimer un contact</DialogTitle>
            <DialogDescription>
              Suprimer le contact
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlDeleteContact}>
            <DialogFooter>
              <DialogClose asChild>
                <Button ref={closeButtonRef} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Suprimer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <h1>Contacts</h1>
      {loading ? (
        <div>Chargement...</div>
      ) : contacts.length === 0 ? (
        <div>Aucun contact enregistré</div>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              <strong>{contact.username}</strong>
              <br />
              Téléphone : {contact.phonenumber}
              <br />
              Adresse : {contact.adresse}
              <br />
              Propriétaire : {contact.ownerEmail}
              <br />
              Créé le : {new Date(contact.createdAt).toLocaleString()}
              <Button
                variant="outline"
                onClick={() => {
                  setContactToEdit(contact);
                  setEditDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setContactToEdit(contact);
                  setDeleteDialogOpen(true);
                }}
              >
                supprimer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
