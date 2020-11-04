// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { corsHeaders } from '../utils/corsHeaders';
import productList from '../data/productList.json';

export const getProductsById = async event => {
  try {
    const { productId } = event.pathParameters;
    const product = await productList.find(el => el.id === productId);
    return {
      statusCode: product ? 200 : 404,
      headers: corsHeaders,
      body: JSON.stringify(product ? product : { message: 'Product not found' })
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
