import {VitePWA} from 'vite-plugin-pwa'
import vercel from 'vite-plugin-vercel';
//import mkcert from'vite-plugin-mkcert'
import {defineConfig} from "vite";

export default defineConfig(({mode}) => ({
    vercel: {
    },
    /*devServer: {
        https: {
            cert: './certs/cert.pem',
            key: './certs/dev.pem'
        }
    },*/
    plugins: [
        vercel(),
        /*mode === "development" && mkcert({
            savePath: './certs', // save the generated certificate into certs directory
            force: true, // force generation of certs even without setting https property in the vite config
        }),*/
        VitePWA({
            devOptions: {
                enabled: true
                /* other options */
            },
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png}'],
                globIgnores: ['sw-timetable.js', 'sw.js', 'registerSW.js'],
                importScripts: ["./sw-timetable.js"],
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
}))