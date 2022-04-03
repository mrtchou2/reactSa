import React, {useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateType from '../modals/CreateType';
import UpdateType from '../modals/UpdateType';
import DeleteType from '../modals/DeleteType';
import CreateProduct from '../modals/CreateProduct';
/* import UpdateProduct from '../modals/UpdateProduct';
import DeleteProduct from '../modals/DeleteProduct'; */
import UpdateUser from '../modals/UpdateUser';
import DeleteUser from '../modals/DeleteUser';


const Admin = () => {
    const [createTypeVisible, setCreateTypeVisible] = useState(false);
    const [updateTypeVisible, setUpdateTypeVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [createProductVisible, setCreateProductVisible] = useState(false);
    /* const [updateProductVisible, setUpdateProductVisible] = useState(false);
    const [deleteProductVisible, setDeleteProductVisible] = useState(false); */
    const [updateUserVisible, setUpdateUserVisible] = useState(false);
    const [deleteUserVisible, setDeleteUserVisible] = useState(false);

    return (
        <Container className='d-flex flex-column'>
            <h2 className='mt-5 d-flex align-self-center'>Categories</h2>
            <Button 
                variant='outline-dark' 
                className='mt-5'
                onClick={() => setCreateTypeVisible(true)}
            >
                Ajouter une categorie
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-2'
                onClick={() => setUpdateTypeVisible(true)}
            >
                Modifier une categorie
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-2'
                onClick={() => setDeleteTypeVisible(true)}
            >
                Supprimer une categorie
            </Button>
            <CreateType show={createTypeVisible} onHide={() => setCreateTypeVisible(false)} />
            <UpdateType show={updateTypeVisible} onHide={() => setUpdateTypeVisible(false)} />
            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
            


            <h2 className='mt-5 d-flex align-self-center'>Produits</h2>
            <Button 
                variant='outline-dark' 
                className='mt-5'
                onClick={() => setCreateProductVisible(true)}    
            >
                Ajouter un produit
            </Button>
            {/* <Button 
                variant='outline-dark' 
                className='mt-2'
                onClick={() => setUpdateProductVisible(true)}    
            >
                Modifier un produit
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-2'
                onClick={() => setDeleteProductVisible(true)}    
            >
                Supprimer un produit
            </Button> */}
            <CreateProduct show={createProductVisible} onHide={() => setCreateProductVisible(false)} />
            {/* <UpdateProduct show={updateProductVisible} onHide={() => setUpdateProductVisible(false)} />
            <DeleteProduct show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)} /> */}

            <h2 className='mt-5 d-flex align-self-center'>Utilisateurs</h2>
            <Button 
                variant='outline-dark' 
                className='mt-5'
                onClick={() => setUpdateUserVisible(true)}    
            >
                Modifier un utilisateur
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-2'
                onClick={() => setDeleteUserVisible(true)}    
            >
                Supprimer un utilisateur
            </Button>
            {/* <UpdateUser show={updateUserVisible} onHide={() => setUpdateUserVisible(false)} /> */}
            <DeleteUser show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)} />
        </Container>
    );
};

export default Admin;