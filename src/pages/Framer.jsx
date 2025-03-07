import { motion } from "framer-motion";
import { useState } from "react";

const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  const [rotate, setRotate] = useState(0);
  return (
    <div>
      <h1>Framer Motion 연습</h1>
      <motion.button
        onClick={() => setRotate(!rotate)}
        style={{
          backgroundColor: "#4faffd",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "16px",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {rotate ? "숨기기" : "보이기"}
      </motion.button>
      <motion.img
        initial={{ rotate: 0 }}
        animate={{ rotate: rotate ? 360 : 0 }}
        transition={{ duration: 0.4 }}
        drag
        dragConstraints={{
          top: -100,
          left: 100,
          right: 100,
          bottom: 100,
        }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#4faffd",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        src="./public/images/dog.png"
      >
        {/* <img alt="dog" /> */}
      </motion.img>
    </div>
  );
};

export default Framer;
