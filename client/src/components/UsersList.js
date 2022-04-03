import React, {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import { fetchUsers } from '../http/userAPI';
import { observer } from 'mobx-react-lite';


const UsersList = observer(() => {
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    useEffect( () => {
        fetchUsers()
        .then(data => setUser(data))
    }, []);
    
    return (
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
        </ListGroup>
    );
});

export default UsersList;