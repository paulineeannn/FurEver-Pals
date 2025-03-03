/**
 * PROGRAM TITLE:
 *     Style Definitions for Community Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Community Screen.
 * 
 * DATE WRITTEN:
 *     July 1, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Community Screen, 
 *     including sections for user input, buttons, and modals.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  // Header Title
  headerText: {
    marginTop: 40,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.subheading,
  },
  subheadingText: {
    color: '#D9D9D9', 
    fontSize: FONT_SIZES.medium,
    marginBottom: DIMENSIONS.marginMedium,
  },
  // Multiline input style for paragraphs
  inputParagraph: {
    fontSize: FONT_SIZES.large,
    padding: DIMENSIONS.marginMedium,
    width: '90%',
    borderRadius: DIMENSIONS.borderRadiusLarge,
    marginBottom: DIMENSIONS.marginSmall,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    marginLeft: DIMENSIONS.marginLarge,
    marginTop: DIMENSIONS.marginLarge,
  },
  // Container for positioning the share button
  containerShareButton: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: DIMENSIONS.marginLarge,
  },
  shareButton: {
    width: '20%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.modalText,
    borderRadius: DIMENSIONS.borderRadiusSmall,
    marginTop: 0,
  }, 
  shareButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
  },
  containerSharedTip: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: DIMENSIONS.borderRadiusLarge,
    display: 'flex',
    alignSelf: 'center',
    marginTop: DIMENSIONS.marginMedium,
    padding: DIMENSIONS.marginMedium,
  },
  // Layout for user account details in a post
  postAccountDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  postImage: {
    width: 37, 
    height: 37, 
    marginTop: 1,
    borderRadius: 100, 
    aspectRatio: 1,
  },
  postName: {
    color: COLORS.modalText,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.large,
    marginLeft: DIMENSIONS.marginSmall,
  },
  postDate: {
    color: COLORS.primary,
    opacity: 0.6,
    fontSize: FONT_SIZES.medium,
    marginTop: DIMENSIONS.marginSmall * 0.4,
    marginLeft: DIMENSIONS.marginSmall,
  },
  // Text style for the tip content
  postTip: {
    fontSize: FONT_SIZES.medium,
    marginTop: DIMENSIONS.marginSmall,
    marginLeft: DIMENSIONS.marginSmall,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DIMENSIONS.marginLarge,
    width: '95%',
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    padding: DIMENSIONS.modalPadding,
    paddingTop: DIMENSIONS.marginLarge,
    paddingBottom: DIMENSIONS.marginLarge,
    alignItems: 'center',
    shadowColor: '#000',
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
    fontSize: FONT_SIZES.extraLarge,
    marginBottom: DIMENSIONS.marginSmall,
    color: COLORS.modalText,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: DIMENSIONS.marginMedium,
  },
  buttonConfirm: {
    backgroundColor: COLORS.modalText,
    paddingHorizontal: DIMENSIONS.marginSmall,
    paddingVertical: DIMENSIONS.marginMedium,
    borderRadius: DIMENSIONS.borderRadiusSmall,
    marginRight: DIMENSIONS.marginSmall,
    elevation: 2,
    width: '50%',
  },
  buttonClose: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: DIMENSIONS.marginSmall,
    paddingVertical: DIMENSIONS.marginMedium,
    borderRadius: DIMENSIONS.borderRadiusSmall,
    elevation: 2,
    width: '50%',
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;