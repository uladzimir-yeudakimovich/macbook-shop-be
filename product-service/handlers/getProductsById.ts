import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { corsHeaders } from '../utils/corsHeaders';
import productList from '../data/productList.json';
import { Product } from '../models/product';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  const { productId } = event.pathParameters;
  const product: Product = await productList.find(el => el.id === productId);
  try {
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
