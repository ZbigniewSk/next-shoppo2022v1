import {
  AppBar,
  Container,
  Link,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { classes } from "../utils/styles";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { currentTheme } = state;

  useEffect(() => {
    const data = window.localStorage.getItem("currentTheme");
    if (data != null)
      dispatch({
        type:
          JSON.parse(data) === "dark"
            ? "CURRENT_THEME_DARK"
            : "CURRENT_THEME_LIGHT",
      });
  }, []);

  const darkModeChangeHandler = () => {
    const newCurrentTheme = currentTheme === "light" ? "dark" : "light";
    dispatch({
      type:
        newCurrentTheme === "dark"
          ? "CURRENT_THEME_DARK"
          : "CURRENT_THEME_LIGHT",
    });
    window.localStorage.setItem(
      "currentTheme",
      JSON.stringify(newCurrentTheme)
    );
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Shoppo` : "Shoppo"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" sx={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link underline="none">
              <Typography sx={classes.brand} color="primary">
                shoppo
              </Typography>
            </Link>
          </NextLink>
          <div style={classes.grow}></div>
          <div>
            <Switch
              checked={currentTheme === "dark" ? true : false}
              onChange={darkModeChangeHandler}
            ></Switch>

            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container sx={classes.main}>{children}</Container>
      <footer style={classes.footer}>
        <Typography>All rights reserved. Next Shoppo.</Typography>
      </footer>
    </div>
  );
}
