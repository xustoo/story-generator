import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StoryGenerator from './components/storyGenerator';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoryGenerator />
    </SafeAreaView>
  );
};
//deneme2 
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default App;
