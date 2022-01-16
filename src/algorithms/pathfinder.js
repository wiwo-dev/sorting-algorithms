export default function Pathfinder({ startStr, width, height }) {
  this.visited = {};
  this.visitedArr = [];
  this.obstacle = {};
  this.width = width;
  this.height = height;
  this.startStr = startStr;

  console.log(this.startStr);

  const getXY = (posStr) => {
    const [x, y] = posStr.split("-");
    return [Number(x), Number(y)];
  };

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

  const checkMoves = ({ startStr, currentDirection }) => {
    let moves = [];
    let distance = 1;
    const [x, y] = getXY(startStr);
    const nextDirectionsArr = nextDirections(currentDirection);

    const checkIfClear = (newPos) => {
      return !this.visited[newPos] && !this.obstacle[newPos];
    };

    nextDirectionsArr.forEach((dir) => {
      let newPos;
      switch (dir) {
        case "up":
          newPos = `${x}-${y - distance}`;
          if (y - distance >= 0 && checkIfClear(newPos)) moves.push({ dir, newPos });
          break;
        case "down":
          newPos = `${x}-${y + distance}`;
          if (y + distance < this.height && checkIfClear(newPos)) moves.push({ dir, newPos });
          break;
        case "right":
          newPos = `${x + distance}-${y}`;
          if (x + distance < this.width && checkIfClear(newPos)) moves.push({ dir, newPos });
          break;
        case "left":
          newPos = `${x - distance}-${y}`;
          if (x - distance >= 0 && checkIfClear(newPos)) moves.push({ dir, newPos });
          break;
        default:
          break;
      }
    });

    return moves;
  };

  this.init = () => {
    let nextPossibleMoves = [...checkMoves({ startStr: this.startStr, currentDirection: null })];
    while (nextPossibleMoves.length > 0) {
      const move = nextPossibleMoves.shift();
      this.visited[move.newPos] = true;
      this.visitedArr.push(move.newPos);
      nextPossibleMoves.push(...checkMoves({ startStr: move.newPos, currentDirection: move.dir }));
    }
    if (!nextPossibleMoves.length) return;
  };
}
