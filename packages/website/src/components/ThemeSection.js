import React from 'react'
import PropTypes from 'prop-types'
import { theme, Heading as FaencyHeading, Box, Text } from '@traefiklabs/faency'

import Divider from './Divider'

const removeUnit = str => str.replace('px', '')

export function ThemeSection() {
  return (
    <>
      <Heading my={4}>Fonts</Heading>
      {Object.entries(theme.fonts).map(([key]) => (
        <Box mb={3} key={key}>
          <SectionTitle>{key}</SectionTitle>
          <Text as="p" size={key === 'mono' ? 7 : 8} mt={2} mb={6} lineHeight={5} fontFamily={key}>
            Voix ambiguë d’un cœur qui, au zéphyr, préfère les jattes de kiwis
          </Text>
        </Box>
      ))}

      <Divider my={5} />

      <Heading my={4}>Font sizes</Heading>
      {Object.entries(theme.fontSizes)
        .reverse()
        .map(([key, value]) => (
          <Box key={key}>
            <Text as="p" size={5} mb={1}>
              <span style={{ fontSize: value }}>Aa</span>
            </Text>
            <SectionTitle>{removeUnit(value)}</SectionTitle>
          </Box>
        ))}

      <Divider my={5} />

      <Heading my={4}>Line heights</Heading>
      {Object.entries(theme.lineHeights).map(([key, value]) => (
        <Text size={8} mr={4} weigth={500} key={key}>
          {removeUnit(value)}
        </Text>
      ))}

      <Divider my={5} />

      <Heading my={4}>Space scale</Heading>
      {Object.entries(theme.space).map(([key, value]) => (
        <Text size={8} mr={4} weigth={500} key={key}>
          {removeUnit(value)}
        </Text>
      ))}

      <Divider my={5} />

      <Heading my={4}>Size scale</Heading>
      {Object.entries(theme.sizes).map(([key, value]) => (
        <Text size={8} mr={4} weigth={500} key={key}>
          {removeUnit(value)}
        </Text>
      ))}

      <Divider my={5} />

      <Heading my={4}>Radii scale</Heading>
      {Object.entries(theme.radii).map(([key, value]) => (
        <Text size={8} mr={4} weigth={500} key={key}>
          {typeof value === 'string' ? removeUnit(value) : value}
        </Text>
      ))}

      <Divider my={5} />

      <Heading my={4}>Colors</Heading>

      <Subheading>Primary</Subheading>

      {Object.entries(theme.colors).map(([key, value]) => {
        return !Array.isArray(value) && <ColorCard color={value} name={key} key={key} />
      })}
    </>
  )
}

const ColorCard = ({ color, name, props }) => (
  <Box {...props}>
    <Box>
      <Box
        sx={{
          width: 50,
          height: 50,
          bg: color,
          borderRadius: 'inherit',
          '& > *': {
            borderRadius: 'inherit',
            boxShadow: '0 0 0 1.25px rgba(0, 0, 0, 0.06) inset',
          },
        }}
      />
      <Box mt={1}>
        <FaencyHeading as="h4" size={0} mt={2} mb={1}>
          <span style={{ textTransform: 'capitalize' }}>{name}</span>
        </FaencyHeading>
        <Text as="p" size={0} textColor="gray700" mb={2}>
          <span style={{ textTransform: 'uppercase' }}>{color.replace(/\(|\)/g, ' ').replace('.', '0.')}</span>
        </Text>
      </Box>
    </Box>
  </Box>
)

ColorCard.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  props: PropTypes.object,
}

const Heading = props => <FaencyHeading as="h2" size={2} mt={8} mb={4} {...props} />

const Subheading = props => <FaencyHeading as="h3" size={1} mt={6} mb={4} {...props} />

const SectionTitle = props => (
  <Text size={2} marginY={0} sx={{ textColor: 'gray700', textTransform: 'capitalize' }} {...props} />
)
