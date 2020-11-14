import AWS from 'aws-sdk';
import { corsHeaders } from '../utils/corsHeaders';
import { BUCKET } from '../utils/constants';

export const importProductsFile = async event => {
  console.log('importProductsFile ', event);
  const fileName = event.queryStringParameters.name;
  const filePath = `uploaded/${fileName}`;

  const s3 = new AWS.S3({ signatureVersion: 'v4' });
  const params = {
    Bucket: BUCKET,
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv'
  }

  console.log(params);

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        console.log(error);
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