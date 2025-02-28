const Pagenation = ({ handlePageChange,pageNum}) => {

    
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li
            className={`page-item ${!pageNum.has_pre && "disabled"}
                `}
          >
            <a
              onClick={() => handlePageChange(pageNum.current_page - 1)}
              className="page-link"
              href="#"
            >
              上一頁
            </a>
          </li>
          {Array.from({ length: pageNum.total_pages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${pageNum.current_page === index + 1 && "active"}
                      `}
            >
              <a
                onClick={() => handlePageChange(index + 1)}
                className="page-link"
                href="#"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${!pageNum.has_next && "disabled"}
                `}
          >
            <a
              onClick={() => handlePageChange(pageNum.current_page + 1)}
              className="page-link"
              href="#"
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagenation;
