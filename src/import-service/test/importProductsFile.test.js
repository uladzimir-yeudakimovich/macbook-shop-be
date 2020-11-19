import { importProductsFile } from '../handlers/importProductsFile';
import { corsHeaders } from '../utils/corsHeaders';

test('should impotr file', async () => {
  const file = await importProductsFile({queryStringParameters: { name: 'macbook.jpg' }});
  expect(file.statusCode).toEqual(200);
  expect(file.headers).toEqual(corsHeaders);
  expect(file.body).toContain("https://macbook-shop-uploaded.s3.amazonaws.com/uploaded/macbook.jpg");
});

test('should return 400 if path parameter empty', async () => {
  const file = await importProductsFile({queryStringParameters: { name: null }});
  expect(file.statusCode).toEqual(400);
  expect(file.headers).toEqual(corsHeaders);
  expect(file.body).toEqual("{\"message\":\"Bad request, parameter name is required\"}");
});