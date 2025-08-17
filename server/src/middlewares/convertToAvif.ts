import type { Core } from '@strapi/strapi';
import { Context, Next } from 'koa';
import sharp, { AvifOptions } from 'sharp';
import { promises as fs } from 'fs';
import { parse, join, dirname } from 'path';
import { Files, File } from 'formidable';
import { minimatch } from 'minimatch';

const DEFAULT_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export default ({ config }, { strapi }: { strapi: Core.Service }) => {
  const IMAGE_TYPES = config('mimeTypes', DEFAULT_IMAGE_TYPES);
  const SHARP_OPTIONS = config('options');
  const IGNORE_FILENAMES = config('ignoreFilenames', []);

  return async (ctx: Context, next: Next) => {
    const isUpload =
      ctx.url === '/upload' &&
      ctx.method === 'POST' &&
      ctx.request.files &&
      ctx.request.body &&
      ctx.request.body.fileInfo;

    if (isUpload) {
      const files = ctx.request.files as Files;

      for (const key in files) {
        const fileOrFiles = files[key];

        if (Array.isArray(fileOrFiles)) {
          for (const file of fileOrFiles) {
            await processFile(file, ctx, IMAGE_TYPES, SHARP_OPTIONS, IGNORE_FILENAMES, strapi);
          }
        } else {
          const file = fileOrFiles as File;
          await processFile(file, ctx, IMAGE_TYPES, SHARP_OPTIONS, IGNORE_FILENAMES, strapi);
        }
      }
    }

    await next();
  };
};

const processFile = async (
  file: File,
  ctx: Context,
  IMAGE_TYPES: string[],
  SHARP_OPTIONS: AvifOptions,
  IGNORE_FILENAMES: string[],
  strapi: Core.Service
) => {
  const filePath = file.filepath;

  const shouldIgnoreFile = IGNORE_FILENAMES.some(pattern => 
    minimatch(file.originalFilename || '', pattern)
  );

  if (shouldIgnoreFile) {
    strapi.log.info(
      `Plugin (strapi-plugin-avif-converter): Image Converter Middleware: Ignoring file ${file.originalFilename} due to ignore pattern`
    );
    return;
  }

  if (IMAGE_TYPES.includes(file.mimetype)) {
    const avifFileName = `${parse(file.originalFilename).name}.avif`;
    const avifFilePath = join(dirname(filePath), avifFileName);
    const fileInfo = JSON.parse(ctx.request.body.fileInfo);
    fileInfo.name = avifFileName;
    ctx.request.body.fileInfo = JSON.stringify(fileInfo);

    try {
      const sharpResult = await sharp(filePath).avif(SHARP_OPTIONS).toFile(avifFilePath);
      await fs.unlink(filePath);

      file.size = sharpResult.size;
      file.filepath = avifFilePath;
      file.originalFilename = avifFileName;
      file.mimetype = 'image/avif';
    } catch (error) {
      strapi.log.error(
        `Plugin (strapi-plugin-avif-converter): Image Converter Middleware: Error converting ${file.originalFilename} to avif:`,
        error
      );
    }
  } else {
    strapi.log.info(
      `Plugin (strapi-plugin-avif-converter): Image Converter Middleware: No convertable image ${file.originalFilename}`
    );
  }
};
