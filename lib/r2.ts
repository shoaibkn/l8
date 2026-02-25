import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || "l8";
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

export async function uploadImage(file: Buffer, fileName: string, contentType: string) {
  const uniqueFileName = `${Date.now()}-${fileName}`;
  
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: uniqueFileName,
      Body: file,
      ContentType: contentType,
    },
  });

  await upload.done();

  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${uniqueFileName}`;
  }
  
  return `https://${BUCKET_NAME}.${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${uniqueFileName}`;
}

export async function deleteImage(fileUrl: string) {
  const fileName = fileUrl.split("/").pop();
  if (!fileName) return;

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  });

  await s3Client.send(command);
}
