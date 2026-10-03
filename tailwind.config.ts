import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#151515',
                    50: '#FAF9F7',
                    100: '#E7E4DF',
                    200: '#E7E4DF',
                    300: '#8A8780',
                    400: '#5E5E5E',
                    500: '#5E5E5E',
                    600: '#151515',
                    700: '#151515',
                    800: '#151515',
                    900: '#151515',
                },
                slate: {
                    50: '#FAF9F7',
                    100: '#FAF9F7',
                    200: '#E7E4DF',
                    300: '#E7E4DF',
                    400: '#8A8780',
                    500: '#8A8780',
                    600: '#5E5E5E',
                    700: '#5E5E5E',
                    800: '#151515',
                    900: '#151515',
                    950: '#151515',
                },
                gray: {
                    50: '#FAF9F7',
                    100: '#FAF9F7',
                    200: '#E7E4DF',
                    300: '#E7E4DF',
                    400: '#8A8780',
                    500: '#8A8780',
                    600: '#5E5E5E',
                    700: '#5E5E5E',
                    800: '#151515',
                    900: '#151515',
                    950: '#151515',
                },
                border: "var(--border)",
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
            fontFamily: {
                sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
            },
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.slate.700'),
                        '--tw-prose-headings': theme('colors.brand.DEFAULT'),
                        '--tw-prose-lead': theme('colors.slate.600'),
                        '--tw-prose-links': theme('colors.brand.600'),
                        '--tw-prose-bold': theme('colors.slate.900'),
                        '--tw-prose-counters': theme('colors.slate.500'),
                        '--tw-prose-bullets': theme('colors.slate.400'),
                        '--tw-prose-hr': theme('colors.slate.300'),
                        '--tw-prose-quotes': theme('colors.slate.900'),
                        '--tw-prose-quote-borders': theme('colors.slate.300'),
                        '--tw-prose-captions': theme('colors.slate.600'),
                        '--tw-prose-code': theme('colors.slate.900'),
                        '--tw-prose-pre-code': theme('colors.slate.100'),
                        '--tw-prose-pre-bg': theme('colors.slate.900'),
                        '--tw-prose-th-borders': theme('colors.slate.300'),
                        '--tw-prose-td-borders': theme('colors.slate.200'),
                    },
                },
            }),
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwindcss-animate")
    ],
}

export default config


