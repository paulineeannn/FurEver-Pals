import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, Linking, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

export default function AdoptionForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [selectedUri, setSelectedUri] = useState(null);
  const [file, setFile] = useState(null); // Stores the selected image URI 
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [careResponsibility, setCareResponsibility] = useState('');
  const [petCarePlan, setPetCarePlan] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [reasonForAdoption, setReasonForAdoption] = useState('');

  // Function to pick an image from the device's media library 
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
        console.log("File updated:", selectedUri);
      }
    }
  };

  // Function to handle form submission
  const handleAddPaws = async () => {
    const user = {
      username: route.params.username,
      name: name.trim() || null,
      age: parseInt(age) || null,
      sex: value,
      complete_address: completeAddress.trim() || null,
      fur_pic: selectedUri,
      occupation: occupation.trim() || null,
      care_responsibility: careResponsibility.trim() || null,
      pet_care_plan: petCarePlan.trim() || null,
      clinic_name: clinicName.trim() || null,
      reason_for_adoption: reasonForAdoption.trim() || null,
    };

    try {
      const response = await fetch('http://192.168.5.116:8000/add-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessModalVisible(true); // Show success modal on successful submission
      } else {
        const errorData = await response.json(); // Try to get error details from response
        Alert.alert(
          'Error',
          'Registration failed: ' + (errorData.detail || 'An unknown error occurred')
        );
        console.error("Registration failed:", errorData || response.statusText); // Log more detailed error
      }
    } catch (error) {
      console.error('Error:', error); // Log the original error
      Alert.alert('Error', 'An error occurred during registration');
      console.log("Network or server error:", error); // Log network/server-related error
    }
  };

  // Function to handle navigation after success
  const handleSuccessConfirm = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Dashboard', { navigation, route });
  };

  // Modal confirmation functions
  const confirmSubmission = () => {
    setModalVisible(false);
    setSuccessModalVisible(true);
  };

  const cancelSubmission = () => {
    setModalVisible(false);
    // Additional cancellation logic if needed
  };

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContainerContent}>
        <Text style={styles.TextHeading}>Pet Adoption Application Form</Text>
        <Text style={styles.TextSubheading}>Personal Information</Text>
        <View style={styles.horizontalLine}></View>

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name*</Text>
        </View>
        <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Address</Text>
        </View>
        <TextInput style={styles.textInput} value={completeAddress} onChangeText={text => setCompleteAddress(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Occupation or Source of Income</Text>
        </View>
        <TextInput style={styles.textInput} value={occupation} onChangeText={text => setOccupation(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Who will be responsible for the pet’s care?</Text>
        </View>
        <TextInput style={styles.textInput} value={careResponsibility} onChangeText={text => setCareResponsibility(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>How do you plan to care for the pet? (e.g., feeding, grooming)</Text>
        </View>
        <TextInput style={[styles.textInput, styles.inputParagraph]} multiline={true} numberOfLines={5} value={petCarePlan} onChangeText={text => setPetCarePlan(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name of the clinic you intend to bring the pet.</Text>
        </View>
        <TextInput style={styles.textInput} value={clinicName} onChangeText={text => setClinicName(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>What are your reasons for adopting a pet?</Text>
        </View>
        <TextInput style={[styles.textInput, styles.inputParagraph]} multiline={true} numberOfLines={5} value={reasonForAdoption} onChangeText={text => setReasonForAdoption(text)} />

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
                source={require('../assets/id-upload.png')}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonContainer}>
          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Submit Form</Text>
          </Pressable>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to submit the form?</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmSubmission}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Form submitted successfully!</Text>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleSuccessConfirm}
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
    paddingBottom: '30%',
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
    height: 100,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    alignItems: 'center',
    borderRadius: 20,
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
    paddingBottom: 12,
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
    fontSize: 13
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
