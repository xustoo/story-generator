import os
import re
import numpy as np
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Dataset Path
dataset_path = "./backend/ai_model/children_stories.txt"

# Load Dataset
def load_data():
    with open(dataset_path, 'r', encoding='utf-8') as file:
        return file.read()

# Preprocess the data
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

# Prepare the model
def create_model(total_words, sequence_length):
    model = Sequential([
        Embedding(total_words, 100, input_length=sequence_length),
        LSTM(512, return_sequences=True),
        Dropout(0.3),
        LSTM(512),
        Dense(512, activation='relu'),
        Dropout(0.3),
        Dense(total_words, activation='softmax')
    ])
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    return model

# Load or Train Model
def train_model():
    data = preprocess_text(load_data())
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts([data])
    total_words = len(tokenizer.word_index) + 1

    # Generate sequences
    sequence_length = 20
    input_sequences = []
    words = data.split()
    for i in range(sequence_length, len(words)):
        seq = words[i-sequence_length:i+1]
        input_sequences.append(tokenizer.texts_to_sequences([" ".join(seq)])[0])

    input_sequences = pad_sequences(input_sequences, maxlen=sequence_length+1, padding='pre')
    X, y = input_sequences[:, :-1], input_sequences[:, -1]
    y = np.eye(total_words)[y]

    # Train or load model
    model_path = "./backend/models/children_story_model.h5"
    try:
        model = load_model(model_path)
    except:
        model = create_model(total_words, sequence_length)
        model.fit(X, y, epochs=20, batch_size=128)
        model.save(model_path)
    
    return model, tokenizer, sequence_length

# Generate story
def generate_story(keywords, num_words=150):
    model, tokenizer, sequence_length = train_model()
    seed_text = " ".join(keywords).lower()
    for _ in range(num_words):
        tokenized_input = tokenizer.texts_to_sequences([seed_text])[0]
        tokenized_input = pad_sequences([tokenized_input], maxlen=sequence_length, padding='pre')
        predicted_index = np.argmax(model.predict(tokenized_input), axis=-1)
        output_word = tokenizer.index_word.get(predicted_index[0], "")
        seed_text += " " + output_word
    return seed_text
