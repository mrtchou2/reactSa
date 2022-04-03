import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { updateUser } from '../http/userAPI';
import { fetchOneUser } from '../http/userAPI';
import jwt_decode from 'jwt-decode';
import { deleteUser } from '../http/userAPI';
import { SHOP_ROUTE } from '../utils/consts';
import { LOGIN_ROUTE } from '../utils/consts';

const User = () => {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adress, setAdress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const jwt = jwt_decode(localStorage.getItem('token'));




    useEffect(() => {
        fetchOneUser(jwt.id)
            .then(data => setUser(data));
    }, []);
    console.log(jwt.id)









    const changeUserInfo = () => {
        updateUser(jwt.id);
    };














    /**
     * Supression  DELET USER
     * function async
     * declenche function deletUser() avec id recuperé depuis token
     * ensuite on supprime le token dans le localStorage
     */
    const removeUser = async () => {
        await deleteUser(jwt.id)
        localStorage.removeItem('token');
    };

    return (
        <Container className='mt-5 d-flex justify-content-center'>
            <Card className='mt-5 p-2' border="info" style={{ width: '18rem' }}>
                <Card.Header>Mes coordonnes:</Card.Header>
                <Card.Body>
                    <Card.Title>{user.firstName + ' ' + user.lastName}</Card.Title>
                    <Card.Text>{'Email: ' + user.email}</Card.Text>
                    <Card.Text>{user.adress}</Card.Text>
                    <Card.Text>{user.zip}</Card.Text>
                    <Card.Text>{user.city}</Card.Text>
                    <Card.Text>{user.country}</Card.Text>
                    <Card.Text>{user.phone}</Card.Text>
                </Card.Body>
                <Button
                    className='mt-3'
                    variant='outline-danger'
                    onClick={removeUser}
                    href={SHOP_ROUTE}
                >
                    Supprimer mon compte
                </Button>
            </Card>

            <Card className='mt-5 p-2' border="warning" style={{ width: '18rem' }}>
                <Card.Header>Modifier mes coordonnes:</Card.Header>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder={user.email + ' *'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Mot de passe *'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={user.firstName + ' *'}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={user.lastName + ' *'}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={user.adress || 'Adresse'}
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        type='number'
                        placeholder={user.zip || 'Code postale'}
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={user.city || 'Ville'}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={user.country || 'Pays'}
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        type='number'
                        placeholder={user.phone || 'Telephone'}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <Button
                        className='mt-3'
                        variant='outline-success'
                        onClick={changeUserInfo}
                    >
                        Modifier
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default User;