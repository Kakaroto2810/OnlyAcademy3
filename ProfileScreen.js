import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import supabase from './supabaseClient';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setBio(data.bio);
      setLocation(data.location);
      setBirthdate(data.birthdate);
    }
  };

  const saveProfile = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from('profile')
      .upsert({ user_id: user.id, first_name: firstName, last_name: lastName, bio, location, birthdate });

    if (error) {
      console.error('Error saving profile:', error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } else {
      Alert.alert('Success', 'Profile saved successfully!');
    }
  };

  if (!profile) {
    return null; // Retornar null enquanto os dados do perfil estão sendo carregados
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <TextInput
        style={styles.input}
        value={birthdate}
        onChangeText={setBirthdate}
        placeholder="Birthdate"
      />
      <Button title="Save" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProfileScreen;
