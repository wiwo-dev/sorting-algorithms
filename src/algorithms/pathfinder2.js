export default function Pathfinder2({ startStr, width, height, paintedFields }) {
  this.visited = { startStr: true };
  this.stepsArr = [];
  this.obstacle = paintedFields;
  this.width = width;
  this.height = height;
  this.startStr = startStr;

  const getXY = (posStr) => {
    const [x, y] = posStr.split("-");
    return [Number(x), Number(y)];
  };

  const checkMoves = ({ startStr }) => {
    let moves = {};
    let distance = 1;
    const [x, y] = getXY(startStr);
    const nextDirectionsArr = ["up", "right", "down", "left"];
    //console.log("startStr check moves " + startStr);

    const checkIfClear = (newPos) => {
      console.log(this.obstacle[newPos]);
      return !this.visited[newPos] && !this.obstacle[newPos];
    };

    nextDirectionsArr.forEach((dir) => {
      let newPos;
      switch (dir) {
        case "up":
          newPos = `${x}-${y - distance}`;
          if (y - distance >= 0 && checkIfClear(newPos)) moves[newPos] = true;
          break;
        case "down":
          newPos = `${x}-${y + distance}`;
          if (y + distance < this.height && checkIfClear(newPos)) moves[newPos] = true;
          break;
        case "right":
          newPos = `${x + distance}-${y}`;
          if (x + distance < this.width && checkIfClear(newPos)) moves[newPos] = true;
          break;
        case "left":
          newPos = `${x - distance}-${y}`;
          if (x - distance >= 0 && checkIfClear(newPos)) moves[newPos] = true;
          break;
        default:
          break;
      }
    });
    return moves;
  };

  this.init = () => {
    let nextStep = checkMoves({ startStr: this.startStr });
    console.log("TUTAJ");
    this.stepsArr[0] = nextStep;

    let nextS;
    do {
      nextS = {};
      for (const move in this.stepsArr.slice(-1)[0]) {
        nextS = { ...nextS, ...checkMoves({ startStr: move }) };
        this.visited = { ...this.visited, ...nextS };
        //debugger;
      }
      if (Object.keys(nextS).length) this.stepsArr.push(nextS);

      console.log(this.stepsArr.slice(-1)[0]);
    } while (Object.keys(nextS).length);

    if (!Object.keys(nextS).length) return;
  };
}
