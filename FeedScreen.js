import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'; // Importando a biblioteca
import supabase from './supabaseClient';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  };

  const handlePublish = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const fileName = `${uuid.v4()}.${uri.split('.').pop()}`; // Usando uuid para nome único
      const fileType = uri.split('.').pop();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') // Certifique-se de que o nome do bucket é "images"
        .upload(fileName, {
          uri,
          name: fileName,
          type: `image/${fileType}`,
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
      } else {
        const imageUrl = supabase.storage.from('images').getPublicUrl(fileName).publicURL;

        const { data: newPost, error: insertError } = await supabase
          .from('posts')
          .insert([
            { user_id: supabase.auth.user().id, post_type: 'image', content: 'New post', image_url: imageUrl },
          ]);

        if (insertError) {
          console.error('Error inserting post:', insertError);
        } else {
          fetchPosts(); // Refetch posts to include the new one
        }
      }
    }
  };

  const FeedItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{item.user_id}</Text>
        <Text style={styles.userHandle}>@username</Text>
      </View>
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />
      <View style={styles.cardFooter}>
        <Text>{item.likes} <Ionicons name="heart-outline" size={16} /></Text>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FeedItem item={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Explore</Text>
            <View style={styles.stories}>
              <View style={styles.story}><Text>You</Text></View>
              <View style={styles.story}><Text>Benjamin</Text></View>
              <View style={styles.story}><Text>Farita</Text></View>
              <View style={styles.story}><Text>Marie</Text></View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stories: {
    flexDirection: 'row',
    marginTop: 16,
  },
  story: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 14,
    color: '#888',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  publishButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedScreen;
