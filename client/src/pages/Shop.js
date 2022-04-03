import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import { fetchProducts } from '../http/productAPI';
import TypePage from '../pages/TypePage';
import { LOGIN_ROUTE } from '../utils/consts';


const Shop = observer(() => {
    const { products } = useContext(Context);


    /**
     * utilisateur est redirigé vers LOGIN pour authentification si localStorage est vide
     * donc page d'accueil possible si authentifié
     * si non redirection auto vers login page
     */
    if (localStorage.length > 0) {
        useEffect(() => {
            fetchTypes().then(data => products.setTypes(data))
            fetchProducts(null).then(data => products.setProducts(data))
        }, []);

        useEffect(() => {
            fetchProducts(products.selectedType.id)
                .then(data => products.setProducts(data))
        }, [products.selectedType])
    } else {
        window.location = LOGIN_ROUTE;
        console.log('hello')
    }



    return (
        <Container>
            <Row>
                <Col>
                    <ProductsList />
                    {/* <TypePage /> */}
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;