import 'source-map-support/register';

const { getProductsList } = require('./handlers/getProductsList');
const { getProductsById } = require('./handlers/getProductsById');

export { getProductsList, getProductsById };
