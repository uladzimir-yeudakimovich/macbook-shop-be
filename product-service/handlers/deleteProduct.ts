// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const deleteProduct = async event => {
  console.log('Delete product: ', event.pathParameters);

  const client = new Client(dbOptions);
  await client.connect();
  const productId = event.pathParameters?.productId;
  const validation = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  
  if (!validation.test(productId)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, id not valid' })
    };
  }

  try {
    await client.query(`
      DELETE FROM stocks WHERE product_id = '${productId}'
    `);
    await client.query(`
      DELETE FROM products WHERE id = '${productId}'
    `);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Product deleted' })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error while reading data' }),
    };
  } finally {
    client.end();
  }
}
