import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Portfolio from '@/components/portfolio/Portfolio';
import { CommandPaletteProvider } from '@/hooks/use-command-palette';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <CommandPaletteProvider>
        <Portfolio />
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
