import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExpenseForm from "../Expense/ExpenseForm";

const Welcome = () => {
  const VerifyEmailId = () => {
    let token = localStorage.getItem("idToken");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDh86gDOATmnQKrj5jnVFM7Ck9PbeaR0W0",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              let errMessage = "Authentication Failed, " + data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div style={{ fontSize: "200%" }}>Welcome to Expense Tracker</div>
      <Button
        variant="outline-success"
        onClick={VerifyEmailId}
        style={{ float: "right", marginBottom: "500px" }}
      >
        Verify Email{" "}
      </Button>
      <p>
        Your profile is incomplete
        <Link to="completeprofile">
          <span>Complete now</span>
        </Link>
      </p>
      <hr />
      <div style={{ padding: "2%" }}>
        <ExpenseForm />
      </div>
    </div>
  );
};

export default Welcome;
