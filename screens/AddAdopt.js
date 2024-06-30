import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, Linking, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from 'react-native-dropdown-picker';


export default function AddAdopt() {
  const navigation = useNavigation();
    
  const route = useRoute();
  const [selectedUri, setSelectedUri] = useState(null);
  const { username } = route.params;
  const [file, setFile] = useState(null); // Stores the selected image URI 
  const [error, setError] = useState(null); // Stores any error message 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' }
  ]);

  // Function to pick an image from the device's media library 
 // Function to pick an image from  the device's media library 
 const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  console.log('Permission status:', status);

  if (status !== 'granted') { // If permission is denied, show an alert 
    Alert.alert(
      'Permission Denied',
      'Sorry, we need camera roll permission to upload images.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]
    );
  } else { // Launch the image library and get the selected image 
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setSelectedUri(selectedUri);
      setFile(selectedUri);
      setError(null);
      console.log("File updated:", selectedUri);
    }
  }
};

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [complete_address, setcomplete_address] = useState('');
  const [description, set_description] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Modal confirmation functions
  const confirmSubmission = () => {
    setSuccessModalVisible(true);
  };

  // Function to handle navigation after success
  const handleAddPaws = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Dashboard', { navigation, route });
  };



  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContainerContent}>
        <Text style={styles.TextHeading}>Post Pet</Text>
        <Text style={styles.TextSubheading}>Pet Information</Text>
        <View style={styles.horizontalLine}></View>
        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name*</Text>
        </View>
        <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)} />

        <View style={styles.formTwoColumns}>
          <View style={[styles.flexColumn, styles.marginRight]}>
            <Text style={styles.labelTextInput}>Age</Text>
            <TextInput style={[styles.textInputHalf, styles.marginRight, styles.inputAge]} value={age} onChangeText={text => setAge(text)} />
          </View>

          <View style={styles.flexColumn}>
            <Text style={styles.labelTextInput}>Sex</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.dropdown}
            />
          </View>
        </View>

        <View style={[styles.flexLeftAlign, styles.marginTop]}>
          <Text style={styles.labelTextInput}>Location</Text>
          {/* <Text style={styles.labelTextFormat}>Format: Unit, Building Name, House Number, Street, Barangay, City, Region, Zip Code</Text> */}
        </View>
        <TextInput style={styles.textInput} value={complete_address} onChangeText={text => setcomplete_address(text)} />
        

        <View style={[styles.flexLeftAlign]}>
          <Text style={styles.labelTextInput}>Description</Text>
        </View>
        <TextInput style={[styles.textInput, styles.inputParagraph]} multiline={true} numberOfLines={15} /*value={complete_address}*/ onChangeText={text => set_description(text)} />
        
        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Fur Pic*</Text>
        </View>
        
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
            {file ? (
              <Image style={styles.imgProfile} source={{ uri: file }} resizeMode="cover" />
            ) : (
              <Image
                style={styles.imgProfile}
                source={require('../assets/pet-upload.png')}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonContainer}>
          <Pressable style={styles.button} onPress={confirmSubmission}>
            <Text style={styles.buttonText}>Post for Adoption</Text>
          </Pressable>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pet posted successfully!</Text>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleAddPaws}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#F9EBD8',
    height: '100%',
  },
  ContainerContent: {
    marginTop: 50,
    width: '85%',
    margin: 'auto',
    paddingBottom: '70%'
  },
  horizontalLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#A38277',
    marginBottom: 20,
  },
  TextHeading: {
    fontSize: 30,
    color: "#6A2D2B",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextSubheading: {
    fontSize: 20,
    color: "#6A2D2B",
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  labelTextInput: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
    color: '#A38277',
  },
  inputAge: {
    height: 49
  },
  dropdown: {
    backgroundColor: '#F9EBD8',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2,
    paddingBottom: 0
  },
  labelTextFormat: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'left',
    color: '#A38277',
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  inputParagraph: {
    height: '30%',
    textAlignVertical: 'top',
    justifyContent: "flex-start"
  },
  textInputHalf: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  pickerContainer: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  formTwoColumns: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    top: 174
  },
  marginTop: {
    marginTop: 80
  },
  flexColumn: {
    flexDirection: 'column',
    width: 155
  },
  marginRight: {
    marginRight: 15
  },
  uploadContainer: {
    alignItems: 'center',
    borderRadius: 20
  },
  buttonUploadPicture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    width: 240,
    height: 240,
    aspectRatio: 1,
    borderRadius: 20
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginBottom: 50,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#725144',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: '95%',
    alignSelf: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingBottom: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#725144'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonConfirm: {
    backgroundColor: '#725144',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    elevation: 2,
    width: '50%'
  },
  buttonClose: {
    backgroundColor: '#A38277',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    width: '50%'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});