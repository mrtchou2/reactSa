import React, {useState, useEffect, useContext} from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { fetchProducts, fetchProductsByType } from '../http/productAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { PRODUCT_ROUTE, SHOP_ROUTE } from '../utils/consts';
import star from '../assets/star.png'

const TypePage = observer(() => {
    const [products, setProducts] = useState([]);
    const [type, setType] = useState([]);
    const navigate = useNavigate();
    let {id} = useParams();
    let idType;
    console.log(id)

    useEffect(() => {
        fetchProducts()
        .then(data => setProducts(data))
    }, []);
    
    /* products.map(product => {
        if (product.typeId === id) {
            return idType = product.typeId
        }
        
    })
    console.log(idType) */

    return (
        <Container>
            <Row>
                {/* {products.map(product =>
                    {if (product.typeId === {id}) {
                        <Col 
                        md={3}
                        key={product.id}
                        className='mt-5 d-flex -justify-content-between'  
                        onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
                    
                        >
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
                    } else {
                        navigate(SHOP_ROUTE)
                    }
                }
                )} */}
                {products.filter(product => product.typeId === id).map(filteredProduct =>
                    <Col 
                    md={3}
                    key={filteredProduct.id}
                    className='mt-5 d-flex -justify-content-between'  
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + filteredProduct.id)}
                
                    >
                        <Card style={{width: 200, height: 330, cursor: 'pointer'}} border='light'>
                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + filteredProduct.img} width={200} height={200} />
                            <Card.Body>
                                <Card.Title>{filteredProduct.name}</Card.Title>
                                <Card.Text>{filteredProduct.price}€</Card.Text>
                                <div className='d-flex align-items-center'>
                                    <div>{filteredProduct.rating}</div>
                                    <Image src={star} width={20} height={20} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
});

export default TypePage;

/* import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypePage = observer(() => {
    const {products} = useContext(Context)
    return (
        <ListGroup>
            {products.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === products.selectedType.id}
                    onClick={() => products.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypePage; */