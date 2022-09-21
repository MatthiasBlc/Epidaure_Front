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
  // user Authentification

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

  // user Data

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

  // Agenda Data

  static async agendaData() {
    // console.log(Cookies.get("token"));
    const response = await API.get("/time_slots");
    // console.log("tag", response);
    return response;
  }

  static async agendaCreate(text, start, end, barColor, resource) {
    // console.log(Cookies.get("token"));
    const response = await API.post("/time_slots", {
      time_slots: { text: text, start: start, end: end, barColor: barColor, resource: resource },
    });
    // console.log("tag", response);
    return response;
  }

  static async agendaUpdate(id, text, start, end, barColor, resource) {
    // console.log(Cookies.get("token"));
    const response = await API.patch("/time_slots/" + id, {
      time_slots: { text: text, start: start, end: end, barColor: barColor, resource: resource },
    });
    // console.log("tag", response);
    return response;
  }

  static async agendaDelete(id) {
    await API.delete("/time_slots/" + id)    
  };

}
