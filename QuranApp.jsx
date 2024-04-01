import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import surahData from './surahs.json'; // Importing the JSON file

const windowWidth = Dimensions.get('window').width;

// Header Component
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Quran App</Text>
    </View>
  );
};

// Last Read Component
const LastRead = ({ lastReadSurah }) => {
  return (
    <View style={styles.lastReadContainer}>
      <Text style={styles.lastReadText}>Last Read:</Text>
      <Text style={styles.lastReadSurahText}>{lastReadSurah}</Text>
      <Text style={styles.continueReadText}>Continue read Surah</Text>
    </View>
  );
};

// Learn Quran and Recite Component
const LearnQuranRecite = () => {
  return (
    <View style={styles.learnQuranReciteContainer}>
      <Text style={styles.learnQuranReciteText}>
        Learn Quran and Recite Once Everyday
      </Text>
    </View>
  );
};

// Footer Component
const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Get Started</Text>
    </View>
  );
};

// Surah Item Component
const SurahItem = ({ surah, lastReadSurah }) => (
  <TouchableOpacity
    style={[
      styles.surahItem,
      lastReadSurah === surah.english_name && styles.surahItemActive,
    ]}
    onPress={() => console.log('Surah selected:', surah.english_name)}
  >
    <Text style={styles.surahEnglishText}>{surah.english_name}</Text>
    <Text style={styles.surahArabicText}>{surah.arabic_name}</Text>
  </TouchableOpacity>
);

const QuranApp = () => {
  const lastReadSurah = 'AL-WAQI\'AH';
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('Surah');
  const [searchResult, setSearchResult] = useState([]);

  const surahs = surahData.surahs; // Getting surahs data from JSON

  // Function to filter surahs based on search text
  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchResult([]);
      return;
    }
    const filteredSurahs = surahs.filter(
      (surah) =>
        (searchBy === 'Surah' &&
          surah.english_name.toLowerCase().includes(searchText.toLowerCase())) ||
        (searchBy === 'Juz' && surah.juz.toString() === searchText)
    );
    setSearchResult(filteredSurahs);
  };

  return (
    <View style={styles.container}>
      <Header />
      <LastRead lastReadSurah={lastReadSurah} />
      <LearnQuranRecite />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search surah"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setSearchBy(searchBy === 'Surah' ? 'Juz' : 'Surah')}
        >
          <Text style={styles.searchButtonText}>
            {searchBy === 'Surah' ? 'Juz' : 'Surah'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <FlatList
          data={searchResult.length > 0 ? searchResult : surahs}
          renderItem={({ item }) => (
            <SurahItem surah={item} lastReadSurah={lastReadSurah} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          columnWrapperStyle={styles.flatListColumn}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastReadContainer: {
    margin: 16,
  },
  lastReadText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastReadSurahText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  continueReadText: {
    color: '#008CBA',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  learnQuranReciteContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  learnQuranReciteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  surahItem: {
    width: (windowWidth - 80) / 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
  },
  surahItemActive: {
    backgroundColor: '#008CBA',
  },
  surahEnglishText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  surahArabicText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  flatListContent: {
    alignItems: 'center',
  },
  flatListColumn: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  footerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuranApp;
