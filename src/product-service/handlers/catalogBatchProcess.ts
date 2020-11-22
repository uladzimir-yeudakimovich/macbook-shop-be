import { uuid } from 'uuidv4';
import AWS from 'aws-sdk';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const catalogBatchProcess = async event => {
  console.log('catalogBatchProcess: ', event);

  const product = event.Records.map(({ body }) => JSON.parse(body));
  console.log('products: ', product);

  const { description, price: priceSt, title, image, count: countSt } = product[0];
  const price = parseInt(priceSt);
  const count = parseInt(countSt);

  if (
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof title !== 'string' ||
    typeof count !== 'number'
  ) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, parameters of product is required' })
    };
  }

  const sns = new AWS.SNS();
  sns.publish({
    Subject: 'New product',
    Message: JSON.stringify(product),
    TopicArn: process.env.SNS_ARN,
    MessageAttributes: {
      title: {
        DataType: "String",
        StringValue: product.title
      }
    }
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log('Send email for: ', data);
  });

  const client = new Client(dbOptions);
  await client.connect();

  try {
    const id = uuid();
    
    await client.query('BEGIN');
    await client.query(`
      INSERT INTO products (id, description, price, title, image)
      VALUES ('${id}', '${description}', '${price}', '${title}', '${image}')
    `);
    await client.query(`
      INSERT INTO stocks (product_id, count)
      VALUES ('${id}', '${count}')
    `);
    await client.query('COMMIT');
    
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: JSON.stringify({ id, description, price, title, image, count })
    };
  } catch (error) {
    console.log(error);
    await client.query('ROLLBACK');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error while reading data' }),
    };
  } finally {
    client.end();
  }
}