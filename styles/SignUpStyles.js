/**
 * PROGRAM TITLE:
 *     Style Definitions for Sign Up Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Sign Up Screen.
 * 
 * DATE WRITTEN:
 *     May 11, 2024
 * 
 * DATE REVISED:
 *     May 16, 2024
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Sign Up Screen.
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
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  imgProfile: {
    width: 160,
    height: 160,
    borderRadius: 100,
    aspectRatio: 1,
    marginTop: 80,
  },
  formContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 150,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  formContainerContent: {
    marginTop: 70,
    marginBottom: 0,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  formHeadingContainer: {
    alignItems: 'flex-start',
    width: '85%',
    marginTop: '7%',
  },
  formHeading: {
    fontSize: 20,
    color: COLORS.modalText,
    fontWeight: 'bold',
  },
  // for separating content
  horizontalLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#D1D1D1',
    marginTop: 8,
    marginBottom: 15,
  },
  // date picker
  birthdayPicker: {
    marginLeft: 10,
    marginTop: 7
  },
  // Container for date picker 
  containerPicker: {
    backgroundColor: '#E8DFDD',
    height: 36,
    borderRadius: 10,
    marginBottom: 0
  },
  // Text for selected birthday 
  birthdayInput: {
    fontSize: 13,
  },
  flexLeftAlign: {
    width: '83%',
  },
  // Label text input with gray color and left alignment
  labelTextInput: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
    color: '#7F7F7F',
  },
  textInput: {
    fontSize: 13,
    padding: 10,
    width: '84%',
    backgroundColor: '#E8DFDD',
    borderRadius: 10,
    marginBottom: 15,
  },
  // Form layout with two columns that wrap elements
  formTwoColumns: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
    width: 160,
  },
  marginRight: {
    marginRight: 10,
  },

  textInputHalf: {
    fontSize: 13,
    padding: 10,
    width: '100%',
    backgroundColor: '#E8DFDD',
    borderRadius: 10,
    marginBottom: 15,
  },
  Slider: {
    width: '85%',
    marginBottom: 25,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: COLORS.modalText,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.white,
  },

  // Container for "Don't Have an account yet" text
  containerOneLineText: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  textPlain: {
    fontSize: 13,
    color: '#7F7F7F',
  },
  logInText: {
    fontSize: 13,
    color: COLORS.modalText,
  },
  CenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  // Password icon with absolute positioning
  iconPassword: {
    height: 20,
    position: 'absolute',
    bottom: 23,
    left: 125,
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
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
  buttonClose: {
    width: 130,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#A38277',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
