import React, {useContext} from 'react';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deleteType} from '../http/typeAPI';
import TypeList from '../components/TypeList';

const DeleteType = observer(({show, onHide}) => {
    const {products} = useContext(Context);
    let id;
    
    if (products.selectedType && products.selectedType.id) {
        id = JSON.parse(JSON.stringify(products.selectedType.id));
    };

    const removeType = () => {
        deleteType(id);
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
                    Supprimer une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                        <TypeList/>
                    </ListGroup>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={removeType}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
        /* <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Supprimer une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                            {types.types.map(type => 
                                <ListGroup.Item 
                                    style={{cursor: 'pointer'}}
                                    active={type.id === types.selectedType.id}
                                    key={type.id} 
                                    onClick={() => types.setSelectedType(type)} 
                                >
                                    {type.name}
                                </ListGroup.Item>  
                            )}
                    </ListGroup>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={removeType}>Supprimer</Button>
            </Modal.Footer>
        </Modal> */
    );
});

export default DeleteType;