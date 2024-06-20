// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow access from network devices
    port: 5173,  // Ensure this is the correct port
  },
});
