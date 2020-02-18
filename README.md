# [Faency](https://containous.github.io/faency/)

[![Build Status](https://travis-ci.com/containous/faency.svg?branch=master)](https://travis-ci.com/containous/faency)
[![npm](https://img.shields.io/npm/v/@containous/faency)](https://www.npmjs.com/package/@containous/faency)

Faency is the [Containous](https://containo.us/) React component library.

### Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @containous/faency --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @containous/faency
```

### Usage

- Wrap your app with the Faency provider

```js
import React from 'react'
import { Provider as FaencyProvider } from '@containous/faency'

const Root = () => (
  <FaencyProvider>
    <App />
  </FaencyProvider>
)
```

- In your app you can now import and use Faency components:

```js
import React from 'react'
import { Button } from '@containous/faency'

const App = () => (
  <>
    <Button variant="primary">Click me</Button>
  </>
)
```

### Development

We use Storybook to create a simple, hot-reloading playground for development on Faency components.
You can edit/create a `*.story.tsx` file to preview a component.

#### Install dependencies using

```sh
  yarn
```

#### Run documentation website + storybook

```sh
  yarn start
```

During this process Faency will be in watch mode which means that any change you made will be automatically applied to storybook and the documentation website.

### Build & Release

#### Build

```sh
yarn build
```

#### Release

```sh
yarn release
```
