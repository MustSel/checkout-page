import React, { useState} from "react";
import { Col, Form, Button, InputGroup } from "react-bootstrap";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios"

const AddProduct = ({getProducts}) => {
  const [product, setProduct] = useState({
    "productName": "",
    "productPrice": "",
    "productQuantity": "",
    "productImage": "",
    "dampingRate" : Math.random()*0.3
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product)
    postProduct()
    
    setProduct({
        "productName": "",
        "productPrice": "",
        "productQuantity": "",
        "productImage": "",
        "dampingRate" : Math.random()*0.3
      })

  };

  const postProduct = async () => {
    try {
      await axios.post(process.env.REACT_APP_URL, product)  
    } catch (error) {
        console.error(error)
    }
    getProducts()
  }

 

  return (
    <Col className="mt-4" md={6}>
      <Form onSubmit={handleSubmit} className=" w-75 m-auto">
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={product.productName}
            required
            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            value={product.productPrice}
            required
            onChange={(e) => setProduct({ ...product, productPrice: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productQuantity">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="number"
            value={product.productQuantity}
            required
            onChange={(e) =>
              setProduct({ ...product, productQuantity: e.target.value })
            }
          />
        </Form.Group>

        <Form.Label htmlFor="basic-url">Product Image</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            https://example.com/
          </InputGroup.Text>
          <Form.Control
            id="basic-url"
            type="url"
            aria-describedby="basic-addon3"
            value={product.productImage}
            required
            onChange={(e) => setProduct({ ...product, productImage: e.target.value })}
          />
        </InputGroup>
        <Button className="" variant="success" type="submit">
          <MdOutlineAddShoppingCart />
          Add to Cart
        </Button>
      </Form>
    </Col>
  );
};

export default AddProduct;
