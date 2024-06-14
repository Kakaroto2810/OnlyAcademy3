// FeedScreen.js
import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const posts = [
  {
    id: '1',
    user: 'JohnDoe',
    image: 'https://via.placeholder.com/400x300',
    likes: 120,
    description: 'Loving the sunset!',
  },
  {
    id: '2',
    user: 'JaneDoe',
    image: 'https://via.placeholder.com/400x300',
    likes: 80,
    description: 'Great day at the beach!',
  },
  // Adicione mais postagens conforme necessário
];

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.username}>{item.user}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <View style={styles.postFooter}>
              <Text style={styles.likes}>{item.likes} likes</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  postFooter: {
    padding: 10,
  },
  likes: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
  },
});

export default FeedScreen;
