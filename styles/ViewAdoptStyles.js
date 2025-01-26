import { COLORS, DIMENSIONS, FONT_SIZES } from './Variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: COLORS.background,
    },
    content: {
      padding: '7%',
      paddingTop: '6%',
      width: '100%',
      backgroundColor: COLORS.background,
      borderRadius: '10%',
      marginTop: 360,
      zIndex: 1, 
    },
    containerImage: {
      display: 'flex',
      width: '100%',
      height: DIMENSIONS.imageHeight,
      position: "absolute",
      top: 0,
    },
    petImage: {
      width: '100%',
      height: DIMENSIONS.imageHeight,
    },
    header: {
      fontSize: FONT_SIZES.large,
      fontWeight: 'bold',
      marginBottom: DIMENSIONS.marginLarge,
      textAlign: 'center',
    },
    detailContainer: {
      flexDirection: 'column',
      marginBottom: DIMENSIONS.marginMedium,
      marginTop: DIMENSIONS.marginSmall,
    },
    lineName: {
      display: 'flex',
      flexDirection: 'row',
    },
    marginLeft: {
      marginLeft: DIMENSIONS.marginSmall,
    },
    valuesFirst: {
      width: '50%',
    },
    buttonAdopt: {
      backgroundColor: COLORS.buttonBackground,
      borderRadius: DIMENSIONS.borderRadiusLarge,
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: DIMENSIONS.marginSmall * 2,
    },
    iconAdopt: {
      marginTop: DIMENSIONS.marginSmall,
    },
    containerTwo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: DIMENSIONS.marginMedium,
    },
    containerDetailsTwo: {
      width: '48%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: DIMENSIONS.marginMedium + DIMENSIONS.marginSmall,
      borderWidth: 2,
      borderRadius: DIMENSIONS.borderRadiusLarge,
      borderColor: COLORS.primary,
      marginTop: DIMENSIONS.marginSmall,
    },
    buttonTextLarge: {
      fontSize: FONT_SIZES.extraLarge,
      fontWeight: 'bold',
      color: COLORS.primary,
      textAlign: 'center',
      marginLeft: DIMENSIONS.marginSmall,
    },
    label: {
      fontWeight: 'bold',
      fontSize: FONT_SIZES.extraLarge,
      color: COLORS.primary,
      width: '100%',
      textAlign: 'center',
    },
    value: {
        flex: 1,
        color: COLORS.primary,
        fontSize: FONT_SIZES.large,
        width: '100%',
        textAlign: 'center',
        opacity: 0.7,
        marginTop: 2,
    },
    description: {
        textAlign: 'left',
        marginBottom: '2%',
    },
    descriptionHeading: {
        color: COLORS.primary,
        fontSize: FONT_SIZES.large,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    valueName: {
      fontSize: FONT_SIZES.heading + 2,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginLeft: DIMENSIONS.marginSmall,
    },
    valueSex: {
      fontSize: FONT_SIZES.large + 5,
      fontWeight: 'bold',
      color: COLORS.secondary,
      marginTop: 5,
      marginBottom: 5
    },
    center: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: DIMENSIONS.marginLarge,
    },
  });
  
export default styles;