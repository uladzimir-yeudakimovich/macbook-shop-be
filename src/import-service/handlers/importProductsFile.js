import AWS from 'aws-sdk';

const BUCKET = 'macbook-shop-uploaded';
const corsHeaders = {
  "Access-Control-Allow-Origin": "*"
};

export const importProductsFile = async event => {
  console.log('uploadProductsFile ', event);
  const fileName = event.queryStringParameters.name;
  const filePath = `uploaded/${fileName}`;

  const s3 = new AWS.S3({ region: 'eu-west-1' });
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