import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "auth/register", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
