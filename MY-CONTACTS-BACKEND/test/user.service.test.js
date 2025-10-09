const User = require('../model/user.model');
const { decodeToken } = require('../middleware/authMiddleware');
const userService = require('../services/user.service');

// Mock des modules
jest.mock('../model/user.model');
jest.mock('../middleware/authMiddleware');

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMe", () => {
    it("devrait récupérer les informations de l'utilisateur connecté", async () => {
      // Arrange
      const mockReq = {
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      const mockUser = {
        _id: "user123",
        username: "testuser",
        email: "test@example.com",
        password: "hashedPassword"
      };

      decodeToken.mockReturnValue("test@example.com");
      User.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await userService.getMe(mockReq);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockReq.header).toHaveBeenCalledWith("Authorization");
      expect(decodeToken).toHaveBeenCalledWith("Bearer mock-token");
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    });

    it("devrait retourner null si l'utilisateur n'existe pas", async () => {
      // Arrange
      const mockReq = {
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      decodeToken.mockReturnValue("nonexistent@example.com");
      User.findOne.mockResolvedValue(null);

      // Act
      const result = await userService.getMe(mockReq);

      // Assert
      expect(result).toBeNull();
      expect(decodeToken).toHaveBeenCalledWith("Bearer mock-token");
      expect(User.findOne).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
    });

    it("devrait gérer les erreurs de décodage de token", async () => {
      // Arrange
      const mockReq = {
        header: jest.fn().mockReturnValue("Bearer invalid-token")
      };

      decodeToken.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      // Act & Assert
      await expect(userService.getMe(mockReq)).rejects.toThrow("Invalid token");
      expect(mockReq.header).toHaveBeenCalledWith("Authorization");
      expect(decodeToken).toHaveBeenCalledWith("Bearer invalid-token");
    });

    it("devrait gérer les erreurs de base de données", async () => {
      // Arrange
      const mockReq = {
        header: jest.fn().mockReturnValue("Bearer mock-token")
      };

      decodeToken.mockReturnValue("test@example.com");
      User.findOne.mockRejectedValue(new Error("Database error"));

      // Act & Assert
      await expect(userService.getMe(mockReq)).rejects.toThrow("Database error");
      expect(decodeToken).toHaveBeenCalledWith("Bearer mock-token");
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    });
  });
});
