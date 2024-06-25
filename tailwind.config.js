/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      opacity: {
        15: '0.15',
      },
      space: {
        4.5: '1.125rem',
      },
      translate: {
        3.25: '0.813rem',
        0.25: '0.063rem',
      },
      transitionProperty: {
        maxHeight: 'max-height',
        width: 'width',
      },
      letterSpacing: {
        tightest: '0.075em', // 1.2px
      },
      animation: {
        fade: 'fade .3s ease-in',
        'slide-up': 'slide-up .3s ease-out',
        'slide-down': 'slide-down .3s ease-out',
        'float-zoom': 'float-zoom .3s ease-in-out',
        'zoom-in': 'zoom-in .3s ease-in',
      },
      boxShadow: {
        blackLight: '0px 4px 24px 0px rgba(0, 0, 0, 0.05)',
        blackLightV2: '0px 8px 24px 0px rgba(0, 0, 0, 0.10)',
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'slide-up': {
          from: { transform: 'translateY(200px)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { transform: 'translateY(-200px)' },
          to: { transform: 'translateY(0)' },
        },
        'float-zoom': {
          from: { transform: 'translateY(500px) scale(0.3)' },
          to: { transform: 'translateY(0) scale(1)' },
        },
      },
      width: {
        15: '3.75rem', // 60px
        18: '4.5rem', //72px
        22: '5.5rem', //88px
        24: '6rem', //96px
        24.5: '6.125rem', //98px
        31: '7.75rem', //124px
        33: '8.125rem', //130px
        35: '8.75rem', // 140px
        42: '10.5rem', // 168px
        53: '13.25rem', // 212px
        55: '13.75rem', // 220px
        66: '16.25rem', // 260px
        70.5: '17.375rem', // 278px
        87: '21.75rem', // 348px
        95: '23.75rem', // 380px
        110: '27.5rem', // 440px
        120: '30rem', // 480px
        180: '45rem', // 720px
        190: '47.5rem', // 760px
      },
      minWidth: {
        46: '11.5rem', // 200px
        55: '13.75rem', // 220px
        80: '20rem', // 320px
        95: '23.75rem', // 380px
        sm: '25rem', // 400px
        120: '30rem', // 480px
        base: '45rem', // 720px
        md: '52.5rem', // 840px
        lg: '88rem', // 1408px
        xl: '90rem', // 1440px
      },
      maxWidth: {
        44: '11rem', // 176px
        xs: '16.75rem', // 284px
        87: '21.75rem', // 348px
        sm: '24.25rem', // 388px
        99: '24.75rem', // 396px
        base: '45rem', // 720px
        md: '52.5rem', // 840px
        lg: '88rem', // 1408px
        xl: '90rem', // 1440px
        '4/5': '80%', // 80%,
      },
      minHeight: {
        28: '7rem', // 112px
        57.75: '14.438rem', // 231px
        sm: '18.75rem', //300px
        md: '31.25rem', //500px
      },
      maxHeight: {
        40: '10rem', // 160px
        sm: '18.75rem', //300px
        md: '31.25rem', //500px
        lg: '42.5rem', // 680px
        base: '45rem', // 720px
      },
      height: {
        0.25: '0.0625rem', // 1px
        0.5: '0.125rem', // 2px
        15: '3.75rem', // 60px
        17: '4.25rem', //68px
        18: '4.5rem', //72px
        31: '7.75rem', //124px
        45.5: '11.375rem', // '182px
        70.5: '17.625rem', // 282px
        75: '18.75rem', // 300px
        md: '31.25rem', //500px
        lg: '42.5rem', // 680px
      },
      margin: {
        14.5: '3.625rem', // 58px
        29.5: '7.375rem', // 118px
        34: '8.5rem', // 136px
      },
      padding: {
        0.25: '0.063rem', // 1px
        1.5: '0.375rem', // 6px
        2.5: '0.625rem', // 10px
        3.5: '0.875rem', // 14px
        4.5: '1.125rem', // 18px
        8.5: '2.125rem', // 34px
        14.5: '3.625rem', // 58px
        15: '3.75rem', // 60px
        22: '5.5rem', // 88px
        29.5: '7.375rem', // 118px
      },
      gap: {
        15: '3.75rem', // 60px
      },
      fontSize: {
        1.75: '0.445rem', // 7px
        2.25: '0.563rem', // 9px
        2.5: '0.625rem', // 10px
        10: '2.5rem', // 40px
      },
      lineHeight: {
        3.5: '0.875rem', //14px
        12: '3rem', // 48px
      },
      borderWidth: {
        0.5: '2px',
        0.25: '1px',
      },
      borderRadius: {
        7.5: '1.875rem', // 30px
        5: '1.25rem', // 20px
        2.5: '0.625rem', // 10px
      },
      screens: {
        xs: '30rem', // 480px
        sm: '48rem', // 768px
        md: '64rem', // 1024px
        lg: '80rem', // 1280px
        xl: '90rem', // 1440px
      },
      colors: {
        transparent: 'transparent',
        secondary: '#F3F3F3',
        tertiary: '#A1A2A3',
        stroke: '#E7E8E8',
        // Content Colors
        white: '#FFFFFF',
        black: '#000000',
        red: '#F64F4F',
        lightGolden: '#D9AC69',
        darkGreen: '#134D2E',
        lightPink: '#E8C1C1',
        rose: '#B7000B',
        darkGray: '#424547',
        // BG Colors
        lightSilver: '#ECF1F0',
        lightGray: '#F2F2F2',
        orange: '#F4935C',
        limeYello: '#FCF976',
      },
      backgroundImage: {
        artBoy: "url('/art-boy.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
