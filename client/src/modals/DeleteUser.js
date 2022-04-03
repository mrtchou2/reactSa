import React, {useState, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import { deleteUser } from '../http/userAPI';
import UsersList from '../components/UsersList';
import { fetchUsers } from '../http/userAPI';

const DeleteUser = observer(({show, onHide}) => {
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect( () => {
        fetchUsers()
        .then(data => setUser(data))
    }, []);

    const removeUser = () => {
        deleteUser(selectedUser.id);
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
                    Supprimer un utilisateur
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ListGroup>
                    {user.map(user => 
                        <ListGroup.Item 
                            key={user.id}
                            style={{cursor: 'pointer'}}
                            active={user.id === selectedUser.id}
                            onClick={() => setSelectedUser(user)}
                        >
                            {'ID: ' + user.id + ' - ' + user.firstName + ' ' + user.lastName}
                        </ListGroup.Item>  
                    )}
                        {/* <UsersList/> */}
                    </ListGroup>
                </Form>    
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Annuler</Button>
                <Button variant='outline-warning' onClick={removeUser}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteUser;