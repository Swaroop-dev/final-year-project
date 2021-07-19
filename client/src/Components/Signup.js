import React, { useState, useEffect } from "react";
import { signup } from "./Api calls/helper functions";
import { Link } from "react-router-dom";
// import { Button, Container } from "@material-ui/core";

// const Signup = () => {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     error: "",
//     deviceid: "",
//     phoneNumber: "",
//     success: false,
//   });

//   const { name, email, password, error, success, deviceid, phoneNumber } = values;

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setValues({ ...values, error: false });
//     signup({ name, email, password,deviceid,phoneNumber })
//       .then((data) => {
//         if (data?.error) {
//           setValues({ ...values, error: data?.error, success: false });
//         } else {
//           setValues({
//             ...values,
//             name: "",
//             email: "",
//             password: "",
//             error: "",
//             success: true,
//           });
//         }
//       })
//       .catch(() => console.log("Error in signup"));
//   };

//   const signUpForm = () => {
//     return (
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <form>
//             <div className="form-group">
//               <label className="text-light">Name</label>
//               <input
//                 className="form-control"
//                 onChange={handleChange("name")}
//                 type="text"
//                 value={name}
//               />
//             </div>
//             <div className="form-group">
//               <label className="text-light">Email</label>
//               <input
//                 className="form-control"
//                 onChange={handleChange("email")}
//                 type="email"
//                 value={email}
//               />
//             </div>

//             <div className="form-group">
//               <label className="text-light">Password</label>
//               <input
//                 onChange={handleChange("password")}
//                 className="form-control"
//                 type="password"
//                 value={password}
//               />
//             </div>
//             <div className="form-group">
//               <label className="text-light">deviceid</label>
//               <input
//                 onChange={handleChange("deviceid")}
//                 className="form-control"
//                 type="text"
//                 value={deviceid}
//               />
//             </div>
//             <div className="form-group">
//               <label className="text-light">phone Number</label>
//               <input
//                 onChange={handleChange("phoneNumber")}
//                 className="form-control"
//                 type="number"
//                 value={phoneNumber}
//               />
//             </div>
//             <button onClick={onSubmit} className="btn btn-success btn-block">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const successMessage = () => {
//     return (
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <div
//             className="alert alert-success"
//             style={{ display: success ? "" : "none" }}
//           >
//             New account was created successfully. Please{" "}
//             <Link to="/signin">Login Here</Link>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const errorMessage = () => {
//     return (
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <div
//             className="alert alert-danger"
//             style={{ display: error ? "" : "none" }}
//           >
//             {error}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {successMessage()}
//       {errorMessage()}
//       {signUpForm()}
//       <p className="text-white text-center">{JSON.stringify(values)}</p>
//     </div>
//   );
// };

// export default Signup;



import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://bit.ly/3kFqtnk)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    deviceid: "",
    phoneNumber: "",
    success: false,
  });

  const { name, email, password, error, success, deviceid, phoneNumber } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
 const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div >
        <div >
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
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password,deviceid,phoneNumber })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => console.log("Error in signup"));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              id="name"
              autoComplete="current-name"
              onChange={handleChange("name")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange("email")}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange("password")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="phoneNumber"
              name="phoneNumber"
              // autoComplete="current-phoneNumber"
              onChange={handleChange("phoneNumber")}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="deviceid"
              label="deviceid"
              name="deviceid"
              onChange={handleChange("deviceid")}
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}