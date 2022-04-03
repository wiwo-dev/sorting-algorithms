import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion, useAnimation, useAnimationFrame } from "framer-motion";

const getArr = (num) => {
  const arr = [];
  while (num > 0) {
    arr.push(num * 10);
    num--;
  }
  console.log(arr.length);
  return arr.reverse();
};

const getStripePositions2 = (movesArr) => {
  //array of arrays
  //each res[i] - for each id
  //each res[i][j] - for position of that id in each move

  const res = [];
  for (let i = 0; i < movesArr.length; i++) {
    res.push([]);
    for (let j = 0; j < movesArr[i].length; j++) {
      res[i].push([]);
    }
  }

  for (let i = 0; i < movesArr.length; i++) {
    for (let j = 0; j < movesArr[i].length; j++) {
      // movesArr[i][j] - value
      // j - position
      // i - move number
      res[movesArr[i][j].id][i] = j;
    }
  }
  console.log(res);
  return res;
};

const getStripePositions3 = (order) => {
  //array of arrays
  //each res[i] - for each id
  //each res[i][j] - for position of that id in each move

  //
  const elements = getLastOrder(order).length;

  const res = [];
  for (let i = 0; i < elements; i++) {
    res.push([]);
    if (order[i][2]) {
      for (let j = 0; j < order[i][2]?.length; j++) {
        res[i].push([]);
      }
    } else res[i].push([]);
  }

  for (let i = 0; i < order.length; i++) {
    if (order[i][2]) {
      for (let j = 0; j < order[i][2]?.length; j++) {
        // order[i][j] - value
        // j - position
        // i - move number
        res[order[i][2][j].id][i] = j;
      }
    }
  }
  console.log(res);
  return res;
};

export default function SortTest() {
  const [stripes, setStripes] = useState(generateStripes(10));
  const [sortedStripes, setSortedStripes] = useState([]);

  useEffect(() => {
    setStripes(generateStripes(10));
    console.log(stripes);

    return () => {};
  }, []);

  const [ready, setReady] = useState(false);

  const positionsRef = useRef([]);

  const onButton = () => {
    console.log("BUTTON");
    const sorted = sortStripes(stripes);
    setSortedStripes(sorted);
    console.log(sortedStripes);
    setReady(true);

    let positions = getStripePositions3(sorted);
    console.log("POSITIONS");
    console.log(positions);

    console.log("POSITIONS2");
    positions = positions.map((a) => {
      const corrected = [];
      let lastPosition = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i] && typeof a[i] != "object") {
          lastPosition = a[i];
          corrected.push(a[i]);
        } else corrected.push(lastPosition);
      }
      return corrected;
    });

    console.log("POSITIONS3");
    console.log(positions);

    positionsRef.current = positions;
  };

  return (
    <>
      <div>SortTest</div>
      <Button onClick={onButton}>GO</Button>
      <Box position="relative">
        <Box>
          <motion.div animate={{ x: getArr(120) }} transition={{ delay: 1, duration: 0.1 }}>
            <Box height="100px" width="10px" bgColor="red" />
          </motion.div>
        </Box>
        <Box height="100px">
          {stripes.map((el, ind) => (
            <motion.div key={ind} animate={{ x: el.position * 100 }} transition={{ delay: 1, duration: 0.5 }}>
              <Box height={`${el.value}px`} width="10px" bgColor="green" position="absolute" />
            </motion.div>
          ))}
        </Box>
        {ready && (
          <>
            <Box height="100px">
              {getLastOrder(sortedStripes)?.map((el, ind) => (
                <motion.div key={ind} animate={{ x: ind * 100 }} transition={{ delay: 1, duration: 0.5 }}>
                  <Box height={`${el.value}px`} width="10px" bgColor="pink" position="absolute" />
                </motion.div>
              ))}
            </Box>
            <Box height="100px">
              {getLastOrder(sortedStripes)?.map((el, ind) => (
                <motion.div
                  key={ind}
                  animate={{
                    x: positionsRef.current?.[el.id].map((el) => el * 100),
                  }}
                  transition={{ delay: 1, duration: 5 }}>
                  <Box height={`${el.value}px`} width="10px" bgColor="pink" position="absolute" />
                </motion.div>
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

const generateStripes = (count) => {
  const stripes = [];
  for (let i = 0; i < count; i++) {
    const stripe = {
      id: i,
      value: Math.round(Math.random() * 100),
      position: i,
    };
    stripes.push(stripe);
  }
  return stripes;
};

const sortStripes = (stripes) => {
  let sorted = [...stripes];
  let length = stripes.length;

  let order = [];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      //console.log(`i: ${i} | j: ${j}`);

      order.push([sorted[j].value, sorted[j + 1].value, null, null]); //comparing
      if (sorted[j].value > sorted[j + 1].value) {
        const temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
        //sorted[j].position = i;
        //sorted[j + 1].position = i + 1;

        order.push([sorted[j].value, sorted[j + 1].value, [...sorted], null]);
      }
    }
    order.push([null, null, null, sorted[length - i - 1]]);
  }
  console.log("KONIEC SORTOWANIA");

  return order;
};

const getLastOrder = (order) => {
  let finalArr = null;
  let counter = order.length - 1;
  while (!finalArr) {
    if (order[counter][2]) finalArr = order[counter][2];
    counter--;
  }

  console.log("FINAL ARR");
  console.log(finalArr);

  return finalArr;
};
