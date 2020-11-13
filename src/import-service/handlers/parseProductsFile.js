import AWS from 'aws-sdk';
import { csv } from 'csv-parser';

const BUSKET = 'macbook-shop-uploaded';

export const parseProductsFile = async event => {
  console.log('parseProductsFile ', event);
  const s3 = new AWS.S3({ region: 'eu-west-1' });
  
  event.Records.forEach(record => {
    const s3Stream = s3.getObject({
      Busket: BUSKET,
      CopySource: record.s3.object.key
    }).createReadStream();

    s3Stream.pipe(csv())
      .on('data', data => console.log(data))
      .on('end', async () => {
        console.log('Copy from ' + BUSKET + '/' + record.s3.object.key);

        await s3.copyObject({
          Busket: BUSKET,
          CopySource: BUSKET + '/' + record.s3.object.key,
          Key: record.s3.object.key.replace('uploaded', 'parsed')
        }).promise();
        
        console.log('Copy into ' + BUSKET + '/' + record.s3.object.key.replace('uploaded', 'parsed'));
      })
  })
}