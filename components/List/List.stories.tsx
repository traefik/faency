import { InfoCircledIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Avatar, AvatarVanilla } from '../Avatar';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Button, ButtonVanilla } from '../Button';
import { Checkbox } from '../Checkbox';
import { Flex, FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Text, TextVanilla } from '../Text';
import { Li, Ol, Ul } from './List';
import { LiVanilla, OlVanilla, UlVanilla } from './List.vanilla';

const Component: Meta<typeof Ul> = {
  title: 'Components/List',
  component: Ul,
};

const Template: StoryFn<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li>Dashboard</Li>
    <Li>
      Profile
      <Ul>
        <Li>Account</Li>
        <Li>
          Security
          <Ul>
            <Li>Two-factor auth</Li>
            <Li>Sessions</Li>
          </Ul>
        </Li>
        <Li>Notifications</Li>
      </Ul>
    </Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>
);

export const Basic: StoryFn<typeof Ul> = Template.bind({});

export const Checkboxes: StoryFn<typeof Ul> = (args) => (
  <Ul {...args}>
    <Li>
      <input type="checkbox" aria-label="Dashboard" />
      Dashboard
    </Li>
    <Li>
      <input type="checkbox" aria-label="Profile" />
      Profile
      <Ul>
        <Li>
          <input type="checkbox" aria-label="Account" />
          Account
        </Li>
        <Li>
          <input type="checkbox" aria-label="Security" />
          Security
          <Ul>
            <Li>
              <input type="checkbox" aria-label="Two-factor auth" />
              Two-factor auth
            </Li>
            <Li>
              <input type="checkbox" aria-label="Sessions" />
              Sessions
            </Li>
          </Ul>
        </Li>
        <Li>
          <input type="checkbox" aria-label="Notifications" />
          Notifications
        </Li>
      </Ul>
    </Li>
    <Li>
      <input type="checkbox" aria-label="Settings" />
      Settings
    </Li>
    <Li>
      <input type="checkbox" aria-label="Help" />
      Help
    </Li>
  </Ul>
);

export const Ordered: StoryFn<typeof Ol> = (args) => (
  <Ol {...args}>
    <Li>Dashboard</Li>
    <Li>
      Profile
      <Ol>
        <Li>Account</Li>
        <Li>
          Security
          <Ol>
            <Li>Two-factor auth</Li>
            <Li>Sessions</Li>
          </Ol>
        </Li>
        <Li>Notifications</Li>
      </Ol>
    </Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ol>
);

export const Interactive: StoryFn<typeof Ul> = Template.bind({});
Interactive.args = {
  interactive: true,
};

export const Users: StoryFn<typeof Ul> = (args) => (
  <Ul css={{ listStyleType: 'none' }} {...args}>
    <Li gap="3">
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>
);
Users.args = {
  interactive: true,
};

export const Controls: StoryFn<typeof Ul> = (args) => (
  <Ul css={{ listStyleType: 'none' }} {...args}>
    <Li gap="3" controls={<Checkbox aria-label="Select John Doe" />}>
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<Button variant="red">Delete</Button>}>
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<InfoCircledIcon role="img" aria-label="Info" />}>
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>
);
Controls.args = {
  interactive: true,
};

const users = [
  { id: '100', name: 'John Doe', email: 'john.doe@john.doe' },
  { id: '42', name: 'Jane Doe', email: 'jane.doe@jane.doe' },
  { id: '67', name: 'Doe Jane', email: 'doe.jane@doe.jane' },
];

const ComparisonSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <BoxVanilla>
    <TextVanilla size="1" variant="subtle">
      {title}
    </TextVanilla>
    {children}
  </BoxVanilla>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla gap={6}>
    <BoxVanilla css={{ flex: 1 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla direction="column" gap={4}>
        <ComparisonSection title="Nested">
          <Ul>
            <Li>Dashboard</Li>
            <Li>
              Profile
              <Ul>
                <Li>Account</Li>
                <Li>Security</Li>
              </Ul>
            </Li>
          </Ul>
        </ComparisonSection>
        <ComparisonSection title="Ordered">
          <Ol>
            <Li>Dashboard</Li>
            <Li>
              Profile
              <Ol>
                <Li>Account</Li>
                <Li>Security</Li>
              </Ol>
            </Li>
          </Ol>
        </ComparisonSection>
        <ComparisonSection title="Checkboxes">
          <Ul>
            <Li>
              <input type="checkbox" aria-label="Dashboard" />
              Dashboard
            </Li>
            <Li>
              <input type="checkbox" aria-label="Profile" />
              Profile
              <Ul>
                <Li>
                  <input type="checkbox" aria-label="Account" />
                  Account
                </Li>
              </Ul>
            </Li>
          </Ul>
        </ComparisonSection>
        <ComparisonSection title="Interactive">
          <Ul interactive>
            <Li>Dashboard</Li>
            <Li>
              Profile
              <Ul>
                <Li>Account</Li>
              </Ul>
            </Li>
          </Ul>
        </ComparisonSection>
        <ComparisonSection title="Interactive with controls and elevation">
          <Ul interactive css={{ listStyleType: 'none' }}>
            {users.map(({ id, name, email }, index) => (
              <Li
                key={id}
                gap="3"
                elevation={index === 0 ? '1' : '0'}
                controls={
                  index === 1 ? (
                    <Button variant="red">Delete</Button>
                  ) : (
                    <InfoCircledIcon role="img" aria-label="Info" />
                  )
                }
              >
                <Avatar id={id} src={`https://picsum.photos/${id}`} />
                <Flex align="start" direction="column">
                  <Text size="3">{name}</Text>
                  <Text size="1">{email}</Text>
                </Flex>
              </Li>
            ))}
          </Ul>
        </ComparisonSection>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla css={{ flex: 1 }}>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla direction="column" gap={4}>
        <ComparisonSection title="Nested">
          <UlVanilla>
            <LiVanilla>Dashboard</LiVanilla>
            <LiVanilla>
              Profile
              <UlVanilla>
                <LiVanilla>Account</LiVanilla>
                <LiVanilla>Security</LiVanilla>
              </UlVanilla>
            </LiVanilla>
          </UlVanilla>
        </ComparisonSection>
        <ComparisonSection title="Ordered">
          <OlVanilla>
            <LiVanilla>Dashboard</LiVanilla>
            <LiVanilla>
              Profile
              <OlVanilla>
                <LiVanilla>Account</LiVanilla>
                <LiVanilla>Security</LiVanilla>
              </OlVanilla>
            </LiVanilla>
          </OlVanilla>
        </ComparisonSection>
        <ComparisonSection title="Checkboxes">
          <UlVanilla>
            <LiVanilla>
              <input type="checkbox" aria-label="Dashboard" />
              Dashboard
            </LiVanilla>
            <LiVanilla>
              <input type="checkbox" aria-label="Profile" />
              Profile
              <UlVanilla>
                <LiVanilla>
                  <input type="checkbox" aria-label="Account" />
                  Account
                </LiVanilla>
              </UlVanilla>
            </LiVanilla>
          </UlVanilla>
        </ComparisonSection>
        <ComparisonSection title="Interactive">
          <UlVanilla interactive>
            <LiVanilla>Dashboard</LiVanilla>
            <LiVanilla>
              Profile
              <UlVanilla>
                <LiVanilla>Account</LiVanilla>
              </UlVanilla>
            </LiVanilla>
          </UlVanilla>
        </ComparisonSection>
        <ComparisonSection title="Interactive with controls and elevation">
          <UlVanilla interactive css={{ listStyleType: 'none' }}>
            {users.map(({ id, name, email }, index) => (
              <LiVanilla
                key={id}
                gap={3}
                elevation={index === 0 ? 1 : 0}
                controls={
                  index === 1 ? (
                    <ButtonVanilla variant="red">Delete</ButtonVanilla>
                  ) : (
                    <InfoCircledIcon role="img" aria-label="Info" />
                  )
                }
              >
                <AvatarVanilla src={`https://picsum.photos/${id}`} />
                <FlexVanilla align="start" direction="column">
                  <TextVanilla size="3">{name}</TextVanilla>
                  <TextVanilla size="1">{email}</TextVanilla>
                </FlexVanilla>
              </LiVanilla>
            ))}
          </UlVanilla>
        </ComparisonSection>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
