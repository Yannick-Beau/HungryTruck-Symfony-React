import axios from 'axios';
import { CREATE_USER } from '../actions/createUser';
import URL from '../data/ip';

const createUserMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CREATE_USER: {
      const {
        email,
        password,
        createPro,
        nickname,
        pictureUser,
        cp,
        city,
        address,
        siret,
      } = store.getState().createUser;

      const newCP = parseInt(cp, 10);
      const newSiret = parseInt(siret, 10);
      let proUser = ['ROLE_USER'];
      if (createPro === true) {
        proUser = ['ROLE_PRO'];
      }
      console.log(`
        email : ${email},
        password : ${password},
        user : ${proUser},
        pesudo : ${nickname},
        pictureUser : ${pictureUser},
        cp : ${newCP},
        city : ${city},
        address : ${address},
        siret : ${newSiret},`);
      console.log(`On va s'inscrire avec email: ${email} et mdp: ${password}`);
      axios.post(`${URL}/api/user/create`,
        {
          email: email,
          roles: proUser,
          password: password,
          pseudo: nickname,
          avatar: pictureUser,
          cp: newCP,
          city: city,
          adresse: address,
          siret: newSiret,
        })
        .then((response) => {
          console.log(response);
          window.location = '/';
        })
        .catch((error) => {
          // TODO pour afficher un message d'erreur, il faudrait ajouter une info
          // dans le state, et dispatcher ici une nouvelle action
          console.log(error);
        });
      break;
    }
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default createUserMiddleware;