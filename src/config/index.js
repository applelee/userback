const devBaseURL = 'http://mapi.1oceans.com';
const proBaseURL = 'http://mapi.1oceans.com';

export default {
  appName: 'userObject',
  baseURL: process.env.NODE_ENV !== 'production' ? devBaseURL : proBaseURL,
};
