import { getProductsById } from '../handlers/getProductsById';
import { corsHeaders } from '../utils/corsHeaders';

test('should return product', async () => {
  const product = await getProductsById({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' }});
  expect(product.statusCode).toEqual(200);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"count\":4,\"description\":\"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)\",\"id\":\"7567ec4b-b10c-48c5-9345-fc73c48a80aa\",\"price\":600,\"title\":\"Apple MacBook Pro\",\"image\":\"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg\"}");
});

test('should return 404 if product not found', async () => {
  const product = await getProductsById({ pathParameters: { productId: '8467ec4b-b10c-48c5-9345-fc73c48a80aa' } });
  expect(product.statusCode).toEqual(404);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product not found\"}");
});

test('should return error if path parameter empty', async () => {
  const product = await getProductsById({});
  expect(product.statusCode).toEqual(500);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Error while reading data\"}");
});