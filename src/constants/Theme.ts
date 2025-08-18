import { DefaultTheme } from "@react-navigation/native";

export const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    // Core brand colors
    primary: '#1E96FC',     // Warm orange for main actions
    secondary: '#072AC8',   // Playful pink for highlights
    accent: '#FCF300',      // Bright sky blue for accents

    // Background layers
    background: '#A2D6F9',  // Soft cream main background
    surface: '#CBE6F5',     // Card & surface background

    // Text & readability
    text: '#333333',        // Dark gray for main text
    textSecondary: '#5C5C5C', // Softer gray for secondary text

    // Borders & dividers
    border: '#FFD28C',      // Soft orange border

    // Status colors
    success: '#4CAF50',     // Fresh green for success states
    warning: '#FFC107',     // Amber for warnings
    error: '#E53935',       // Strong red for errors

    // Navigation specific
    card: '#FFFFFF',        // Card background
    notification: '#FF6B81',// Notification / alert color
  },
};
// const MyTheme = {
//   dark: false,
//   colors: {
//     primary: 'rgb(255, 45, 85)',
//     background: 'rgb(242, 242, 242)',
//     card: 'rgb(255, 255, 255)',
//     text: 'rgb(28, 28, 30)',
//     border: 'rgb(199, 199, 204)',
//     notification: 'rgb(255, 69, 58)',
//   },
//   fonts: {
//       regular: {
//         fontFamily: 'sans-serif',
//         fontWeight: 'normal',
//       },
//       medium: {
//         fontFamily: 'sans-serif-medium',
//         fontWeight: 'normal',
//       },
//       bold: {
//         fontFamily: 'sans-serif',
//         fontWeight: '600',
//       },
//       heavy: {
//         fontFamily: 'sans-serif',
//         fontWeight: '700',
//       },
//     },
// };