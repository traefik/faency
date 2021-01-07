import React, { useState, Children } from 'react';
import { addDecorator, configure } from '@storybook/react';
import { Provider } from '../src/Provider';
import { Box, Button, theme } from '../src';

function ThemeComponent({ children }) {
  const [currentTheme] = useState(theme);
  return (
    <Provider theme={currentTheme}>
      <Box p={3} sx={{ backgroundColor: 'bg' }}>{children}</Box>
    </Provider>
  );
}

addDecorator((story, context) => <ThemeComponent>{story()}</ThemeComponent>);

configure(loadStories, module);

function loadStories() {
  const req = require.context('../src', true, /\.story\.(js|tsx)$/);
  req.keys().forEach(filename => req(filename));
}