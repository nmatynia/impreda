import aws from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import url from 'url';
import { TRPCError } from '@trpc/server';
import type { SexType, SizeNameType } from '../src/types/types';
import { colorOptions } from '../src/utils/constants';

const categoryList: string[] = [
  'Dresses',
  'Tops',
  'Bottoms',
  'Shoes',
  'Accessories',
  'Jackets',
  'Sweaters',
  'Suits',
  'Coats',
  'Sweatshirts',
  'T-Shirts',
  'Bags',
  'Denim'
];

type Item = {
  name: string;
  brand: string;
  sex: SexType;
  price: number;
  fabrics: string;
  category: string;
  sizes: SizeNameType[];
  colors: string[];
  imagePath: string;
};

const items: Item[] = [
  {
    name: 'DRKSHDW Dress',
    brand: 'Rick Owens',
    sex: 'FEMALE',
    price: 4500,
    fabrics: 'cotton',
    category: 'Dresses',
    sizes: ['XS', 'S'],
    colors: ['black', 'orange'],
    imagePath:
      'file:///C:/Users/Norbert/Desktop/uni_stuff/Dev_Project/impreda/public/images/default-dress.jpg'
  },
  {
    name: 'DRKSHDW T-Shirt',
    brand: 'Rick Owens',
    sex: 'UNISEX',
    price: 500,
    fabrics: 'cotton',
    category: 'T-Shirts',
    sizes: ['M', 'L'],
    colors: ['black', 'white'],
    imagePath:
      'file:///C:/Users/Norbert/Desktop/uni_stuff/Dev_Project/impreda/public/images/default-rick-tee.webp'
  }
];

const prisma = new PrismaClient();
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
  signatureVersion: 'v4'
});

if (!process.env.AWS_S3_BUCKET_NAME) {
  // eslint-disable-next-line no-console
  console.log('AWS_S3_BUCKET_NAME is not defined ❌');
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'AWS_S3_BUCKET_NAME is not defined'
  });
}

const seed = async () => {
  await seedCategory();
  await seedItems();
  // eslint-disable-next-line no-console
  console.log('Seeding is done ✅');
};

const seedCategory = async () => {
  await prisma.category.createMany({
    data: categoryList.map(name => ({ name })),
    skipDuplicates: true
  });
};

const seedItems = async () => {
  const createItem = async (item: Item) => {
    const createdItem = await prisma.item.create({
      data: {
        name: item.name,
        brand: item.brand,
        sex: item.sex,
        price: item.price,
        fabrics: item.fabrics,
        category: {
          connect: {
            name: item.category
          }
        }
      }
    });

    const image = await prisma.image.create({
      data: {
        filename: 'seeded.jpg',
        itemId: createdItem?.id
      }
    });
    const imagePath = url.fileURLToPath(item.imagePath);
    const imageBuffer = fs.readFileSync(imagePath);
    const key = `${createdItem.id}/${image.id}`;
    await s3
      .putObject({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: imageBuffer,
        ContentType: 'image/jpeg'
      })
      .promise();

    await prisma.image.update({
      where: { id: image.id },
      data: {
        url: `https://impreda-bucket.s3.eu-west-2.amazonaws.com/${key}`
      }
    });

    await Promise.all(
      item.sizes.map(async sizeName => {
        const size = await prisma.size.create({
          data: {
            name: sizeName,
            available: 10,
            items: {
              connect: {
                id: createdItem?.id
              }
            }
          }
        });
        await Promise.all(
          item.colors.map(async colorName => {
            const color = colorOptions.find(color => color.key === colorName);
            if (!color) return;
            await prisma.color.create({
              data: {
                name: color.name,
                hex: color.hex,
                available: 5,
                sizes: {
                  connect: {
                    id: size?.id
                  }
                },
                items: {
                  connect: {
                    id: createdItem?.id
                  }
                }
              }
            });
          })
        );
        return Promise.resolve();
      })
    );
  };
  await Promise.all(items.map(item => createItem(item)));
};

seed();
