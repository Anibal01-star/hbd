import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // optional: customize server port if needed
  // server: { port: 5173 },
});
