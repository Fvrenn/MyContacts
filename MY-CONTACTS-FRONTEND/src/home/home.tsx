import React, { useEffect, useState, useRef } from "react";
import UserService from "../service/user.service";
import type { Contact } from "@/lib/interface/contact.interface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const isEditMode = contactToEdit !== null;

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

  async function handleFormSubmit(
    event: React.FormEvent<AddContactFormElement>
  ) {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const phonenumber = event.currentTarget.elements.phoneInput.value;
    const adresse = event.currentTarget.elements.adresseInput.value;

    try {
      if (isEditMode && contactToEdit) {
        await UserService.editContact(
          contactToEdit._id,
          username,
          phonenumber,
          adresse
        );
      } else {
        await UserService.addContact(username, phonenumber, adresse);
      }

      const response = await UserService.getAllContact();
      setContacts(response.data);
      handleCloseFormDialog();
    } catch (err) {
      console.error(
        `Erreur lors de ${
          isEditMode ? "la modification" : "l'ajout"
        } du contact`,
        err
      );
    }
  }

  function handleCloseFormDialog() {
    setFormDialogOpen(false);
    setContactToEdit(null);
  }

  function openEditDialog(contact: Contact) {
    setContactToEdit(contact);
    setFormDialogOpen(true);
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
      {/* Bouton Ajouter un contact */}
      <div className="my-4">
        <Button variant="outline" onClick={() => setFormDialogOpen(true)}>
          Ajouter un contact
        </Button>
      </div>

      <Separator className="my-4" />
      {/* Formulaire d'ajout/modification */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Modifier un contact" : "Ajouter un contact"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Modifiez les informations du contact"
                : "Remplissez les informations pour ajouter un contact"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usernameInput">Nom d'utilisateur</Label>
              <Input
                id="usernameInput"
                name="usernameInput"
                defaultValue={isEditMode ? contactToEdit?.username || "" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneInput">Numéro de téléphone</Label>
              <Input
                id="phoneInput"
                name="phoneInput"
                type="tel"
                defaultValue={
                  isEditMode ? contactToEdit?.phonenumber || "" : ""
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adresseInput">Adresse</Label>
              <Input
                id="adresseInput"
                name="adresseInput"
                defaultValue={isEditMode ? contactToEdit?.adresse || "" : ""}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  ref={closeButtonRef}
                  variant="outline"
                  onClick={handleCloseFormDialog}
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit">
                {isEditMode ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour éditer */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Suprimer un contact</DialogTitle>
            <DialogDescription>Suprimer le contact</DialogDescription>
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

      {/* Liste des contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div>Chargement...</div>
        ) : contacts.length === 0 ? (
          <div>Aucun contact enregistré</div>
        ) : (
          contacts.map((contact) => (
            <Card key={contact._id} className="p-4">
              <CardHeader>
                <CardTitle>{contact.username}</CardTitle>
                <CardDescription>
                  Téléphone : {contact.phonenumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Adresse : {contact.adresse}</p>
                <p>Propriétaire : {contact.ownerEmail}</p>
                <p>
                  Créé le :{" "}
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => openEditDialog(contact)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setContactToEdit(contact);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
