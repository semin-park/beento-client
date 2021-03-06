import React, { useState, useContext } from 'react';
import {
    Button,
    Collapse,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { AuthContext, loggedIn } from '../auth';

export default function NavigationBar(props) {
    const loginInfo = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const googleOnSuccess = (response) => {
        toggleModal();
        toggleOpen();
        props.onLogin(response);
    };

    const googleOnFailure = (response) => {
        console.log(response);
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="#">
                Been To&nbsp;&nbsp;
                {loggedIn(loginInfo) && <img className="userImg" src={loginInfo.profileObj.imageUrl} alt="User image"/>}
            </NavbarBrand>
            <NavbarToggler onClick={toggleOpen} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    {
                        loggedIn(loginInfo) ?
                        <NavLink href='#' onClick={props.onLogout}>Logout</NavLink>
                        :
                        <NavLink href='#' onClick={toggleModal}>Login</NavLink>
                    }
                    </NavItem>
                </Nav>
            </Collapse>
            <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
                    <ModalHeader toggle={toggleModal}>Sign in</ModalHeader>
                    <ModalBody>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <button
                                    className="btn btn-google btn-block"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <span className="fa fa-lg fa-google"></span>&nbsp;&nbsp;&nbsp;Sign in with google
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={googleOnSuccess}
                            onFailure={googleOnFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
            </Modal>
        </Navbar>
    );
}
