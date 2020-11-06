// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const getProductsList = async () => {
  console.log('Get products list');

  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: productList } = await client.query(`
      SELECT s.count, p.description, p.id, p.price, p.title, p.image
      FROM products p
      LEFT JOIN stocks s ON p.id = s.product_id
      WHERE count > 0
    `);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(productList),
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