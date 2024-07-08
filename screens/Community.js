import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Modal, Pressable, RefreshControl } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';
import config from './config.js';

export default function Community({ navigation, route }) {
  const { username } = route.params;

  const [SharedTips, setSharedTips] = useState('');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const confirmSubmission = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/user-posts/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sharedpost: SharedTips }),
      });
  
      if (response.ok) {
        setSuccessModalVisible(true);
        fetchPosts(); // Refresh posts after successful submission
      } else {
        console.error('Failed to post tip:', response.status);
      }
    } catch (error) {
      console.error('Error posting tip:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/all-user-posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      if (Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Set posts to an empty array in case of error
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNavigate = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FurEver Tips</Text>
        <Text style={styles.subheadingText}>Share and Discover Tips from Pet Owners</Text>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TextInput
          style={[styles.textInput, styles.inputParagraph]}
          placeholder='Got a FurEver Friend Hack? Share it Here!'
          multiline={true}
          numberOfLines={5}
          value={SharedTips}
          onChangeText={text => setSharedTips(text)}
        />

        <View style={styles.containerShareButton}>
          <Pressable style={styles.shareButton} onPress={confirmSubmission}>
            <Text style={styles.shareButtonText}>Share</Text>
          </Pressable>
        </View>

        {posts.map((post, index) => (
          <View style={styles.containerSharedTip} key={index}>
            <View style={styles.postAccountDetails}>
              <Image style={styles.postImage} source={require('../assets/profile-placeholder.png')} />
              <Text style={styles.postName}>{post.username}</Text>
            </View>
            <Text style={styles.postTip}>{post.post_content}</Text>
          </View>
        ))}
      </ScrollView>

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
              onPress={() => {
                setSuccessModalVisible(false);
                fetchPosts();
              }}
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
