import { TransformFnParams } from 'class-transformer';

export function toLocaleTime({ value }: TransformFnParams) {
  return new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000);
}
