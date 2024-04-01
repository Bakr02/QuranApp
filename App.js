import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import surahData from './surahs.json';

const windowWidth = Dimensions.get('window').width;

const Header = ({ darkMode }) => {
  return (
    <View
      style={[
        styles.headerContainer,
        darkMode && styles.darkHeaderContainer,
      ]}
    >
      <Text style={[styles.headerText, darkMode && styles.darkHeaderText]}>
        Quran App
      </Text>
    </View>
  );
};

const LastRead = ({ lastReadSurah, darkMode }) => {
  return (
    <View
      style={[
        styles.lastReadContainer,
        darkMode && styles.darkLastReadContainer,
      ]}
    >
      <Text style={[styles.lastReadText, darkMode && styles.darkText]}>
        Last Read:
      </Text>
      <Text style={[styles.lastReadSurahText, darkMode && styles.darkText]}>
        {lastReadSurah}
      </Text>
    </View>
  );
};

const LearnQuranRecite = ({ darkMode }) => {
  return (
    <View
      style={[
        styles.learnQuranReciteContainer,
        darkMode && styles.darkLearnQuranReciteContainer,
      ]}
    >
      <Text style={[
        styles.learnQuranReciteText,
        darkMode && styles.darkText,
      ]}>
        Learn Quran and Recite Once Everyday
      </Text>
    </View>
  );
};

const Footer = ({ darkMode }) => {
  return (
    <View
      style={[
        styles.footerContainer,
        darkMode && styles.darkFooterContainer,
      ]}
    >
      <Text style={[
        styles.footerText,
        darkMode && styles.darkFooterText,
      ]}>
        Get Started
      </Text>
    </View>
  );
};

const SurahItem = ({ surah, lastReadSurah, onPress, darkMode }) => (
  <TouchableOpacity
    style={[
      styles.surahItem,
      lastReadSurah === surah.english_name && styles.surahItemActive,
      darkMode && styles.darkSurahItem,
    ]}
    onPress={() => onPress(surah)}
  >
    <View style={styles.leftContainer}>
      <Text style={[
        styles.surahEnglishText,
        darkMode && styles.darkText,
      ]}>
        {surah.english_name}
      </Text>
    </View>
    <View style={styles.rightContainer}>
      <Text style={[
        styles.Text,
        darkMode && styles.darkText,
      ]}>
        {surah.arabic_name}
      </Text>
      <Text style={[
        styles.surahNumberText,
        darkMode && styles.darkSurahNumberText,
      ]}>
        Surah {surah.number}
      </Text>
    </View>
  </TouchableOpacity>
);

const QuranApp = () => {
  const [lastReadSurah, setLastReadSurah] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('Surah');
  const [searchResult, setSearchResult] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const surahs = surahData.surahs;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

  // Function to handle selecting a surah
  const handleSurahSelect = (selectedSurah) => {
    setLastReadSurah(selectedSurah.english_name);
    console.log('Surah selected:', selectedSurah.english_name);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Header darkMode={darkMode} />
      <LastRead
        lastReadSurah={lastReadSurah || 'None'}
        darkMode={darkMode}
      />
      <LearnQuranRecite darkMode={darkMode} />
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            darkMode && styles.darkSearchInput,
          ]}
          placeholder="Search by Surah"
          placeholderTextColor={darkMode ? '#ddd' : '#999'}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.darkModeToggleButton,
          darkMode && styles.darkModeToggleButtonDark,
        ]}
        onPress={toggleDarkMode}
      >
        <Text style={styles.darkModeToggleText}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
      <View style={styles.darkModeToggleText}>
        <FlatList
          data={searchResult.length > 0 ? searchResult : surahs}
          renderItem={({ item }) => (
            <SurahItem
              surah={item}
              lastReadSurah={lastReadSurah}
              onPress={handleSurahSelect}
              darkMode={darkMode}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <Footer darkMode={darkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkHeaderContainer: {
    backgroundColor: '#222',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  darkHeaderText: {
    color: '#ddd',
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
  darkText: {
    color: '#ddd',
  },
  learnQuranReciteContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  darkLearnQuranReciteContainer: {
    backgroundColor: '#222',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
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
    width: windowWidth - 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkSurahItem: {
    backgroundColor: '#222',
    borderColor: '#555',
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  surahEnglishText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  darkText: {
    color: '#ddd',
  },
  surahArabicText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  darkText: {
    color: '#ddd',
  },
  surahNumberText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  darkSurahNumberText: {
    color: '#ccc',
  },
  flatListContent: {
    alignItems: 'center',
  },
  footerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  darkFooterContainer: {
    backgroundColor: '#222',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkFooterText: {
    color: '#ddd',
  },
  darkModeToggleButton: {
    position: 'absolute',
    top: 85,
    right: 16,
    backgroundColor: '#008CBA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  darkModeToggleButtonDark: {
    backgroundColor: '#fff',
  },
  darkModeToggleText: {
    color: '#000',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  darkSearchInput: {
    color: '#ddd',
    borderColor: '#555',
  },
  searchButton: {
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
