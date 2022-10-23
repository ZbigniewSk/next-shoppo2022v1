import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { classes } from "../utils/styles";

export default function Register(props) {
  const { currentTheme, setThemeHandler } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    dispatch({ type: "USER_LOGIN", payload: data });
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout
      title="Register"
      currentTheme={currentTheme}
      setThemeHandler={setThemeHandler}
    >
      <form style={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              inputProps={{ type: "name" }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="outlined" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?&nbsp;
            <NextLink passHref href={`/login?redirect=${redirect || "/"}`}>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
