import AWS from 'aws-sdk';

const BUCKET = 'macbook-shop-uploaded';
const corsHeaders = {
  "Access-Control-Allow-Origin": "*"
};

export const uploadProductsFile = async event => {
  console.log('importProductsFile ', event);
  const s3 = new AWS.S3({ region: 'eu-west-1' });
  let status = 200;
  let catalogs;
  const params = {
    Bucket: BUCKET,
    Prefix: 'uploaded/',
    Delimiter: '/'
  }
  
  try {
    catalogs = await s3.listObjects(params).promise();
  } catch (error) {
    console.error(error);
    catalogs = { message: error };
    status = 500;
  }

  return {
    statusCode: status,
    headers: corsHeaders,
    body: JSON.stringify(catalogs.Contents.map(catalog => catalog.key.replace(catalog.Prefix, '')))
  }
};