import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import supabase from './supabaseClient';
import Avatar from './Avatar';

const HomeScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      return;
    }
    setUser(user);
  };

  const handleOpenCamera = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      uploadProfilePicture(result.assets[0].uri);
    }
  };

  const uploadProfilePicture = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileExt = imageUri.split('.').pop();
      const fileName = `profile_${Date.now()}.${fileExt}`;
      
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
        });
  
      if (uploadError) {
        throw new Error(uploadError.message);
      }
  
      const { data: imageUrl, error: urlError } = await supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
  
      if (urlError) {
        throw new Error(urlError.message);
      }
  
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: imageUrl.publicUrl })
        .eq('id', user.id);
  
      if (updateError) {
        throw new Error(updateError.message);
      }
  
      // Atualiza o estado local apenas após o sucesso em todas as etapas
      setProfilePicture(imageUrl.publicUrl);
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: 'https://wallpapers.com/images/high/pink-and-blue-pattern-marble-4k-mqufywb7yeli4fvm.webp' }}
      />
      <View style={styles.middleContainer}>
        <Avatar
          size={100}
          url={profilePicture}
          onUpload={(url) => setProfilePicture(url)}
        />
        <View style={styles.followContainer}>
          <Text style={styles.followCount1k}>1k</Text>
          <Text style={styles.followLabel}>Followers</Text>
          <Text style={styles.followCount}>345</Text>
          <Text style={styles.followLabel2}>Following</Text>
        </View>
        <Text style={styles.name}>@Catherine12</Text>
        <Text style={styles.bio}>
          My name is Catherine. I like dancing in the rain and travelling all around the world.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Videos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Image
          style={styles.smallImage}
          source={{ uri: 'https://img.freepik.com/fotos-premium/melhor-foto-aleatoria_865967-171027.jpg' }}
        />
        <Image
          style={styles.smallImage2}
          source={{ uri: 'https://www.papeiseparede.com.br/7634-thickbox_default/papel-de-parede-paisagem-montanhas-geladas.jpg.webp' }}
        />
        <Image
          style={styles.smallImage3}
          source={{ uri: 'https://www.queroviajarmais.com/wp-content/uploads/2020/08/lago-louise.jpg' }}
        />
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Wallet')}>
          <Icon name="wallet" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={handleOpenCamera}>
          <Icon name="camera" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.foto_perfil}
        source={{ uri: profilePicture || 'https://-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZzfthlaKemTEHg8k8nm0tw2xBK6bZdpIqxIXhs256YElYmK5lA9TF0VQq32UpHW93zQ&usqp=CAU' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    bottom: -20,
  },
  cameraButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    bottom: -20,
    marginLeft: 10,
  },
  foto_perfil: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '15%',
  },
  middleContainer: {
    position: 'absolute',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    bottom: '-10%',
    height: '90%',
    width: '100%',
    backgroundColor: '#EEEFA',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  followButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    width: '50%',
  },
  messageButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  tabButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    width: '30%',
  },
  tabText: {
    color: 'black',
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followCount1k: {
    fontWeight: 'bold',
    marginHorizontal: 30,
    padding: 10,
  },
  followLabel: {
    fontWeight: 'bold',
    marginRight: 50,
    padding: 10,
  },
  followCount: {
    fontWeight: 'bold',
    marginHorizontal: 30,
    padding: 10,
  },
  followLabel2: {
    fontWeight: 'bold',
    marginRight: 30,
    padding: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  smallImage2: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  smallImage3: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default HomeScreen;
