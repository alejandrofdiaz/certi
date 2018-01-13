const GEO_API_KEY = 'e97dbeae4fb7a58a1d0d838885d09c5f4ae259506a4dcd34704bc7e72af5eacb',
  SANDBOX = '1',
  BASE_URL = 'http://apiv1.geoapi.es/',
  DEFAULT_TYPE = 'json';

interface GeoApiInterface {
  url: string;
  type: string;
  key: string;
  sandbox: string;
}
