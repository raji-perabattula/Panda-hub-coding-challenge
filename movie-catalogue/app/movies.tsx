import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getPopularMovies, getUpcomingMovies } from './services/movieService';
import { Movie } from './types/movie';
import { RANDOM_USER_IMAGE } from '../constants/BaseUrls';
import * as Styles from '../constants/StylingVariables';
import NowPlayingCarousel from './components/NowPlayingCarousel';
import CarouselSection from './components/CarouselSection';
import BottomNav from './components/BottomNav';

export default function MoviesScreen() {
  const [allNowPlaying, setAllNowPlaying] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [allComingSoon, setAllComingSoon] = useState<Movie[]>([]);
  const [comingSoon, setComingSoon] = useState<Movie[]>([]);
  const [isNowSeeAllClicked, setIsNowSeeAllClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(Math.floor(nowPlaying.length / 2));
  const [isComingSeeAllClicked, setIsComingSeeAllClicked] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getPopularMovies(1);
      setAllNowPlaying(res.results);
      setNowPlaying(res.results.slice(0, 5)); // Show only the first 5 movies initially
    } catch (err) {
      console.log('Error fetching movies:', err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      setLoading(true);
      const res = await getUpcomingMovies(1);
      setAllComingSoon(res.results);
      setComingSoon(res.results.slice(0, 5)); // Show only the first 5 movies initially
    } catch (err) {
      console.log('Error fetching movies:', err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
    fetchUpcomingMovies();
  }, []);

  // Update nowPlaying when isNowSeeAllClicked changes
  useEffect(() => {
    if (nowPlaying.length > 0) {
      if (isNowSeeAllClicked) setNowPlaying(allNowPlaying); // Show all movies if "See All" is clicked
      else setNowPlaying(allNowPlaying.slice(0, 5)); // Show only the first 5 movies
    }
  }, [isNowSeeAllClicked, allNowPlaying]);

  // Update comingSoon when isComingSeeAllClicked changes
  useEffect(() => {
    if (comingSoon.length > 0) {
      if (isComingSeeAllClicked) setComingSoon(allComingSoon); // Show all movies if "See All" is clicked
      else setComingSoon(allComingSoon.slice(0, 5)); // Show only the first 5 movies
    }
  }, [isComingSeeAllClicked, allComingSoon]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with profile icon */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeText}>Welcome Siva 👋</Text>
            <Text style={styles.subText}>Let's relax and watch a movie.</Text>
          </View>
          <Image
            source={{ uri: RANDOM_USER_IMAGE }}
            style={styles.avatar}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search movie, cinema, genre..."
            placeholderTextColor={Styles.secondaryTextColor}
            style={styles.searchInput}
          />
        </View>
        {/* Now Playing Section */}
        <NowPlayingCarousel 
        nowPlaying={nowPlaying} 
        isNowSeeAllClicked={isNowSeeAllClicked} 
        setIsNowSeeAllClicked={setIsNowSeeAllClicked} 
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        />
        {/* Coming Soon */}
        <CarouselSection 
        data={comingSoon}
        setIsComingSeeAllClicked={setIsComingSeeAllClicked}
        isComingSeeAllClicked={isComingSeeAllClicked}
        shouldSeeAllPresent={true}
        />
      </ScrollView>
      <BottomNav/>
    </SafeAreaView>
  );
}

export function SectionHeader({ title, onSeeAll, isSeeAllClicked }: { title: string; onSeeAll: () => void; isSeeAllClicked?: boolean }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={isSeeAllClicked ? styles.highlightSeeAll : styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Styles.backgroundDarkColor },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Styles.spacing16,
    alignItems: 'center',
  },
  welcomeText: { color: Styles.secondaryTextColor, fontSize: Styles.fontSizeSmall },
  subText: { color: Styles.primaryTextColor, fontSize: Styles.fontSizeMedium, marginTop: Styles.spacing4 },
  avatar: { width: Styles.avatarSize, height: Styles.avatarSize, borderRadius: Styles.borderRadiusMedium },
  searchContainer: { paddingHorizontal: Styles.spacing16, marginBottom: Styles.spacing20 },
  searchInput: {
    backgroundColor: Styles.searchBgColor,
    paddingHorizontal: Styles.spacing8,
    paddingVertical: Styles.spacing12,
    borderRadius: Styles.borderRadiusMedium,
    color: Styles.primaryTextColor,
    borderWidth: 1,
    borderColor: Styles.borderColor,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Styles.spacing16,
    marginBottom: Styles.spacing12
  },
  sectionTitle: { color: Styles.primaryTextColor, fontSize: Styles.fontSizeLarge },
  seeAll: { color: Styles.seeAllColor, fontSize: Styles.fontSizeSmall },
  highlightSeeAll: { fontWeight: Styles.fontBold, color: Styles.highlightColor },
});
