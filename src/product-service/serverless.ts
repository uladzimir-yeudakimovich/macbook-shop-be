import type { Serverless } from 'serverless/aws';

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
  SNS_ARN_CREATE,
  SNS_ARN_ERROR,
  EMAIL_PRODUCTS,
  EMAIL_ERROR,
  REGION
} = process.env;

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
    region: REGION,
    stage: 'dev',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: [
          {
            Ref: 'SNSTopic'
          },
          {
            Ref: 'SNSTopicError'
          }
        ],
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, SNS_ARN_CREATE, SNS_ARN_ERROR },
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSTopicError: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'errorProductTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: EMAIL_PRODUCTS,
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      },
      SNSSubscriptionError: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: EMAIL_ERROR,
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopicError'
          }
        }
      }
    }
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
            arn: '${cf:import-service-${self:provider.stage}.SQSQueueArn}'
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
