// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Badge, BadgeVanilla } from '../Badge';
import { BoxVanilla } from '../Box';
import { Button } from '../Button';
import { Flex, FlexVanilla } from '../Flex';
import { H3Vanilla } from '../Heading';
import { Image } from '../Image';
import { Link } from '../Link';
import { RowLink } from '../RowLink';
import { Text } from '../Text';
import { TextVanilla } from '../Text/Text.vanilla';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  AriaTableProps,
  AriaTableVariants,
  Caption,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from './AriaTable';
import {
  AriaCaptionVanilla,
  AriaTableVanilla,
  AriaTbodyVanilla,
  AriaTdVanilla,
  AriaTfootVanilla,
  AriaTheadVanilla,
  AriaThVanilla,
  AriaTrVanilla,
} from './AriaTable.vanilla';

const BaseTable = (props: AriaTableProps): JSX.Element => <Table {...props} />;
const TableForStory = modifyVariantsForStory<AriaTableVariants, AriaTableProps>(BaseTable);

const Component: Meta<typeof TableForStory> = {
  title: 'Components/AriaTable',
  component: TableForStory,
};

export const Basic: StoryFn<any> = ({ transform, ...args }) => (
  <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
    <Caption id="basic-table-caption" size="10">
      People with some information
    </Caption>
    <Thead>
      <Tr>
        <Th transform={transform}>first name</Th>
        <Th transform={transform}>last name</Th>
        <Th transform={transform}>Status</Th>
        <Th transform={transform}>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>John</Td>
        <Td>Doe</Td>
        <Td>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td>Developer</Td>
      </Tr>
      <Tr>
        <Td>Johny</Td>
        <Td>Depp</Td>
        <Td>
          <Badge variant="orange">AFK</Badge>
        </Td>
        <Td>Actor</Td>
      </Tr>
      <Tr>
        <Td>Natalie</Td>
        <Td>Portman</Td>
        <Td>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td>Actor</Td>
      </Tr>
      <Tr>
        <Td>Luke</Td>
        <Td>Skywalker</Td>
        <Td>
          <Badge variant="red">Disconnected</Badge>
        </Td>
        <Td>Star wars</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
          <Button
            ghost
            variant="secondary"
            css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
          >
            Load more...
          </Button>
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>
);

Basic.args = {
  transform: 'capitalize',
};
Basic.argTypes = {
  transform: {
    control: 'inline-radio',
    options: ['capitalize', 'capitalizeWords', 'uppercase', 'none'],
    mapping: {
      capitalize: 'capitalize',
      capitalizeWords: 'capitalizeWords',
      uppercase: 'uppercase',
      none: '',
    },
  },
};

export const Alignment: StoryFn<any> = (args) => (
  <TableForStory>
    <Thead>
      <Tr>
        <Th {...args}>Firstname</Th>
        <Th {...args}>Lastname</Th>
        <Th {...args}>Status</Th>
        <Th {...args}>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td {...args}>John</Td>
        <Td {...args}>Doe</Td>
        <Td {...args}>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td {...args}>Developer</Td>
      </Tr>
      <Tr>
        <Td {...args}>Johny</Td>
        <Td {...args}>Depp</Td>
        <Td {...args}>
          <Badge variant="orange">AFK</Badge>
        </Td>
        <Td {...args}>Actor</Td>
      </Tr>
      <Tr>
        <Td {...args}>Natalie</Td>
        <Td {...args}>Portman</Td>
        <Td {...args}>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td {...args}>Actor</Td>
      </Tr>
      <Tr>
        <Td {...args}>Luke</Td>
        <Td {...args}>Skywalker</Td>
        <Td {...args}>
          <Badge variant="red">Disconnected</Badge>
        </Td>
        <Td {...args}>Star wars</Td>
      </Tr>
    </Tbody>
  </TableForStory>
);

Alignment.argTypes = {
  align: {
    control: 'inline-radio',
    options: ['start', 'center', 'end'],
  },
};

Alignment.args = {
  align: 'start',
};

export const Interactive: StoryFn<any> = (args) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow],
  );

  return (
    <TableForStory>
      <Thead>
        <Tr>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr {...args} {...makeSelectableRowProps(1)}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(2)}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(4)}>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star Wars</Td>
        </Tr>
      </Tbody>
    </TableForStory>
  );
};

Interactive.args = {
  interactive: true,
};

