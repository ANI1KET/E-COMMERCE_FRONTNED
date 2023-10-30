import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = ({ user }) => {
  const userName = user ? user.email : " ";
  return (
    <div className="contactContainer" >
      <a className="mailBtn" href="mailto:rouniyaraniket9@gmail.com">
        <Button>Contact: {userName}</Button>
      </a>
    </ div>
  );
};

export default Contact;