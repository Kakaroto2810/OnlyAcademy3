// HomeScreen.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {
  const [showCamera, setShowCamera] = useState(false);

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraScreen navigation={navigation} handleCloseCamera={handleCloseCamera} />
      ) : (
        <>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: 'https://wallpapers.com/images/high/pink-and-blue-pattern-marble-4k-mqufywb7yeli4fvm.webp',
            }}
          />
          <View style={styles.middleContainer}>
            <View style={styles.followContainer}>
              <Text style={styles.followCount1k}>1k</Text>
              <Text style={styles.followLabel}>Followers</Text>
              <Text style={styles.followCount}>345</Text>
              <Text style={styles.followLabel2}>Following</Text>
            </View>
            <Text style={styles.title}>@Catherine12</Text>
            <Text style={styles.subtitle}>
              My name is Catherine. I like dancing in the rain and travelling all
              around the world.
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
              source={{
                uri: 'https://img.freepik.com/fotos-premium/melhor-foto-aleatoria_865967-171027.jpg',
              }}
            />
            <Image
              style={styles.smallImage2}
              source={{
                uri: 'https://www.papeiseparede.com.br/7634-thickbox_default/papel-de-parede-paisagem-montanhas-geladas.jpg.webp',
              }}
            />
            <Image
              style={styles.smallImage3}
              source={{
                uri: 'https://www.queroviajarmais.com/wp-content/uploads/2020/08/lago-louise.jpg',
              }}
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
            style={styles.profileImage}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZzfthlaKemTEHg8k8nm0tw2xBK6bZdpIqxIXhs256YElYmK5lA9TF0VQq32UpHW93zQ&usqp=CAU',
            }}
          />
        </>
      )}
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
  profileImage: {
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
padding: 10,
},
followContainer: {
flexDirection: 'row',
},
followCount: {
fontSize: 24,
fontWeight: 'bold',
left: 210,
},
followCount1k: {
fontSize: 24,
fontWeight: 'bold',
left: 60,
},
followLabel: {
fontSize: 16,
color: '#666',
bottom: -35,
left: 13,
},
followLabel2: {
fontSize: 16,
color: '#666',
bottom: -35,
left: 163,
},
title: {
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center',
bottom: -30,
},
subtitle: {
fontSize: 16,
color: '#666',
textAlign: 'center',
bottom: -40,
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 40,
bottom: -35,
},
followButton: {
backgroundColor: '#00f',
borderRadius: 20,
padding: 10,
flex: 1,
alignItems: 'center',
marginRight: 10,
},
messageButton: {
backgroundColor: '#fff',
borderRadius: 20,
padding: 10,
flex: 1,
alignItems: 'center',
marginLeft: 10,
},
buttonText: {
color: '#000',
fontWeight: 'bold',
},
tabContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 10,
bottom: -45,
},
tabButton: {
flex: 1,
alignItems: 'center',
},
tabText: {
color: '#000',
fontWeight: 'bold',
},
bottomContainer: {
flex: 1,
borderTopLeftRadius: 80,
borderTopRightRadius: 80,
bottom: '-110%',
height: '5%',
width: '100%',
backgroundColor: 'white',
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
padding: 10,
},
smallImage: {
width: 170,
borderTopLeftRadius: 60,
height: 300,
top: -210,
left: 30,
},
smallImage2: {
borderTopRightRadius: 60,
width: 160,
height: 150,
top: -288,
left: 95,
},
smallImage3: {
width: 160,
height: 140,
right: 27,
top: -130,
},
});

export default HomeScreen;
