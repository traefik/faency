import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

export const Image = styled('img', {
  // Reset
  verticalAlign: 'middle',
  maxWidth: '100%',
});

type ImageVariants = VariantProps<typeof Image>;
export interface ImageProps extends ImageVariants {}
const BaseImage = (props: ImageProps): JSX.Element => <Image {...props} />;
export const ImageForStory = modifyVariantsForStory<
  ImageVariants,
  ImageProps & React.ImgHTMLAttributes<any>
>(BaseImage);
