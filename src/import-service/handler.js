import { corsHeaders } from '../../utils/corsHeaders';
import AWS from 'aws-sdk';

const BUSKET = 'macbook-shop-uploaded';

export const importProductsFile = async event => {
  const s3 = new AWS.S3();
  let status = 200;
  let importProducts = [];
  const params = {
    Busket: BUSKET,
    Prefix: 'import/'
  }
  
  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    importProducts = s3Response.Contents;
  } catch (error) {
    console.error(error);
  }

  return response = {
    statusCode: status,
    headers: corsHeaders,
    body: JSON.stringify(
      importProducts
        .filter(importProduct => importProduct.Size)
        .map(importProduct => `https://${BUSKET}.s3.amazonaws.com/${importProduct.key}`)
    )
  }
};
