import React from 'react';
import Paginate from "react-paginate";
import "./pagination.css";

const ProductPagination = ({ pageCount, pageChangeHandler }) => {

    return <React.Fragment>
        <Paginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={pageChangeHandler}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"activeBttns"}
        />
    </React.Fragment>
}

export default ProductPagination;