export const Links: StoryFn<any> = (args) => (
  <Table hasCollapsibleChildren aria-label="Subscriptions" {...args}>
    <Thead>
      <Tr emptyFirstColumn tableHead>
        <Th>Application</Th>
        <Th>Subscription</Th>
        <Th>Status</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr
        href="#sub-41"
        linkCell={1}
        collapsedContent={<Text>Additional description for this row.</Text>}
      >
        <Td>
          <Link href="#app-1">app-1</Link>
        </Td>
        <Td>sub-41</Td>
        <Td>
          <Badge variant="green">Active</Badge>
        </Td>
        <Td />
      </Tr>
      <Tr emptyFirstColumn interactive>
        <Td>
          <Link href="#app-2">app-2</Link>
        </Td>
        <Td>
          <RowLink href="#sub-42">sub-42</RowLink>
        </Td>
        <Td>
          <Badge variant="green">Active</Badge>
        </Td>
        <Td />
      </Tr>
      <Tr emptyFirstColumn interactive>
        <Td>
          <Link href="#app-3">app-3</Link>
        </Td>
        <Td>
          <RowLink href="#sub-43">
            <VisuallyHidden>Open subscription sub-43</VisuallyHidden>
          </RowLink>
        </Td>
        <Td>
          <Badge variant="orange">Pending</Badge>
        </Td>
        <Td>
          <Button size="small" variant="secondary">
            Approve
          </Button>
        </Td>
      </Tr>
      <Tr emptyFirstColumn href="#sub-44" linkCell={1} linkOverlay={false}>
        <Td>
          <Link href="#app-4">app-4</Link>
        </Td>
        <Td>sub-44</Td>
        <Td>
          <Tooltip content="Renewed on 2026-11-01">
            <Text>Renewed</Text>
          </Tooltip>
        </Td>
        <Td />
      </Tr>
    </Tbody>
  </Table>
);
Links.parameters = {
  docs: {
    description: {
      story:
        'A click anywhere on a row opens its link, and links, buttons and inputs in the row keep their own click and tab stop. Use `href` on `Tr` to put the content of the first cell, or of the cell at `linkCell`, in the row link (first row). That cell must be a `Td`, or a `styled(Td)`. Use `linkAs` to render a router link, for example `linkAs={NextLink}`, and `linkProps` for its other props. The `linkAs` component must pass its props and ref to its `a`, and must be defined outside render. To choose the cell yourself, put a `RowLink` in it (second row), and use `asChild` on it for a router link. When no cell has a good name for the link, put a `VisuallyHidden` label in the `RowLink` (third row). Do not use `<Tr asChild><a>`: the `a` gets `role="row"`, so screen readers do not read it as a link. A sticky header in a table with row links needs a `z-index` of 3 or more to stay above them. When the text of a row has a hover of its own, for example a tooltip, use `linkOverlay={false}` on `Tr`, or `overlay={false}` on `RowLink` (fourth row): the link stays in its cell, and a click anywhere else on the row opens it. A middle click, or a click with Cmd, Ctrl or Shift, opens it in a new tab. Clicks on the controls of the row, and from a portal such as a row menu, do not open it.',
    },
  },
};

