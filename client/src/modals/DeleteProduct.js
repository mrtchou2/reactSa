import React, {useContext} from 'react';
import { Context } from '..';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import { observer } from 'mobx-react-lite';
import { deleteProduct } from '../http/productAPI';

const DeleteProduct = observer(({show, onHide}) => {
    // const [products] = useContext(Context);
    let id;

    

    const removeProduct = () => {
        deleteProduct(id)
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Supprimer un produit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                            <ProductsList/>
                    </ListGroup>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={removeProduct}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteProduct;