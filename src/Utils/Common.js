// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    return (userStr!== null || userStr!== undefined || userStr!=="") ? userStr : null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    const token = sessionStorage.getItem('token');
    return (token !== null || token !== undefined || token !== "") ? token : null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }