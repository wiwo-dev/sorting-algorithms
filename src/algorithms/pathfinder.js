const nextDirections = (currentDirection) => {
  switch (currentDirection) {
    case "up":
      return ["up", "right"];
    case "right":
      return ["right", "down"];
    case "down":
      return ["down", "left"];
    case "left":
      return ["left", "up"];
    case null:
      return ["left", "up", "right", "down"];
    default:
      return [];
  }
};

const getXY = (posStr) => {
  const [x, y] = posStr.split("-");
  return [Number(x), Number(y)];
};

const checkMoves = (startStr, currentDirection, visited, width, height) => {
  let moves = [];
  let distance = 1;
  const [x, y] = getXY(startStr);
  const nextDirectionsArr = nextDirections(currentDirection);

  nextDirectionsArr.forEach((dir) => {
    let newPos;
    switch (dir) {
      case "up":
        newPos = `${x}-${y - distance}`;
        if (y - distance >= 0 && !visited[newPos]) moves.push({ dir, newPos });
        break;
      case "down":
        newPos = `${x}-${y + distance}`;
        if (y + distance < height && !visited[newPos]) moves.push({ dir, newPos });
        break;
      case "right":
        newPos = `${x + distance}-${y}`;
        if (x + distance < width && !visited[newPos]) moves.push({ dir, newPos });
        break;
      case "left":
        newPos = `${x - distance}-${y}`;
        if (x - distance >= 0 && !visited[newPos]) moves.push({ dir, newPos });
        break;
      default:
        break;
    }
  });

  return moves;
};

const pathfinderHelper = (movesArr, visited, visitedArr, width, height) => {
  //if (!movesArr || !movesArr.length) return;

  let nextPossibleMoves = [...movesArr];

  while (nextPossibleMoves.length > 0) {
    const move = nextPossibleMoves.shift();
    visited[move.newPos] = true;
    visitedArr.push(move.newPos);
    console.log(move.newPos);
    nextPossibleMoves.push(...checkMoves(move.newPos, move.dir, visited, width, height));
  }

  if (!nextPossibleMoves.length) return;
};

export const pathfinder = (startStr, endStr, width, height) => {
  let visited = {};
  let visitedArr = [];

  pathfinderHelper(checkMoves(startStr, null, visited, width, height), visited, visitedArr, width, height);

  console.log(visitedArr);
  return [visited, visitedArr];
};
