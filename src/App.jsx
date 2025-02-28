import { useState} from "react";
import Login from "./pages/Login";
import Product from "./pages/Product";

const BASE_URL = import.meta.env.VITE_BASE_URL;


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? <Product setIsAuth={setIsAuth}/> :<Login setIsAuth={setIsAuth}/> }
    </>
  );
}

export default App;