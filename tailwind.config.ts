
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF',
					50: '#FFF2EC',
					100: '#FFE1D3',
					200: '#FFC3A7',
					300: '#FFA57B',
					400: '#FF874F',
					500: '#FF6B35', // Main color
					600: '#FF4A0B',
					700: '#D13800',
					800: '#9B2900',
					900: '#631A00'
				},
				secondary: {
					DEFAULT: '#FFA62B',
					foreground: '#FFFFFF',
					50: '#FFF7EC',
					100: '#FFEAC9',
					200: '#FFD694',
					300: '#FFC25E',
					400: '#FFAF29',
					500: '#FFA62B', // Main color
					600: '#F58F00',
					700: '#BD6F00',
					800: '#855000',
					900: '#4D2E00'
				},
				accent: {
					DEFAULT: '#2EC4B6',
					foreground: '#FFFFFF',
					50: '#E5F8F6',
					100: '#BFEDE8',
					200: '#84DFD5',
					300: '#49D1C2',
					400: '#2EC4B6', // Main color
					500: '#25A096',
					600: '#1D7D76',
					700: '#145A55',
					800: '#0C3835',
					900: '#041514'
				},
				destructive: {
					DEFAULT: '#E71D36',
					foreground: '#FFFFFF',
					50: '#FEEAED',
					100: '#FBC5CD',
					200: '#F68C9D',
					300: '#F1536D',
					400: '#EC1A3E',
					500: '#E71D36', // Main color
					600: '#B9122A',
					700: '#8B0E1F',
					800: '#5D0915',
					900: '#2F050A'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
				'slide-in': 'slide-in 0.4s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			},
			boxShadow: {
				'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
				'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.1)',
				'card-hover': '0 1px 3px rgba(0, 0, 0, 0.05), 0 12px 20px -5px rgba(0, 0, 0, 0.15)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
