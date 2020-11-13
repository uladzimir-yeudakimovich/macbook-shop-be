import AWS from 'aws-sdk';
import { corsHeaders } from '../../utils/corsHeaders';

const BUSKET = 'macbook-shop-uploaded';

export const importProductsFile = async event => {
  console.log('uploadProductsFile ', event);
  const catalogName = event.queryStringParameters.fileName;
  const catalogPath = `uploaded/${catalogName}`;

  const s3 = new AWS.S3({ region: 'eu-west-1' });
  const params = {
    Busket: BUSKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        return reject(error);
      }
      console.log(url);

      resolve({
        statusCode: 200,
        headers: corsHeaders,
        body: url
      });
    })
  });
};