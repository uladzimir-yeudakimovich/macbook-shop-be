import AWS from 'aws-sdk';

export const catalogBatchProcess = event => {
  console.log('catalogBatchProcess: ', event);

  const messages = event.Records.map(({ body }) => body);
  console.log('messages: ', messages);

  const sns = new AWS.SNS();
  sns.publish({
    Subject: 'New products',
    Message: JSON.stringify(messages),
    TopicArn: process.env.SNS_ARN
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log('Send email for: ', data);
  });
}