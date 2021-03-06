import 'source-map-support/register';
import { getProductsList } from  './handlers/getProductsList';
import { getProductsById } from './handlers/getProductsById';
import { setProduct } from './handlers/setProduct';
import { updateProduct } from './handlers/updateProduct';
import { deleteProduct } from './handlers/deleteProduct';
import { catalogBatchProcess } from './handlers/catalogBatchProcess';

export {
  getProductsList,
  getProductsById,
  setProduct,
  updateProduct,
  deleteProduct,
  catalogBatchProcess
};
