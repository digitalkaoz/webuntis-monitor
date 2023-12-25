import { VitePWA } from 'vite-plugin-pwa'
import vercel from 'vite-plugin-vercel';

export default {
    plugins: [
        vercel(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png}']
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
            manifest: {
                name: 'WebUntis Monitor',
                short_name: 'WebUntis',
                description: 'a filterable WebUntis Monitor',
                theme_color: '#14B8A6',
                "icons": [
                    {
                        "src": "pwa-64x64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "maskable-icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            }
        })
    ]
}