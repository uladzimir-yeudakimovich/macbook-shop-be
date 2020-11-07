// import { APIGatewayProxyHandler } from 'aws-lambda';
import { uuid } from 'uuidv4';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const setProduct = async event => {
  console.log('Add new product: ', event.body);

  const client = new Client(dbOptions);
  await client.connect();
  const { description, price, title, image, count } = JSON.parse(event.body.replace(/'/g, "''"));

  if (!description || !price || !title || !count) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, parameters of product is required' })
    };
  }
  try {
    const id = uuid();
    // add product to products
    await client.query(`
      INSERT INTO products (id, description, price, title, image)
      VALUES ('${id}', '${description}', '${price}', '${title}', '${image}')
    `);
    // add count to stocks
    await client.query(`
      INSERT INTO stocks (product_id, count)
      VALUES ('${id}', '${count}')
    `);
    
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: JSON.stringify({ id, description, price, title, image, count })
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
