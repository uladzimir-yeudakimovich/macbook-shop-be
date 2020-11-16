import AWS from 'aws-sdk';

export const catalogBatchProcess = event => {
  console.log('catalogBatchProcess: ', event);
  console.log('length: ', event.Records.length);

  const messages = event.Records.map(({ body }) => body);
  console.log('messages: ', messages);

  const sns = new AWS.SNS();
  sns.publish({
    Subject: 'New products',
    Message: JSON.stringify(messages),
    TopicArn: process.env.SNS_ARN
  }, () => console.log('Send email for: ', JSON.stringify(messages)));
}