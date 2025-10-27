"use client";

import { motion } from "framer-motion";

const Spinner: React.FC = ({
  
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        className="rounded-full"
        style={{
          width: 20,
          height: 20,
          backgroundColor: "white",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Spinner;
