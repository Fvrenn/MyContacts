const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const authService = require("../services/auth.service");

// Mock des modules
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../model/user.model");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    const mockReq = {
      body: {
        email: "test@example.com",
        username: "testuser",
        password: "password123"
      }
    };

    it("devrait enregistrer un utilisateur avec succès", async () => {
      // Arrange
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      const mockSave = jest.fn().mockResolvedValue(true);
      User.mockImplementation(() => ({
        save: mockSave
      }));

      // Act
      const result = await authService.register(mockReq);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body.message).toBe("Inscription réussie");
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(mockSave).toHaveBeenCalled();
    });

    it("devrait retourner une erreur pour un email invalide", async () => {
      // Arrange
      const invalidEmailReq = {
        body: {
          email: "invalid-email",
          username: "testuser",
          password: "password123"
        }
      };

      // Act
      const result = await authService.register(invalidEmailReq);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body.error).toBe("Email invalide. Veuillez fournir un email valide.");
    });

    it("devrait retourner une erreur si l'email existe déjà", async () => {
      // Arrange
      User.findOne.mockResolvedValue({ email: "test@example.com" });

      // Act
      const result = await authService.register(mockReq);

      // Assert
      expect(result.status).toBe(409);
      expect(result.body.error).toBe("Cet email est déjà utilisé");
    });
  });

  describe("login", () => {
    const mockReq = {
      body: {
        username: "testuser",
        password: "password123"
      }
    };

    it("devrait connecter un utilisateur avec succès", async () => {
      // Arrange
      const mockUser = {
        username: "testuser",
        email: "test@example.com",
        password: "hashedPassword"
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mock-token");
      process.env.SECRET_KEY = "test-secret";

      // Act
      const result = await authService.login(mockReq);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body.token).toBe("mock-token");
      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "test@example.com" },
        "test-secret",
        { expiresIn: "1h" }
      );
    });

    it("devrait retourner une erreur si l'utilisateur n'existe pas", async () => {
      // Arrange
      User.findOne.mockResolvedValue(null);

      // Act
      const result = await authService.login(mockReq);

      // Assert
      expect(result.status).toBe(401);
      expect(result.body.error).toBe("Echec de l'authentification");
    });

    it("devrait retourner une erreur si le mot de passe est incorrect", async () => {
      // Arrange
      const mockUser = {
        username: "testuser",
        email: "test@example.com",
        password: "hashedPassword"
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      // Act
      const result = await authService.login(mockReq);

      // Assert
      expect(result.status).toBe(401);
      expect(result.body.error).toBe("Echec de l'authentification");
    });
  });
});
