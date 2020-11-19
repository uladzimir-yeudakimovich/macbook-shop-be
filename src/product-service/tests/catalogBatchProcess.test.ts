import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
// import { corsHeaders } from '../utils/corsHeaders';

const products = '[]';

test('should parse and save data from file', async () => {
  const file = await catalogBatchProcess({Records: [{ body: products }]});
  console.log(file);
  // expect(file.statusCode).toEqual(200);
  // expect(file.headers).toEqual(corsHeaders);
});