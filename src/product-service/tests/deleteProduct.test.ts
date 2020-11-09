import { deleteProduct } from '../handlers/deleteProduct';
import { corsHeaders } from '../../utils/corsHeaders';

test('should delete product', async () => {
  const product = await deleteProduct({ pathParameters: { productId: '6341365f-3f0d-4c07-aa0b-bf96f95ab426' }});
  expect(product.statusCode).toEqual(200);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product deleted\"}");
});

test('should delete product', async () => {
  const product = await deleteProduct({ pathParameters: { productId: '6341365f-3f0d-4c07-aa0b-bf96f95ab4' }});
  expect(product.statusCode).toEqual(400);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Bad request, id not valid\"}");
});