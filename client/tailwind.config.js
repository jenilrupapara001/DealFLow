/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4285F4',
                    DEFAULT: '#1A73E8',
                    dark: '#174EA6',
                },
                accent: {
                    DEFAULT: '#FF7A45',
                    hover: '#E86A3A',
                },
                surface: {
                    light: '#F5F5F5',
                    DEFAULT: '#FFFFFF',
                    dark: '#121212',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
        },
    },
    plugins: [],
}
