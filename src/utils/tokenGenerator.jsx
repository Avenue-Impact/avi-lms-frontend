const generateToken = (length = 24) => {
  // Define the characters allowed in the token
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  // Use Web Crypto API for better security
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    token += charset[randomValues[i] % charset.length];
  }

  return token;
};

export default generateToken;