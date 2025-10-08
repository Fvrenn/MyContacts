import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

class UserService {
  getAllContact() {
    return axios.get(API_URL + "contact", { headers: authHeader() });
  }

  addContact(username: string, phonenumber: string, adresse: string) {
    return axios.post(
      API_URL + "contact",
      { username, phonenumber, adresse },
      { headers: authHeader() }
    );
  }

  editContact(id: string, username: string, phonenumber: string, adresse: string) {
    return axios.patch(
      API_URL + "contact/" + id,
      { username, phonenumber, adresse },
      { headers: authHeader() }
    );
  }

}

export default new UserService();
