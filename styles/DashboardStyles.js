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
  blocker: {
    width: '12%',
  },
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
  textAdd: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  contentGallery: {
    marginBottom: '10%',

    alignItems: 'center',
  },
  containerGallery: {
    width: '90%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: DIMENSIONS.marginMedium,
  },
  LeftAligned: {
    justifyContent: 'left',
  },
  Centered : {
    justifyContent: 'center',
  },
  containerPetGallery: {
    backgroundColor: COLORS.white,
    borderRadius: DIMENSIONS.borderRadiusMedium,
    margin: DIMENSIONS.marginSmall,
  },
  galleryImg: {
    width: 165, 
    height: 165, 
    aspectRatio: 1,
    borderTopLeftRadius: DIMENSIONS.borderRadiusMedium,
    borderTopRightRadius: DIMENSIONS.borderRadiusMedium,
  },
  galleryLine: {
    flexDirection: 'column',
    margin: DIMENSIONS.marginSmall,
    marginBottom: DIMENSIONS.marginLarge - 6,
  },  
  petName: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.large + 2,
    flex: 1,
    justifyContent: 'flex-start',
    color: COLORS.primary,
    marginLeft: DIMENSIONS.marginSmall,
  },
  iconImage: {
    width: 14,
    height: 14,
    marginRight: DIMENSIONS.marginSmall,
    marginLeft: DIMENSIONS.marginSmall,
  },
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
