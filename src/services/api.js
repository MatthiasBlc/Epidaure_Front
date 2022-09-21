import axios from "axios";
import Cookies from "js-cookie";

// const apiUrl = "https://epidaure-api-preprod.herokuapp.com";
const apiUrl = process.env.REACT_APP_BACK_URL;
const API = axios.create({ baseURL: apiUrl });
const API2 = axios.create({ baseURL: apiUrl });

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      headers.Authorization || Cookies.get("epidaure_id")
    }`,
  },
}));

API2.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
}));

export default class APIManager {
  static async registerUser(email, password, practice_id) {
    const response = await API.post("/users", {
      user: { email: email, password: password, practice_id: practice_id },
    });
    // const jwt = response.headers.authorization.slice(7);
    // Cookies.set("epidaure_id", jwt);
    return response.data;
  }

  static async loginUser(email, password) {
    const response = await API2.post("/users/sign_in", {
      user: { email: email, password: password },
    });
    const jwt = response.headers.authorization.slice(7);
    Cookies.set("epidaure_id", jwt);
    return response.data;
  }

  static async logoutUser() {
    const response = await API.delete("/users/sign_out");
    Cookies.remove("epidaure_id");
    return response.data;
  }

  static async forgotPasswordUser(email) {
    const response = await API2.post("/users/password", {
      user: { email: email },
    });
    return response.data;
  }

  static async resetPasswordUser(userToken, newPassword, passwordConfirmation) {
    const response = await API2.patch("/users/password", {
      user: {
        reset_password_token: userToken,
        password: newPassword,
        password_confirmation: passwordConfirmation,
      },
    });
    return response.data;
  }

  static async memberData() {
    const response = await API.get("/member-data");
    return response;
  }

  static async practiceData(id) {
    const response = await API.get("/practices/" + id);
    return response.data;
  }

  static async editUser(email, password) {
    const response = await API.patch("/users", {
      user: {
        email: email,
        password: password,
      },
    });
    return response.data;
  }

  //  -----------------------        PRACTICE FUNCTIONS
  static async editPractice(id, name, adresse, email) {
    const response = await API.patch("/practices/" + id, {
      practice: {
        name: name,
        adresse: adresse,
        email: email,
      },
    });
    return response.data;
  }

  //  -----------------------        ROOMS FUNCTIONS
  static async createRoom(practice_id, name) {
    const response = await API.post("/rooms", {
      room: {
        name: name,
        practice_id: practice_id,
      },
    });
    return response.data;
  }

  static async deleteRoom(id) {
    await API.delete("/rooms/" + id);
  }

  static async editRoom(id, name) {
    const response = await API.patch("/rooms/" + id, {
      room: {
        name: name,
      },
    });
    return response.data;
  }

  // CONTACT FORM
  static async contactForm(last_name, first_name, email, content) {
    const response = await API2.post("/contacts", {
      contact: {
        last_name: last_name,
        first_name: first_name,
        email: email,
        content: content,
      },
    });
    return response.data;
  }
}
