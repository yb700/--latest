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
                    DEFAULT: '#0b1f3b',
                    50: '#e9eef6',
                    100: '#c9d5e7',
                    200: '#9db2d2',
                    300: '#6d8fbc',
                    400: '#456fa6',
                    500: '#2a5289',
                    600: '#1f406f',
                    700: '#162f56',
                    800: '#102440',
                    900: '#0b1f3b'
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
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
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


