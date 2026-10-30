import type { Language } from 'prism-react-renderer';

export type CodeBlockCopyButtonAlign =
  'top' | 'top right' | 'top left' | 'bottom' | 'bottom right' | 'bottom left';

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

/**
 * Called when writing to the clipboard fails (e.g. missing `clipboard-write` permission in an iframe).
 * Return or resolve to `true` when the copy was handled by a fallback: the copied state is shown and
 * `onCopy` is called, as for a successful copy.
 */
export type CodeBlockCopyErrorHandler = (
  error: unknown,
  code: string,
) => boolean | void | Promise<boolean | void>;

export type { CodeBlockProps } from './CodeBlock';
export { CodeBlock } from './CodeBlock';
export type { CodeBlockVanillaProps } from './CodeBlock.vanilla';
export { CodeBlockVanilla } from './CodeBlock.vanilla';
