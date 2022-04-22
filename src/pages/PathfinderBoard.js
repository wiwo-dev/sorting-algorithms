import { Box, Heading, Button } from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import Pathfinder from "algorithms/pathfinder";
import Pathfinder2 from "algorithms/pathfinder2";

const BOARD_WIDTH = 45;
const BOARD_HEIGHT = 45;
const BOX_SIZE = 20;

export const PathfinderBoard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const paintedFields = useRef({});
  const paintedFieldsArray = useRef([]);

  const [boardState, setBoardState] = useState({
    paintedFields: {},
    visitedFields: {},
    startField: { [`3-3`]: true },
    endField: { [`10-28`]: true },
  });

  const updateBoardState = (overwriteObj = {}) => {
    setBoardState((prev) => ({
      ...prev,
      ...overwriteObj,
      paintedFields: { ...paintedFields.current },
    }));
  };

  ///MOUSE ENTER 🐭
  const handleOnMouseEnter = (fieldStr) => {
    if (isDrawing) {
      paintedFields.current[fieldStr] = true;
      paintedFieldsArray.current.push(fieldStr);
      const last = paintedFieldsArray.current.length - 1;
      if (last > 0) {
        let lastStr = paintedFieldsArray.current.slice(-1)[0];

        //debugger;
        let [lastX, lastY] = lastStr.split("-");

        lastX = Number(lastX);
        lastY = Number(lastY);

        let befLastStr = paintedFieldsArray.current.slice(-2, -1)[0];

        let [befLastX, befLastY] = befLastStr.split("-");
        befLastX = Number(befLastX);
        befLastY = Number(befLastY);
        const dis = Math.sqrt(Math.pow(lastX - befLastX, 2) + Math.pow(lastY - befLastY, 2));

        if (dis > 1) {
          console.log(`DIS: ${dis}`);
          console.log(`lastStr: ${lastStr} - befLastStr: ${befLastStr}`);

          const m = (lastY - befLastY) / (lastX - befLastX);

          const funY = (x, x1, y1, m) => {
            return m * (x - x1) + y1;
          };

          const difX = lastX - befLastX;

          for (let i = 1; i <= Math.abs(difX); i++) {
            console.log("petla");
            let dir = 1;
            if (difX < 0) dir = -1;
            const misX = Math.floor(befLastX + i * dir);
            const misY = Math.floor(funY(misX, lastX, lastY, m));
            console.log(`wsp m: ${m} | funY: ${misY} || str: ${misX}-${misY}`);

            paintedFields.current[`${misX}-${misY}`] = true;
            paintedFieldsArray.current.push(`${misX}-${misY}`);
            updateBoardState();
          }
        }
      }
      updateBoardState();
    }
  };

  const handleClearBoard = () => {
    paintedFields.current = {};
    updateBoardState({ paintedFields: {}, visitedFields: {} });
  };

  const animatePathfinder = async (visitedArr) => {
    let visited = {};
    for (let vis of visitedArr) {
      visited[vis] = true;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1);
      });
      updateBoardState({ visitedFields: visited });
    }
  };

  const handlePathfinderClick = () => {
    const pathfinder = new Pathfinder({ startStr: "3-3", width: BOARD_WIDTH, height: BOARD_HEIGHT });
    pathfinder.init();
    animatePathfinder(pathfinder.visitedArr);
  };

  const handlePathfinder2Click = async () => {
    const pathfinder = new Pathfinder2({
      startStr: "3-3",
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      paintedFields: boardState.paintedFields,
    });
    pathfinder.init();
    console.log(pathfinder.stepsArr);

    let visited = {};
    for (let step of pathfinder.stepsArr) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 80);
      });
      console.log("sek");
      visited = { ...visited, ...step };

      updateBoardState({ visitedFields: visited });
    }
  };

  return (
    <Box>
      <Box minW="100vw" minH="100vh" bg="gray">
        <Box display="flex" h="100px">
          <Heading>Tablica</Heading>
          <Button onClick={handleClearBoard}>CLEAR</Button>
          <Button onClick={handlePathfinderClick}>PATHFINDR</Button>
          <Button onClick={handlePathfinder2Click}>PATHFINDR2</Button>
        </Box>
        <Board
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          setIsDrawing={setIsDrawing}
          onMouseEnter={handleOnMouseEnter}
          //paintedFields={boardState.paintedFields}
          paintedFields={boardState.paintedFields}
          startField={boardState.startField}
          endField={boardState.endField}
          visitedFields={boardState.visitedFields}
        />
      </Box>
    </Box>
  );
};

const Board = ({ height, width, setIsDrawing, onMouseEnter, paintedFields, startField, endField, visitedFields }) => {
  const checkColor = (posStr) => {
    let color = "green";
    if (paintedFields[posStr]) color = "red";
    else if (startField[posStr]) color = "black";
    else if (endField[posStr]) color = "gold";
    else if (visitedFields[posStr]) color = "pink";
    return color;
  };

  return (
    <div>
      {[...Array(height)].map((y, yindex) => {
        return (
          <Box
            key={yindex}
            minW="100%"
            h="20px"
            bg="pink"
            border={1}
            borderColor="blue"
            display="flex"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}>
            {[...Array(width)].map((x, xindex) => {
              return (
                <Box
                  key={(yindex + 1) * xindex}
                  className="hover:border-blue-600"
                  w="20px"
                  h="20px"
                  //bg={paintedFields[`${xindex}-${yindex}`] ? "red" : "green"}
                  bg={checkColor(`${xindex}-${yindex}`)}
                  borderWidth="1px"
                  borderColor="yellow"
                  onMouseOver={() => {
                    onMouseEnter(`${xindex}-${yindex}`);
                    //setColoredBoxes((prev) => [...prev, [xindex, yindex]]);
                    //if (isDrawing) setFields((prev) => ({ ...prev, [`${xindex}-${yindex}`]: true }));
                    //console.log(`x: ${xindex} | y: ${yindex}`);
                  }}></Box>
              );
            })}
          </Box>
        );
      })}
    </div>
  );
};
