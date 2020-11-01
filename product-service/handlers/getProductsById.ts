import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import productList from '../productList.json';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  const { productId } = event.pathParameters;
  const product = await productList.find(el => el.id === productId);
  return {
    statusCode: product ? 200 : 404,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product ? product : {message: 'Product not found'})
  };
}
