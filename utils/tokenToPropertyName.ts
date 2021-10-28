import { Property } from '@stitches/react/types/css';

type TokenToPropertyName = (token: Property.Color) => string;

export const tokenToPropertyName: TokenToPropertyName = (token) => token.replace('$', '');
