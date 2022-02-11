import React, { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion, useAnimation, useAnimationFrame } from "framer-motion";
import Bar from "components/Bar";
import { useEffect } from "react";

import { setups } from "helpers/barObject";
import { shuffle } from "helpers/shuffling";
import { useStripesArray } from "helpers/useStripesArray";

import { shuffleStepByStep } from "helpers/shuffling";

const heights = [...Array(3)].map((e, i) => Math.round(Math.random() * 100));
console.log(heights);

export default function Animations({ amount = 10 }) {
  const handleQuickShuffleClick = async () => {
    shuffleStepByStep(stripes, 0, setStripes);
  };

  const handleStepByStepShuffleClick = async () => {
    shuffleStepByStep(stripes, 50, setStripes);
  };

  const animate = useAnimation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useInputs = (n) => [...Array(amount)].map((_, i) => useState("name" + i));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animateArr = [...Array(amount)].map((_, i) => useAnimation());

  const handleClick = (position = 100) => {
    console.log("CLICK: " + position);
    console.log(position);

    animate.start((custom) => ({ x: custom * position }));
  };

  //useAnimationFrame((t) => console.log(t));
  const [step, setStep] = useState(0);

  const animateChanges = async () => {
    for (let i = 0; i < setups[0].length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      console.log("STEP " + i);

      setStep(i);
    }
  };

  useEffect(() => {
    //animateChanges();
  }, []);

  const {
    stripes,
    setStripes,
    stripesOrdered,
    stripesString,
    stripesToString,
    comparing,
    setComparing,
    swapping,
    setSwapping,
    sorted,
    setSorted,
    clearColors,
    stripesCount,
    setStripesCount,
  } = useStripesArray({ amount: 10 });

  return (
    <>
      <section>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={() => setStep(0)}>
          0
        </button>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={() => setStep(1)}>
          1
        </button>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={() => setStep(2)}>
          2
        </button>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={() => setStripes(shuffle(stripes))}>
          shuffle
        </button>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={handleQuickShuffleClick}>
          shuffle 2
        </button>
        <button className="p-2 bg-gray-200 border-2 border-black" onClick={handleStepByStepShuffleClick}>
          shuffle long
        </button>
      </section>
      <section>{JSON.stringify(stripesOrdered)}</section>
      <section>
        {JSON.stringify(setups[0][1], null, 2)}
        <div className="relative h-[200px]">
          {stripesOrdered.map((str, i) => (
            // <Bar x={setups[i][step].x} height={h} duration={1} color="red" />
            <motion.div animate={{ x: str.position * 50 }} style={{ position: "absolute" }}>
              <Bar key={i} x={str.position * 50} height={str.height} duration={1} color={str.color} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
