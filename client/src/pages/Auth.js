import React, { useState, useContext } from 'react';
import { Button, Card, Container, Form, NavLink } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';


const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adress, setAdress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                window.location = 'SHOP_ROUTE';
            } else {
                data = await registration(email, password, firstName, lastName, adress, zip, city, country, phone);
                window.location = 'SHOP_ROUTE';
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }; navigate(SHOP_ROUTE);
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Connexion' : 'Creer un compte'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Mot de passe'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <NavLink>Mot de passe oublie?</NavLink>
                            <Button
                                className='mt-3 align-self-end'
                                variant='outline-success'
                                onClick={click}
                            >
                                Entrer
                            </Button>
                        </div>
                        <NavLink className='align-self-end' href={REGISTRATION_ROUTE}>Creer un compte!</NavLink>
                    </Form>

                    :

                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Email *'
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
                            placeholder='Prenom *'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Nom *'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Adresse'
                            value={adress}
                            onChange={e => setAdress(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            type='number'
                            placeholder='Code postale'
                            value={zip}
                            onChange={e => setZip(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Ville'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Pays'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            type='number'
                            placeholder='Telephone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <NavLink>Mot de passe oublie?</NavLink>
                            <Button
                                className='mt-3 align-self-end'
                                variant='outline-success'
                                onClick={click}
                            >
                                Creer
                            </Button>
                        </div>
                        <NavLink className='align-self-end' href={LOGIN_ROUTE}>Se connecter!</NavLink>
                    </Form>
                }
            </Card>
        </Container>
    );
});

export default Auth;