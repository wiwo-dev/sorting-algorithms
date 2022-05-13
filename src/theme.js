import { extendTheme } from "@chakra-ui/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.100",
      },
    },
  },
  colors: {
    blue: {
      100: "#5451F6",
    },
    yellow: {
      100: "#F6C944",
    },
    violet: {
      100: "#8C63D2",
    },
    green: {
      100: "#4DA660",
    },
    gray: {
      100: "#727272",
    },
  },
  boxShadow: {
    default: "2px 2px 0px rgba(0, 0, 0, 0.5)",
  },
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Raleway, sans-serif",
    comfortaa: "Comfortaa, sans-serif",
  },
});
