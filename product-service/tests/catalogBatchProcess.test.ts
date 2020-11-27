import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
import { corsHeaders } from '../utils/corsHeaders';

const message = '{"description":"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)","price":"600","title":"Apple MacBook Pro","image":"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg","count":"4"}';
const badMessage = '{"description":"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)","title":"Apple MacBook Pro","image":"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg","count":"4"}';

test('should save product from message', async () => {
  const product = await catalogBatchProcess({Records: [{ body: message }]});
  expect(product.statusCode).toEqual(204);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toContain("description\":\"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)\",\"price\":600,\"title\":\"Apple MacBook Pro\",\"image\":\"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg\",\"count\":4}");
});

test("should return 500 if message is bad", async () => {
  const product = await catalogBatchProcess({Records: [{ body: badMessage }]});
  expect(product.statusCode).toEqual(500);
  expect(product.headers).toEqual(corsHeaders);
  expect(product.body).toEqual("{\"message\":\"Error while reading data\"}");
});