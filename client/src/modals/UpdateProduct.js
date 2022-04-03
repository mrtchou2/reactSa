import React, {useState, useEffect, useContext} from 'react';
import { Modal, Form, Dropdown,Button, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import { fetchProducts, updateProduct } from '../http/productAPI';
import { useParams } from 'react-router-dom';

const UpdateProduct = observer(({show, onHide}) => {
    const {products} = useContext(Context);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const {id} = useParams();

    useEffect( () => {
        fetchTypes().then(data => products.setTypes(data));
        fetchProducts().then(data => products.setProducts(data));
    }, [])
    
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    /* const addProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', file);
        formData.append('typeId', products.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createProduct(formData).then(data => onHide());
    }; */

    const changeProduct = () => {
        let datas = {
            name,
            price,
            img: selectFile,
            info,
        }
        updateProduct(id, datas)
        .then(data => setProduct(data));
        window.location.reload();
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
                    Modifier le produit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{products.selectedType.name || "Choisissez la categorie"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.types.map(type => 
                                <Dropdown.Item 
                                    key={type.id} 
                                    onClick={() => products.setSelectedType(type)} 
                                >
                                    {type.name}
                                </Dropdown.Item>  
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Nom du prouduit'
                    />
                    <Form.Control
                        className='mt-3'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder='Prix du produit'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr></hr>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                    >
                        Ajouter la description
                    </Button>
                    {
                        info.map(i => 
                            <Row key={i.number} className='mt-4'>
                                <Col>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder='Titre de la description'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder='Description detaillée'
                                    />
                                </Col>
                                <Col>
                                    <Button 
                                        variant='outline-danger'
                                        onClick={() => removeInfo(i.number)}    
                                    >
                                        Supprimer
                                    </Button>
                                </Col>
                            </Row>    
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeProduct}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateProduct;