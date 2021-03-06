--create table products (
--    id uuid primary key default uuid_generate_v4(),
--    title text,
--    description text,
--    price integer,
--    image text
--)

--create table stocks (
--    product_id uuid primary key default uuid_generate_v4(),
--    count integer,
--    foreign key ("product_id") references "products" ("id")
--)

--drop table name

--insert into products (description, id, price, title, image) values
--(
--	'Retina Display 13-inch Laptop (Intel Dual Core i5 2.4 GHz, 8 GB RAM, 256 GB HDD, Iris Pro Graphics, OS X) - Silver - 2013 - ME865B/A (Renewed)',
--	'7567ec4b-b10c-48c5-9345-fc73c48a80aa',
--	600,
--	'Apple MacBook Pro',
--	'https://m.media-amazon.com/images/I/41tV1tG4KML._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    '13" 2019 TouchBar - 1.4GHz i5 - 8GB RAM - 128GB SSD (Renewed)',
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
--    1120,
--    'Apple MacBook Pro',
--    'https://m.media-amazon.com/images/I/51FWf+esWHL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    'A1466 (MJVE2LL/A - Early 2015) 13in Core i5 1.6GHz 4GB Ram 128GB SSD Mac OSX Sierra (Renewed)',
--    '7567ec4b-b10c-48c5-9345-fc73c48a8052',
--    575,
--    'Apple MacBook Air',
--    'https://m.media-amazon.com/images/I/613KZUV3+hL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    'Air A1466 (MD760LL/B - Early 2014) 13in Core i5 1.4GHz 4GB Ram 128GB SSD Mac OSX Sierra (Renewed)',
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
--    535,
--    'Apple MacBook Air',
--    'https://m.media-amazon.com/images/I/81vs5TXBrlL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    'MF839ll/A Intel core 5-5257U 2.7GHz 13.3-Inch, 16GB RAM DDR3 256GB SSD (Renewed)',
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a2',
--    942,
--    'Apple MacBook Pro',
--    'https://m.media-amazon.com/images/I/71nM55mRvxL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    'Retina Display MPXQ2LL/A 13in 2.3GHz Intel Core i5 Dual Core, 8GB RAM, 256GB SSD, Space Grey, macOS Mojave 10.14 (Renewed)',
--    '7567ec4b-b10c-48c5-9345-fc73348a80a1',
--    1000,
--    'Apple MacBook Pro',
--    'https://m.media-amazon.com/images/I/61E6RyDahLL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    '13 (Early 2011) - Core i5 2.3 GHz, 4GB RAM, 320GB HDD (Refurbished)',
--    '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
--    495,
--    'Apple MacBook Pro',
--    'https://m.media-amazon.com/images/I/613KZUV3+hL._AC_UY327_FMwebp_QL65_.jpg'
--),
--(
--    'Retina A1502 13.3" LATE 2013 ME864LL/A CORE I5 2.4GHz 8GB Ram 256GB SSD MAC OS MOJAVE (Renewed)',
--    '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
--    674,
--    'APPLE MACBOOK PRO',
--    'https://m.media-amazon.com/images/I/71ipowa4JNL._AC_UY327_FMwebp_QL65_.jpg'
--)

--insert into stocks (product_id, count) values
--(
--	'7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4
--),
--(
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a0', 6
--),
--(
--    '7567ec4b-b10c-48c5-9345-fc73c48a8052', 7
--),
--(
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 12
--),
--(
--    '7567ec4b-b10c-48c5-9345-fc73c48a80a2', 7
--),
--(
--    '7567ec4b-b10c-48c5-9345-fc73348a80a1', 8
--),
--(
--    '7567ec4b-b10c-48c5-9445-fc73c48a80a2', 2
--),
--(
--    '7567ec4b-b10c-45c5-9345-fc73c48a80a1', 3
--)

--create extension if not exists "uuid-ossp" 