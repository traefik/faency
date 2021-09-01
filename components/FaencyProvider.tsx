import React, { createContext, useContext, useState } from 'react';
import { IdProvider } from '@radix-ui/react-id';
import { customColors, globalCss } from '../index';

import RubikWoff2 from '../assets/fonts/Rubik-Regular.woff2';
import RubikSemiBoldWoff2 from '../assets/fonts/Rubik-SemiBold.woff2';
import RubikBoldWoff2 from '../assets/fonts/Rubik-Bold.woff2';

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `local('Rubik-Regular'), url(${RubikWoff2}) format('woff2')`,
    },
    {
      fontFamily: 'Rubik',
      fontWeight: 600,
      fontDisplay: 'swap',
      src: `local('Rubik-SemiBold'), url(${RubikSemiBoldWoff2}) format('woff2')`,
    },
    {
      fontFamily: 'Rubik',
      fontWeight: 700,
      fontDisplay: 'swap',
      src: `local('Rubik-Bold'), url(${RubikBoldWoff2}) format('woff2')`,
    },
  ],
});

export const FaencyProvider: React.FC<{ primaryColor: string }> = ({ children, primaryColor }) => {
  React.useEffect(() => {
    const { dark, light } = customColors(primaryColor);
    dark.toString();
    light.toString();
  }, [primaryColor]);

  return (
    <IdProvider>
      <>
        {globalStyles}
        {children}
      </>
    </IdProvider>
  );
};
