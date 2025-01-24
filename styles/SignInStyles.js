import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1, 
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: '20%',
      marginBottom: '15%',
    },
    formContainer: {
      marginBottom: 0,
      backgroundColor: COLORS.white,
      flex: 1,
      alignItems: 'center',
      width: '100%',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },
    headingForm: {
      marginTop: '10%',
      fontSize: FONT_SIZES.subheading,
      marginBottom: DIMENSIONS.marginSmall,
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    subheadingForm: {
      fontSize: FONT_SIZES.large,
      marginBottom: DIMENSIONS.marginLarge *2,
      color: '#7F7F7F',
    },
    labelText: {
      fontSize: FONT_SIZES.medium,
      marginBottom: DIMENSIONS.marginSmall,
      textAlign: 'left',
      color: '#7F7F7F',
    },
    flexLeftAlign: {
      width: '75%',
    },
    textInput: {
      fontSize: 15,
      padding: 12,
      width: '75%',
      backgroundColor: '#E8DFDD',
      borderRadius: DIMENSIONS.borderRadiusMedium,
      marginBottom: DIMENSIONS.marginMedium,
    },
    textInputPassword: {
      fontSize: 15,
      padding: 12,
      width: '75%',
      backgroundColor: '#E8DFDD',
      borderRadius: DIMENSIONS.borderRadiusMedium,
      marginBottom: DIMENSIONS.marginMedium,
      marginBottom: 50,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '65%',
      marginBottom: DIMENSIONS.marginMedium,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: DIMENSIONS.borderRadiusSmall * 2,
      backgroundColor: COLORS.modalText,
    },
    buttonText: {
      fontSize: FONT_SIZES.medium,
      color: COLORS.white,
    },
    containerOneLineText: {
      flexDirection: 'row',
      marginBottom: DIMENSIONS.marginLarge * 2,
    },
    textPlain: {
      fontSize: FONT_SIZES.medium,
      color: '#7F7F7F',
    },
    createAccountText: {
      fontSize: FONT_SIZES.medium,
      color: COLORS.modalText,
    },
    iconPassword: {
        height: 20,
        position: 'absolute',
        bottom: 60,
        left: 105
      }
});

export default styles;