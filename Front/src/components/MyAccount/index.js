// == Import npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import
import './myaccount.scss';

// == import logo
import { Facebook, Instagram } from 'react-feather';

// == Composant
const MyAccount = () => (
  <section className="sectionAccount">
    <h2 className="myAccount">Mon compte</h2>
    <img
      className="myaccount-picture"
      src="http://placehold.it/250x350"
      alt="mon compte hungrytruck"
    />
    <article className="account">
      <div className="account-informations">
        <div className="informations-left">
          <p>Mon pseudo : Turpinou</p>
          <p>Mon adresse :</p>
          <p>15 place des grands hommes</p>
          <p>12345 IDEFIX</p>
          <p>SIRET : 123456789</p>
        </div>
        <div className="informations-right">
          <p>Mon adresse mail: turpinou@idefix.fr</p>
          <div className="social">
            <div className="facebook">
              <Facebook size="50" color="#e69512" />
              <p>adresse FB</p>
            </div>
            <div className="instagram">
              <Instagram size="50" color="#e69512" />
              <p>adresse insta</p>
            </div>
          </div>
          <p>Mes plats favoris :</p>
          <ul>
            <li>pizza</li>
            <li>burger</li>
          </ul>
        </div>
      </div>
      <div className="account-button">
        <Link to="/" className="button-Link">
          <button type="button" className="button-del">
            Supprimer mon compte
          </button>
        </Link>
        <Link to="/new-account" className="button-Link">
          <button type="button" className="button-linkto">
            Editer mes informations
          </button>
        </Link>
        <Link to="/my-account/my-foodtruck" className="button-Link" exact>
          <button type="button" className="button-linkto">
            Voir mes Foodtrucks
          </button>
        </Link>
        <Link to="/" className="button-Link">
          <button type="button" className="button-linkto">
            Retour au menu principal
          </button>
        </Link>
      </div>
    </article>

  </section>
);

// == Export
export default MyAccount;
