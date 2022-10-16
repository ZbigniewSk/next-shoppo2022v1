import {
  AppBar,
  Badge,
  Container,
  Link,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { setCookie } from "cookies-next";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { classes } from "../utils/styles";

export default function Layout({
  title,
  description,
  children,
  setThemeHandler,
  currentTheme,
}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    dispatch({
      type:
        currentTheme === "dark" ? "CURRENT_THEME_DARK" : "CURRENT_THEME_LIGHT",
    });
    setCookie("darkMode", JSON.stringify(currentTheme));
  }, [currentTheme, dispatch]);

  useEffect(() => {
    const data = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch({ type: "CART_INITIAL_ITEMS", payload: data });
  }, [dispatch]);

  const darkModeChangeHandler = () => {
    const newCurrentTheme = currentTheme === "light" ? "dark" : "light";
    dispatch({
      type:
        newCurrentTheme === "dark"
          ? "CURRENT_THEME_DARK"
          : "CURRENT_THEME_LIGHT",
    });
    setCookie("darkMode", JSON.stringify(newCurrentTheme));
    setThemeHandler(newCurrentTheme);
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
              color="secondary"
            ></Switch>
            <NextLink href="/cart" passHref>
              <Link>
                {cart.cartItems.length > 0 ? (
                  <Badge badgeContent={cart.cartItems.length} color="secondary">
                    Cart
                  </Badge>
                ) : (
                  "Cart"
                )}
              </Link>
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
