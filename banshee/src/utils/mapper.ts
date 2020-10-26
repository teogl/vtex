import { Class } from '@addapptables/microservice';
import { plainToClass, ClassTransformOptions } from 'class-transformer';

export function mapper<T, V>(cls: Class<T>, plain: V[], options?: ClassTransformOptions): T[];
export function mapper<T, V>(cls: Class<T>, plain: V, options?: ClassTransformOptions): T;
export function mapper<T, V>(cls: Class<T>, plain: V | V[], options: ClassTransformOptions = { excludeExtraneousValues: true }): T {
  return plainToClass(cls, plain, options);
}

export const mapperCurry = (cls: Class) => (plain) => {
  return Array.isArray(plain)
      ? (plain).map(item => mapper(cls, item))
      : mapper(cls, plain);
}
  