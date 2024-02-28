import axios from 'axios';

// add socket id to all axios requests by default
export const addSocketId = (id) => {
  axios.defaults.headers.common['socket-id'] = '';
  delete axios.defaults.headers.common['socket-id'];

  if (id) {
    axios.defaults.headers.common['socket-id'] = `${id}`;
  }
};
