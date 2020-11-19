import AWS from 'aws-sdk';

export const catalogBatchProcess = async event => {
  console.log('catalogBatchProcess: ', event);

  const products = event.Records.map(({ body }) => JSON.parse(body));
  console.log('products: ', products);

  const sns = new AWS.SNS();
  sns.publish({
    Subject: 'New products',
    Message: JSON.stringify(products),
    TopicArn: process.env.SNS_ARN
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log('Send email for: ', data);
  });
}