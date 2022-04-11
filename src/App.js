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
import Animations from "pages/Animations";
import SortTest from "pages/SortTest";
import Sortbackup from "pages/Sortbackup";
import Tests from "pages/Tests";

function App({}) {
  const [menuPosition, setMenuPosition] = useState(-200);

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
        onMouseLeave={() => setMenuPosition(-200)}>
        <Link href="/">START</Link>
        <Link href="/sort">SORT</Link>
        <Link href="/sorttest">SORT Test</Link>
        <Link href="/tests">Tests</Link>

        <Link href="/graf">GRAF</Link>
        <Link href="/board">BOARD</Link>
        <Link href="/animations">ANIMATIONS</Link>
      </Box>
      <Switch>
        {/* <Route path="/" render={() => <Testowa />} /> */}

        <Route path="/sort" render={() => <Sort />} />
        <Route path="/sorttest" render={() => <SortTest />} />

        <Route path="/graf" render={() => <Graf />} />
        <Route path="/board" render={() => <PathfinderBoard />} />
        <Route path="/animations" render={() => <Animations />} />
        <Route path="/tests" render={() => <Tests />} />
      </Switch>
    </Box>
  );
}

export default App;
