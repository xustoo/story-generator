import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const BACKEND_URL = 'http://192.168.20.169:5000';  // Replace with your computer's IP address


const StoryGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/generate-story`, { keywords: keywords.split(',') });
      setStory(response.data.story); // Get the generated story from the backend response
    } catch (error) {
      console.error("Error generating story:", error);
      alert('Error generating story');
    }
  };


  return (
    <View>
      <TextInput
        placeholder="Enter keywords"
        value={keywords}
        onChangeText={setKeywords}
      />
      <Button title="Generate Story" onPress={generateStory} />
      <Text>{story}</Text>
    </View>
  );
};

export default StoryGenerator;
