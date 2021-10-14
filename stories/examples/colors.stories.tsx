import { useCallback } from '@storybook/addons';
import React, { useMemo } from 'react';

import { Box, Card, Flex, Label, Heading, Text, config } from '../../index';

import { colors } from '../../stitches.config';

export const Colors = () => {
  const getColorFromConst = useCallback(
    (colorName) => {
      if (colorName.startsWith('$')) {
        return getColorFromConst(colorName.replace('$', ''));
      }

      const color = config.theme.colors[colorName];

      if (color && color.startsWith('$')) {
        return getColorFromConst(color);
      }

      return color;
    },
    [config.theme.colors]
  );

  type Color = { token: string; value: string };
  type ColorGroup = { name: string; colors: Color[] };

  const colorGroups: ColorGroup[] = useMemo(
    () =>
      Object.keys(colors).reduce((acc: ColorGroup[], token) => {
        const nbPattern = /\d+/g;

        const value = getColorFromConst(token);

        const nb = token && token.match(nbPattern);

        if (!nb) {
          acc.push({ name: token, colors: [{ token, value }] });
          return acc;
        }

        const colorGroupName = token.replace(`${nb}`, '');
        const colorGroupIdx = acc.findIndex((k) => k.name === colorGroupName);

        if (colorGroupIdx > -1) {
          acc[colorGroupIdx] = {
            name: colorGroupName,
            colors: [...acc[colorGroupIdx].colors, { token, value }],
          };
        } else {
          acc.push({ name: colorGroupName, colors: [{ token, value }] });
        }

        return acc;
      }, []),
    [colors]
  );

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
          <Card css={{ display: 'flex', bc: '$deepBlue1', overflow: 'auto', mb: '$3' }}>
            {colorGroup.colors.map((color) => (
              <Box css={{ textAlign: 'center', p: '$2' }}>
                <Box
                  css={{
                    mb: '$2',
                    bc: color.value,
                    size: 80,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '$colors$gray7',
                  }}
                />
                <Text variant="subtle" css={{ pb: '$1' }}>
                  {color.token}
                </Text>
                <Text variant="subtle" size="0">
                  {color.value}
                </Text>
              </Box>
            ))}
          </Card>
          <Card className="dark" css={{ display: 'flex', bc: '$deepBlue1', overflow: 'auto' }}>
            {colorGroup.colors.map((color) => (
              <Box css={{ textAlign: 'center', p: '$2' }}>
                <Box
                  css={{
                    mb: '$2',
                    bc: `$${color.token}`,
                    size: 80,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '$colors$gray8 ',
                  }}
                />
                <Text variant="subtle" css={{ pb: '$1' }}>
                  {color.token}
                </Text>
                <Text variant="subtle" size="0">
                  {color.value}
                </Text>
              </Box>
            ))}
          </Card>
        </Card>
      ))}
    </Flex>
  );
};

export default {
  title: 'Colors',
  component: Colors,
};
