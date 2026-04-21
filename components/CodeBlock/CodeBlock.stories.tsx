// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { tokens } from '../../styles/tokens.css';
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
    copyable: true,
    copyText: 'Copy',
    copiedText: 'Copied!',
  },
};

export const Basic: StoryFn<typeof CodeBlockVanilla> = (args) => <CodeBlockVanilla {...args} />;

export const CopyButtonAlign: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <FlexVanilla direction="column" gap={6}>
    {(['top right', 'top left', 'bottom right', 'bottom left'] as const).map((align) => (
      <BoxVanilla key={align}>
        <H3Vanilla css={{ marginBottom: '16px' }}>{align}</H3Vanilla>
        <CodeBlockVanilla {...args} copyButtonAlign={align} />
      </BoxVanilla>
    ))}
  </FlexVanilla>
);

export const InCard: StoryFn<typeof CodeBlockVanilla> = (args) => (
  <CardVanilla css={{ padding: 0 }}>
    <CodeBlockVanilla
      {...args}
      copyable
      noBorder
      copyButtonBgColor={tokens.colors.cardBackground}
    />
  </CardVanilla>
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

const LANGUAGE_EXAMPLES: Array<{ lang?: string; label: string; code: string }> = [
  {
    label: 'No Language (fallback to text)',
    code: `Plain text — no language specified, defaults to text.
Error: Something went wrong at line 42`,
  },
  {
    lang: 'actionscript',
    label: 'ActionScript',
    code: `public class Greeter {
  public function greet(name:String):String {
    return "Hello, " + name + "!";
  }
}`,
  },
  {
    lang: 'bash',
    label: 'Bash',
    code: `#!/bin/bash
TAG="\${1:-latest}"
docker pull "myapp:\${TAG}"
echo "Pulled myapp:\${TAG}"`,
  },
  {
    lang: 'c',
    label: 'C',
    code: `#include <stdio.h>

int main(void) {
  printf("Hello, World!\\n");
  return 0;
}`,
  },
  {
    lang: 'coffeescript',
    label: 'CoffeeScript',
    code: `greet = (name) -> console.log "Hello, #{name}!"
doubled = (n * 2 for n in [1..5])
greet "World"`,
  },
  {
    lang: 'csharp',
    label: 'C#',
    code: `record User(int Id, string Name);

string Greet(User user) => $"Hello, {user.Name}!";

Console.WriteLine(Greet(new User(1, "Alice")));`,
  },
  {
    lang: 'cpp',
    label: 'C++',
    code: `#include <iostream>
#include <vector>

template <typename T>
T sum(const std::vector<T>& v) {
  T total = 0;
  for (const auto& x : v) total += x;
  return total;
}`,
  },
  {
    lang: 'css',
    label: 'CSS',
    code: `.button {
  padding: 8px 16px;
  background: #0070f3;
  color: white;
  border-radius: 4px;
}

.button:hover {
  opacity: 0.85;
}`,
  },
  {
    lang: 'docker',
    label: 'Dockerfile',
    code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]`,
  },
  {
    lang: 'flow',
    label: 'Flow',
    code: `// @flow
type User = { id: number, name: string };

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}`,
  },
  {
    lang: 'go',
    label: 'Go',
    code: `package main

import "fmt"

func add(a, b int) int { return a + b }

func main() { fmt.Println(add(3, 4)) }`,
  },
  {
    lang: 'graphql',
    label: 'GraphQL',
    code: `type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}`,
  },
  {
    lang: 'hcl',
    label: 'HCL',
    code: `resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  tags = { Name = "HelloWorld" }
}`,
  },
  {
    lang: 'html',
    label: 'HTML',
    code: `<!DOCTYPE html>
<html lang="en">
  <head><title>Hello</title></head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>`,
  },
  {
    lang: 'http',
    label: 'HTTP',
    code: `POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{"name": "Alice", "email": "alice@example.com"}`,
  },
  {
    lang: 'ini',
    label: 'INI',
    code: `[database]
host = localhost
port = 5432

[cache]
ttl = 3600`,
  },
  {
    lang: 'java',
    label: 'Java',
    code: `public class Greeter {
  public String greet(String name) {
    return "Hello, " + name + "!";
  }
  public static void main(String[] args) {
    System.out.println(new Greeter().greet("World"));
  }
}`,
  },
  {
    lang: 'javascript',
    label: 'JavaScript',
    code: `const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet('World');`,
  },
  {
    lang: 'json',
    label: 'JSON',
    code: `{
  "name": "faency",
  "version": "1.0.0",
  "dependencies": { "react": ">=18" }
}`,
  },
  {
    lang: 'jsx',
    label: 'JSX',
    code: `function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Hello;`,
  },
  {
    lang: 'kotlin',
    label: 'Kotlin',
    code: `data class User(val id: Int, val name: String)

fun main() {
  val user = User(1, "Alice")
  println("Hello, \${user.name}!")
}`,
  },
  {
    lang: 'markdown',
    label: 'Markdown',
    code: `# Hello

