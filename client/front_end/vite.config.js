// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'https://landbook.onrender.com'
//     }
//     }
// })

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   server: {
     proxy: {
      '/api': {
       target: 'https://landbook.onrender.com',
       changeOrigin: true,
        secure: false
     }
     }
   }
})
