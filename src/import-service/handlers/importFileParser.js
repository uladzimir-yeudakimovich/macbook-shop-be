import AWS from 'aws-sdk';
import * as csv from 'csv-parser';
import { corsHeaders } from '../utils/corsHeaders';
import { BUCKET } from '../utils/constants';

export const importFileParser = async event => {
  console.log('importFileParser ', event);
  const s3 = new AWS.S3();
  
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
      })
  })

  let files;

  try {
    files = await s3.listObjects({
      Bucket: BUCKET,
      Prefix: 'parsed/',
      Delimiter: '/'
    }).promise();
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error while reading data' })
    }
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(files.Contents.map(file => file.key))
  }
}