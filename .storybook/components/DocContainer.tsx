import React from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs';
import { FaencyProvider } from '../../components/FaencyProvider';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';

export const DocsContainer = ({ children, context }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer
      context={{
        ...context,
        parameters: {
          ...context.parameters,
          docs: {
            theme: dark ? themes.dark : themes.light,
          },
        },
      }}
    >
      <FaencyProvider primaryColor="neon">
        {children}
      </FaencyProvider>
    </BaseContainer>
  );
};
