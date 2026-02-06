// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: "server",
  image: {
   remotePatterns: [
     {
       protocol: 'http',
       hostname: '127.0.0.1',
       port: '8090', 
     },
   ],
 },
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()

});
