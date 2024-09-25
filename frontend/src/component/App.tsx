import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { AppProvider } from './AppContext';
import { UiThemeProvider, useUiTheme } from './UiThemeContext';
import { AppRouter } from '../config/router';

const App: React.FC = () => {
  return (
    <AppProvider>
      <UiThemeProvider>
        <MainApp />
      </UiThemeProvider>
    </AppProvider>
  );
};

const MainApp: React.FC = () => {
  const { toggleTheme, theme } = useUiTheme();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Todo App</a>
          <button
            className="btn btn-outline-secondary"
            onClick={toggleTheme}
          >
            Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
      </nav>

      {/* Main App Routing */}
      <AppRouter />
    </div>
  );
};

export default App;
