// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'window', // polyfill global
    'process.env': {},  // polyfill process.env if needed
  },
  resolve: {
    alias: {
      process: 'process/browser', // polyfill process
    },
  },
});
