import { useState, useEffect } from "react";
import axios from "axios";
import Pagenation from "../components/Pagenation";
import ProductModal from "../components/ProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import Toast from "../components/Toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

const Product = ({setIsAuth}) => {
  //1.建立產品列表
  const [products, setProducts] = useState([]);

  //2.判斷當前為"編輯"或"新增"的視窗
  const [modalMode, setModalMode] = useState(null);

  //3.點擊當前視窗的商品
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  //4.編輯或新增商品視窗的"開"與"關"
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  //5.刪除增商品視窗的"開"與"關"
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  //.6建立產品分頁
  const [pageNum, setPageNum] = useState({});

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPageNum(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  //建立開啟商品視窗按鈕
  const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct(defaultModalState);
        break;

      case "edit":
        setTempProduct(product);
        break;

      default:
        break;
    }
    setIsProductModalOpen(true);
  };

  //建立刪除商品視窗開啟按鈕
  const handleOpenDelProductModal = (product) => {
    setTempProduct(product);
    setIsDelProductModalOpen(true);
  };
  //顯示當前分頁
  const handlePageChange = (page) => {
    getProducts(page);
  };

  const handleLogout = async()=>{
    try {
      const res =  await axios.post(`${BASE_URL}/v2/logout`)
      setIsAuth(false);
          // 手動清除 Cookies
    document.cookie = 'hexToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';

    } catch (error) {
      alert('登出失敗',error);
    }   
  }

  return (
    <>
      <div className="container py-5">
        <div className="row mb-3">
          <div className="justify-content-end">
            <button onClick={handleLogout} type="button" className="btn btn-danger">
              登出
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                onClick={() => handleOpenProductModal("create")}
                type="button"
                className="btn btn-primary"
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? <span>✅</span> : <span>❌</span>}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() =>
                            handleOpenProductModal("edit", product)
                          }
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleOpenDelProductModal(product)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagenation handlePageChange={handlePageChange} pageNum={pageNum} />
      </div>

      <ProductModal
        modalMode={modalMode}
        tempProduct={tempProduct}
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        getProducts={getProducts}
      />

      <DeleteProductModal
        tempProduct={tempProduct}
        isDelProductModalOpen={isDelProductModalOpen}
        setIsDelProductModalOpen={setIsDelProductModalOpen}
        getProducts={getProducts}
      />

      <Toast />
    </>
  );
};

export default Product;
