const requestInterceptor = (config) => {
  console.log("Request made with ", config);
  return config;
};

const responseInterceptor = (response) => {
  console.log("Response received: ", response);
  return response;
};

const errorResponseInterceptor = (error) => {
  console.error("Response error: ", error);
  return Promise.reject(error);
};

const errorRequestInterceptor = (error) => {
  console.error("Request error: ", error);
  return Promise.reject(error);
};

export {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
};
