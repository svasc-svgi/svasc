/** @type {import('tailwindcss').Config} */
export default {
    corePlugins: {
        preflight: true,
    },
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: { 500: '#FFD500', 600: '#F1A501' }
            },
            letterSpacing: { tighter: '-0.04em' }
        },
    },
    plugins: [],
}
