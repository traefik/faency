// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { CardVanilla } from '../Card/Card.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { CodeBlock } from './CodeBlock';
import { CodeBlockVanilla } from './CodeBlock.vanilla';

const Component: Meta<typeof CodeBlockVanilla> = {
  title: 'Components/CodeBlock',
  component: CodeBlockVanilla,
  args: {
    lang: 'typescript',
    code: `import { CodeBlockVanilla } from '@traefik-labs/faency';

const Example = () => (
  <CodeBlockVanilla lang="typescript" code={snippet} copyable />
);`,
  },
};

export const Basic: StoryFn<typeof CodeBlockVanilla> = (args) => <CodeBlockVanilla {...args} />;

export const Copyable: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla {...args} copyable />
);

export const NoBorder: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla {...args} noBorder />
);

export const WrapText: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla
    {...args}
    wrapText
    lang="bash"
    code="npm install --save-dev @traefik-labs/faency @stitches/react @radix-ui/react-icons @radix-ui/react-tooltip react react-dom"
  />
);

export const JavaScript: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla
    {...args}
    lang="javascript"
    code={`const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet('World');`}
    copyable
  />
);

export const JSON: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla
    {...args}
    lang="json"
    code={`{
  "name": "@traefik-labs/faency",
  "version": "1.0.0",
  "dependencies": {
    "react": ">=18",
    "prism-react-renderer": "2.4.1"
  }
}`}
    copyable
  />
);

export const YAML: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla
    {...args}
    lang="yaml"
    code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app`}
    copyable
  />
);

const COMPARISON_CODE = `const greet = (name: string) => {
  console.log(\`Hello, \${name}!\`);
};`;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <CodeBlock lang="typescript" code={COMPARISON_CODE} copyable />
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <CodeBlockVanilla lang="typescript" code={COMPARISON_CODE} copyable />
    </BoxVanilla>
  </FlexVanilla>
);

export const InCard: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CardVanilla css={{ padding: 0 }}>
    <CodeBlockVanilla {...args} copyable noBorder />
  </CardVanilla>
);

export const CopyButtonAlignBottom: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla {...args} copyable copyButtonAlign="bottom" />
);

export const Scrollable: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CodeBlockVanilla {...args} />
);
Scrollable.args = {
  copyable: true,
  copyText: 'Copy',
  copiedText: 'Copied!',
  lang: 'typescript',
  code: `import React, { useState, useEffect, useCallback, useRef } from 'react';

interface UseFetchOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

interface UseFetchResult<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refetch: () => void;
}

export function useFetch<T>(url: string, options: UseFetchOptions<T> = {}): UseFetchResult<T> {
  const { initialData, onSuccess, onError, enabled = true } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(url, { signal: abortRef.current.signal });

      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status} \${response.statusText}\`);
      }

      const json: T = await response.json();
      setData(json);
      onSuccess?.(json);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
      }
    } finally {
      setLoading(false);
    }
  }, [url, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

// Usage example
const UserProfile = ({ userId }: { userId: string }) => {
  const { data, error, loading, refetch } = useFetch<{ name: string; email: string }>(
    \`/api/users/\${userId}\`,
    {
      onSuccess: (user) => console.log('Loaded user:', user.name),
      onError: (err) => console.error('Failed to load user:', err.message),
    },
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} <button onClick={refetch}>Retry</button></div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
};

export default UserProfile;`,
};

export default Component;
