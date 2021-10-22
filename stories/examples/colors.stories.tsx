import React from 'react';
import { Property } from '@stitches/react/types/css';
import { Box, Card, Flex, Heading, Text, config } from '../../index';
import { colors } from '../../stitches.config';

type Color = { token: string; value: Property.Color };
type ColorGroup = { name: string; colors: Color[]; alphaColors: Color[] };

const getColorFromConst = (colorName) => {
  if (colorName.startsWith('$')) {
    return getColorFromConst(colorName.replace('$', ''));
  }

  const color = config.theme.colors[colorName];

  if (color && color.startsWith('$')) {
    return getColorFromConst(color);
  }

  return color;
};

const colorGroups = (Object.keys(colors) as string[]).reduce<ColorGroup[]>(
  (acc: ColorGroup[], token: Property.Color) => {
    const nbPattern = /\d+/g;

    const value = getColorFromConst(token);

    const nb = token && token.match(nbPattern);

    if (!nb) {
      return [...acc, { name: token, colors: [{ token, value }] }] as ColorGroup[];
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
          alphaColors: [...acc[colorGroupIdx].alphaColors, { token, value }],
        };
      } else {
        acc[colorGroupIdx] = {
          ...acc[colorGroupIdx],
          name: colorGroupName,
          colors: [...acc[colorGroupIdx].colors, { token, value }],
        };
      }

      return acc;
    }

    if (isAlpha) {
      return [
        ...acc,
        { name: colorGroupName, colors: [], alphaColors: [{ token, value }] } as ColorGroup,
      ];
    }

    return [
      ...acc,
      { name: colorGroupName, colors: [{ token, value }], alphaColors: [] } as ColorGroup,
    ];
  },
  []
);

export const Colors = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <Heading size="4" css={{ mb: '$6' }}>
        Colors
      </Heading>

      {colorGroups.map((colorGroup) => (
        <Card key={colorGroup.name} css={{ mb: '$3' }}>
          <Heading size="3" css={{ mb: '$2' }}>
            {colorGroup.name}
          </Heading>
          {['colors', 'alphaColors'].map((type) => (
            <>
              {!!colorGroup?.[type]?.length && (
                <Card css={{ display: 'flex', bc: '$deepBlue1', overflow: 'auto', mb: '$3' }}>
                  {colorGroup[type].map((color) => (
                    <Flex
                      css={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: '$2',
                      }}
                    >
                      <Box
                        css={{
                          mb: '$2',
                          bc: `$${color.token}`,
                          size: 80,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: '$colors$gray7',
                        }}
                      />
                      <Text variant="subtle" css={{ pb: '$1', textAlign: 'center' }}>
                        {color.token}
                      </Text>
                      <Text variant="subtle" size="0" css={{ textAlign: 'center' }}>
                        {color.value}
                      </Text>
                    </Flex>
                  ))}
                </Card>
              )}
            </>
          ))}
        </Card>
      ))}
    </Flex>
  );
};

export default {
  title: 'Colors',
  component: Colors,
};
