import { uuid } from 'uuidv4';
import AWS from 'aws-sdk';
import { Client } from 'pg';
import { dbOptions } from '../utils/dbOptions';
import { corsHeaders } from '../utils/corsHeaders';

export const catalogBatchProcess = async event => {
  console.log('catalogBatchProcess: ', event);

  const products = event.Records.map(({ body }) => JSON.parse(body));
  console.log('products: ', products);

  const id = uuid();
  const productsForSave = [];
  const stocksForSave = [];

  products[0].forEach((product, i) => {
    console.log(`product${i}: `, product[i]);
    const { description, price, title, image, count } = product;

    productsForSave.push('(', id, description, parseInt(price), title, image, ')');
    stocksForSave.push(id, parseInt(count));
  });

  console.log('productsForSave: ', productsForSave);
  console.log('stocksForSave: ', stocksForSave);
  
  const client = new Client(dbOptions);
  await client.connect();

  try {
    await client.query('BEGIN');
    await client.query(`
      INSERT INTO products (id, description, price, title, image)
      VALUES ${productsForSave}
    `);
    await client.query(`
      INSERT INTO stocks (product_id, count)
      VALUES ${stocksForSave}
    `);
    await client.query('COMMIT');

    const sns = new AWS.SNS();
    sns.publish({
      Subject: 'New products',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN
    }, (err, data) => {
      if (err) console.log(err, err.stack);
      else     console.log('Send email for: ', data);
    });
    
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Products saved' })
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