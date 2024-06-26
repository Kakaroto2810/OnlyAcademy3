import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from './supabaseClient';

export default function Avatar({ url, size = 150, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(url);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) {
      setAvatarUrl(url); // Garante que o avatarUrl seja atualizado ao montar o componente com uma URL existente
    }
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.onload = () => {
        setAvatarUrl(fr.result); // Atualiza avatarUrl com a URL da imagem baixada
      };
      fr.readAsDataURL(data);
    } catch (error) {
      console.log('Error downloading image:', error.message);
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        console.log('User cancelled image picker.');
        return;
      }

      const image = result.uri;
      const response = await fetch(image);
      const blob = await response.blob();

      const fileExt = image.split('.').pop();
      const fileName = `profile_${Date.now()}.${fileExt}`;

      // Upload da imagem para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obter URL pública da imagem após o upload
      const { data: imageUrl, error: urlError } = await supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (urlError) {
        throw urlError;
      }

      // Atualizar estado local com a URL pública da nova imagem
      setAvatarUrl(imageUrl);

      // Chamar função de callback para atualizar imagem em contexto pai, se necessário
      onUpload(imageUrl);
      
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, avatarSize]}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={[styles.avatar, avatarSize]} />
        ) : (
          <View style={[styles.avatar, styles.noImage, avatarSize]} />
        )}
      </View>
      <Button
        title={uploading ? 'Uploading ...' : 'Upload'}
        onPress={uploadAvatar}
        disabled={uploading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  noImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
