import AWS from 'aws-sdk';
import { corsHeaders } from '../utils/corsHeaders';
import { BUCKET } from '../utils/constants';

export const importProductsFile = async event => {
  console.log('importProductsFile: ', event);
  const { name } = event.queryStringParameters;
  const filePath = `uploaded/${name}`;
  
  if (typeof name !== 'string') {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad request, parameter name is required' })
    };
  }

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
        console.error('error: ', error);
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