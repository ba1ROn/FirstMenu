import axios from 'axios';

export const fetchMainMenu = async () => {
  const response = await axios.get('http://localhost:5000/api/Menu/mainmenu');
  return response.data;
};

export const fetchSideMenuItems = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/Menu/${id}`);
  return response.data;
};