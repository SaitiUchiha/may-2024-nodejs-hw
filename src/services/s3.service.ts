import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/configs";
import { FileTypeEnum } from "../enums/file-type.enum";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    file: UploadedFile,
    itemType: FileTypeEnum,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: config.AWS_S3_ACL,
        }),
      );
      return filePath;
    } catch (error) {
      console.error("Error upload: ", error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: filePath,
        }),
      );
    } catch (error) {
      console.error("Error delete file: ", error);
    }
  }

  private buildPath(
    itemType: FileTypeEnum,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only template string
  }
}

export const s3Service = new S3Service();
