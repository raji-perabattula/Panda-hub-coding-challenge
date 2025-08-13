import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { getMovieDetails } from '../services/movieService';
import { MovieDetails } from '../types/movie';
import { dummyCinemaData, IMAGE_BASE, RANDOM_USER_IMAGE } from '../../constants/BaseUrls';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { dummyCast } from '../../constants/BaseUrls';
import * as Styles from '../../constants/StylingVariables';
import CarouselSection from '../components/CarouselSection';

export default function MovieDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCinemaIndex, setActiveCinemaIndex] = useState(0);

  // Fetch movie details using the ID from the route params
  useEffect(() => {
    const load = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data);
        }
      } catch (err) {
        console.log('Error loading details:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // loader when data is being fetched
  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;
  }

  // If movie is not found, show a message
  if (!movie) {
    return (
      <View style={styles.center}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  // Function to truncate text if it exceeds a certain length for synopsis text
  const truncate = (text: string, maxChars: number) =>
    text.length > maxChars ? text.slice(0, maxChars) + '...' : text;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{
          uri: `${IMAGE_BASE}/${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Styles.primaryTextColor} />
        </TouchableOpacity>
      </ImageBackground>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subText}>
          {movie.release_date.split("-")[0]} •{" "}
          {movie.genres?.map((g) => g.name).join(", ")} • {Math.floor(movie.runtime / 60)} j {movie.runtime % 60} m
        </Text>

        {/* Director Row */}
        <View style={styles.directorRow}>
          <Image
            source={{
              uri: RANDOM_USER_IMAGE,
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.director}>Director</Text>
            <Text style={styles.directorName}>Jon Watts</Text>
          </View>
          <TouchableOpacity style={styles.trailerButton}>
            <Ionicons name="play" size={16} color={Styles.primaryTextColor} />
            <Text style={styles.trailerText}>Watch trailer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Movie Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.des_title}>Synopsis</Text>
          <Text style={styles.des_text}>
            {truncate(movie.overview || 'No description available', 72)} {/*truncating after 72 chars*/}
            <Text style={styles.read_more}> Read more</Text>
          </Text>
        </View>

        {/* Cast and Crew Section */}
        <View style={{ marginTop: Styles.spacing4 }}>
          <Text style={styles.cast_title}>Cast</Text>
          <CarouselSection data={dummyCast} isCast={true} />
        </View>

        {/* Cinema banner Section */}
        <View>
          <Text style={styles.banner_sec_title}>Cinema</Text>
          <CarouselSection data={dummyCinemaData} isCinemaCard={true} activeCinemaIndex={activeCinemaIndex} setActiveCinemaIndex={setActiveCinemaIndex} />
        </View>
      </ScrollView>
      {/* book now button */}
      <View style={styles.bookNowButton}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: Styles.backgroundDarkColor },
  backdrop: { width: "100%", height: Styles.cardHeight, justifyContent: "flex-start" },

  // Back Button styles
  backButton: {
    marginTop: Styles.spacing24,
    marginLeft: Styles.spacing16,
    backgroundColor: Styles.transparentColor,
    padding: Styles.spacing6,
    borderRadius: Styles.borderRadiusExtraLarge,
    opacity: 0.7,
    width: Styles.iconSize,
    justifyContent: 'center',
  },

  // Details Card styles start 
  card: {
    backgroundColor: Styles.searchBgColor,
    marginHorizontal: Styles.spacing16,
    marginTop: -Styles.spacing98,
    borderRadius: Styles.borderRadiusLarge,
    padding: Styles.spacing16,
  },
  title: { fontSize: Styles.fontSizeLarge, fontWeight: Styles.fontBold, color: Styles.primaryTextColor },
  subText: { color: Styles.secondaryTextColor, marginVertical: Styles.spacing16 },
  directorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Styles.spacing6,
    justifyContent: "space-between",
  },
  avatar: { width: Styles.iconSize, height: Styles.iconSize, borderRadius: Styles.borderRadiusMedium, marginRight: Styles.spacing8 },
  director: { color: Styles.secondaryTextColor, fontSize: Styles.fontSizeSmall },
  directorName: { color: Styles.primaryTextColor },
  trailerButton: {
    flexDirection: "row",
    backgroundColor: Styles.listCardBgColor,
    paddingHorizontal: Styles.spacing8,
    paddingVertical: Styles.spacing8,
    borderRadius: Styles.borderRadiusImage,
    alignItems: "center",
  },
  trailerText: { color: Styles.primaryTextColor, marginLeft: Styles.spacing4, fontSize: Styles.fontSizeSmall },
  // End of Details Card styles

  // Description Section styles start
  descriptionSection: {
    padding: Styles.spacing16,
    marginTop: Styles.spacing8,
  },
  des_title: { color: Styles.primaryTextColor, fontSize: Styles.fontSizeLarge, marginBottom: Styles.spacing16 },
  des_text: { color: Styles.secondaryTextColor, fontSize: Styles.fontSizeMedium },
  read_more: { color: Styles.highlightColor, fontSize: Styles.fontSizeMedium, marginLeft: Styles.spacing4 },
  // Description Section styles end

  // Cast Section title styles
  cast_title: {
    color: Styles.primaryTextColor,
    fontSize: Styles.fontSizeLarge,
    marginLeft: Styles.spacing16,
  },

  // Cinema banner styles
  banner_sec_title: {
    color: Styles.primaryTextColor,
    fontSize: Styles.fontSizeLarge,
    marginHorizontal: Styles.spacing16,
    marginTop: Styles.spacing8,
  },

  // Book Now Button styles start
  bookNowButton: {
    position: 'absolute',
    bottom: Styles.spacing16,
    left: Styles.spacing16,
    right: Styles.spacing16,
    backgroundColor: Styles.buttonColor,
    paddingVertical: Styles.spacing12,
    borderRadius: Styles.borderRadiusLarge,
    alignItems: 'center',
  },
  bookNowText: {
    color: Styles.primaryTextColor,
    fontSize: Styles.fontSizeLarge,
    fontWeight: Styles.fontBold,
  },
  // End of Book Now Button styles
});