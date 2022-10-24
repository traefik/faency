import { ComponentMeta, ComponentStory } from '@storybook/react';
import { H2 } from '../Heading';
import { Text } from '../Text';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: TabsContainer,
} as ComponentMeta<typeof TabsContainer>;

export const Basic: ComponentStory<any> = (args) => {
  return (
    <TabsContainer defaultValue="tab1">
      <TabsList aria-label="Tabs Group">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <H2 css={{ my: '$3' }}>Tab 1 Content</H2>
        <Text css={{ lineHeight: '24px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis leo quis risus
          sodales tempor. Proin ut arcu lacus. Morbi ut lectus ipsum. Proin dictum turpis a turpis
          elementum ultrices. Morbi non magna vel dui accumsan feugiat. Nulla dapibus vestibulum
          dapibus. Praesent mauris ligula, pulvinar et nibh scelerisque, viverra venenatis massa.
          Fusce dolor nunc, auctor eget mollis sit amet, viverra ut tortor. Proin rutrum a dui non
          ullamcorper. Quisque mauris risus, consequat eu velit eget, dapibus pulvinar neque. Aenean
          lacinia porttitor felis nec pretium. Aenean iaculis erat turpis, a accumsan libero
          elementum eu. Cras turpis lorem, rutrum viverra mauris vel, dapibus viverra nulla. Nunc
          eget egestas quam, eu tristique turpis. Ut ipsum urna, ornare a ante scelerisque, lobortis
          sollicitudin est. Quisque sit amet sagittis ipsum. Sed id lacus quis tortor consequat
          auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras at urna quis
          eros venenatis cursus. Etiam dui velit, varius eget luctus vel, hendrerit a massa. Fusce
          quis eros nulla. Nam ac dui lacus.
        </Text>
      </TabsContent>

      <TabsContent value="tab2">
        <H2 css={{ my: '$3' }}>Tab 2 Content</H2>
        <Text css={{ lineHeight: '24px' }}>
          Donec quis tincidunt erat, sit amet ullamcorper purus. Sed placerat nec odio ac hendrerit.
          Nam egestas fringilla consectetur. Nullam tincidunt nec magna vitae suscipit. Nunc
          consequat, felis quis rhoncus cursus, nunc lectus interdum leo, ut malesuada ex nisl at
          ligula. Maecenas eros nisi, convallis id arcu et, tempus pellentesque dui. Cras ligula
          lacus, dictum a tincidunt eget, rutrum et purus. Curabitur venenatis, dolor sed vestibulum
          sodales, sem metus dapibus elit, ac laoreet lacus mauris ac massa. Phasellus venenatis, mi
          a laoreet malesuada, lacus mi lacinia tortor, vitae sollicitudin nisl eros eget neque.
          Pellentesque dui purus, scelerisque sed tortor in, sagittis maximus turpis. Donec eget
          dictum enim, feugiat maximus diam. Curabitur quis ipsum feugiat dolor mollis varius.
          Pellentesque tempus lobortis pulvinar. Proin pharetra metus mattis neque scelerisque,
          vitae mollis mauris auctor. Etiam tempor arcu eget mauris eleifend, elementum efficitur
          eros malesuada. Fusce non purus sem. Maecenas fermentum justo erat, sit amet varius tellus
          venenatis sit amet. In placerat enim sit amet arcu pulvinar imperdiet. Aliquam ut pretium
          nibh. Quisque et arcu ac diam porta lacinia.
        </Text>
      </TabsContent>

      <TabsContent value="tab3">
        <H2 css={{ my: '$3' }}>Tab 3 Content</H2>
        <Text css={{ lineHeight: '24px' }}>
          Phasellus nec posuere libero, quis rutrum metus. Morbi nibh lectus, molestie eget
          ultricies eu, sodales eu elit. Praesent scelerisque lacus eros, nec sodales justo varius
          at. Nunc fringilla nibh id commodo dapibus. Praesent leo odio, iaculis quis purus ut,
          laoreet euismod est. Cras finibus, lorem a fermentum sodales, lorem erat scelerisque
          libero, et venenatis nulla mauris venenatis sem. Etiam ut dolor et diam ultrices
          scelerisque. Curabitur tempus nulla a congue fermentum. Nullam vitae sagittis velit. Nunc
          in pretium augue, ac efficitur nibh. Nunc non mollis ante, sed maximus nulla. Nam viverra
          dui a dolor lacinia porta sed nec mi.
        </Text>
      </TabsContent>
    </TabsContainer>
  );
};
