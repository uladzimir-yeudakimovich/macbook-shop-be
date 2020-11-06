import { setProduct } from '../handlers/setProduct';
import { corsHeaders } from '../utils/corsHeaders';

const TEST_PRODUCT = {
  description: "15 2019 TouchBar - 1.4GHz i5 - 8GB RAM - 128GB SSD (Renewed)",
  price: 1340,
  title: "Apple MacBook Pro",
  image: "https://m.media-amazon.com/images/I/51FWf+esWHL._AC_UY327_FMwebp_QL65_.jpg"
};

test("should add product to products list", async () => {
  const product = await setProduct({ body: JSON.stringify(TEST_PRODUCT) });
  expect(product.statusCode).toEqual(204);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product added\"}");
});

test("should return 400 if price in body is empty", async () => {
  const product = await setProduct({ body: JSON.stringify({ ...TEST_PRODUCT, price: null }) });
  expect(product.statusCode).toEqual(400);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Bad request, parameters of product is required\"}");
});

test("should return 400 if title in body is empty", async () => {
  const product = await setProduct({ body: JSON.stringify({ ...TEST_PRODUCT, title: null }) });
  expect(product.statusCode).toEqual(400);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Bad request, parameters of product is required\"}");
});

test("should add product to product list if string includ '", async () => {
  const product = await setProduct({ body: JSON.stringify({ ...TEST_PRODUCT, description: "13' 2019 TouchBar - 1.4GHz i5" }) });
  expect(product.statusCode).toEqual(204);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Product added\"}");
});