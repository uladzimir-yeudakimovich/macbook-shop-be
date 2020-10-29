import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: [
        {
          count: 4,
          description: "Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
          price: 600,
          title: "Apple MacBook Pro",
          image: "https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 6,
          description: "13' 2019 TouchBar - 1.4GHz i5 - 8GB RAM - 128GB SSD (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
          price: 1120,
          title: "Apple MacBook Pro",
          image: "https://m.media-amazon.com/images/I/51FWf+esWHL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 7,
          description: "A1466 (MJVE2LL/A - Early 2015) 13in Core i5 1.6GHz 4GB Ram 128GB SSD Mac OSX Sierra (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a8052",
          price: 575,
          title: "Apple MacBook Air",
          image: "https://m.media-amazon.com/images/I/613KZUV3+hL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 12,
          description: "Air A1466 (MD760LL/B - Early 2014) 13in Core i5 1.4GHz 4GB Ram 128GB SSD Mac OSX Sierra (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
          price: 535,
          title: "Apple MacBook Air",
          image: "https://m.media-amazon.com/images/I/81vs5TXBrlL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 7,
          description: "MF839ll/A Intel core 5-5257U 2.7GHz 13.3-Inch, 16GB RAM DDR3 256GB SSD (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
          price: 942,
          title: "Apple MacBook Pro",
          image: "https://m.media-amazon.com/images/I/71nM55mRvxL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 8,
          description: "Retina Display MPXQ2LL/A 13in 2.3GHz Intel Core i5 Dual Core, 8GB RAM, 256GB SSD, Space Grey, macOS Mojave 10.14 (Renewed)",
          id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
          price: 1000,
          title: "Apple MacBook Pro",
          image: "https://m.media-amazon.com/images/I/61E6RyDahLL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 2,
          description: "13 (Early 2011) - Core i5 2.3 GHz, 4GB RAM, 320GB HDD (Refurbished)",
          id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
          price: 495,
          title: "Apple MacBook Pro",
          image: "https://m.media-amazon.com/images/I/613KZUV3+hL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
          count: 3,
          description: "Retina A1502 13.3' LATE 2013 ME864LL/A CORE I5 2.4GHz 8GB Ram 256GB SSD MAC OS MOJAVE (Renewed)",
          id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
          price: 674,
          title: "APPLE MACBOOK PRO",
          image: "https://m.media-amazon.com/images/I/71ipowa4JNL._AC_UY327_FMwebp_QL65_.jpg"
        }
      ],
      input: event,
    }, null, 2),
  };
}