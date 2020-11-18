import AWS from 'aws-sdk';
import * as csv from 'csv-parser';
import { corsHeaders } from '../utils/corsHeaders';
import { BUCKET } from '../utils/constants';

export const importFileParser = event => {

  console.log('importFileParser: ', event);

  try {
    const s3 = new AWS.S3();
    const sqs = new AWS.SQS();

    event.Records.forEach(record => {
      const s3Stream = s3.getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      }).createReadStream();
  
      s3Stream.pipe(csv())
        .on('data', data => console.log('data: ', data))
        .on('error', error => console.error('error: ', error))
        .on('end', async () => {
          console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);
  
          await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace('uploaded', 'parsed')
          }).promise();
          
          console.log(`Copy into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
  
          await s3.deleteObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
          }).promise();
          
          console.log(`Delete from ${BUCKET}/${record.s3.object.key}`);
  
          sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: record.s3.object.key.replace('uploaded', 'parsed')
          }, (err, data) => {
            if (err) console.log(err, err.stack);
            else     console.log('Send message for: ', data);
          });
        })
  
      return {
        statusCode: 200,
        headers: corsHeaders
      }
    })
  } catch (error) {
    console.error('error: ', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error while reading data' })
    }
  }
}