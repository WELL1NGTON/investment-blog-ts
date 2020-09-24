import React from 'react';
//import { Link } from 'react-router-dom';
import { FooterContainer, FooterRow, FooterCol } from './styles';
import { FiInstagram, FiFacebook } from 'react-icons/fi';


const Footer: React.FC = () => {

  return (
    <footer className='fixed-bottom'>
      <FooterContainer fluid>
        <FooterRow>
          <FooterCol sm={2}>
            <h2>Logo</h2>

          </FooterCol>
          <FooterCol sm>
            <h4>Contato</h4>
            <p>email@email.com</p>
          </FooterCol>
          <FooterCol md>
            <FiFacebook size={35} />
            <FiInstagram size={35} />
          </FooterCol>
          <FooterCol xl>
            <h4>Feito por </h4>
            <p>Wellignton</p>
            <p>Vitor Hugo Nakai</p>
          </FooterCol>

        </FooterRow>
      </FooterContainer>
    </footer>

  );
};

export default Footer;
