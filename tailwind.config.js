/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Space theme colors
        space: {
          bg1: '#0B132B',
          bg2: '#1F1D36',
          bg3: '#2A1B3D',
          card: '#12172b',
          text: '#f7f8ff',
          primary: '#FFD166',
          secondary: '#06D6A0',
          accent: '#118AB2',
          danger: '#EF476F',
          muted: '#8aa0b5',
          aurora: '#06D6A0',
          solar: '#FF9F40',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 10px #ffd16680)'
          },
          '50%': {
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 0 20px #ffd166)'
          },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-100px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.2)' },
        },
        'solar-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 80px rgba(255,207,90,.6), 0 0 120px rgba(255,207,90,.3)'
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 100px rgba(255,207,90,.8), 0 0 150px rgba(255,207,90,.4)'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 2s ease-in-out infinite alternate',
        float: 'float 20s infinite linear',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'solar-pulse': 'solar-pulse 4s ease-in-out infinite',
      },
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}