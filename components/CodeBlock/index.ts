import type { Language } from 'prism-react-renderer';

export type CodeBlockCopyButtonAlign =
  | 'top'
  | 'top right'
  | 'top left'
  | 'bottom'
  | 'bottom right'
  | 'bottom left';

export type CodeBlockLanguage =
  | Language
  | 'bash'
  | 'csharp'
  | 'docker'
  | 'hcl'
  | 'http'
  | 'ini'
  | 'java'
  | 'php'
  | 'powershell'
  | 'protobuf'
  | 'ruby'
  | 'scala'
  | 'shell-session'
  | 'toml';

export type { CodeBlockProps } from './CodeBlock';
export { CodeBlock } from './CodeBlock';
export type { CodeBlockVanillaProps } from './CodeBlock.vanilla';
export { CodeBlockVanilla } from './CodeBlock.vanilla';
