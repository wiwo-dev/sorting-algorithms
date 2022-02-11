import React from "react";
import { motion } from "framer-motion";

export default function Bar({ color = "blue", height, x }) {
  return <div style={{ height: `${height}px`, width: "20px", position: "absolute", background: color }}></div>;
}
