import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { corsHeaders } from '../utils/corsHeaders';
import productList from '../data/productList.json';

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(productList),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error while reading data' }),
    };
  }
}