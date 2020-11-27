import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    stage: 'dev',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: [
          {
            Ref: 'SNSTopic'
          }
        ],
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      SNS_ARN: {
        Ref: 'SNSTopic' 
      }
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSSubscriptionAir: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'uladzimir.yeudakimovich@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      },
      SNSSubscriptionPro: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'berkut2426@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            title: ['Apple MacBook Pro']
          }
        }
      },
    },
    Outputs: {
      SQSQueueUrl: {
        Value: {
          Ref: 'SQSQueue',
        }
      },
      SQSQueueArn: {
        Value: {
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        }
      },
    },
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    getProductsById: {
      handler: 'handler.getProductsById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            }
          }
        }
      ]
    },
    setProduct: {
      handler: 'handler.setProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    updateProduct: {
      handler: 'handler.updateProduct',
      events: [
        {
          http: {
            method: 'put',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    deleteProduct: {
      handler: 'handler.deleteProduct',
      events: [
        {
          http: {
            method: 'delete',
            path: 'products/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            }
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': ['SQSQueue', 'Arn'],
            },
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
