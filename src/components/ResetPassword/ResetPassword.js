import React from "react";
import { useParams } from "react-router-dom";
import APIManager from "../../services/api";

const ResetPassword = () => {
  const userToken = useParams().token;
  console.log(userToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;

    await APIManager.resetPasswordUser(
      userToken,
      newPassword,
      passwordConfirmation
    ).catch((error) => {
      alert("erreur");
      console.log(error.message);
    });
  };

  return (
    <div>
      <h1>Change your password</h1>
      <form onSubmit={handleSubmit}>
        New password <input type="text" id="newPassword" name="newPassword" />{" "}
        Confirm password
        <input
          type="text"
          id="passwordConfirmation"
          name="passwordConfirmation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default ResetPassword;
