export const HEADER_AUTHORIZATION = 'authorization';
export const IS_PUBLIC_KEY = Symbol('IS_PUBLIC');
export const targets = (context) => [context.getHandler(), context.getClass()];
