import { Route, Switch } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";

import Sort from "pages/Sort";

import { PathfinderBoard } from "pages/PathfinderBoard";
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
  const [menuPosition, setMenuPosition] = useState(-200);

  const { width: windowWidth } = useWindowWidth();
  return (
    <>
      <Global styles={GlobalStyles} />

      <Box width={windowWidth} bgColor="white" position="relative" overflowX="hidden">
        <Sort />
        {/* <Box
          className="transition-all"
          display="flex"
          gridGap="20px"
          bgColor="gray.200"
          position="absolute"
          right={menuPosition}
          paddingX={10}
          onMouseEnter={() => setMenuPosition(0)}
          onMouseLeave={() => setMenuPosition(-200)}>
          <Link href="/">START</Link>
          <Link href="/sort">SORT</Link>
          <Link href="/board">BOARD</Link>
        </Box>
        <Switch>
          

          <Route path="/sort" render={() => <Sort />} />

          <Route path="/board" render={() => <PathfinderBoard />} />
        </Switch> */}
      </Box>
    </>
  );
}

export default App;
