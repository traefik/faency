import React from 'react';
import { Property } from '@stitches/react/types/css';
import { useDarkMode } from 'storybook-dark-mode';
import { Box, Flex, Heading, Text } from '../index';
import { colors } from '../stitches.config';

type Color = { token: string };
type ColorGroup = { name: string; colors: Color[]; alphaColors: Color[] };

const aliases = {
  dp: 'Elevations',
};

const colorGroups = (Object.keys(colors) as string[]).reduce<ColorGroup[]>(
  (acc: ColorGroup[], token: Property.Color) => {
    const nbPattern = /\d+/g;

    const nb = token && token.match(nbPattern);

    if (!nb) {
      return [...acc, { name: token, colors: [{ token }] }] as ColorGroup[];
    }

    const colorName = token.replace(`${nb}`, '');
    const isAlpha = colorName.endsWith('A');
    const colorGroupName = isAlpha ? colorName.replace('A', '') : colorName;
    const colorGroupIdx = acc.findIndex((k) => k.name === colorGroupName);

    if (colorGroupIdx > -1) {
      if (isAlpha) {
        acc[colorGroupIdx] = {
          ...acc[colorGroupIdx],
          name: colorGroupName,
          alphaColors: [...acc[colorGroupIdx].alphaColors, { token }],
        };
      } else {
        acc[colorGroupIdx] = {
          ...acc[colorGroupIdx],
          name: colorGroupName,
          colors: [...acc[colorGroupIdx].colors, { token }],
        };
      }

      return acc;
    }

    if (isAlpha) {
      return [...acc, { name: colorGroupName, colors: [], alphaColors: [{ token }] } as ColorGroup];
    }

    return [...acc, { name: colorGroupName, colors: [{ token }], alphaColors: [] } as ColorGroup];
  },
  []
);

export const Colors = () => {
  useDarkMode(); // force re-render on theme change

  return (
    <Flex css={{ flexDirection: 'column' }}>
      <Heading size="4" css={{ mb: '$6' }}>
        Colors
      </Heading>

      {colorGroups.map((colorGroup) => (
        <Box key={colorGroup.name} css={{ mb: '$3' }}>
          <Heading size="3" css={{ mb: '$2', '&:first-letter': { textTransform: 'uppercase' } }}>
            {aliases[colorGroup.name] || colorGroup.name}
          </Heading>
          {['colors', 'alphaColors'].map((type) => (
            <>
              {!!colorGroup?.[type]?.length && (
                <Flex key={type} css={{ bc: '$contentBg', mb: '$3', gap: '$3' }}>
                  {colorGroup[type].map((color) => (
                    <Flex
                      key={color.token}
                      css={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: 80,
                      }}
                    >
                      <Box css={{ bc: `$${colorGroup.name}1`, mb: '$2' }}>
                        <Box
                          css={{
                            size: 80,
                            bc: `$${color.token}`,
                          }}
                        />
                      </Box>
                      <Text variant="subtle" css={{ pb: '$1', textAlign: 'center' }}>
                        {color.token}
                      </Text>
                      <Text variant="subtle" size="0" css={{ textAlign: 'center' }}>
                        {window
                          .getComputedStyle(document.body)
                          .getPropertyValue(`--colors-${color.token}`)}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              )}
            </>
          ))}
        </Box>
      ))}
    </Flex>
  );
};

export default {
  title: 'Colors',
  component: Colors,
};
