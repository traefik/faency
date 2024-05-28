# Traefik Labs Faency

This is the React component library and design system for [Traefik Labs](https://traefik.io).

Built with React, Typescript, [Stitches](https://github.com/modulz/stitches) and [Radix UI Primitives](https://radix-ui.com/primitives/docs/overview/introduction).

## Demo (Storybook)

You can find the Storybook with an example for every component in this library [here](https://traefik.github.io/faency).

## Getting started

### How to use Faency

```sh
npm install @traefiklabs/faency@next

# or

yarn add @traefiklabs/faency@next
```

Then you need to wire up the FaencyProvider which will hold the context with the Theme configuration and everything global that the components will need to work well.

> The provider accepts one parameter besides the `children`, which is the `primaryColor`, that will be used to build the colors used on the Theme. This color can be one of the colors exported by the `Stitches` config, just by adding `$` as a prefix, or can be any string that represents a CSS color.

```jsx
import { FaencyProvider } from '@traefiklabs/faency';

const App = () => <FaencyProvider primaryColor="$blue8">{/* your app */}</FaencyProvider>;
```

Then you are ready to import components and use them on your project:

```jsx
import { Flex, styled } from '@traefiklabs/faency';

const Container = styled(Flex, {
  padding: '$3',
  bg: '$black', // alias for backgroundColor
  mx: '$2', // alias for margin left and right
});

const MyComponent = () => <Container>{children}</Container>;
```

## How to contribute

- Make sure you have Node 12+, or if you prefer, you can work in a Docker container:

```sh
docker run -it -v $(pwd):/usr/local/src/ -w /usr/local/src/ -p 3000:3000 node:latest bash
```

- Install the project dependencies

```sh
yarn install
```

- Patch the package

Stitches package needs to be patched after the upgrade to TypeScript version 5. You can run this script after installing the dependencies to apply the patch:

```sh
yarn patch
```

- Run the Storybook

```sh
yarn storybook
```

At this point, Storybook should automatically open up in your browser and you can start coding, it has hot reload so it will automatically re-render whenever a change is detected on the code.

### Writing stories

We use Stories to demonstrate how components can behave and which variants they can take, so it's expected that every component has a Story.
Check out how to create stories in the [Storybook Docs](https://storybook.js.org/docs/react/writing-stories/introduction).

### Opening Pull requests

[Pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) are always welcome, but if you have a big change that you would like to work on, it's recommended to open an issue, so we can discuss it beforehand.

A good PR is small, focuses on a single feature or improvement, and clearly communicates the problem it solves.

Try not to include more than one issue in a single PR. It's much easier for us to review multiple small pull requests than one that is large and unwieldy.

Note we follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Please follow the provided [PR template](/.github/pull_request_template.md).

### Release process

We use [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release) to automagically release any commit on the `master` branch.

Recommended conventional commit types:

```json
["build", "chore", "ci", "docs", "feat", "fix", "revert", "test"]
```

- `build`/`chore`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to CI configuration files and scripts (examples: CircleCi, SauceLabs)
- `docs`: Documentation (comments) only changes
- `feat`: A new feature
- `fix`: A bug fix
- `revert`: Reverts a previous commit
- `test`: Adding missing tests or correcting existing tests

Breaking change syntax:

```text
<type>!: <description>
```

Matching between commit type and release

```js
[
  { breaking: true, release: 'major' },
  // types impacting release version
  { revert: true, release: 'patch' },
  { type: 'feat', release: 'minor' },
  { type: 'fix', release: 'patch' },
  { type: 'perf', release: 'patch' },
];
```

See [semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer#readme) for more information.
