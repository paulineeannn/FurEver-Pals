/**
 * PROGRAM TITLE:
 *     Style Definitions for Dashboard
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This file defines the style rules used in the Dashboard screen.
 * 
 * DATE WRITTEN:
 *     June 28, 2024
 * 
 * DATE REVISED:
 *     July 1, 2024
 * 
 * PURPOSE:
 *     The styles are used to create a consistent layout and design for the Dashboard Screen
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
  container: {
    flex: 1,
    marginTop: 0,
    height: '79%',
  },
  header: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  // Input field for user text
  textInput: {
    fontSize: FONT_SIZES.large,
    padding: DIMENSIONS.marginMedium,
    flex: 1,
    color: COLORS.primary,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    backgroundColor: COLORS.white,
    width: '60%',
    marginTop: DIMENSIONS.marginLarge * 2,
    marginBottom: DIMENSIONS.marginLarge,
    marginLeft: DIMENSIONS.marginLarge,
  },
  // Invisible space between elements
  blocker: {
    width: '12%',
  },
  // Button for adding adoption posts
  buttonAddAdopt: {
    marginTop: 42,
    marginBottom: DIMENSIONS.marginLarge,
    backgroundColor: COLORS.buttonBackground,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    width: '10%',
    height: '38%',
    marginRight: DIMENSIONS.marginMedium + 5,
    marginLeft: DIMENSIONS.marginSmall + 1,
  },
  // Text inside the adoption button
  textAdd: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  // Container for gallery content
  contentGallery: {
    marginBottom: '10%',
    alignItems: 'center',
  },
  // Wrapper for gallery items
  containerGallery: {
    width: '90%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: DIMENSIONS.marginMedium,
  },
  // Left-aligned layout
  LeftAligned: {
    justifyContent: 'left',
  },
  // Centered layout
  Centered: {
    justifyContent: 'center',
  },
  // Container for individual pet gallery items
  containerPetGallery: {
    backgroundColor: COLORS.white,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    margin: DIMENSIONS.marginSmall,
  },
  // Styling for gallery images
  galleryImg: {
    width: 165,
    height: 165,
    aspectRatio: 1,
    borderTopLeftRadius: DIMENSIONS.borderRadiusMedium,
    borderTopRightRadius: DIMENSIONS.borderRadiusMedium,
  },
  // Layout for text below gallery images
  galleryLine: {
    flexDirection: 'column',
    margin: DIMENSIONS.marginSmall,
    marginBottom: DIMENSIONS.marginLarge - 6,
  },
  // Style for pet names
  petName: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.large + 2,
    flex: 1,
    justifyContent: 'flex-start',
    color: COLORS.primary,
    marginLeft: DIMENSIONS.marginSmall,
  },
  // Style for small icons
  iconImage: {
    width: 14,
    height: 14,
    marginRight: DIMENSIONS.marginSmall,
    marginLeft: DIMENSIONS.marginSmall,
  },
  // Container for dashboard information
  dashboardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: DIMENSIONS.marginSmall,
  },
  headerText: {
    marginTop: DIMENSIONS.marginLarge * 2 + 5,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.heading,
    width: '70%',
    textAlign: 'center',
  },
});

export default styles;
