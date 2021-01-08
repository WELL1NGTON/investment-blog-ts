import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav , OverlayTrigger , Tooltip} from 'react-bootstrap';
import { NavBar } from './styles';
import { BsBlockquoteLeft, BsBookmarkPlus, BsUpload} from 'react-icons/bs';
import { checkAuthenticated } from '../../services/auth';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    checkAuthenticated().then(isAuth => {
      if (isAuth) setIsAuthenticated(true);
    });
  }, []);

  return (
    <NavBar variant="dark">
      <NavBar.Brand as={Link} to="/">
        Investment Blog
      </NavBar.Brand>
      <NavBar.Collapse className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Artigos
            </Nav.Link>
          </Nav.Item>
          {isAuthenticated ? (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to={'/create'}>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Criar Artigos</Tooltip>}>
                    <BsBlockquoteLeft size={25} />
                  </OverlayTrigger>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={'/createCategory'}>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Criar Categorias</Tooltip>}>
                    <BsBookmarkPlus size={25} />
                  </OverlayTrigger>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={'/uploadImage'}>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Enviar Imagens</Tooltip>}>
                    <BsUpload size={25} />
                  </OverlayTrigger>
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to={'/about'}>
                Sobre
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  );
};

export default Navbar;
