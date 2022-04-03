import React, {useState, useEffect} from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { fetchOneUser } from '../http/userAPI';
import { updateUser } from '../http/userAPI';
import jwt_decode from 'jwt-decode';

const UpdateUser = () => {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adress,setAdress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const jwt = jwt_decode(localStorage.getItem('token'));

    useEffect(() => {
        fetchOneUser(jwt.id)
        .then(data => setUser(data))
    }, []);

    const changeUserInfo = () => {
        let datas = {
            email,
            password,
            firstName,
            lastName,
            adress,
            zip,
            country,
            phone
        }
        updateUser(jwt.id, datas)
        .then(data => setUser(data));
    };

    return (
        <Container className='mt-5'>
            <Card>
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
                        Enregistrer
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default UpdateUser;