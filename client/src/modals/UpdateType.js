import React, {useState, useContext, useEffect} from 'react';
import { Modal, Form, Dropdown, Button } from 'react-bootstrap';
import { Context } from '..';
import { updateType } from '../http/typeAPI';
import { observer } from 'mobx-react-lite';
import TypeList from '../components/TypeList';
import { fetchTypes } from '../http/typeAPI';

const UpdateType = observer(({show, onHide}) => {
    /* const {products} = useContext(Context);
    const [value, setValue] = useState({});
    let id;
    
    if(products.selectedType && products.selectedType.id) {
        id = JSON.parse(JSON.stringify(products.selectedType.id));
    };

    const changeType = () => {
        updateType(id)
        .then(data => setValue({name: data}));
            onHide();
    }; */
    
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState({});
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchTypes()
        .then(data => setTypes(data))
    }, []);

    const changeType = () => {
        updateType(selectedType.id, {name: value})
        onHide();
    };
    
    return (
        /* <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modifier une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{products.selectedType.name || "Choisissez la categorie"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <TypeList/>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Nouveau nom de la categorie'
                    />
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeType}>Modifier</Button>
            </Modal.Footer>
        </Modal> */

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modifier une catagorie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedType.name || "Choisissez la categorie"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    style={{cursor: 'pointer'}}
                                    active={type.id === selectedType.id}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Nouveau nom de la categorie'
                    />
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-success' onClick={changeType}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateType;