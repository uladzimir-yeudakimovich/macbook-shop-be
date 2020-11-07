import { updateProduct } from '../handlers/updateProduct';
import { corsHeaders } from '../utils/corsHeaders';

const TEST_PRODUCT = {
  id: "dda61cde-bbc9-4fb6-bb6a-0dc53245e69b",
  description: "15 2019 TouchBar - 1.4GHz i5 - 8GB RAM - 128GB SSD (Renewed)",
  price: 1340,
  title: "Apple MacBook Pro",
  image: "https://m.media-amazon.com/images/I/51FWf+esWHL._AC_UY327_FMwebp_QL65_.jpg",
  count: 4
};

test('should update product', async () => {
  const product = await updateProduct({ body: JSON.stringify(TEST_PRODUCT) });
  expect(product.statusCode).toEqual(200);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product updated\"}");
});

test('should return 400 if path parameter unvalid', async () => {
  const product = await updateProduct({ body: JSON.stringify({ ...TEST_PRODUCT, id: '847234793748728947' }) });
  expect(product.statusCode).toEqual(400);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Bad request, id of product is required\"}");
});

test('should return 404 if product not found', async () => {
  const product = await updateProduct({ body: JSON.stringify({ ...TEST_PRODUCT, id: 'ada61cde-bbc9-4fb6-bb6a-0dc53245e69f' }) });
  expect(product.statusCode).toEqual(404);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product not found\"}");
});