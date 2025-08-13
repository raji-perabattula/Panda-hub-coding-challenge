import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MovieOrCast } from '../types/movie';
import { IMAGE_BASE } from '../../constants/BaseUrls';
import * as Styles from '../../constants/StylingVariables';
import { router } from 'expo-router';

interface CarouselCardProps {
    data: MovieOrCast;
    onPress?: () => void;
    isCast?: boolean;
    isCinemaCard?: boolean;
    activeCinemaIndex?: number;
    setActiveCinemaIndex?: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ activeCinemaIndex, data, index, onPress, isCast = false, isCinemaCard = false, setActiveCinemaIndex }) => {
    return (
        <TouchableOpacity
            style={[styles.card, 
                isCast && styles.castCard, 
                isCinemaCard && index== activeCinemaIndex && styles.bannerContentContainer]}
            onPress={() => {
                if (onPress) onPress(); // Call the onPress function if provided for custom behavior
                if (!isCast && !isCinemaCard) {
                    router.push(`/movie/${data.id}`); // Navigate to movie details if it is coming soon card
                } else if (isCinemaCard) {
                    setActiveCinemaIndex(index); // Set the active cinema index to highlight the selected cinema card
                }
            }}
        >
            {/* Render image conditionally based on whether it's a cast or cinema card */}
            {!isCinemaCard && <>
                {data.poster_path ? (
                    <Image
                        source={{ uri: isCast ? data.poster_path : `${IMAGE_BASE}${data.poster_path}` }}
                        style={[styles.image, isCast && styles.castImage]}
                    />
                ) : (
                    <View style={[styles.image, styles.placeholder]}>
                        <Text style={{ color: Styles.secondaryTextColor, fontSize: Styles.fontSizeMedium }}>No Image</Text>
                    </View>
                )}</>
            }

            {/* Render content conditionally based on whether it's a cast or cinema card */}
            {isCinemaCard ? (
                <View style={styles.cinemaTextContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.banner_title}>{data.name}</Text>
                        <Text style={styles.banner_subText}>{data.overview}</Text>
                    </View>
                    <Image
                        source={{
                            uri: data.image,
                        }}
                        style={styles.bannerIcon}
                    />
                </View>
            ) : (
                <View style={styles.info}>
                    <Text style={[styles.title, isCast && styles.castTitle]}>
                        {data.name || `${data.title} (${new Date(data.release_date).getFullYear()})`}

                    </Text>
                    {!isCast &&
                        <Text style={styles.genres} numberOfLines={2}>
                            {data.overview || 'No description available'}
                        </Text>
                    }
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    //coming soon and some general carousel styles start
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Styles.spacing16,
        backgroundColor: Styles.listCardBgColor,
        borderRadius: Styles.borderRadiusMedium,
        marginBottom: Styles.spacing12,
        padding: Styles.spacing8,
    },
    image: {
        width: Styles.listImageWidth,
        height: Styles.listImageHeight,
        borderRadius: Styles.borderRadiusImage,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Styles.backgroundDarkColor,
    },
    info: {
        marginLeft: Styles.spacing12,
        flex: 1,
    },
    title: {
        fontSize: Styles.fontSizeMedium,
        color: Styles.primaryTextColor,
    },
    genres: {
        fontSize: Styles.fontSizeSmall,
        color: Styles.secondaryTextColor,
        marginTop: Styles.spacing4,
    },
    //coming soon and some general carousel styles end

    //cast carousel styles start
    castImage: {
        width: Styles.avatarSize,
        height: Styles.avatarSize,
        borderRadius: Styles.borderRadiusMedium,
    },
    castCard: {
        width: Styles.cardWidthSmall,
        marginHorizontal: Styles.spacing4,
    },
    castTitle:
    {
        fontSize: Styles.fontSizeSmall,
    },
    // cast carousel styles end

    //cinema carousel styles start
    bannerContentContainer: {
        backgroundColor: Styles.bgColorBrown,
        borderRadius: Styles.borderRadiusMedium,
        borderWidth: 1,
        borderColor: Styles.seeAllColor,
    },
    cinemaTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        marginRight: Styles.spacing16,
    },
    banner_title: {
        color: Styles.primaryTextColor,
        fontSize: Styles.fontSizeLarge,
        marginBottom: Styles.spacing8,
    },
    banner_subText: {
        color: Styles.secondaryTextColor,
        fontSize: Styles.fontSizeSmall,
    },
    bannerIcon: {
        width: Styles.bannerImgWidth,
        height: Styles.bannerImgHeight,
        borderRadius: Styles.borderRadiusMedium,
        marginTop: -Styles.spacing24,
    },
    //cinema carousel styles end

});

export default CarouselCard;
