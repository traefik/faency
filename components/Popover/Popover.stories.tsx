import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  Popover,
  PopoverProps,
  PopoverVariants,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from './Popover';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Flex } from '../Flex';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { Box } from '../Box';

const BasePopover = (props: PopoverProps): JSX.Element => <Popover {...props} />;
const PopoverForStory = modifyVariantsForStory<PopoverVariants, PopoverProps>(BasePopover);

export default {
  title: 'Components/Popover',
  component: PopoverForStory,
} as ComponentMeta<typeof PopoverForStory>;

const Template: ComponentStory<typeof PopoverForStory> = (args) => (
  <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverClose asChild>
          <Button ghost>Close</Button>
        </PopoverClose>
      </PopoverContent>
    </PopoverForStory>
  </Container>
);

export const Basic = Template.bind({});

export const RichContent: ComponentStory<typeof PopoverForStory> = (args) => (
  <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent css={{ p: '$3' }}>
        <Text as="p" css={{ mb: '$2', color: 'currentColor' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iure tenetur velit
          animi magni rerum nulla totam reprehenderit, cum fugit omnis optio dicta molestias dolore
          itaque voluptatibus obcaecati eligendi. Architecto.
        </Text>
        <Flex css={{ justifyContent: 'space-between' }}>
          <Button variant="secondary">Learn more</Button>
          <PopoverClose asChild>
            <Button variant="primary">Close</Button>
          </PopoverClose>
        </Flex>
      </PopoverContent>
    </PopoverForStory>
  </Container>
);

export const IconTrigger: ComponentStory<typeof PopoverForStory> = (args) => (
  <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button size="small">
          <HamburgerMenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent arrowCss={{ fill: '$primary' }} css={{ bc: '$primary', p: '$2' }}>
        <Text css={{ c: '$loContrast' }}>Content</Text>
      </PopoverContent>
    </PopoverForStory>
  </Container>
);

export const RowAnchor: ComponentStory<typeof PopoverForStory> = (args) => (
  <Container>
    <PopoverForStory {...args}>
      <PopoverAnchor asChild>
        <Box css={{ bc: '$orange4', p: '$2', display: 'inline-block' }}>
          Click on
          <PopoverTrigger asChild>
            <Button size="small" css={{ mx: '$2' }}>
              <HamburgerMenuIcon />
            </Button>
          </PopoverTrigger>
          to open the anchor
        </Box>
      </PopoverAnchor>
      <PopoverContent arrowCss={{ fill: '$primary' }} css={{ bc: '$primary', p: '$2' }}>
        <Text css={{ c: '$loContrast' }}>Content</Text>
      </PopoverContent>
    </PopoverForStory>
  </Container>
);
