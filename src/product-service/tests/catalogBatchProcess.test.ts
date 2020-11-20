import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
import { corsHeaders } from '../utils/corsHeaders';

const products = '[{"description":"Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)","price":"600","title":"Apple MacBook Pro","image":"https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg","count":"4"},{"description":"\\"13\\" 2019 TouchBar - 1.4GHz i5 - 8GB RAM - 128GB SSD (Renewed)\\"","price":"1120","title":"Apple MacBook Pro","image":"https://m.media-amazon.com/images/I/51FWf+esWHL._AC_UY327_FMwebp_QL65_.jpg","count":"7"},{"description":"A1466 (MJVE2LL/A - Early 2015) 13in Core i5 1.6GHz 4GB Ram 128GB SSD Mac OSX Sierra (Renewed)","price":"575","title":"Apple MacBook Air","image":"https://m.media-amazon.com/images/I/613KZUV3+hL._AC_UY327_FMwebp_QL65_.jpg","count":"3"}]';

test('should parse and save data from file', async () => {
  const file = await catalogBatchProcess({Records: [{ body: products }]});
  expect(file.statusCode).toEqual(204);
  expect(file.headers).toEqual(corsHeaders);
  expect(file.body).toEqual("{\"message\":\"Products saved\"}");
});