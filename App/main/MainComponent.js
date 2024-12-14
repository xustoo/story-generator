import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const StoryGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: keywords.split(' ') }),
      });
      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error(error);
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
