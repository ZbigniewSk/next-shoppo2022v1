// import { getCookie } from "cookies-next";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  currentTheme: "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "CURRENT_THEME_LIGHT":
      return { ...state, currentTheme: "light" };
    case "CURRENT_THEME_DARK":
      return { ...state, currentTheme: "dark" };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
