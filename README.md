# [Faency](https://containous.github.io/faency/)

[![Build Status](https://travis-ci.com/containous/faency.svg?branch=master)](https://travis-ci.com/containous/faency)
[![npm](https://img.shields.io/npm/v/@containous/faency)](https://www.npmjs.com/package/@containous/faency)

Faency is the [Containous](https://containo.us/) React component library.

## Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @containous/faency --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @containous/faency
```

## Usage

Import components from the lib and start using them:

```js
import React from 'react';
import { Button } from '@containous/faency';

const Component = () => (
  <>
    <Button variant="primary">Click me</Button>
  </>
);
```

## Development

We use Storybook to create a simple, hot-reloading playground for development on these components.
You can edit/create a `*.story.tsx` file to preview and document usage of a component.
