import { getProductsList } from '../handlers/getProductsList';
import { corsHeaders } from '../utils/corsHeaders';

test("should return products list", async () => {
  const products = await getProductsList();
  expect(products.statusCode).toEqual(200);
  expect(products.headers).toEqual(corsHeaders);
});