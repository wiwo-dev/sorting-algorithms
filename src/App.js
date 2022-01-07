import { Route, Switch, Redirect } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Slide,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Link,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";

import { shuffle, getRandomColor, simpleSortArray } from "helpers/helpers";
import { useStripesArray } from "helpers/useStripesArray";
import Sort from "pages/Sort";
//import Sort2 from "pages/Sort";
import { Graf } from "pages/Graf";
import { PathfinderBoard } from "pages/PathfinderBoard";

function App({}) {
  const [menuPosition, setMenuPosition] = useState(-100);

  return (
    <Box>
      <Box
        className="transition-all"
        display="flex"
        gridGap="20px"
        bgColor="gray.200"
        position="absolute"
        right={menuPosition}
        paddingX={10}
        onMouseEnter={() => setMenuPosition(0)}
        onMouseLeave={() => setMenuPosition(-100)}>
        <Link href="/">START</Link>
        <Link href="/sort">SORT</Link>
        <Link href="/graf">GRAF</Link>
        <Link href="/board">BOARD</Link>
      </Box>
      <Switch>
        {/* <Route path="/" render={() => <Testowa />} /> */}

        <Route path="/sort" render={() => <Sort />} />
        <Route path="/graf" render={() => <Graf />} />
        <Route path="/board" render={() => <PathfinderBoard />} />
      </Switch>
    </Box>
  );
}

export default App;