export const Columns: StoryFn<any> = ({ transform, ...args }) => (
  <Flex direction="column" gap="4">
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Load more...
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              One
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Two
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Three
            </Button>
          </Td>
          <Td css={{ textAlign: 'left' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Four
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory
      css={{ tableLayout: 'auto' }}
      aria-label="People"
      aria-describedby="basic-table-caption"
      {...args}
    >
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td fullColSpan aria-colspan={4} css={{ textAlign: 'center' }}>
            <Button
              ghost
              variant="secondary"
              css={{ fontSize: '$1', height: '$5', boxShadow: 'none' }}
            >
              Load more...
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
  </Flex>
);

const FlexIssue = () => (
  <Flex align="center" justify="center">
    <Image src="https://picsum.photos/38/38" />
  </Flex>
);

export const VerticalAlignment: StoryFn<any> = () => (
  <TableForStory>
    <Thead>
      <Tr>
        <Th>Flex issue column</Th>
        <Th>Column</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
          <FlexIssue />
        </Td>
        <Td>
          <Flex align="center" justify="center">
            <Text>Cell</Text>
          </Flex>
        </Td>
      </Tr>
    </Tbody>
  </TableForStory>
);

export const CollapsibleRow: StoryFn<any> = (args) => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback(
    (rowNum: number) => ({
      active: selectedRow === rowNum,
      onClick: () => setSelectedRow(rowNum),
    }),
    [selectedRow, setSelectedRow],
  );

  return (
    <Table hasCollapsibleChildren>
      <Thead>
        <Tr emptyFirstColumn tableHead>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr emptyFirstColumn {...makeSelectableRowProps(1)} {...args}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr
          collapsedContent={
            <Flex>
              <Text>Additional description.</Text>
            </Flex>
          }
          {...makeSelectableRowProps(2)}
          {...args}
        >
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr collapsedContent={<VerticalAlignment />} {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

CollapsibleRow.args = {
  interactive: true,
};

const comparisonRows = [
  { first: 'John', last: 'Doe', status: 'green', label: 'Connected', role: 'Developer' },
  { first: 'Johnny', last: 'Depp', status: 'orange', label: 'AFK', role: 'Actor' },
  { first: 'Luke', last: 'Skywalker', status: 'red', label: 'Disconnected', role: 'Star wars' },
] as const;

export const Comparison: StoryFn<any> = ({ elevation }) => {
  const [selectedRow, setSelectedRow] = useState(1);
  const vanillaElevation = Number(elevation) as 0 | 1 | 2 | 3 | 4 | 5;

  return (
    <FlexVanilla direction="column" gap={6}>
      <BoxVanilla>
        <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
        <Table hasCollapsibleChildren elevation={elevation} aria-labelledby="stitches-caption">
          <Caption id="stitches-caption">Team</Caption>
          <Thead>
            <Tr emptyFirstColumn tableHead>
              <Th>first name</Th>
              <Th>last name</Th>
              <Th>Status</Th>
              <Th align="end">Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comparisonRows.map((row, i) => (
              <Tr
                key={row.first}
                interactive
                active={selectedRow === i}
                onClick={() => setSelectedRow(i)}
                href={i === 2 ? '#luke-skywalker' : undefined}
                emptyFirstColumn={i !== 1}
                collapsedContent={
                  i === 1 ? <Text>Additional details about this row.</Text> : undefined
                }
              >
                <Td>{row.first}</Td>
                <Td>{row.last}</Td>
                <Td>
                  <Badge variant={row.status}>{row.label}</Badge>
                </Td>
                <Td subtle align="end">
                  {row.role}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td fullColSpan aria-colspan={5}>
                3 members
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </BoxVanilla>
      <BoxVanilla>
        <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
        <AriaTableVanilla
          hasCollapsibleChildren
          elevation={vanillaElevation}
          aria-labelledby="vanilla-caption"
        >
          <AriaCaptionVanilla id="vanilla-caption">Team</AriaCaptionVanilla>
          <AriaTheadVanilla>
            <AriaTrVanilla emptyFirstColumn tableHead>
              <AriaThVanilla>first name</AriaThVanilla>
              <AriaThVanilla>last name</AriaThVanilla>
              <AriaThVanilla>Status</AriaThVanilla>
              <AriaThVanilla align="end">Role</AriaThVanilla>
            </AriaTrVanilla>
          </AriaTheadVanilla>
          <AriaTbodyVanilla>
            {comparisonRows.map((row, i) => (
              <AriaTrVanilla
                key={row.first}
                interactive
                active={selectedRow === i}
                onClick={() => setSelectedRow(i)}
                href={i === 2 ? '#luke-skywalker' : undefined}
                emptyFirstColumn={i !== 1}
                collapsedContent={
                  i === 1 ? (
                    <TextVanilla>Additional details about this row.</TextVanilla>
                  ) : undefined
                }
              >
                <AriaTdVanilla>{row.first}</AriaTdVanilla>
                <AriaTdVanilla>{row.last}</AriaTdVanilla>
                <AriaTdVanilla>
                  <BadgeVanilla variant={row.status}>{row.label}</BadgeVanilla>
                </AriaTdVanilla>
                <AriaTdVanilla subtle align="end">
                  {row.role}
                </AriaTdVanilla>
              </AriaTrVanilla>
            ))}
          </AriaTbodyVanilla>
          <AriaTfootVanilla>
            <AriaTrVanilla>
              <AriaTdVanilla fullColSpan aria-colspan={5}>
                3 members
              </AriaTdVanilla>
            </AriaTrVanilla>
          </AriaTfootVanilla>
        </AriaTableVanilla>
      </BoxVanilla>
    </FlexVanilla>
  );
};

Comparison.args = {
  elevation: '1',
};

Comparison.argTypes = {
  elevation: {
    control: 'inline-radio',
    options: ['0', '1', '2', '3', '4', '5'],
  },
};

Comparison.parameters = {
  docs: {
    description: {
      story:
        'The same table built with the Stitches parts and with the vanilla-extract parts (`AriaTableVanilla`, `AriaTrVanilla`, …). The last row links to `#luke-skywalker` with `href`, and the footer uses a `fullColSpan` cell. They should look identical, except for the badges: `BadgeVanilla` uses the semantic tone tokens, while the Stitches `Badge` uses the raw color scales.',
    },
  },
};

export default Component;
