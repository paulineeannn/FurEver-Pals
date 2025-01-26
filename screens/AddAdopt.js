import React, { useState, useEffect } from 'react';
import styles from '../styles/AddAdoptStyles';

import { Text, View, Image, TextInput, TouchableOpacity, Alert, Linking, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import config from './config.js';

export default function AddAdopt() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' }
  ]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') { 
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
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFile(selectedUri);
        setError(null);
      }
    }
  };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [complete_address, setcomplete_address] = useState('');
  const [description, set_description] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const confirmSubmission = async () => {
    if (!name || !file) {
      Alert.alert("Error", "Please provide a name and upload a photo.");
      return;
    }
  
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]; // Get base64 string
  
        const payload = {
          username,
          pet_name: name,
          pet_age: age ? parseInt(age, 10) : null,
          sex: value,
          location: complete_address,
          description,
          pet_photo: base64data,
        };
  
        try {
          const response = await fetch(`http://${config.ipAddress}:8000/add-pet`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
          if (!response.ok) {
            if (response.status >= 400 && response.status < 500) {
              const errorData = await response.json();
              Alert.alert("Client Error", `Failed to post pet: ${JSON.stringify(errorData)}`);
            } else if (response.status >= 500) {
              Alert.alert("Server Error", "An error occurred on the server. Please try again later.");
            } else {
              Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
            return;
          }
  
          setSuccessModalVisible(true);
        } catch (error) {
          if (error.message.includes('Network request failed')) {
            Alert.alert("Network Error", "Please check your internet connection and try again.");
          } else {
            Alert.alert("Error", `An unexpected error occurred: ${error.message}`);
          }
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      Alert.alert("Error", `An unexpected error occurred: ${error.message}`);
    }
  };

  const handleAddPaws = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Dashboard', { ...route.params });
  };

  return (
    <FlatList
      style={styles.Container}
      data={[]}
      renderItem={() => null}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <>
          <View style={styles.ContainerContent}>
            <Text style={styles.TextHeading}>Post Pet</Text>
            <Text style={styles.TextSubheading}>Pet Information</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.flexLeftAlign}>
              <Text style={styles.labelTextInput}>Name*</Text>
            </View>
            <TextInput style={styles.textInput} value={name} onChangeText={setName} />
  
            <View style={styles.formTwoColumns}>
              <View style={[styles.flexColumn, styles.marginRight]}>
                <Text style={styles.labelTextInput}>Age</Text>
                <TextInput
                  style={[styles.textInputHalf, styles.marginRight, styles.inputAge]}
                  value={age}
                  onChangeText={setAge}
                />
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
              <Text style={styles.labelTextInput}>Location*</Text>
            </View>
            <TextInput style={styles.textInput} value={complete_address} onChangeText={setcomplete_address} />
  
            <View style={[styles.flexLeftAlign]}>
              <Text style={styles.labelTextInput}>Description</Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.inputParagraph]}
              multiline={true}
              numberOfLines={15}
              onChangeText={set_description}
            />
  
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
              <TouchableOpacity style={styles.button} onPress={confirmSubmission}>
                <Text style={styles.buttonText}>Post for Adoption</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={() => setSuccessModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Pet posted successfully!</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={handleAddPaws}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      }
    />
  );
}
