export const getRandomColor = () => {
  //const colors = ["green.500", "blue.500", "orange.500", "yellow.500", "pink.500"];
  const colors = ["green", "blue", "orange", "yellow", "pink"];
  return colors[Math.round(Math.random() * (colors.length - 1))];
};
