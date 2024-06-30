import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';

export default function Community({ navigation, route }) {
  const { username } = route.params;

  const initialPosts = [
    {
      name: 'Cess Villas',
      tip: 'Hindi na kailangang stressful ang bath time! Gumamit ng maliit na lalagyan na may maligamgam na tubig, iwasan ang ulo. Shampoo na pang-pusa lang gamitin, tapos banlaw nang mabuti at patuyuin ng malambot na tuwalya. Purihin mo siya pagkatapos para maging positibo ang experience niya!'
    },
    {
      name: 'Yohan Kyle',
      tip: 'Kapag mainit ang panahon, tiyaking mayroon silang paw-spray! Isang pindot lang, instant presko! Parang A/C, pero para sa mga pusa! Para naman mabawasan ang konsumo nila sa kuryente, wala naman silang pambayad!'
    },
    {
      name: 'Liam Cruz',
      tip: 'Feeling boss na ba ang aso mo? Training time! Magsimula sa simpleng utos gaya ng "upo" at "tayo." Gumamit ka ng treats! Hikayatin mo siyang sundin ang mga ito, at apat pare-pareho tayo sa mga utos at maging mapagpasensya.'
    },
    {
      name: 'Jessie Mae',
      tip: 'Para tipid sa pag-aalaga ng pusa, gamitin ang lumang kahon bilang spaceship nila! Malilibang sila nang libre at ikaw naman ay makakatipid sa pambili ng mga mamahaling laruan!'
    },
    {
      name: 'Callie Pot',
      tip: 'Parang wala nang ibang ginawa si Meowsalot kundi matulog at magpa-cute? Kailangan niya ng laro para maging healthy! Maglaan ka ng oras araw-araw para sa playtime. Baka naman after maglaro, pwede na siyang tumulong sa mga gawaing bahay, \'di ba? (Char lang!)'
    }
  ];

  const [SharedTips, setSharedTips] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Modal confirmation functions
  const confirmSubmission = () => {
    setSuccessModalVisible(true);
  };

  // Function to handle navigation after success
  const handleTipPosting = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Community', { navigation, route });
  };

  const handleNavigate = (routeName) => {
    navigation.navigate(routeName);
  };

  useEffect(() => {
    console.log("Welcome to Community Page, " + username);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FurEver Tips</Text>
        <Text style={styles.subheadingText}>Share and Discover Tips from Pet Owners</Text>
      </View>

      <ScrollView style={styles.container}>

        <TextInput style={[styles.textInput, styles.inputParagraph]} placeholder='Got a FurEver Friend Hack? Share it Here!' multiline={true} numberOfLines={5} value={SharedTips} onChangeText={text => setSharedTips(text)} />

        <View style={styles.containerShareButton}>
          <Pressable style={styles.shareButton} onPress={confirmSubmission}>
            <Text style={styles.shareButtonText}>Share</Text>
          </Pressable>
        </View>


        {posts.map((post, index) => (
          <View style={styles.containerSharedTip} key={index}>
            <View style={styles.postAccountDetails}>
              <Image style={styles.postImage} source={require('../assets/profile-placeholder.png')} />
              <Text style={styles.postName}>{post.name}</Text>
            </View>
            <Text style={styles.postTip}>{post.tip}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tip posted successfully!</Text>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleTipPosting}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9EBD8',
  },
  header: {
    backgroundColor: '#A38277',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 25
  },
  subheadingText: {
    color: '#D9D9D9',
    fontSize: 15,
    marginBottom: 15
  },
  inputParagraph: {
    fontSize: 16,
    padding: 10,
    width: '90%',
    borderRadius: 20,
    marginBottom: 8,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: "#FEFBF7",
    marginLeft: 20,
    marginTop: 20
  },
  containerShareButton: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 22
  },
  shareButton: {
    width: '20%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#725144",
    borderRadius: 8,
    marginTop: 0
  }, 
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 15
  },
  containerSharedTip: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 20,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 15,
    padding: 10
  },
  postAccountDetails: {
    display: 'flex',
    flexDirection: 'row'
  },
  postImage: {
    width: 28,
    height: 28
  },
  postName: {
    color: '#725144',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 3
  },
  postTip: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 3
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 15,
    paddingBottom: 25,
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
    marginBottom: 10,
    color: '#725144',
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