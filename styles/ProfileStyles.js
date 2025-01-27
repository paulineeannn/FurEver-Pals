/**
 * PROGRAM TITLE:
 *     Style Definitions for Profile (Info and Paws) Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Profile (Info and Paws) Screen.
 * 
 * DATE WRITTEN:
 *     May 12, 2024
 * 
 * DATE REVISED:
 *     May 16, 2024
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Profile (Info and Paws) Screen.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    flex: 1,
    backgroundColor: COLORS.white, 
  },
  Container: {
    marginTop: 30,
    height: '95%', 
  },
  logoutContainer: {
    width: '97%',
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: '10%',
    height: '5%',
  },
  accountContainer: {
    height: '53%',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: DIMENSIONS.marginLarge, 
    paddingBottom: 10,
  },
  imageProfile: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100, 
    width: 160, 
    height: 160, 
    aspectRatio: 1,
  },
  textName: {
    fontSize: FONT_SIZES.subheading, 
    color: COLORS.primary, 
    fontWeight: 'bold',
  },
  textUsername: {
    fontSize: FONT_SIZES.large, 
    color: COLORS.secondary, 
  },
  accountInfoContainer: {
    height: '28%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: DIMENSIONS.marginMedium, 
  },
  profileNavContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%'
  },
  textNavigation: {
    fontSize: FONT_SIZES.large + 2, 
    textAlign: 'center',
    marginHorizontal: '16%',
  },
  textNavigationActive: {
    fontWeight: 'bold',
    color: COLORS.primary, 
  },
  textNavigationInactive: {
    color: COLORS.secondary, 
    fontWeight: 'bold',
  },
  containerProfile: {
    backgroundColor: COLORS.background, 
    borderTopRightRadius: DIMENSIONS.borderRadiusLarge * 2, 
    borderTopLeftRadius: DIMENSIONS.borderRadiusLarge * 2, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    minHeight: '100%'
  },

  // Rounded edge container
  containerProfileContent: {
    width: '88%',
    height: '100%',
    paddingTop: DIMENSIONS.marginLarge, 
    flexDirection: 'column',
  }, 
  personalHeadingContainer: {
    flexDirection: 'row',
  },

  // Info Styles
  containerInfo: {
    width: '90%',
    marginHorizontal: 'auto'
  },
  sectionLabel: {
    fontSize: FONT_SIZES.extraLarge + 1, 
    color: COLORS.primary, 
    height: 30,
    textTransform: 'uppercase',
    marginBottom: DIMENSIONS.marginSmall, 
    fontWeight: 'bold',
  },
  labelPersonal: {
    width: '69%',
  },
  horizontalLine: {
    borderWidth: 0.7, 
    width: '100%',
    borderColor: COLORS.secondary, 
    marginBottom: DIMENSIONS.marginMedium, 
  }, 
  editButton: {
    width: '20%',
    height: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.modalText, 
    borderRadius: DIMENSIONS.borderRadiusSmall, 
    marginLeft: DIMENSIONS.marginLarge + 15, 
    marginBottom: 0,
    marginTop: 2, 
  }, 
  editButtonText: {
    color: COLORS.white, 
    fontSize: FONT_SIZES.medium, 
  },
  infoTable: {
    flexDirection: 'row',
    marginBottom: DIMENSIONS.marginLarge + 10, 
  },
  infoColumn1: {
    width: '40%',
  },
  infoColumn2: {
    width: '60%',
  },
  infoLabel: {
    color: COLORS.primary, 
    marginBottom: DIMENSIONS.marginMedium + 5, 
    fontWeight: 'bold',
  },
  infoAnswer: {
    marginBottom: DIMENSIONS.marginMedium + 5, 
    color: COLORS.primary, 
  },
  infoLabelChar: {
    color: COLORS.primary, 
    marginBottom: DIMENSIONS.marginSmall, 
  },
  outerBar: {
    backgroundColor: COLORS.modalText, 
    width: '100%',
    height: 27,
    borderRadius: DIMENSIONS.borderRadiusMedium, 
    marginBottom: DIMENSIONS.marginMedium, 
  },
  innerBar: {
    backgroundColor: COLORS.secondary, 
    width: '50%',
    height: '100%',
    borderRadius: DIMENSIONS.borderRadiusMedium, 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DIMENSIONS.marginLarge + 2, 
  },

  // Paws Styles
  containerPaws: {
    width: '97%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerEmptyPaws: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  noPetsText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.extraLarge,
    color: COLORS.primary,
    marginBottom: DIMENSIONS.marginMedium,
  },  
  buttonAddAdopt: {
    backgroundColor: COLORS.buttonBackground,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textAdd: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.extraLarge - 3,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  postedPetsContainer : {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'left',
  },
  containerPetGallery: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 5,
    width: 155
  },
  galleryImg: {
    width: 155, 
    height: 155, 
    aspectRatio: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  galleryLine: {
    height: 40,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  galleryInfo: {
    flex: 1,
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6A2D2B',
    marginVertical: 7,
    marginLeft: 10
  },

  // Modal Styles
  modalView: {
    margin: DIMENSIONS.marginLarge, 
    backgroundColor: COLORS.white, 
    borderRadius: DIMENSIONS.borderRadiusLarge, 
    padding: DIMENSIONS.modalPadding, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: 130, 
    borderRadius: DIMENSIONS.borderRadiusMedium, 
    padding: DIMENSIONS.marginMedium, 
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: COLORS.secondary, 
  },
  buttonConfirm: {
    backgroundColor: COLORS.primary, 
  },
  textStyle: {
    color: COLORS.white, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: DIMENSIONS.marginMedium + 5, 
    textAlign: 'center',
  },
});

export default styles;
