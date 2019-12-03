type Breakpoints<T> = Array<T> & {
  small: 0;
  medium: '38em';
  large: '62em';
  xlarge: '68em';
};


export const theme = {
  breakpoints: ['38em', '62em', '68em', '110em'] as Breakpoints<any>,
  fonts: {
    normal:
      'Nunito, -apple-system, BlinkMacSystemFont, "Helvetica Neue", helvetica, arial, sans-serif'
  },
  space: ['0', '8px', '16px', '24px', '32px', '40px', '48px', '54px', '62px', '70px'],
  sizes: ['0', '8px', '16px', '24px', '32px', '40px', '48px', '54px', '62px', '70px'],
  lineHeights: ['0', '8px', '16px', '24px', '32px', '40px', '48px', '54px', '62px', '70px'],
  radii: ['0', '3px', '6px', '8px'],
  colors: {
    primary: 'hsl(222, 67%, 51%)',
    black: 'hsl(0, 0%, 0%)',
    blacks: [
      'hsla(0, 0%, 0%, .9)',
      'hsla(0, 0%, 0%, .7)',
      'hsla(0, 0%, 0%, .5)',
      'hsla(0, 0%, 0%, .3)',
      'hsla(0, 0%, 0%, .1)',
    ],
    white: 'hsl(0, 0%, 100%)',
    whites: [
      'hsla(0, 0%, 100%, .9)',
      'hsla(0, 0%, 100%, .7)',
      'hsla(0, 0%, 100%, .5)',
      'hsla(0, 0%, 100%, .3)',
      'hsla(0, 0%, 100%, .1)',
    ],
    gray: 'hsl(208, 16%, 76%)',
    grays: [
      'hsl(208, 32%, 99%)',
      'hsl(208, 28%, 97%)',
      'hsl(208, 24%, 93%)',
      'hsl(208, 20%, 86%)',
      'hsl(208, 16%, 76%)',
      'hsl(208, 12%, 46%)',
      'hsl(208, 16%, 15%)',
      'hsl(208, 20%, 10%)',
      'hsl(208, 24%, 7%)',
    ],
    blue: 'hsl(222, 67%, 51%)',
    blues: [
      'hsl(222, 67%, 67%)',
      'hsl(222, 96%, 97%)',
      'hsl(222, 78%, 78%)',
      'hsl(222, 76%, 68%)',
      'hsl(222, 67%, 51%)',
      'hsl(222, 82%, 45%)',
      'hsl(222, 67%, 35%)',
      'hsl(222, 67%, 12%)',
      'hsl(222, 67%, 10%)',
    ],
    green: 'hsl(175, 100%, 33%)',
    greens: [
      'hsl(175, 60%, 99%)',
      'hsl(175, 60%, 97%)',
      'hsl(175, 40%, 72%)',
      'hsl(175, 34%, 64%)',
      'hsl(175, 100%, 33%)',
      'hsl(175, 62%, 40%)',
      'hsl(175, 60%, 38%)',
      'hsl(175, 60%, 12%)',
      'hsl(175, 60%, 10%)',
    ],
    red: 'hsl(347, 100%, 50%)',
    reds: [
      'hsl(347, 100%, 99%)',
      'hsl(347, 100%, 97%)',
      'hsl(347, 85%, 92%)',
      'hsl(347, 85%, 78%)',
      'hsl(347, 100%, 65%)',
      'hsl(347, 100%, 50%)',
      'hsl(347, 100%, 40%)',
      'hsl(347, 100%, 12%)',
      'hsl(347, 100%, 10%)',
    ],
  }
} as const;