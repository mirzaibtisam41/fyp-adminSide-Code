import React from 'react';
import Avatar from 'react-avatar';
import { ServerPort } from "../../../../Api/apiActions";
import { Badge } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { deleteDealsProductItems } from "../../../../Store/Actions/Actions";
import { useDispatch } from "react-redux";


const DealsMapProducts = ({ item, handleShow, setModalProduct }) => {
    const dispatch = useDispatch();

    return (
        <tr >
            <td><Avatar className="avatar" src={`${ServerPort}${item.productPics[0].img}`} /></td>
            <td>{item.name}</td>
            <td><Badge pill variant="success">{item.active}</Badge>{' '}</td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} /></td>
            <td><NumberFormat value={item.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} /></td>
            <td>
                <i className="fa fa-pencil-square-o fa-lg text-success mr-2" aria-hidden="true" onClick={() => {
                    handleShow();
                    let obj = {
                        name: item.name,
                        price: item.price,
                        id: item._id,
                        offer: item.offer
                    }
                    setModalProduct(obj);
                }} ></i>
                <i title="Delete Product" className="fa fa-trash-o fa-lg text-danger" onClick={(e) => dispatch(deleteDealsProductItems(item._id))}></i>
            </td>
        </tr>
    )
}

export default DealsMapProducts;
