let token = "null";


export const setSessionToken = (newToken) => {
  token = newToken;
};


export const getSessionToken = () => {

  return token;


};