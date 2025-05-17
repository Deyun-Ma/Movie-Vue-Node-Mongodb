/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2FF',
          100: '#BFDFFF',
          200: '#99CBFF',
          300: '#66B0FF',
          400: '#3397FF',
          500: '#0A84FF', // Main primary color
          600: '#0064D2',
          700: '#0050A5',
          800: '#003C7D',
          900: '#002754',
        },
        secondary: {
          50: '#EFEFFD',
          100: '#D7D7FB',
          200: '#BEBEF9',
          300: '#9A9AF4',
          400: '#7C7CEB',
          500: '#5E5CE6', // Main secondary color
          600: '#4848BA',
          700: '#36368C',
          800: '#24245D',
          900: '#12122F',
        },
        accent: {
          50: '#FFE5EB',
          100: '#FFC2D1',
          200: '#FF9EB7',
          300: '#FF7A9D',
          400: '#FF5683',
          500: '#FF2D55', // Main accent color
          600: '#FF0037',
          700: '#D60030',
          800: '#AD0027',
          900: '#85001E',
        },
        success: {
          500: '#34C759', // Main success color
        },
        warning: {
          500: '#FF9500', // Main warning color
        },
        error: {
          500: '#FF3B30', // Main error color
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}