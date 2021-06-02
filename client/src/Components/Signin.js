import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin } from "./Api calls/helper functions";

const Signin = () => {
  const [values, setValues] = useState({
    phoneNumber: "",
    password: "",
    error: "",
    role: "",
    loading: false,
    didRedirect: false,
  });

  const { phoneNumber, password, error, loading, didRedirect, role } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (role === 1) {
        return <Redirect to="/addContacts" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ phoneNumber, password })
      .then((data) => {
        console.log(data);
        if (data?.error) {
          setValues({ ...values, error: data?.error, loading: false });
        } else {
          setValues({
            ...values,
            role: data.user.role,
            didRedirect: true,
          });
            console.log(data.user.role)
        }
      })
      .catch(() => console.log("signin request failed"));
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">phoneNumber</label>
              <input
                onChange={handleChange("phoneNumber")}
                value={phoneNumber}
                className="form-control"
                type="phoneNumber"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </div>
  );
};

export default Signin;
