import { FieldProps } from '../components/Field';

export type FieldStoryArgs = Pick<FieldProps, 'description' | 'error'> & { label: string };

export const FIELD_STORY_ARG_TYPES = {
  label: { control: 'text', table: { category: 'Field' } },
  description: { control: 'text', table: { category: 'Field' } },
  error: { control: 'text', table: { category: 'Field' } },
} as const;
