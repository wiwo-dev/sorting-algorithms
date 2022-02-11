import { useEffect, useRef, useState } from "react";

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  //const [actualDelay, setActualDelay] = useState(delay);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
        console.log("CLEANING INTERVAL: " + id);
      };
    }
  }, [delay]);
}
