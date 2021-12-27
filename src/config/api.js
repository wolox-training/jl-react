import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://wolox.com';

export const camelCaseSerializer = new CamelcaseSerializer();
export const snakeCaseSerializer = new SnakecaseSerializer();

if (baseURL === 'http://wolox.com') {
  console.warn('API baseURL has not been properly initialized'); // eslint-disable-line no-console
}

const STATUS_CODES = {
  unauthorized: 401
};

const api = create({
  /*
   * TODO Add this if you need it
   * baseURL: process.env.REACT_APP_API_BASE_URL,
   */
  baseURL,
  timeout: 15000
});

// eslint-disable-next-line no-unused-vars, prettier/prettier, @typescript-eslint/no-unused-vars
export const apiSetup = dispatch => {
  api.addMonitor(response => {
    if (response.status === STATUS_CODES.unauthorized) {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
       */
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
    }
  });
};

api.addRequestTransform(req => {
  if (req.data) {
    req.data = snakeCaseSerializer.serialize(req.data);
  }
});

api.addResponseTransform(res => {
  if (res.ok) {
    if (res.data) {
      res.data = camelCaseSerializer.serialize(res.data);
    }
  } else {
    throw { problem: res.problem, status: res.status, data: res.data };
  }
});

export default api;
