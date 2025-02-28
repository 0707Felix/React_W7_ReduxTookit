import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const DeleteProductModal =({
   tempProduct,
   getProducts,
   isDelProductModalOpen,
   setIsDelProductModalOpen
}) =>{


 const delproductModalRef = useRef(null);

 useEffect(() => {
   new Modal(delproductModalRef.current, {
     backdrop: false,
   });
 }, []);

 useEffect(() => {
   if(isDelProductModalOpen){
       const productModal = Modal.getInstance(delproductModalRef.current);
       productModal.show();
   }
 }, [isDelProductModalOpen]);


 //建立刪除商品視窗關閉按鈕
 const handleCloseDelProductModal = () => {
   const productModal = Modal.getInstance(delproductModalRef.current);
   productModal.hide();
   setIsDelProductModalOpen(false);
 };


 //取得刪除商品API
 const deleteProduct = async () => {
   try {
     await axios.delete(
       `${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`
     );
   } catch (error) {
     console.log(error.message);
   }
 };
 //取得刪除商品API
 const handleDeleteProduct = async () => {
   try {
     await deleteProduct();
     getProducts();
     handleCloseDelProductModal();
   } catch (error) {
     alert("刪除產品失敗");
   }
 };

 return (
   <>
         {/*刪除產品視窗*/}
         <div
        ref={delproductModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除產品</h1>
              <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除
              <span className="text-danger fw-bold">{tempProduct.title}</span>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleDeleteProduct}
                type="button"
                className="btn btn-danger"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
   </>
 )  
}
export default DeleteProductModal;