import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [mobilenum, setMobilenum] = useState('');
  const [address, setAddress] = useState('');
  const [petKnowledge, setPetKnowledge] = useState(0);
  const [stableLiving, setStableLiving] = useState(0);
  const [flexTimeSched, setFlexTimeSched] = useState(0);
  const [environment, setEnvironment] = useState(0);

  // Function to fetch user information from the backend
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://192.168.1.195:8000/user-details?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setUserInfo(data);
          populateFields(data);
        } else {
          console.error('Empty response data');
        }
      } else {
        console.error('Failed to fetch user info. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Function to populate text fields with fetched user data
  const populateFields = (data) => {
    setEmail(data.email);
    setPassword(data.setPassword);
    setFirstname(data.firstname);
    setMiddlename(data.middlename);
    setLastname(data.lastname);
    setBirthday(data.birthday.substring(0, 10)); // Assuming the birthday format is YYYY-MM-DDTHH:MM:SS
    setMobilenum(data.mobilenum);
    setAddress(data.address);
    setPetKnowledge(data.pet_knowledge);
    setStableLiving(data.stable_living);
    setFlexTimeSched(data.flex_time_sched);
    setEnvironment(data.environment);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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

  const handleEdit = async () => {
    const user = {
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      birthday,
      mobilenum,
      address,
      pet_knowledge: petKnowledge,
      stable_living: stableLiving,
      flex_time_sched: flexTimeSched,
      environment: environment,
    };

    console.log("Updated user data:", JSON.stringify(user, null, 2));

    try {
      const response = await fetch(`http://192.168.1.195:8000/update-user-details/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Update successful');
        navigation.navigate('ProfileInfo', { username });
      } else {
        const errorData = await response.json();
        Alert.alert('Error', 'Update failed: ' + (errorData.detail || 'An unknown error occurred'));
        console.error("Update failed:", errorData || response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during updating');
    }
  };

  if (!userInfo) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
          {file ? (
            <Image style={styles.imgProfile} source={{ uri: file }} resizeMode="cover" />
          ) : (
            <Image
              style={styles.imgProfile}
              source={require('../assets/profile-placeholder2.png')}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formContainerContent}>
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Account Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Email*</Text>
          </View>
          <TextInput style={styles.textInput} value={email} onChangeText={text => setEmail(text)} />

          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Personal Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.formTwoColumns}>
            <View style={[styles.flexColumn, styles.marginRight]}>
              <Text style={styles.labelTextInput}>First Name*</Text>
              <TextInput style={styles.textInputHalf} value={firstname} onChangeText={text => setFirstname(text)} />
            </View>

            <View style={styles.flexColumn}>
              <Text style={styles.labelTextInput}>Middle Name</Text>
              <TextInput style={styles.textInputHalf} value={middlename} onChangeText={text => setMiddlename(text)} />
            </View>
          </View>

          <View style={styles.formTwoColumns}>
            <View style={[styles.flexColumn, styles.marginRight]}>
              <Text style={styles.labelTextInput}>Last Name*</Text>
              <TextInput style={styles.textInputHalf} value={lastname} onChangeText={text => setLastname(text)} />
            </View>

            <View style={styles.flexColumn}>
              <Text style={styles.labelTextInput}>Birthday*</Text>
              <TextInput style={styles.textInputHalf} placeholder='YYYY-MM-DD' value={birthday} onChangeText={text => setBirthday(text)} />
            </View>
          </View>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Mobile Number*</Text>
          </View>
          <TextInput style={styles.textInput} value={mobilenum} onChangeText={text => setMobilenum(text)} />

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Address*</Text>
          </View>
          <TextInput style={styles.textInput} value={address} onChangeText={text => setAddress(text)} />

          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Characteristics</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Pet Knowledge*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={petKnowledge}
            onValueChange={value => setPetKnowledge(value)}
          />

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Stable Living*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={stableLiving}
            onValueChange={value => setStableLiving(value)}
          />

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Flexible Time Schedule*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={flexTimeSched}
            onValueChange={value => setFlexTimeSched(value)}
          />

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Environment*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={environment}
            onValueChange={value => setEnvironment(value)}
          />

          <View style={styles.CenterContainer}>
            <Pressable style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#725144',
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
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    width: 160,
    height: 160,
    borderRadius: 100,
    aspectRatio: 1,
    marginTop: 80,
  },
  formContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 150,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  formContainerContent: {
    marginTop: 70,
    marginBottom: 0,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  formHeadingContainer: {
    alignItems: 'flex-start',
    width: '85%',
    marginTop: '7%',
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#725144',
  },
  horizontalLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#D1D1D1',
    marginTop: 8,
    marginBottom: 15,
  },
  flexLeftAlign: {
    width: '83%',
  },
  labelTextInput: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
    color: '#7F7F7F',
  },
  textInput: {
    fontSize: 13,
    padding: 10,
    width: '84%',
    backgroundColor: '#E8DFDD',
    borderRadius: 10,
    marginBottom: 15,
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
    marginRight: 10,
  },
  textInputHalf: {
    fontSize: 13,
    padding: 10,
    width: '100%',
    backgroundColor: '#E8DFDD',
    borderRadius: 10,
    marginBottom: 15,
  },
  Slider: {
    width: '85%',
    marginBottom: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    marginTop: 15,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#725144',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
});
