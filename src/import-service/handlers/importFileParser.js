import AWS from 'aws-sdk';
import { csv } from 'csv-parser';
import { corsHeaders } from '../utils/corsHeaders';
import { BUCKET } from '../utils/constants';

export const importFileParser = async event => {
  console.log('importFileParser ', event);
  const s3 = new AWS.S3();
  let status = 200;
  const params = {
    Bucket: BUCKET,
    Prefix: 'uploaded/',
    Delimiter: '/'
  }
  let files;

  try {
    files = await s3.listObjects(params).promise();
  } catch (error) {
    console.error(error);
    status = 500;
  }
  
  event.Records.forEach(record => {
    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      CopySource: record.s3.object.key
    }).createReadStream();

    s3Stream.pipe(csv())
      .on('data', data => console.log(data))
      .on('end', async () => {
        console.log(`Copy from ${BUSKET}/${record.s3.object.key}`);

        await s3.copyObject({
          Busket: BUSKET,
          CopySource: `${BUSKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace('uploaded', 'parsed')
        }).promise();
        
        console.log(`Copy into ${BUSKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
      })
  })

  return {
    statusCode: status,
    headers: corsHeaders,
    body: JSON.stringify(files.Contents.map(file => file.key.replace(file.Prefix, '')))
  }
}