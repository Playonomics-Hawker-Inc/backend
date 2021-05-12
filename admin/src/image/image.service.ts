import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
  Dependencies,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as path from 'path';
import * as multerS3 from 'multer-s3';
import { Experience } from '../experience/types/experience';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
});

function checkFileType(file: any, cb: any) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Experience') private experienceModel: Model<Experience>,
  ) {}

  s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  });

  async uploadDisplayImage(@Req() req, @Res() res) {
    try {
      this.upload(req, res, async (error: any) => {
        if (error) {
          console.log('errors', error);
          res.json({ error: error });
        } else {
          console.log('Success');
          // If File not found
          if (req.file === undefined) {
            console.log('Error: No File Selected!');
            res.json('Error: No File Selected');
          } else {
            const slug = req.body.slug;
            const tag = req.body.tag;
            const indexProduct = req.body.indexProduct ? true : false;
            const image = `${process.env.CLOUD_FRONT_URL}/${req.file.key}`;

            // Find the product and update images
            const saved = await this.experienceModel.findOneAndUpdate(
              { slug: slug.toString() },
              {
                $push: { images: { url: image, type: tag.toString() } },
              },
            );
            // if (indexProduct) {
            //   const productToIndex = await this.productModel.findById(
            //     saved._id,
            //   );
            //   await this.searchService.indexProduct(productToIndex);
            // }

            return res.status(201).json({
              success: true,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'playonomics',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',

      key: function (req, file, cb) {
        const newFileName =
          path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname);
        const fullPath = `experiences/${newFileName}`;
        cb(
          null,

          fullPath,
        );
      },
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('file');
}
