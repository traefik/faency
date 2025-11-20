import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Paragraph } from '../Paragraph';
import { Container } from './Container';
import { ContainerVanilla } from './Container.vanilla';

type ContainerVariants = VariantProps<typeof Container>;
type ContainerProps = ContainerVariants & NonNullable<unknown>;

const BaseContainer = (props: ContainerProps): JSX.Element => <Container {...props} />;
const ContainerForStory = modifyVariantsForStory<
  ContainerVariants,
  ContainerProps & React.HTMLAttributes<any>
>(BaseContainer);

const Component: Meta<typeof ContainerForStory> = {
  title: 'Components/Container',
  component: ContainerForStory,
};

const Template: StoryFn<typeof ContainerForStory> = (args) => (
  <Container {...args} css={{ bc: '$deepBlue3' }}>
    <Paragraph>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, iste. Perferendis saepe aperiam
      repudiandae, a ea labore error iure! Doloribus sunt earum, aperiam facilis ex corporis veniam
      deleniti voluptatibus laudantium? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis consequatur harum quibusdam! Facilis aspernatur est fugiat laudantium officiis. Aut
      labore asperiores qui iure earum culpa, voluptatum explicabo commodi quis dolorem? Lorem ipsum
      dolor sit, amet consectetur adipisicing elit. Dolore dolorum deserunt, consectetur numquam
      minus error dolorem? Explicabo iure quidem, maxime fugit quos obcaecati, molestiae nemo nobis
      aliquid saepe, impedit at.
    </Paragraph>
  </Container>
);

export const Basic: StoryFn<typeof ContainerForStory> = Template.bind({});

Basic.args = {};

export const Size: StoryFn<typeof ContainerForStory> = Template.bind({});

Size.args = { size: '1' };

export const NoGutter: StoryFn<typeof ContainerForStory> = Template.bind({});

NoGutter.args = { noGutter: true };

export const Comparison: StoryFn = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Original Stitches Version</h3>
      <Template {...args} />
    </div>

    <div>
      <h3>Vanilla-Extract Version (Same API)</h3>
      <ContainerVanilla {...args} css={{ bc: '$deepBlue3' }}>
        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, iste. Perferendis saepe
          aperiam repudiandae, a ea labore error iure! Doloribus sunt earum, aperiam facilis ex
          corporis veniam deleniti voluptatibus laudantium? Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Reiciendis consequatur harum quibusdam! Facilis aspernatur est fugiat
          laudantium officiis. Aut labore asperiores qui iure earum culpa, voluptatum explicabo
          commodi quis dolorem? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          dolorum deserunt, consectetur numquam minus error dolorem? Explicabo iure quidem, maxime
          fugit quos obcaecati, molestiae nemo nobis aliquid saepe, impedit at.
        </Paragraph>
      </ContainerVanilla>
    </div>
  </div>
);

Comparison.args = { noGutter: false, size: '1' };

export default Component;
