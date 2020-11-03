import { getProductsById } from '../handlers/getProductsById';

test('should return product', async () => {
  const product = await getProductsById({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' }});
  expect(product.statusCode).toEqual(200);
});

test('should return error if path parameter empty', async () => {
  const product = await getProductsById();
  expect(product.statusCode).toEqual(500);
});