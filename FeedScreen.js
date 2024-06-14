import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    user: 'Claire Dangais',
    username: '@ClaireD15',
    image: 'https://via.placeholder.com/400x200.png?text=Sunset',
    likes: 122,
    comments: 10,
  },
  {
    id: '2',
    user: 'Farita Smith',
    username: '@SmithFa',
    image: 'https://via.placeholder.com/400x200.png?text=Art',
    likes: 150,
    comments: 20,
  },
];

const FeedItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.userHandle}>{item.username}</Text>
    </View>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardFooter}>
      <Text>{item.comments} <Ionicons name="chatbubble-outline" size={16} /></Text>
      <Text>{item.likes} <Ionicons name="heart-outline" size={16} /></Text>
      <TouchableOpacity>
        <Ionicons name="share-social-outline" size={16} />
      </TouchableOpacity>
    </View>
  </View>
);

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -28,
    zIndex: 10,
  },
});

export default FeedScreen;
