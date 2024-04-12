import React, { useState, useEffect } from 'react'
import { Container, Button, Row } from 'react-bootstrap'
import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'
import axios from "axios";

const Home = () => {
    const [show, setShow] = useState(true)
    const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios(process.env.REACT_APP_URL);
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
    
  useEffect(() => {
    
    getProducts();
      
    }, []);
    
  return (
    <>
        <Container>
            <header className=' text-center my-2 text-bg-info text-light p-2'>
                <h1>Checkout Page</h1>

                <Button className=' text-bg-danger' onClick={()=> setShow(!show)}>
                    {show ? "Hide Product Bar" : "Show Product Bar"}
                </Button>

            </header>
        <Row className=' justify-content-center'>
        {show && <AddProduct getProducts={getProducts}/>}
        <ProductList products={products} getProducts={getProducts} />  
        </Row>
        </Container>
        
    </>
  )
}

export default Home


