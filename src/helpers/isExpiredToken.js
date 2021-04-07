import jwtDecode from 'jwt-decode';

const isExpiredToken = (token) => {
  try {
    if (token !== null) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export default isExpiredToken;
