import { Route, Switch } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";

import Sort from "pages/Sort";

import { PathfinderBoard } from "pages/PathfinderBoard";
import useWindowWidth from "helpers/useWindowWidth";

function App({}) {
  const [menuPosition, setMenuPosition] = useState(-200);

  const { width: windowWidth } = useWindowWidth();
  return (
    <Box width={windowWidth} bgColor="pink" position="relative" overflowX="hidden">
      <Box
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
        {/* <Route path="/" render={() => <Testowa />} /> */}

        <Route path="/sort" render={() => <Sort />} />

        <Route path="/board" render={() => <PathfinderBoard />} />
      </Switch>
    </Box>
  );
}

export default App;
