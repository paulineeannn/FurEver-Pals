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
formContainer: {
    borderTopRightRadius: DIMENSIONS.borderRadiusLarge * 2,
    borderTopLeftRadius: DIMENSIONS.borderRadiusLarge * 2,
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
    paddingBottom: DIMENSIONS.marginLarge * 4,
  },
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
horizontalLine: {
    borderWidth: DIMENSIONS.borderWidth / 4,
    width: '100%',
    borderColor: '#D1D1D1',
    marginTop: DIMENSIONS.marginSmall * 2,
    marginBottom: DIMENSIONS.marginMedium,
  },
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
formTwoColumns: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
flexColumn: {
    flexDirection: 'column',
    width: 160,
  },
marginRight: {
    marginRight: DIMENSIONS.marginSmall * 2,
  },
textInputHalf: {
    fontSize: FONT_SIZES.medium,
    padding: DIMENSIONS.marginSmall * 2,
    width: '100%',
    backgroundColor: '#E8DFDD',
    borderRadius: DIMENSIONS.borderRadiusMedium,
    marginBottom: DIMENSIONS.marginMedium,
  },
  birthdayPicker: {
    marginLeft: 10,
    marginTop: 7
  },
  containerPicker: {
    backgroundColor: '#E8DFDD',
    height: 36,
    borderRadius: 10,
    marginBottom: 0
  },
  birthdayInput: {
    fontSize: 13,
  },
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