/**
 * PROGRAM TITLE:
 *     Style Definitions for Edit Profile Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Edit Profile Screen.
 * 
 * DATE WRITTEN:
 *     May 13, 2024
 * 
 * DATE REVISED:
 *     May 16, 2024
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Edit Profile Screen, 
 *     including sections for user input and buttons.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';

const styles = StyleSheet.create({
Container: {
    backgroundColor: COLORS.modalText,
  },
  uploadContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  buttonUploadPicture: {
    height: DIMENSIONS.profileImgSize / 2.4,
    width: DIMENSIONS.profileImgSize / 2.4,
    borderRadius: DIMENSIONS.profileImgSize / 4.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    width: DIMENSIONS.profileImgSize / 1.5,
    height: DIMENSIONS.profileImgSize / 1.5,
    borderRadius: DIMENSIONS.profileImgSize / 2.4,
    aspectRatio: 1,
    marginTop: 80,
  },
  // Main container for the form
  formContainer: {
    borderTopRightRadius: DIMENSIONS.borderRadiusLarge * 2,
    borderTopLeftRadius: DIMENSIONS.borderRadiusLarge * 2,
    marginTop: 150,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  // Content container inside the form
  formContainerContent: {
    marginTop: 70,
    marginBottom: 0,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    paddingBottom: DIMENSIONS.marginLarge * 4,
  },
  // Container for the form heading
  formHeadingContainer: {
    alignItems: 'flex-start',
    width: '85%',
    marginTop: '7%',
  },
  formHeading: {
      fontSize: FONT_SIZES.extraLarge,
      fontWeight: 'bold',
      color: COLORS.modalText,
  },
  // Horizontal line divider  
  horizontalLine: {
      borderWidth: DIMENSIONS.borderWidth / 4,
      width: '100%',
      borderColor: '#D1D1D1',
      marginTop: DIMENSIONS.marginSmall * 2,
      marginBottom: DIMENSIONS.marginMedium,
    },
  // Left-aligned flex container
  flexLeftAlign: {
      width: '83%',
    },
  labelTextInput: {
      fontSize: FONT_SIZES.medium,
      marginBottom: DIMENSIONS.marginSmall,
      textAlign: 'left',
      color: '#7F7F7F',
    },
  textInput: {
      fontSize: FONT_SIZES.medium,
      padding: DIMENSIONS.marginSmall * 2,
      width: '84%',
      backgroundColor: '#E8DFDD',
      borderRadius: DIMENSIONS.borderRadiusMedium,
      marginBottom: DIMENSIONS.marginMedium,
    },
  // Layout for two-column form inputs
  formTwoColumns: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  // Flex container for a single column
  flexColumn: {
    flexDirection: 'column',
    width: 160,
  },
  // Adds right margin to an element
  marginRight: {
    marginRight: DIMENSIONS.marginSmall * 2,
  },
  // Input field for half-width inputs
  textInputHalf: {
    fontSize: FONT_SIZES.medium,
    padding: DIMENSIONS.marginSmall * 2,
    width: '100%',
    backgroundColor: '#E8DFDD',
    borderRadius: DIMENSIONS.borderRadiusMedium,
    marginBottom: DIMENSIONS.marginMedium,
  },
  // Picker container for birthday selection
  birthdayPicker: {
    marginLeft: 10,
    marginTop: 7,
  },
  // Container for dropdown picker
  containerPicker: {
    backgroundColor: '#E8DFDD',
    height: 36,
    borderRadius: 10,
    marginBottom: 0,
  },
  // Text styling for the birthday input
  birthdayInput: {
    fontSize: 13,
  },
  // Slider container styling
  Slider: {
    width: '85%',
    marginBottom: DIMENSIONS.marginLarge + DIMENSIONS.marginSmall,
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '65%',
      marginTop: DIMENSIONS.marginMedium + DIMENSIONS.marginSmall,
      marginBottom: DIMENSIONS.marginLarge,
      paddingVertical: DIMENSIONS.marginMedium + DIMENSIONS.marginSmall,
      paddingHorizontal: DIMENSIONS.marginLarge + DIMENSIONS.marginSmall,
      borderRadius: DIMENSIONS.borderRadiusMedium,
      backgroundColor: COLORS.modalText,
    },
  buttonText: {
      fontSize: FONT_SIZES.large,
      color: COLORS.white,
    },
});

export default styles;