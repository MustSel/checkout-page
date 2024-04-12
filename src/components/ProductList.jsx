import React from "react";
import { Table, Row, Col, Card } from "react-bootstrap";

import { FaTrash, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";

const ProductList = ({products,getProducts}) => {
  

  const handleQuantity = async (data) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}${data.id}`, data);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const handleRemove = async (data) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}${data.id}`)
    } catch (error) {
      console.log(error)
    }
    getProducts();
  }
  
  let subtotal = 0;
  let shippingFee = 0;
  let tax = 0;
  let finalTotal = 0;
  const calculateTotal = () => {
    products.forEach(item => {
      const total = item.productQuantity *
      (item.productPrice - item.productPrice * item.dampingRate);
      subtotal += total;
      tax = subtotal * 0.18;
      shippingFee = subtotal && products.length * 25;
      finalTotal = subtotal + tax + shippingFee;
    });
    return subtotal.toFixed(2);
  };
  

  return (
    <Col className="mt-4" md={6}>
      {products.map((item) => (
        <Row key={item.id} className="bg-light shadow-lg mb-3">
          <Col>
            <Card.Img variant="top" src={item.productImage} />
          </Col>

          <Col>
            <Card.Body>
              <Card.Title>{item.productName}</Card.Title>
              <Card.Text className=" text-warning h2">
                $
                <span>
                  {(item.productPrice - item.productPrice * item.dampingRate).toFixed(2)}
                </span>
                <span className=" h5 text-dark text-decoration-line-through">
                  {item.productPrice}
                </span>
              </Card.Text>
              <div className="border border-1 border-dark shadow-lg d-flex justify-content-center p-2">
                <div className=" d-flex">
                  <button
                    className=" btn btn-danger btn-sm"
                    onClick={() => {
                      item = {
                        ...item,
                        productQuantity: item.productQuantity - 1,
                      };
                      handleQuantity(item);
                    }}
                  >
                    <FaMinusCircle />
                  </button>
                  <p className=" d-inline mx-4">{item.productQuantity}</p>
                  <button
                    className=" btn btn-success btn-sm"
                    onClick={() => {
                      item = {
                        ...item,
                        productQuantity: Number(item.productQuantity) + 1,
                      };
                      handleQuantity(item);
                    }}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
              <div className="remove mt-4">
                <button className="btn btn-danger btn-sm w-100"
                onClick={()=>{
                  handleRemove(item)
                }}>
                  <FaTrash className="me-2" />
                  Remove
                </button>
              </div>
              <div className="mt-2">
                Total: $
                <span>
                  {(
                    item.productQuantity *
                    (item.productPrice - item.productPrice * item.dampingRate)
                  ).toFixed(2)}
                </span>
              </div>
            </Card.Body>
          </Col>
        </Row>
      ))}

      <div className="prices">
        <Table striped bordered hover>
          <tbody>
            <tr className=" text-end">
              <th className=" text-start">Subtotal</th>
              <td>
                $ <span>{calculateTotal()}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Tax(18%)</th>
              <td>
                $ <span>{tax.toFixed(2)}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Shipping</th>
              <td>
                $ <span>{shippingFee.toFixed(2)}</span>{" "}
              </td>
            </tr>
            <tr className=" text-end">
              <th className=" text-start">Total</th>
              <td>
                $ <span>{finalTotal.toFixed(2)}</span>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
};

export default ProductList;
