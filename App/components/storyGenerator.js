import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { generateStory } from '../main/storyService';

// Set the backend URL to your computer's IP address
const BACKEND_URL = 'http://192.168.20.169:5000';  // Replace with your computer's IP

const StoryGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [story, setStory] = useState('');

  const handleGenerateStory = async () => {
    try {
      const storyResult = await generateStory(keywords.split(','), BACKEND_URL);  // Pass BACKEND_URL
      setStory(storyResult);
    } catch (error) {
      console.error("Error generating stooory:", error.response || error.message || error);
      alert('Error generating story');

    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Anahtar kelimeleri virgülle ayırarak girin"
        value={keywords}
        onChangeText={setKeywords}
        style={styles.input}
      />
      <Button title="Hikaye Oluştur" onPress={handleGenerateStory} />
      {story ? <Text style={styles.story}>{story}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderColor: 'gray', borderWidth: 1, padding: 8, marginVertical: 12 },
  story: { marginTop: 16, fontSize: 16 }
});

export default StoryGenerator;
