import React, {useState, useEffect} from 'react';
import { Container, Image, Button, Card, Col} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';
import { deleteProduct } from '../http/productAPI';
import { updateProduct } from '../http/productAPI';
import { SHOP_ROUTE } from '../utils/consts';
import jwt_decode from 'jwt-decode';
import UpdateProduct from '../modals/UpdateProduct';

const ProductPage = () => {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams();
    const navigate = useNavigate();
    const jwt = jwt_decode(localStorage.getItem('token'));
    const [updateProductVisible, setUpdateProductVisible] = useState(false);

    useEffect( () => {
        fetchOneProduct(id)
        .then(data => setProduct(data))
    }, []);

    const removeProduct = () => {
        deleteProduct(id);
        navigate(SHOP_ROUTE);
    }

    return (
        <Container className='mt-5'>
            <div className='d-flex'>
                <div className="p-2 d-flex flex-column">
                    <Image src={process.env.REACT_APP_API_URL + product.img} style={{cursor: 'pointer'}} width={70} />
                    <Image src={process.env.REACT_APP_API_URL + product.img} style={{cursor: 'pointer'}} width={70} className='mt-3' />
                    <Image src={process.env.REACT_APP_API_URL + product.img} style={{cursor: 'pointer'}} width={70} className='mt-3' />
                    <Image src={process.env.REACT_APP_API_URL + product.img} style={{cursor: 'pointer'}} width={70} className='mt-3' />
                </div>
                <div className="p-2"><Image src={process.env.REACT_APP_API_URL + product.img} style={{cursor: 'pointer'}}  width={500} /></div>
                <Col /* className='d-flex justify-content-center' */>
                    {jwt.role === 'ADMIN' ?
                    <div className="ml-auto p-2">
                        <h2>{product.name}</h2>
                        <p className='price'>{product.price}€</p>
                        <Button 
                            className='m-2' 
                            variant='btn btn-warning'
                            onClick={() => setUpdateProductVisible(true)}
                        >
                            Modifier produit
                        </Button>
                        <UpdateProduct show={updateProductVisible} onHide={() => setUpdateProductVisible(false)} />
                        <Button 
                            className='m-2' 
                            variant='btn btn-danger' 
                            onClick={removeProduct}
                        >
                            Supprimer produit
                        </Button>
                    </div>

                    :

                    <div className="ml-auto p-2">
                        <h2>{product.name}</h2>
                        <p className='price'>{product.price}€</p>
                        <Button variant='btn btn-success'>Ajouter au panier</Button>
                    </div>
                    }
                </Col>
            </div>
            <Card  className='mt-5 mb-5'>
                <div className='d-flex flex-column p-2'>
                    <h2>Description:</h2>
                    {product.info.map(info => 
                        <div key={info.id}>
                            {info.title}: {info.description}
                        </div>
                        )}
                </div>
            </Card>
        </Container>
    );
};

export default ProductPage;