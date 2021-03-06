// == Import npm
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import PropTypes from 'prop-types';

// == Import
import './editAccount.scss';

// == Composant
const EditAccount = ({
  email,
  avatar,
  adresse,
  pseudo,
  isPro,
  logged,
  foods,
  redirect,
  redirectLogIn,
  changeRedirect,
  changeRedirectLogIn,
  findFood,
  loadEditUser,
  handleSubmit,
  changeLoadingEditUser,
  editAddress,
  changeField,
  changeToggle,
}) => {
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2V5Z2VuOSIsImEiOiJja3NrNWh6MGQwczZnMnBsNHhqYnRtMDUxIn0.dq2MMs1vSwGk8nMIj9NTxQ';
  const [viewport, setViewport] = useState({
    latitude: 45.5,
    longitude: 2,
    zoom: 5.4,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [],
  );
  useEffect(() => {
    changeLoadingEditUser();
    findFood();
  }, []);
  if (!logged) {
    return <Redirect to="/" />;
  }
  let title = 'Modifier votre compte Utilisateur';
  let buttonCreateName = 'Modifier mon compte Utilisateur';
  if (isPro) {
    title = 'Modifier votre compte Pro';
    buttonCreateName = 'Modifier mon compte Pro';
  }
  return (
    <main className="newaccount">
      <h1 className="newaccount-title">{title}</h1>
      { loadEditUser
      && (
      <Loader
        type="Puff"
        color="#e69512"
        height={100}
        width={100}
        className="loader"
      />
      )}
      { !loadEditUser
      && (
      <form
        className="newaccount-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-left">
          <img className="avatar" src={avatar} alt="Avatar" />
          <label className="form-label--avatar" htmlFor="avatar">Lien de votre image de profil*
            <input
              type="text"
              className="avatar-input"
              name="avatar"
              placeholder="https://kelapplication.com/image.png"
              value={avatar}
              onChange={(evt) => {
                changeField(evt.target.value, 'pictureUser');
              }}
            />
          </label>
        </div>
        <div className="form-right">
          <h2>Vos informations personnelles</h2>
          <p className="fields-legend"><span>* Champ obligatoire</span></p>
          <div className="all-fields">
            <div className="fields">
              <div className="fields-left">
                <div className="field">
                  <label className="field-label" htmlFor="email">Votre Email
                    <div>
                      <input
                        className="field-input"
                        type="text"
                        name="email"
                        id="field-input--email"
                        placeholder="john.doeuf@gmail.com"
                        value={email}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'email');
                        }}
                      />
                      <span>*</span>
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="pseudo">Votre Pseudo
                    <div>
                      <input
                        className="field-input"
                        type="text"
                        name="pseudo"
                        id="field-input--pseudo"
                        placeholder="Poule"
                        value={pseudo}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'nickname');
                        }}
                      />
                      <span>*</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="fields-right">
                <div className="field">
                  <div className="field-label" htmlFor="adresse">Saisissez votre adresse
                    <div>
                      <span>*</span>
                      <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="430px"
                        height="480px"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                      >
                        <Geocoder
                          mapRef={mapRef}
                          onViewportChange={handleGeocoderViewportChange}
                          mapboxApiAccessToken={MAPBOX_TOKEN}
                          countries="fr"
                          placeholder="Votre adresse"
                          onResult={(e) => {
                            console.log(e.result);
                            editAddress(
                              e.result.place_name,
                              e.result.center[0],
                              e.result.center[1],
                            );
                          }}
                        />
                      </MapGL>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fields-food">
                <h2>Vos nourritures favorites</h2>
                <fieldset className="field-check">
                  {foods.map((item) => (
                    <label key={item.name} className="field-label" htmlFor={item.name}>{item.name}
                      <label className="switch">
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={item.isCheck}
                          onChange={() => {
                            changeToggle(!item.isCheck, `${item.name}`);
                          }}
                        />
                        <span className="slider rounded" />
                      </label>
                    </label>
                  ))}
                </fieldset>
              </div>
            </div>
          </div>
          <button className="submit-form" type="submit" value="Submit">{buttonCreateName}</button>
        </div>
      </form>
      )}
    </main>
  );
};

EditAccount.propTypes = {
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  isPro: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  findFood: PropTypes.func.isRequired,
  changeLoadingEditUser: PropTypes.func.isRequired,
  loadEditUser: PropTypes.bool.isRequired,
  changeField: PropTypes.func.isRequired,
  changeToggle: PropTypes.func.isRequired,
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isCheck: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default EditAccount;
