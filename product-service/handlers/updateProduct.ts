// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const updateProduct = async event => {
  console.log('Update product: ', event.body);

  const client = new Client(dbOptions);
  await client.connect();
  const { id, description, price, title, image, count } = JSON.parse(event.body.replace(/'/g, "''"));
  const validation = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  
  if (!validation.test(id)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, id of product is required' })
    };
  }

  try {
    const { rows: findProduct } = await client.query(`
      SELECT * FROM products p
      WHERE p.id = '${id}'
    `);

    if (findProduct.length) {
      await client.query(`
        UPDATE products
        SET description = '${description}', price = '${price}', title = '${title}', image = '${image}'
        WHERE id = '${id}';
      `);
      await client.query(`
        UPDATE stocks
        SET count = '${count}'
        WHERE product_id = '${id}';
      `);
    
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Product updated' })
      };
    }
    
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Product not found' })
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
