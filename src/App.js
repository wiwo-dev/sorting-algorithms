import { Box, Link } from "@chakra-ui/react";
import Sort from "pages/Sort";
import useWindowWidth from "helpers/useWindowWidth";

import { Global, css } from "@emotion/react";
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function App({}) {
  const { width: windowWidth } = useWindowWidth();
  return (
    <>
      <Global styles={GlobalStyles} />
      <Box width={"100%"} bgColor="white" position="relative" overflowX="hidden">
        <Sort />
      </Box>
    </>
  );
}

export default App;
