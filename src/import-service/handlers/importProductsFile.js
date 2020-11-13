import AWS from 'aws-sdk';
import { corsHeaders } from '../../utils/corsHeaders';

const BUSKET = 'macbook-shop-uploaded';

export const importProductsFile = async event => {
  console.log('importProductsFile ', event);
  const s3 = new AWS.S3();
  let status = 200;
  let trumbnails = [];
  const params = {
    Busket: BUSKET,
    Prefix: 'uploaded/',
  }
  
  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    trumbnails = s3Response.Contents;
  } catch (error) {
    console.error(error);
    status = 500;
  }

  return {
    statusCode: status,
    headers: corsHeaders,
    body: JSON.stringify(
      trumbnails
        .filter(trumbnail => trumbnail.Size)
        .map(trumbnail => `https://${BUSKET}.s3.amazonaws.com/${trumbnail.key}`)
    )
  }
};