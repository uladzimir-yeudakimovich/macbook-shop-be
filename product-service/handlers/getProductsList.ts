import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const productList = require('../productList.json');

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify(productList),
  };
}