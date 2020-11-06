// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const setProduct = async event => {
  console.log('Add new product: ', event.body);

  const client = new Client(dbOptions);
  await client.connect();
  const { description, price, title, image } = JSON.parse(event.body.replace(/'/g, "''"));

  if (!price || !title) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, parameters of product is required' })
    };
  }
  try {
    await client.query(`
      INSERT INTO products (description, price, title, image)
      VALUES ('${description}', '${price}', '${title}', '${image}')
    `);
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Product added' })
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
