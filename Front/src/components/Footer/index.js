// == Import npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import
import './footer.scss';

// == Composant
const Footer = () => (
  <div className="footer">
    <div className="footer-left">
      <Link
        className="footer-left--legalMentions"
        to="#"
      >
        Mentions légales
      </Link>
      <Link
        className="footer-left--whoAreUs"
        to="#"
      >
        Qui sommes-nous
      </Link>
      <Link
        className="footer-left--contact"
        to="#"
      >
        Contact
      </Link>
    </div>

    <div className="footer-copyright">
      &#169; - copyright HungryTruck - 2021
    </div>

    <div className="footer-right">
      <Link
        className="footer-right--CGU"
        to="#"
      >
        Conditions Générales d'Utilisation
      </Link>
      <Link
        className="footer-right--createAccount"
        to="#"
      >
        Créer votre compte
      </Link>
      <Link
        className="footer-right--FAQ"
        to="#"
      >
        FAQ
      </Link>
    </div>
  </div>
);

// == Export
export default Footer;
