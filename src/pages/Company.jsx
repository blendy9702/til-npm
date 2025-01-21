import { Outlet } from "react-router-dom";

function company() {
  return (
    <div>
      <h1>company</h1>
      <Outlet />
    </div>
  );
}

export default company;
