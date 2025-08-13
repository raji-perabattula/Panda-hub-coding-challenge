import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../types/movie';
import { IMAGE_BASE } from '../../constants/BaseUrls';
import { router } from 'expo-router';
import * as Styles from '../../constants/StylingVariables';

type NowPlayingCardProps = {
  movie: Movie;
  onPress?: () => void;
};

export default function NowPlayingCard({ movie, onPress }: NowPlayingCardProps) {
  return (
    <TouchableOpacity
      style={styles.nowPlayingCard}
      onPress={() => { onPress; router.push(`/movie/${movie.id}`) }}
    >
      <Image
        source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }}
        style={styles.nowImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.genreText}>{movie.release_date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nowPlayingCard: {
    marginRight: Styles.spacing4,
    marginLeft: Styles.spacing4,
    width: Styles.cardWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Styles.spacing12,
  },
  nowImage: {
    width: '100%',
    height: Styles.cardHeight,
    borderRadius: Styles.borderRadiusMedium,
    marginBottom: Styles.spacing8
  },
  movieTitle: {
    color: Styles.primaryTextColor,
    fontSize: Styles.fontSizeLarge
  },
  genreText: {
    color: Styles.secondaryTextColor,
    fontSize: Styles.fontSizeSmall
  },
});