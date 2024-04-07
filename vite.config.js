import {VitePWA} from 'vite-plugin-pwa'
import vercel from 'vite-plugin-vercel';
import {defineConfig} from "vite";

export default defineConfig(({mode}) => ({
    vercel: {
    },
    plugins: [
        vercel(),
        VitePWA({
            devOptions: {
                enabled: mode === "development"
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png}'],
                importScripts: ["./src/sw.js"],
            },
            injectManifest: {
                globPatterns: ['**/*.{js,css,html,ico,png}'],
            },
            registerType: 'autoUpdate',
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
}))