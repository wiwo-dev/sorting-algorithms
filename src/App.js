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
import Sort2 from "pages/Sort2";
import { Graf } from "pages/Graf";

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
        onMouseEnter={() => setMenuPosition(0)}
        onMouseLeave={() => setMenuPosition(-100)}>
        <Link href="/">START</Link>
        <Link href="/sort">SORT</Link>
        <Link href="/sort2">SORT2</Link>
        <Link href="/graf">GRAF</Link>
      </Box>
      <Switch>
        {/* <Route path="/" render={() => <Testowa />} /> */}

        <Route path="/sort" render={() => <Sort />} />
        <Route path="/sort2" render={() => <Sort2 />} />
        <Route path="/graf" render={() => <Graf />} />
      </Switch>
    </Box>
  );
}

export default App;
