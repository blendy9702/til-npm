# Framer Motion

- https://motion.dev/docs/react-quick-start
- https://velog.io/@keumky1/Framer-Motion-입문하기
- https://nykim.work/114
- https://examples.motion.dev/react

## 설치하기

```bash
npm install framer-motion
```

- /src/pages/Framer.jsx

```jsx
import { motion } from "framer-motion";
import { useState } from "react";

const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  return (
    <div>
      <h1>Framer Motion 연습</h1>
      <motion.button
        onClick={() => setMove(!move)}
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
        {move ? "숨기기" : "보이기"}
      </motion.button>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: move ? 100 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#4faffd",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        기머띠
      </motion.div>
    </div>
  );
};

export default Framer;
```
