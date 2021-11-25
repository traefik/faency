import React from 'react';
import { IdProvider } from '@radix-ui/react-id';
import { customColors, globalCss, PrimaryColor } from '../stitches.config';

import RubikLightWoff2 from '../assets/fonts/rubik/Rubik-Light.woff2';
import RubikWoff2 from '../assets/fonts/rubik/Rubik-Regular.woff2';
import RubikMediumWoff2 from '../assets/fonts/rubik/Rubik-Medium.woff2';
import RubikSemiBoldWoff2 from '../assets/fonts/rubik/Rubik-SemiBold.woff2';
import RubikBoldWoff2 from '../assets/fonts/rubik/Rubik-Bold.woff2';

import RubikLightItalicWoff2 from '../assets/fonts/rubik/Rubik-LightItalic.woff2';
import RubikItalicWoff2 from '../assets/fonts/rubik/Rubik-Italic.woff2';
import RubikMediumItalicWoff2 from '../assets/fonts/rubik/Rubik-MediumItalic.woff2';
import RubikSemiBoldItalicWoff2 from '../assets/fonts/rubik/Rubik-SemiBoldItalic.woff2';
import RubikBoldItalicWoff2 from '../assets/fonts/rubik/Rubik-BoldItalic.woff2';

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Rubik',
      fontWeight: 300,
      fontDisplay: 'swap',
      src: `local('Rubik-Light'), url(${RubikLightWoff2} format('woff2'))`,
    },
    {
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `local('Rubik-Regular'), url(${RubikWoff2}) format('woff2')`,
    },
    {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontDisplay: 'swap',
      src: `local('Rubik-Medium'), url(${RubikMediumWoff2}) format('woff2')`
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
    //italic
    {
      fontFamily: 'Rubik',
      fontStyle: 'italic',
      fontWeight: 300,
      fontDisplay: 'swap',
      src: `local('Rubik-Light'), url(${RubikLightItalicWoff2} format('woff2'))`,
    },
    {
      fontFamily: 'Rubik',
      fontStyle: 'italic',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `local('Rubik-Regular'), url(${RubikItalicWoff2}) format('woff2')`,
    },
    {
      fontFamily: 'Rubik',
      fontStyle: 'italic',
      fontWeight: 500,
      fontDisplay: 'swap',
      src: `local('Rubik-Medium'), url(${RubikMediumItalicWoff2}) format('woff2')`
    },
    {
      fontFamily: 'Rubik',
      fontStyle: 'italic',
      fontWeight: 600,
      fontDisplay: 'swap',
      src: `local('Rubik-SemiBold'), url(${RubikSemiBoldItalicWoff2}) format('woff2')`,
    },
    {
      fontFamily: 'Rubik',
      fontStyle: 'italic',
      fontWeight: 700,
      fontDisplay: 'swap',
      src: `local('Rubik-Bold'), url(${RubikBoldItalicWoff2}) format('woff2')`,
    },
  ],
});

export const FaencyProvider: React.FC<{ primaryColor: PrimaryColor }> = ({
  children,
  primaryColor,
}) => {
  React.useEffect(() => {
    const { dark, light } = customColors(primaryColor);
    dark.toString();
    light.toString();
  }, [primaryColor]);

  return (
    <IdProvider>
      <>
        {globalStyles()}
        {children}
      </>
    </IdProvider>
  );
};
