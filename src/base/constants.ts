import { resolve } from 'path';

export const IS_TEST = process.env.NODE_ENV === 'test';
export const PERMISSION_METADATA_TAG = 'permission';
export const IS_AUTH_OPTIONAL = 'isAuthOptional';
export const KAFKA_CLIENT_SERVICE = 'KAFKA_CLIENT_SERVICE';
export const BUCKET = process.env.MINIO_BUCKET;
export const HASH_DIGITS_COUNT = 8;
export const TEMP_PATH = resolve('./temp');
export const BEHPARDAKHT_CLIENT = 'BEHPARDAKHT_CLIENT';
export const PERCENT_OF_RESERVE = 5;
export const DATE_REGEX = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}.\d{3}[Z]$/;
