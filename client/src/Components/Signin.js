import React, { useState} from "react";
import { Link, Redirect } from "react-router-dom";

import { signin } from "./Api calls/helper functions";



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

export default function Signin() {
  const classes = useStyles();
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {loadingMessage()}
        {errorMessage()}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
              onChange={handleChange("password")}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        { performRedirect()}
      </Grid>
    </Grid>
  );
}
