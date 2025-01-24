import React, { useState, useEffect } from 'react';
import styles from '../styles/CommunityStyles';

import { Text, View, Image, ScrollView, TextInput, Modal, Pressable, RefreshControl } from 'react-native';
import moment from 'moment';

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
      const requestBody = {
        username: username,
        sharedpost: SharedTips,
        date_posted: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      const response = await fetch(`http://${config.ipAddress}:8000/user-posts/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        setSuccessModalVisible(true);
        setSharedTips('');
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
        const sortedPosts = data.posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted)); // Descending order
        setPosts(sortedPosts);
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

        {posts.map((post, index) => {
          // Convert the ISO date to a human-readable date and time
          const date = new Date(post.date_posted);

          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, // Ensures 12-hour format with AM/PM
          });

          return (
            <View style={styles.containerSharedTip} key={index}>
              <View style={styles.postAccountDetails}>
                <Image style={styles.postImage} source={require('../assets/profile-placeholder.png')} />
                <View>
                  <Text style={styles.postName}>{post.username}</Text>
                  <Text style={styles.postDate}>{`${formattedTime} ${formattedDate}`}</Text> 
                </View>
              </View>
              <Text style={styles.postTip}>{post.post_content}</Text>
            </View>
          );
        })}


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