**Bold**, _italic_, and \`code\`.

- Item one
- [Link](https://example.com)`,
  },
  {
    lang: 'objectivec',
    label: 'Objective-C',
    code: `#import <Foundation/Foundation.h>

@interface User : NSObject
@property NSString *name;
- (NSString *)greet;
@end

@implementation User
- (NSString *)greet { return [@"Hello, " stringByAppendingString:self.name]; }
@end`,
  },
  {
    lang: 'php',
    label: 'PHP',
    code: `<?php
class User {
  public function __construct(public int $id, public string $name) {}
}

function greet(User $user): string {
  return "Hello, {$user->name}!";
}

echo greet(new User(1, 'Alice'));`,
  },
  {
    lang: 'powershell',
    label: 'PowerShell',
    code: `function Get-Greeting([string]$Name) {
  return "Hello, $Name!"
}

Get-Greeting -Name "World"`,
  },
  {
    lang: 'protobuf',
    label: 'Protobuf',
    code: `syntax = "proto3";

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}`,
  },
  {
    lang: 'python',
    label: 'Python',
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))`,
  },
  {
    lang: 'reason',
    label: 'Reason',
    code: `type user = { id: int, name: string };

let greet = (u: user) => "Hello, " ++ u.name ++ "!";
let alice = { id: 1, name: "Alice" };
Js.log(greet(alice));`,
  },
  {
    lang: 'regex',
    label: 'Regex',
    code: `/^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/
/https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b/
/^(\\d{1,3}\\.){3}\\d{1,3}$/`,
  },
  {
    lang: 'ruby',
    label: 'Ruby',
    code: `User = Struct.new(:id, :name)

def greet(user) = "Hello, #{user.name}!"

puts greet(User.new(1, "Alice"))`,
  },
  {
    lang: 'rust',
    label: 'Rust',
    code: `fn main() {
  let nums = vec![1, 2, 3, 4, 5];
  let sum: i32 = nums.iter().sum();
  println!("Sum: {sum}");
}`,
  },
  {
    lang: 'scala',
    label: 'Scala',
    code: `case class User(id: Int, name: String)

def greet(user: User): String = s"Hello, \${user.name}!"

@main def run(): Unit = println(greet(User(1, "Alice")))`,
  },
  {
    lang: 'shell-session',
    label: 'Shell Session',
    code: `$ git status
On branch main, nothing to commit
$ git log --oneline -2
abc1234 feat: add CodeBlock component
def5678 fix: update dependencies`,
  },
  {
    lang: 'sql',
    label: 'SQL',
    code: `SELECT u.name, COUNT(p.id) AS posts
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.name
ORDER BY posts DESC;`,
  },
  {
    lang: 'swift',
    label: 'Swift',
    code: `struct User { let id: Int; let name: String }

func greet(_ user: User) -> String {
  return "Hello, \\(user.name)!"
}`,
  },
  {
    lang: 'text',
    label: 'Text',
    code: `Plain text — lang="text" explicitly set.
Warning: Deprecated function called`,
  },
  {
    lang: 'toml',
    label: 'TOML',
    code: `[package]
name = "my-app"
version = "0.1.0"

[dependencies]
serde = { version = "1" }`,
  },
  {
    lang: 'tsx',
    label: 'TSX',
    code: `interface Props { name: string }

const Hello = ({ name }: Props) => (
  <h1>Hello, {name}!</h1>
);

export default Hello;`,
  },
  {
    lang: 'typescript',
    label: 'TypeScript',
    code: `interface User { id: number; name: string }

async function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}`,
  },
  {
    lang: 'unknown-lang',
    label: 'Unknown Language (fallback to text)',
    code: `This language is not supported.
It should render as plain text without crashing.`,
  },
  {
    lang: 'yaml',
    label: 'YAML',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3`,
  },
];

export const Languages: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    {LANGUAGE_EXAMPLES.map(({ lang, label, code }) => (
      <BoxVanilla key={lang ?? 'none'}>
        <H3Vanilla css={{ marginBottom: '16px' }}>
          {label}
          {lang && (
            <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 400, opacity: 0.5 }}>
              {lang}
            </span>
          )}
        </H3Vanilla>
        <CodeBlockVanilla lang={lang as any} code={code} copyable />
      </BoxVanilla>
    ))}
  </FlexVanilla>
);

const SCROLLABLE_ARGS = {
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
} as const;

const HORIZONTAL_SCROLL_ARGS = {
  copyable: true,
  copyText: 'Copy',
  copiedText: 'Copied!',
  lang: 'bash',
  maxHeight: 'none',
  code: `docker run --rm -it --name traefik-dev -p 80:80 -p 443:443 -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd)/traefik.yml:/etc/traefik/traefik.yml -e TRAEFIK_LOG_LEVEL=DEBUG traefik:v3.0
curl -X POST "https://api.example.com/v1/users" -H "Authorization: Bearer thisisaverylongauthbearerplaceholderusedfortestingpurposesthisisaverylongauthbearerplaceholderusedfortestingpurposes" -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com","role":"admin"}'
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v3.0/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml --server-side --force-conflicts`,
} as const;

export const Scrollable: StoryFn<typeof CodeBlockVanilla> = () => (
  <FlexVanilla direction="column" gap={6}>
    <CodeBlockVanilla {...SCROLLABLE_ARGS} />
    <CodeBlockVanilla {...SCROLLABLE_ARGS} copyButtonAlign="bottom left" />
    <CodeBlockVanilla {...HORIZONTAL_SCROLL_ARGS} />
    <CodeBlockVanilla {...HORIZONTAL_SCROLL_ARGS} copyButtonAlign="bottom right" />
  </FlexVanilla>
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

export default Component;
