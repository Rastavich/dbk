// Live config
export const BASE_URI = 'https://dbk-strapi.herokuapp.com';
export const BASE_LOGIN_URI = 'https://dbk-strapi.herokuapp.com/auth/local';
export const GRAPHQL_URI = `${BASE_URI}/graphql`;

// TODO: Clean up this local config for running locally on multiple different machines using different local IP addresses.
// Local config
export const LOCAL_BASE_URI = 'http://192.168.20.14:1337';
export const LOCAL_GRAPHQL_URI = `${LOCAL_BASE_URI}/graphql`;
export const LOCAL_LOGIN_URI = 'http://192.168.20.14:1337/auth/local';

// Local laptop config
export const LOCAL_LOGIN_URI_LAPTOP = 'http://192.168.20.30:1337/auth/local';
export const LOCAL_BASE_URI_LAPTOP = 'http://192.168.20.30:1337';
export const LOCAL_GRAPHQL_URI_LAPTOP = `${LOCAL_BASE_URI}/graphql`;
