import React from 'react';
import { Button } from '../components/Button';
// import { darkTheme } from '../stitches.config';

export function DarkThemeButton() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle theme</Button>
  );
}
