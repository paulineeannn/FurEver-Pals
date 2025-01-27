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
  // Container with background color for the main view
  Container: {
    backgroundColor: COLORS.modalText,
  },
  // Upload container with absolute positioning for centered placement
  uploadContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  // Style for the upload picture button with circular shape
  buttonUploadPicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  // Profile image with circular shape and specific margin
  imgProfile: {
    width: 160,
    height: 160,
    borderRadius: 100,
    aspectRatio: 1,
    marginTop: 80,
  },
  // Form container with rounded top corners and full width
  formContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 150,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },

  // Content inside the form container with centered items
  formContainerContent: {
    marginTop: 70,
    marginBottom: 0,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  // Container for the form heading aligned to the left
  formHeadingContainer: {
    alignItems: 'flex-start',
    width: '85%',
    marginTop: '7%',
  },
  // Heading style for the form with large font size and bold weight
  formHeading: {
    fontSize: 20,
    color: COLORS.modalText,
    fontWeight: 'bold',
  },
  // Horizontal line used for separating content
  horizontalLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#D1D1D1',
    marginTop: 8,
    marginBottom: 15,
  },
  // Birthday picker with margin for alignment
  birthdayPicker: {
    marginLeft: 10,
    marginTop: 7
  },
  // Container for picker with a background color and rounded corners
  containerPicker: {
    backgroundColor: '#E8DFDD',
    height: 36,
    borderRadius: 10,
    marginBottom: 0
  },
  // Input field for birthday with a smaller font size
  birthdayInput: {
    fontSize: 13,
  },
  // Flex style to align elements to the left with width restriction
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
  // General text input styling with padding, background color, and rounded corners
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
  // Column layout with restricted width
  flexColumn: {
    flexDirection: 'column',
    width: 160,
  },
  // Right margin for spacing between elements
  marginRight: {
    marginRight: 10,
  },

  // Text input field that spans the full width
  textInputHalf: {
    fontSize: 13,
    padding: 10,
    width: '100%',
    backgroundColor: '#E8DFDD',
    borderRadius: 10,
    marginBottom: 15,
  },
  // Slider style with a set width and margin
  Slider: {
    width: '85%',
    marginBottom: 25,
  },
  // Button with full width, centered content, and modal text background color
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
  // Button text styling with white color and medium font size
  buttonText: {
    fontSize: 14,
    color: COLORS.white,
  },

  // Container for one-line text with row layout and bottom margin
  containerOneLineText: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  // Plain text styling with small font size and gray color
  textPlain: {
    fontSize: 13,
    color: '#7F7F7F',
  },
  // Login text with modal text color
  logInText: {
    fontSize: 13,
    color: COLORS.modalText,
  },
  // Centered container with fixed width for a specific element
  CenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  // Password icon with absolute positioning inside the container
  iconPassword: {
    height: 20,
    position: 'absolute',
    bottom: 23,
    left: 125,
  },
  // Modal background with full screen coverage and centered content
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal styling with padding, shadow, and border radius
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
  // Button row with space between elements
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  // Button close with background color and rounded corners
  buttonClose: {
    width: 130,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#A38277',
  },
  // Text style for the button with white color and centered text
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
