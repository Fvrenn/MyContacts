const Contact = require('../model/contact.model');
const { decodeToken, verifyAcces } = require('../middleware/authMiddleware');
const contactService = require('../services/contact.service');

// Mock des modules
jest.mock('../model/contact.model');
jest.mock('../middleware/authMiddleware');

describe("Contact Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addContact", () => {
    it("devrait ajouter un contact avec succès", async () => {
      // Arrange
      const mockReq = {
        body: {
          username: "John Doe",
          phonenumber: "0123456789",
          adresse: "123 rue de la Paix"
        },
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };
      
      decodeToken.mockReturnValue("owner@example.com");
      const mockSave = jest.fn().mockResolvedValue(true);
      Contact.mockImplementation(() => ({
        save: mockSave
      }));

      // Act
      const result = await contactService.addContact(mockReq);

      // Assert
      expect(result.message).toBe("Contact ajoutée");
      expect(decodeToken).toHaveBeenCalledWith("Bearer mock-token");
      expect(Contact).toHaveBeenCalledWith({
        username: "John Doe",
        phonenumber: "0123456789",
        adresse: "123 rue de la Paix",
        ownerEmail: "owner@example.com"
      });
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe("editContact", () => {
    const mockContact = {
      _id: "contact123",
      username: "John Doe",
      ownerEmail: "owner@example.com"
    };

    it("devrait modifier un contact avec succès", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        body: { username: "Jane Doe", phonenumber: "0987654321" },
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(true);
      const updatedContact = { ...mockContact, username: "Jane Doe" };
      Contact.findByIdAndUpdate.mockResolvedValue(updatedContact);

      // Act
      const result = await contactService.editContact(mockReq);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body.message).toBe("Contact modifié avec succès");
      expect(result.body.contact).toEqual(updatedContact);
      expect(Contact.findById).toHaveBeenCalledWith("contact123");
      expect(verifyAcces).toHaveBeenCalledWith("Bearer mock-token", mockContact);
      expect(Contact.findByIdAndUpdate).toHaveBeenCalledWith(
        "contact123",
        { $set: { username: "Jane Doe", phonenumber: "0987654321" } },
        { new: true }
      );
    });

    it("devrait retourner une erreur d'accès refusé", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        body: { username: "Jane Doe" },
        header: jest.fn().mockReturnValue("Bearer invalid-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(false);

      // Act
      const result = await contactService.editContact(mockReq);

      // Assert
      expect(result.status).toBe(403);
      expect(result.body.message).toBe("Accès refusé: vous n'êtes pas autorisé à modifier ce contact");
    });
  });

  describe("deleteContact", () => {
    const mockContact = {
      _id: "contact123",
      username: "John Doe",
      ownerEmail: "owner@example.com"
    };

    it("devrait supprimer un contact avec succès", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(true);
      Contact.findByIdAndDelete.mockResolvedValue(true);

      // Act
      const result = await contactService.deleteContact(mockReq);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body.message).toBe("Contact supprimé avec succès");
      expect(Contact.findById).toHaveBeenCalledWith("contact123");
      expect(verifyAcces).toHaveBeenCalledWith("Bearer mock-token", mockContact);
      expect(Contact.findByIdAndDelete).toHaveBeenCalledWith("contact123");
    });

    it("devrait retourner une erreur d'accès refusé", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        header: jest.fn().mockReturnValue("Bearer invalid-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(false);

      // Act
      const result = await contactService.deleteContact(mockReq);

      // Assert
      expect(result.status).toBe(403);
      expect(result.body.message).toBe("Accès refusé: vous n'êtes pas autorisé à supprimer ce contact");
    });
  });

  describe("getContacts", () => {
    it("devrait récupérer tous les contacts de l'utilisateur", async () => {
      // Arrange
      const mockReq = {
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };
      
      const mockContacts = [
        { username: "John Doe", ownerEmail: "owner@example.com" },
        { username: "Jane Smith", ownerEmail: "owner@example.com" }
      ];

      decodeToken.mockReturnValue("owner@example.com");
      Contact.find.mockResolvedValue(mockContacts);

      // Act
      const result = await contactService.getContacts(mockReq);

      // Assert
      expect(result).toEqual(mockContacts);
      expect(decodeToken).toHaveBeenCalledWith("Bearer mock-token");
      expect(Contact.find).toHaveBeenCalledWith({ ownerEmail: "owner@example.com" });
    });
  });

  describe("getContactById", () => {
    const mockContact = {
      _id: "contact123",
      username: "John Doe",
      ownerEmail: "owner@example.com"
    };

    it("devrait récupérer un contact par ID avec succès", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(true);

      // Act
      const result = await contactService.getContactById(mockReq);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockContact);
      expect(Contact.findById).toHaveBeenCalledWith("contact123");
      expect(verifyAcces).toHaveBeenCalledWith("Bearer mock-token", mockContact);
    });

    it("devrait retourner une erreur d'accès refusé", async () => {
      // Arrange
      const mockReq = {
        params: { id: "contact123" },
        header: jest.fn().mockReturnValue("Bearer invalid-token")
      };

      Contact.findById.mockResolvedValue(mockContact);
      verifyAcces.mockReturnValue(false);

      // Act
      const result = await contactService.getContactById(mockReq);

      // Assert
      expect(result.status).toBe(403);
      expect(result.body.message).toBe("Accès refusé: vous n'êtes pas autorisé à voir ce contact");
    });
  });
});
