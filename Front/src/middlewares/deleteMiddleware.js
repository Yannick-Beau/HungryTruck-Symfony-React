import axios from 'axios';
import URL from '../data/ip';
import {
  SEND_DEL,
  sendDel,
  TRUCK_DEL,
  truckDel,
  TIME_DEL,
} from '../actions/delUser';
import { saveUser } from '../actions/logIn';
import { changeIsLoading, changeShowFlash } from '../actions/tools';

const deleteMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_DEL: {
      const token = localStorage.getItem('token');
      console.log(`mon token : ${token}`);
      axios.delete(
        `${URL}/api/user/delete`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          // store.dispatch(sendDel());
          localStorage.removeItem('token');
          window.location = '/';
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case TRUCK_DEL: {
      const token = localStorage.getItem('token');
      console.log('je vais supprimer le truck');
      console.log(action.id);
      axios.delete(
        `${URL}/api/foodtruck/delete/${action.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          // store.dispatch(truckDel(action.id));
          store.dispatch(saveUser());
          store.dispatch(changeIsLoading(false, 'delTruck'));
          store.dispatch(changeShowFlash('success', 'delTruck'));
        })
        .catch((error) => {
          console.log(error.response.data);
          store.dispatch(changeIsLoading(false, 'delTruck'));
          store.dispatch(changeShowFlash('error', 'delTruck'));
        });
      break;
    }

    case TIME_DEL: {
      const token = localStorage.getItem('token');
      console.log('je vais supprimer un rdv');
      console.log(action.id);
      axios.delete(
        `${URL}/api/event/delete/${action.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          // store.dispatch(truckDel(action.id));
          store.dispatch(saveUser());
          store.dispatch(changeIsLoading(false, 'delEvent'));
          store.dispatch(changeShowFlash('success', 'delEvent'));
        })
        .catch((error) => {
          console.log(error.response.data);
          store.dispatch(changeIsLoading(false, 'delEvent'));
          store.dispatch(changeShowFlash('error', 'delEvent'));
        });
      break;
    }
    default:
  }
  next(action);
};

export default deleteMiddleware;
