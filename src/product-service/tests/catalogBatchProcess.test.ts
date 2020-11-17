import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
// import { corsHeaders } from '../utils/corsHeaders';

test('should impotr file', async () => {
  const file = await catalogBatchProcess({Records: { body: 'products.csv' }});
  console.log(file);
  // expect(file.statusCode).toEqual(200);
  // expect(file.headers).toEqual(corsHeaders);
});