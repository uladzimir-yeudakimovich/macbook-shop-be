// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const getProductsById = async event => {
  console.log('Get product by id: ', event.pathParameters);
  
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
    const { rows: product } = await client.query(`
      SELECT s.count, p.description, p.id, p.price, p.title, p.image
      FROM products p
      LEFT JOIN stocks s ON p.id = s.product_id
      WHERE p.id = '${productId}'
    `);

    return {
      statusCode: product.length ? 200 : 404,
      headers: corsHeaders,
      body: JSON.stringify(product.length ? product[0] : { message: 'Product not found' })
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
