import React from "react";
import APIManager from "../../services/api";

const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = e.target.email.value;

    await APIManager.forgotPasswordUser(userEmail).catch((error) => {
      alert("erreur");
      console.log(error.message);
    });
  };

  return (
    <div>
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
