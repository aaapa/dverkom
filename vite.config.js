import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: [{ find: '@/', replacement: resolve('src') + '/'}],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        facades: resolve(__dirname, 'фасады.html'),
        aprons: resolve(__dirname, 'фартуки.html'),
        card1: resolve(__dirname, 'белый глянец.html'),
        card2: resolve(__dirname, 'белый мрамор.html'),
        card3: resolve(__dirname, 'бетон.html'),
        card4: resolve(__dirname, 'коричневый глянец.html'),
        card5: resolve(__dirname, 'серый глянец.html'),
        card6: resolve(__dirname, 'серый мрамор.html'),
        card7: resolve(__dirname, 'серый шпон.html'),
        card8: resolve(__dirname, 'синий мрамор.html'),
        card9: resolve(__dirname, 'табак.html'),
        card10: resolve(__dirname, 'чёрный глянец.html'),
        card11: resolve(__dirname, 'чёрный дуб.html'),
        card12: resolve(__dirname, 'ясень.html'),
      },
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'main.css';
          return '[name].[ext]';
        }
      },
      inject: {
        target: 'body'
      }
    },
    assetsDir: '',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/scss/helpers' as *;
        `,
        silenceDeprecations: ['legacy-js-api'],
      },
    }
  }
});
