import {useState,useEffect} from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = ({setIsAuth}) => {
  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });

  //使用者登入頁面輸入資料提取
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  //使用者點擊登入鈕後戳後端API認證並取得產品資料
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);

      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

      axios.defaults.headers.common["Authorization"] = token;

      setIsAuth(true);
    } catch (error) {
      alert("登入失敗");
    }
  };

  const checkUserLogin = async () => {
   
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      if (!token) {
        setIsAuth(false); // 如果沒有 TOKEN，直接將 isAuth 設為 false
        return;
      }
    try {
      axios.defaults.headers.common["Authorization"] = token;
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      setIsAuth(true); // 更新前端狀態
    } catch (error) {
      console.error(error);
      setIsAuth(false);
    }
  };
  
  useEffect(()=>{
    checkUserLogin();
  },[])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            name="username"
            value={account.username}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="username"
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            value={account.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
};
export default Login;
