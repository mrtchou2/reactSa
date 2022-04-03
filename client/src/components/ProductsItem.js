import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png';
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductsItem = ({product}) => {
    const navigate = useNavigate();
    return (
        /* <Col className='mt-5' md={3} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 200, height: 300, cursor: 'pointer'}} border='light'>
                <Image src={process.env.REACT_APP_API_URL + product.img} width={200} height={200} />
                <div className='d-flex justify-content-between mt-1'>
                    <div>{product.name}</div>
                    <div>{product.price}€</div>
                    <div className='d-flex align-items-center'>
                        <div>{product.rating}</div>
                        <Image src={star} width={20} height={20} />
                    </div>
                </div>
            </Card>
        </Col> */
        <Col className='mt-5 d-flex -justify-content-between' md={3} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 200, height: 330, cursor: 'pointer'}} border='light'>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img} width={200} height={200} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.price}€</Card.Text>
                    <div className='d-flex align-items-center'>
                        <div>{product.rating}</div>
                        <Image src={star} width={20} height={20} />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductsItem;