import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const productList = require('../productList.json');

export const getProductsById: APIGatewayProxyHandler = async (event, _contex) => {
  const product = productList.find(el => el.id === event.pathParameters.productId);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product)
  };
}