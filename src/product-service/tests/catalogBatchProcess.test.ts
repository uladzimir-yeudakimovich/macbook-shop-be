import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
import { corsHeaders } from '../utils/corsHeaders';

const products = '{"description":"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)","price":"600","title":"Apple MacBook Pro","image":"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg","count":"4"}';

test('should parse and save data from file', async () => {
  const file = await catalogBatchProcess({Records: [{ body: products }]});
  expect(file.statusCode).toEqual(204);
  expect(file.headers).toEqual(corsHeaders);
  expect(file.body).toEqual("{\"id\":\"7c5f452a-0cc2-4dfc-9442-ad9ece311578\",\"description\":\"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)\",\"price\":600,\"title\":\"Apple MacBook Pro\",\"image\":\"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg\",\"count\":4}");
});