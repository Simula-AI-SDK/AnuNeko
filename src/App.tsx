import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import { ChatInterface } from './components/generated/ChatInterface';
import { SimulaProvider } from '@simula/ads';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return <ChatInterface />;
  }, []);

  if (container === 'centered') {
    return (
      <SimulaProvider apiKey={import.meta.env.VITE_SIMULA_API_KEY || ''}>
        <div className="h-full w-full flex flex-col items-center justify-center">
          {generatedComponent}
        </div>
      </SimulaProvider>
    );
  } else {
    return (
      <SimulaProvider apiKey={import.meta.env.VITE_SIMULA_API_KEY || ''}>
        <div className="h-full w-full bg-black p-4">
          {generatedComponent}
        </div>
      </SimulaProvider>
    );
  }
}

export default App;
