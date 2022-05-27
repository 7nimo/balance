import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { UnprocessableEntityException } from '@nestjs/common';

import { registerAs } from '@nestjs/config';

const multerConfig = {
  destPath: process.env.MULTER_DEST,
  sizeLimit: process.env.MULTER_LIMIT,
};

export const multerOptions: MulterOptions = {
  limits: { fileSize: +multerConfig.sizeLimit },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.originalname.match(/\.(csv)$/)) {
      cb(null, true);
    } else {
      cb(
        new UnprocessableEntityException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const destPath = multerConfig.destPath;
      if (!existsSync(destPath)) {
        mkdirSync(destPath);
      }
      cb(null, destPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export default registerAs('multer', () => ({
  ...multerOptions,
}));
