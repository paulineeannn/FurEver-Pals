/**
 * PROGRAM TITLE:
 *     Community Screen 
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This screen allows users to share and view tips and advice with fellow pet owners. 
 * 
 * DATE WRITTEN:
 *     July 1, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     The purpose of this screen is to allow users to share tips related to pet ownership. It also provides functionality 
 *     to view other users' tips in a feed format. The screen includes a submission form to post tips, and users can view 
 *     the latest posts shared by others. 
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The app uses state variables to manage shared tips, posts, refreshing status, and modal visibility. Posts are fetched 
 *     from the server and sorted by date, with the most recent posts appearing at the top. Data is fetched using the `fetch()` 
 *     function, and the date formatting is handled by JavaScript's `Date` object.
 */


import React, { useState, useEffect } from 'react';
import styles from '../styles/CommunityStyles';

import { Text, View, Image, ScrollView, TextInput, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import moment from 'moment';

import BottomNavigationBar from './BottomNavigationBar';
import config from './config.js';

// Error Messages Constants
const ERROR_MESSAGES = {
  FETCH_POSTS_FAILED: 'Failed to fetch posts. Please try again later.',
  POST_SUBMISSION_FAILED: 'Failed to submit the post. Please try again later.',
  POST_FETCH_ERROR: 'Error fetching posts.',
};

export default function Community({ navigation, route }) {
  // Extract username from route parameters
  const { username } = route.params;

  // State variables
  const [sharedTips, setSharedTips] = useState('');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Post submission handler
  const confirmSubmission = async () => {
    try {
      const requestBody = {
        username: username,
        sharedpost: sharedTips,
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
  
  // Fetch posts from the server
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
      setPosts([]); 
    }
  };
  
  // Refresh the posts feed
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  };

  // Initialize component by fetching posts
  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <View style={styles.screen}>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FurEver Tips</Text>
        <Text style={styles.subheadingText}>Share and Discover Tips from Pet Owners</Text>
      </View>

      {/* Scrollable Feed */}
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Tip Submission Input */}
        <TextInput
          style={[styles.textInput, styles.inputParagraph]}
          placeholder='Got a FurEver Friend Hack? Share it Here!'
          multiline={true}
          numberOfLines={5}
          value={sharedTips}
          onChangeText={text => setSharedTips(text)}
        />

        {/* Share Button */}
        <View style={styles.containerShareButton}>
          <TouchableOpacity style={styles.shareButton} onPress={confirmSubmission}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Displaying Posts */}
        {posts.map((post, index) => {
          // Convert the ISO date to a date and 12-hour format with AM/PM
          const date = new Date(post.date_posted);

          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, 
          });

          return (
            <View style={styles.containerSharedTip} key={index}>
              <View style={styles.postAccountDetails}>
                <Image style={styles.postImage} source={{ uri: `data:image/jpeg;base64,${post.profile_photo}` }} />
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
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => {
                setSuccessModalVisible(false);
                fetchPosts();
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
}