import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Navbar, Nav, Container,NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {userLogoutHandler} from "../store/user-actions"


const Header = () => {
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(userLogoutHandler())
  }
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto ">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
             {userInfo ? (
               <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
               </NavDropdown>
             ) : ( <LinkContainer to="/login">
                  <Nav.Link>              
                   <i className="fas fa-suser"></i>Sign In
                  </Nav.Link>
                </LinkContainer>)}
               {userInfo && userInfo.isAdmin && (
                <NavDropdown title='admin' id='adminmenu'>
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>
                      User List
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                     Product List
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>
                     Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  
               </NavDropdown>
               )}           
             
        
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
