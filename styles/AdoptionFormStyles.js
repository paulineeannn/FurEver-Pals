/**
 * PROGRAM TITLE:
 *     Style Definitions for Adoption Form Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Adoption Form Screen screen.
 * 
 * DATE WRITTEN:
 *     June 30, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Adoption Form Screen, 
 *     including sections for user input, buttons, and modals.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.background,
    height: '100%',
  },
  ContainerHeading: {
    backgroundColor: '#A38277',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '6%',
  },
  ContainerContent: {
    marginTop: DIMENSIONS.marginMedium,
    width: '82%',
    margin: 'auto',
    paddingBottom: '30%',
  },
  horizontalLine: {
    borderWidth: DIMENSIONS.borderWidth,
    width: '100%',
    borderColor: COLORS.secondary,
    marginBottom: DIMENSIONS.marginMedium,
  },
  TextHeading: {
    fontSize: FONT_SIZES.heading,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '5%'
  },
  TextSubheading: {
    fontSize: FONT_SIZES.subheading,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: DIMENSIONS.marginSmall,
    marginTop: DIMENSIONS.marginMedium,
  },
  labelTextInput: {
    fontSize: FONT_SIZES.medium,
    marginBottom: DIMENSIONS.marginSmall,
    textAlign: 'left',
    color: COLORS.secondary,
  },
  textInput: {
    fontSize: FONT_SIZES.large,
    padding: DIMENSIONS.marginMedium,
    width: '100%',
    borderRadius: DIMENSIONS.borderRadiusLarge,
    marginBottom: DIMENSIONS.marginMedium,
    borderColor: COLORS.primary,
    borderWidth: DIMENSIONS.borderWidth,
  },
  inputParagraph: {
    height: DIMENSIONS.imageHeight / 4, // Adjust based on desired paragraph height
    textAlignVertical: 'top',
  },
  uploadContainer: {
    alignItems: 'center',
    borderRadius: DIMENSIONS.borderRadiusLarge,
  },
  buttonUploadPicture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    width: DIMENSIONS.profileImgSize,
    height: DIMENSIONS.profileImgSize,
    aspectRatio: 1,
    borderRadius: DIMENSIONS.borderRadiusLarge,
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DIMENSIONS.buttonWidth,
    marginTop: DIMENSIONS.marginLarge,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginBottom: DIMENSIONS.marginLarge,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    backgroundColor: COLORS.modalText,
  },
  buttonText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: '95%',
    alignSelf: 'center',
  },
  modalView: {
    margin: DIMENSIONS.marginMedium,
    backgroundColor: COLORS.white,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    padding: DIMENSIONS.modalPadding,
    paddingBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.modalText,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: DIMENSIONS.marginSmall,
  },
  buttonConfirm: {
    backgroundColor: COLORS.modalText,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    elevation: 2,
    width: '50%',
  },
  buttonClose: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    width: '50%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
