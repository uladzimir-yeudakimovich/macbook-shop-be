import { getProductsList } from '../handlers/getProductsList';

test("should return products list", async () => {
  const products = await getProductsList();
  expect(products.statusCode).toEqual(200);
});