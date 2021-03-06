// === action types
export const DEL_USER = 'DEL_USER';
export const SEND_DEL = 'SEND_DEL';
export const TRUCK_DEL = 'TRUCK_DEL';
export const TIME_DEL = 'TIME_DEL';

// === action creators
export const delUser = (newValue, identifier) => ({
  type: DEL_USER,
  newValue: newValue,
  identifier: identifier,
});

export const sendDel = () => ({
  type: SEND_DEL,
});

export const truckDel = (id) => ({
  type: TRUCK_DEL,
  id: id,
});

export const timeDel = (id) => ({
  type: TIME_DEL,
  id: id,
});

