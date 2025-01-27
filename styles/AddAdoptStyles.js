/**
 * PROGRAM TITLE:
 *     Style Definitions for Add Pets for Adoption Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Add Pets for Adoption Screen screen.
 * 
 * DATE WRITTEN:
 *     June 27, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Add Pets for Adoption Screen, 
 *     including sections for user input, buttons, and modals.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The styles are structured as JavaScript objects with nested properties. 
 */

import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Container styles
    Container: {
        backgroundColor: COLORS.background,
        height: '100%',
    },
    ContainerContent: {
        width: '85%',
        margin: 'auto',
        paddingBottom: '70%',
    },
    ContainerHeading: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        height: '7.5%',
        justifyContent: 'center'
    },
    
    // Horizontal line style
    horizontalLine: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: COLORS.secondary,
        marginBottom: DIMENSIONS.marginLarge,
    },

    // Heading text style
    TextHeading: {
        fontSize: FONT_SIZES.heading,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '7%',
    },

    // Subheading text style
    TextSubheading: {
        fontSize: FONT_SIZES.subheading,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: DIMENSIONS.marginSmall,
        marginTop: DIMENSIONS.marginLarge,
    },

    // Label for input fields
    labelTextInput: {
        fontSize: FONT_SIZES.medium,
        marginBottom: DIMENSIONS.marginSmall,
        textAlign: 'left',
        color: COLORS.secondary,
    },

    // Specific input styles
    inputAge: {
        height: DIMENSIONS.inputHeight,
    },
    dropdown: {
        backgroundColor: COLORS.background,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        marginBottom: DIMENSIONS.marginMedium,
        borderColor: COLORS.primary,
        borderWidth: DIMENSIONS.borderWidth,
    },

    // Label for text formatting
    labelTextFormat: {
        fontSize: FONT_SIZES.small,
        marginBottom: DIMENSIONS.marginSmall,
        textAlign: 'left',
        color: COLORS.secondary,
    },

    // General text input field style
    textInput: {
        fontSize: FONT_SIZES.large,
        padding: DIMENSIONS.marginMedium,
        width: '100%',
        borderRadius: DIMENSIONS.borderRadiusLarge,
        marginBottom: DIMENSIONS.marginMedium,
        borderColor: COLORS.primary,
        borderWidth: DIMENSIONS.borderWidth,
    },

    // Textarea style for paragraphs
    inputParagraph: {
        height: '30%',
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
    },

    // Half-width input field
    textInputHalf: {
        fontSize: FONT_SIZES.large,
        padding: 10,
        width: '100%',
        borderRadius: 20,
        marginBottom: 15,
        borderColor: COLORS.primary,
        borderWidth: 2
    },

    // Picker component styling
    pickerContainer: {
        fontSize: FONT_SIZES.large,
        padding: 10,
        width: '100%',
        borderRadius: 20,
        marginBottom: 15,
        borderColor: COLORS.primary,
        borderWidth: 2
    },

    // Form layout with two columns
    formTwoColumns: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        position: 'absolute',
        top: DIMENSIONS.profileImgSize * 0.58,
    },

    // Margin-top styling for layout elements
    marginTop: {
        marginTop: DIMENSIONS.marginLarge * 4,
    },

    // Flex column for layout
    flexColumn: {
        flexDirection: 'column',
        width: 160,
        marginTop: DIMENSIONS.marginMedium,
    },

    // Right margin for layout
    marginRight: {
        marginRight: DIMENSIONS.marginMedium,
    },

    // Upload section styling
    uploadContainer: {
        alignItems: 'center',
        borderRadius: DIMENSIONS.borderRadiusLarge,
    },

    // Profile image styling
    imgProfile: {
        width: DIMENSIONS.profileImgSize,
        height: DIMENSIONS.profileImgSize,
        aspectRatio: 1,
        borderRadius: DIMENSIONS.borderRadiusLarge,
    },

    // Button container styling
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: DIMENSIONS.buttonWidth,
        marginTop: DIMENSIONS.marginLarge,
    },

    // General button styling
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        marginBottom: DIMENSIONS.marginLarge * 2.5,
        paddingVertical: DIMENSIONS.marginMedium,
        paddingHorizontal: DIMENSIONS.marginLarge,
        borderRadius: DIMENSIONS.borderRadiusMedium,
        backgroundColor: COLORS.modalText,
    },

    // Button text styling
    buttonText: {
        fontSize: FONT_SIZES.extraLarge,
        color: COLORS.white,
    },

    // Centered modal view container
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: DIMENSIONS.marginLarge * 1.1,
        width: '95%',
        alignSelf: 'center',
    },

    // Modal view style
    modalView: {
        margin: DIMENSIONS.marginLarge,
        backgroundColor: COLORS.white,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        padding: DIMENSIONS.modalPadding,
        paddingBottom: DIMENSIONS.marginSmall,
        alignItems: 'center',
        shadowColor: COLORS.modalText,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },

    // Modal text style
    modalText: {
        fontSize: FONT_SIZES.extraLarge,
        marginBottom: DIMENSIONS.marginMedium,
        color: COLORS.modalText,
    },

    // Button row style
    buttonRow: {
        flexDirection: 'row',
        marginTop: DIMENSIONS.marginMedium,
    },

    // Confirm button styling
    buttonConfirm: {
        backgroundColor: COLORS.modalText,
        paddingHorizontal: DIMENSIONS.marginSmall,
        paddingVertical: DIMENSIONS.marginMedium,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        marginRight: DIMENSIONS.marginMedium,
        elevation: 2,
        width: '50%',
    },

    // Close button styling
    buttonClose: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: DIMENSIONS.marginSmall,
        paddingVertical: DIMENSIONS.marginMedium,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        elevation: 2,
        width: '50%',
    },

    // Text styling for buttons
    textStyle: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
