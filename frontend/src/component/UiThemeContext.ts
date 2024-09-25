import React, { createContext, useState, PropsWithChildren } from 'react';

interface UiThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const UiThemeContext = createContext<UiThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export const UiThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <UiThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </UiThemeContext.Provider>
  );
};
