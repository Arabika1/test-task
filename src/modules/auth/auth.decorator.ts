import { SetMetadata, applyDecorators } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './guards/constants';

export const AuthDisable = () => {
  return applyDecorators(SetMetadata(IS_PUBLIC_KEY, true));
};
