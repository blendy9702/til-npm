import { IoLogoReddit } from "react-icons/io5";

function App() {
  const point = 5; // 총 별점
  const rate = 3; // 별점
  return (
    <>
      <div style={{ fontSize: 100 }}>
        <IoLogoReddit />
      </div>
      <h1>당신의 별점은</h1>
      <div>
        {[...Array(point)].map((item, index) => {
          return (
            <IoLogoReddit
              key={index}
              style={{ fontSize: 50, color: index < rate ? "gold" : "gray" }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
