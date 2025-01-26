import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    horizontalLine: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: COLORS.secondary,
        marginBottom: DIMENSIONS.marginLarge,
    },
    TextHeading: {
        fontSize: FONT_SIZES.heading,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '7%',
    },
    TextSubheading: {
        fontSize: FONT_SIZES.subheading,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: DIMENSIONS.marginSmall,
        marginTop: DIMENSIONS.marginLarge,
    },
    labelTextInput: {
        fontSize: FONT_SIZES.medium,
        marginBottom: DIMENSIONS.marginSmall,
        textAlign: 'left',
        color: COLORS.secondary,
    },
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
    labelTextFormat: {
        fontSize: FONT_SIZES.small,
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
        height: '30%',
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
    },
    textInputHalf: {
        fontSize: FONT_SIZES.large,
        padding: 10,
        width: '100%',
        borderRadius: 20,
        marginBottom: 15,
        borderColor: COLORS.primary,
        borderWidth: 2
    },
    pickerContainer: {
        fontSize: FONT_SIZES.large,
        padding: 10,
        width: '100%',
        borderRadius: 20,
        marginBottom: 15,
        borderColor: COLORS.primary,
        borderWidth: 2
    },
    formTwoColumns: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        position: 'absolute',
        top: DIMENSIONS.profileImgSize * 0.58,
    },
    marginTop: {
        marginTop: DIMENSIONS.marginLarge * 4,
    },
    flexColumn: {
        flexDirection: 'column',
        width: 160,
        marginTop: DIMENSIONS.marginMedium,

    },
    marginRight: {
        marginRight: DIMENSIONS.marginMedium,
    },
    uploadContainer: {
        alignItems: 'center',
        borderRadius: DIMENSIONS.borderRadiusLarge,
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
        marginBottom: DIMENSIONS.marginLarge * 2.5,
        paddingVertical: DIMENSIONS.marginMedium,
        paddingHorizontal: DIMENSIONS.marginLarge,
        borderRadius: DIMENSIONS.borderRadiusMedium,
        backgroundColor: COLORS.modalText,
    },
    buttonText: {
        fontSize: FONT_SIZES.extraLarge,
        color: COLORS.white,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: DIMENSIONS.marginLarge * 1.1,
        width: '95%',
        alignSelf: 'center',
    },
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
    modalText: {
      fontSize: FONT_SIZES.extraLarge,
      marginBottom: DIMENSIONS.marginMedium,
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
      marginRight: DIMENSIONS.marginMedium,
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