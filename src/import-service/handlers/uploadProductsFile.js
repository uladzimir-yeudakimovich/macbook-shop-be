import AWS from 'aws-sdk';

const BUSKET = 'macbook-shop-uploaded';
const catalogPath = 'uploaded/catalog.csv';

export const uploadProductsFile = async event => {
  console.log('uploadProductsFile ', event);
  // const s3 = new AWS.S3({ region: 'eu-west-1' });
  // const params = {
  //   Busket: BUSKET,
  //   Key: catalogPath,
  //   Expires: 60,
  //   ContentType: 'text/csv'
  // }

  // s3.getSignedUrl('putObject', params, (error, url) => {
  //   console.log(url);
  // })

  const s3 = new AWS.S3();

  for (const record of event.Records) {
    console.log(record);
    await s3.copyObject({
      Busket: BUSKET,
      CopySource: BUSKET + '/' + record.s3.object.key,
      Key: record.s3.object.key.replace('images', 'uploaded')
    }).promise();

    await s3.deleteObject({
      Busket: BUSKET,
      Key: record.s3.object.key
    }).promise();

    console.log('Trumbnail for an image ' + record.s3.object.key.splite('/')[1] + ' is created');
  }

  return {
    statusCode: 202
  }
};