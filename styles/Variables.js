/**
 * PROGRAM TITLE:
 *     Color, Dimension, and Font Size Definitions for Styling
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file contains the reusable constants for colors, dimensions, and font sizes used across different screens.
 * 
 * DATE WRITTEN:
 *     January 24, 2025
 * 
 * DATE REVISED:
 *     January 24, 2025
 * 
 * PURPOSE:
 *     The purpose of this file is to define common style values such as color schemes, layout dimensions, and font sizes.
 *     These constants help maintain consistent styling across various UI components in the app.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The data is structured into three constants: `COLORS`, `DIMENSIONS`, and `FONT_SIZES`, 
 *     each containing key-value pairs for respective properties.
 */

const COLORS = {
    background: '#F9EBD8', // light beige
    primary: '#6A2D2B', // dark brown
    secondary: '#B38E83', // muted rose
    buttonBackground: '#FBAA5A', // warm orange
    modalText: '#725144', // deep mocha
    white: '#FFFFFF', // pure white
};
  
const DIMENSIONS = {
    marginSmall: 5,
    marginMedium: 10,
    marginLarge: 20,
    imageHeight: 400,
    borderRadiusSmall: 5,
    borderRadiusMedium: 12,
    borderRadiusLarge: 20,
    borderWidth: 2,
    inputHeight: 49,
    profileImgSize: 240,
    buttonWidth: 320,
    buttonHeight: 50,
    modalPadding: 35,
};
  
const FONT_SIZES = {
    small: 10,
    medium: 13,
    large: 16,
    extraLarge: 20,
    heading: 30,
    subheading: 25,
};
  
export { COLORS, DIMENSIONS, FONT_SIZES };
  