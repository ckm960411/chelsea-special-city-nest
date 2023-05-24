import { IsArray, IsIn } from 'class-validator';

export const VALID_IMAGE_FILE_TYPES = [
  'image/apng',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
] as const;
export type ValidImageFileTypesByTuple = typeof VALID_IMAGE_FILE_TYPES;
export type ValidImageFileTypes = ValidImageFileTypesByTuple[number];

export class CreatePrisignedDto {
  @IsArray()
  @IsIn(VALID_IMAGE_FILE_TYPES, { each: true })
  fileTypes: ValidImageFileTypes[];
}
