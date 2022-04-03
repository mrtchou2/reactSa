import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ADMIN_ROUTE, USER_ROUTE, TYPE_ROUTE } from '../utils/consts';
import { fetchOneUser } from '../http/userAPI';
import jwt_decode from 'jwt-decode';





const NavBar = observer(() => {
    const { user } = useContext(Context);
    const { products } = useContext(Context);
    const [userInfo, setUserInfo] = useState([]);




    /**
     * function button deconexion
     * supprime le token
     * met userisAuth a false
     */
    const logOut = () => {
        user.setUser()
        user.setIsAuth(false);
        localStorage.removeItem('token')
    };



    /**
     * test si localStorage contient token
     * si token alors recuperation et utilisation useEffect pour ouvrir une session
     */
    if (localStorage.length > 0) {
        const jwt = jwt_decode(localStorage.getItem('token'));

        useEffect(() => {
            fetchOneUser(jwt.id)
                .then(data => setUserInfo(data))
        }, []);
        console.log(jwt.id)
    }




    return (
        <Navbar id='NavBar' /* collapseOnSelect expand="lg" */ /* bg="dark" variant="dark" */>
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>C&D</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={SHOP_ROUTE}>Accueil</Nav.Link>
                        {/* <Nav.Link href="#pricing">Contacts</Nav.Link> */}
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            {products.types.map(type =>
                                <NavDropdown.Item
                                    id='NavBarItems'
                                    href={TYPE_ROUTE + '/' + type.id}
                                    onClick={() => products.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                    {localStorage.length ?
                        <Nav>
                            <NavDropdown title={userInfo.firstName} id="navbarScrollingDropdown">
                                {userInfo.role === 'ADMIN' ? <NavDropdown.Item id='NavBarItems' href={ADMIN_ROUTE}>Admin</NavDropdown.Item> : ''}
                                <NavDropdown.Item id='NavBarItems' href={USER_ROUTE + '/' + userInfo.id}>Mon profil</NavDropdown.Item>
                                <NavDropdown.Item
                                    id='NavBarItems'
                                    href={LOGIN_ROUTE}
                                    onClick={() => logOut()}
                                >
                                    Se decoonecter
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href={BASKET_ROUTE}>Panier</Nav.Link>
                        </Nav>

                        :

                        <Nav>
                            <Nav.Link href={LOGIN_ROUTE}>Se connecter</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );


});


export default NavBar;