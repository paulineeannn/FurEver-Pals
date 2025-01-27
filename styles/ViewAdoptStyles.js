/**
 * PROGRAM TITLE:
 *     Style Definitions for View Pet for Adoption Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the View Pet for Adoption Screen.
 * 
 * DATE WRITTEN:
 *     June 28, 2024
 * 
 * DATE REVISED:
 *     January 24, 2025
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the View Pet for Adoption Screen.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Container for the main view
    container: {
      flexGrow: 1,
      backgroundColor: COLORS.background,
    },
    // Content area with padding and rounded corners
    content: {
      padding: '7%',
      paddingTop: '6%',
      width: '100%',
      backgroundColor: COLORS.background,
      borderRadius: '10%',
      marginTop: 360,
      zIndex: 1, 
    },
    // Image container with absolute positioning
    containerImage: {
      display: 'flex',
      width: '100%',
      height: DIMENSIONS.imageHeight,
      position: "absolute",
      top: 0,
    },
    // Pet image styling
    petImage: {
      width: '100%',
      height: DIMENSIONS.imageHeight,
    },
    // Header style with large font size and bold text
    header: {
      fontSize: FONT_SIZES.large,
      fontWeight: 'bold',
      marginBottom: DIMENSIONS.marginLarge,
      textAlign: 'center',
    },
    // Container for the pet details in a column layout
    detailContainer: {
      flexDirection: 'column',
      marginBottom: DIMENSIONS.marginMedium,
      marginTop: DIMENSIONS.marginSmall,
    },
    // Line for displaying name details in a row
    lineName: {
      display: 'flex',
      flexDirection: 'row',
    },
    // Left margin for some elements
    marginLeft: {
      marginLeft: DIMENSIONS.marginSmall,
    },
    // First value in a row that takes up half the space
    valuesFirst: {
      width: '50%',
    },
    // Button for adoption with background color and rounded corners
    buttonAdopt: {
      backgroundColor: COLORS.buttonBackground,
      borderRadius: DIMENSIONS.borderRadiusLarge,
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: DIMENSIONS.marginSmall * 2,
    },
    // Icon for the adoption button with top margin
    iconAdopt: {
      marginTop: DIMENSIONS.marginSmall,
    },
    // Container for buttons placed in a row
    containerTwo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: DIMENSIONS.marginMedium,
    },
    // Container for details with centered content and border
    containerDetailsTwo: {
      width: '48%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: DIMENSIONS.marginMedium + DIMENSIONS.marginSmall,
      borderWidth: 2,
      borderRadius: DIMENSIONS.borderRadiusLarge,
      borderColor: COLORS.primary,
      marginTop: DIMENSIONS.marginSmall,
    },
    // Large button text with bold styling and primary color
    buttonTextLarge: {
      fontSize: FONT_SIZES.extraLarge,
      fontWeight: 'bold',
      color: COLORS.primary,
      textAlign: 'center',
      marginLeft: DIMENSIONS.marginSmall,
    },
    // Label for sections, bold with large font size
    label: {
      fontWeight: 'bold',
      fontSize: FONT_SIZES.extraLarge,
      color: COLORS.primary,
      width: '100%',
      textAlign: 'center',
    },
    // Value styling for displaying information, centered and with opacity
    value: {
        flex: 1,
        color: COLORS.primary,
        fontSize: FONT_SIZES.large,
        width: '100%',
        textAlign: 'center',
        opacity: 0.7,
        marginTop: 2,
    },
    // Description text with left alignment
    description: {
        textAlign: 'left',
        marginBottom: '2%',
    },
    // Heading for description with bold text and primary color
    descriptionHeading: {
        color: COLORS.primary,
        fontSize: FONT_SIZES.large,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    // Styling for the pet's name, larger font and left margin
    valueName: {
      fontSize: FONT_SIZES.heading + 2,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginLeft: DIMENSIONS.marginSmall,
    },
    // Styling for sex information with larger font and secondary color
    valueSex: {
      fontSize: FONT_SIZES.large + 5,
      fontWeight: 'bold',
      color: COLORS.secondary,
      marginTop: 5,
      marginBottom: 5
    },
    // Centered container for content with large top margin
    center: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: DIMENSIONS.marginLarge,
    },
  });
  
export default styles;