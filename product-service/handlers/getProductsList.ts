import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import productList from '../productList.json';

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(productList),
  };
}