// App/MainComponent.js
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const MainComponent = () => {
  const [keywords, setKeywords] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/generate-story', { keywords });
      setStory(response.data.story);
    } catch (error) {
      console.error('Hikaye oluşturulurken hata:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Anahtar kelimeler girin"
        value={keywords}
        onChangeText={setKeywords}
      />
      <Button title="Hikaye Oluştur" onPress={generateStory} />
      <Text>{story}</Text>
    </View>
  );
};

export default MainComponent;
