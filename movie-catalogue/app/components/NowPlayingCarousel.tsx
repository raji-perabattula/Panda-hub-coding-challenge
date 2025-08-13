import React, { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import NowPlayingCard from './NowPlayingCard';
import * as Styles from '../../constants/StylingVariables';
import { Movie } from '../types/movie';
import { SectionHeader } from '../movies';

interface NowPlayingCarouselProps {
    nowPlaying: Movie[];
    isNowSeeAllClicked: boolean;
    setIsNowSeeAllClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
}

// card sizes and params
const CARD_WIDTH = Styles.cardWidth;
const SPACING = Styles.spacing4;
const { width } = Dimensions.get('window');
const ITEM_SIZE = CARD_WIDTH + SPACING * 2;


export default function NowPlayingCarousel(props: NowPlayingCarouselProps) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<Animated.FlatList<Movie>>(null);
        const [targetScrollIndex, setTargetScrollIndex] = useState<number | null>(null);

    // looping data for circular rotation of carousel
    const originalData = props.nowPlaying;
    const [carouselData, setCarouselData] = useState<Movie[]>([
        ...originalData,
        ...originalData,
    ]);

    useEffect(() => {
        if (originalData.length === 0) return;

        setCarouselData([...originalData, ...originalData]);

        // Wait for the FlatList to render updated data, then jump to middle set. This ensures the first set is centered.
        // This is necessary to create the illusion of infinite scrolling.
        // Using setTimeout to allow the FlatList to render first.
        // This is necessary because FlatList needs to render the items before we can scroll to the index.
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: originalData.length,
                animated: false,
            });
        }, 50);
    }, [originalData]);

    // handle scroll to center the first card
    useEffect(() => {
        if (
            targetScrollIndex !== null &&
            flatListRef.current &&
            targetScrollIndex >= 0 &&
            targetScrollIndex < carouselData.length
        ) {
            flatListRef.current.scrollToIndex({
                index: targetScrollIndex,
                animated: false,
            });
            setTargetScrollIndex(null); // reset after scroll
        }
    }, [targetScrollIndex, carouselData]);


    // handle scroll end to implement infinite looping
    const handleScrollEnd = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offsetX / ITEM_SIZE);
        const originalLength = originalData.length;
        const totalLength = carouselData.length;

        // If reached near right end, shift window forward
        if (currentIndex >= totalLength - originalLength - 1) {
            setCarouselData((prev) => [
                ...prev.slice(originalData.length), // keep only second set
                ...originalData, // append new set
            ]);
            const newIndex = currentIndex - originalLength;
            setTargetScrollIndex(newIndex);
        }
        // If reached near left end, shift window backward
        if (currentIndex <= originalLength) {
            setCarouselData((prev) => [
                ...originalData, // prepend new set
                ...prev.slice(0, originalData.length), // keep only first set
            ]);
            const newIndex = currentIndex + originalLength;
            setTargetScrollIndex(newIndex);
        }

    }
    return (
        <>
            <SectionHeader
                title="Now Playing"
                onSeeAll={() => props.setIsNowSeeAllClicked(!props.isNowSeeAllClicked)} //toggling see all state
                isSeeAllClicked={props.isNowSeeAllClicked}
            />
            <Animated.FlatList
                ref={flatListRef}
                data={carouselData}
                keyExtractor={(item, idx) => `${item.id}-${idx}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{
                    paddingHorizontal: (width - CARD_WIDTH) / 2, // centering the first card form 2nd list
                }}
                onMomentumScrollEnd={handleScrollEnd}
                onScroll={(event) => {
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )(event);

                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / ITEM_SIZE);
                    props.setActiveIndex(index % originalData.length);
                    if (index === 0 || index === carouselData.length - 1) {
                        handleScrollEnd(event);
                    }
                }}
                getItemLayout={(_, index) => ({
                    length: ITEM_SIZE,
                    offset: ITEM_SIZE * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    if (!item.poster_path) {
                        return <View style={{ width: (width - CARD_WIDTH) / 2 }} />;
                    }
                    const inputRange = [
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.85, 1, 0.85],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 1, 0.6],
                        extrapolate: 'clamp',
                    });

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [20, 0, 20],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            style={{
                                width: CARD_WIDTH,
                                marginHorizontal: SPACING,
                                transform: [{ scale }, { translateY }],
                                opacity,
                            }}
                        >
                            <NowPlayingCard movie={item} />
                        </Animated.View>
                    );
                }}
            />
            {!props.isNowSeeAllClicked && (
                <PaginationDots data={originalData} scrollX={scrollX} activeIndex={props.activeIndex} />
            )}
        </>
    );
}


//pagination dots component 
const PaginationDots = ({ data, scrollX, activeIndex }: { data: Movie[]; scrollX: Animated.Value; activeIndex: number }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Styles.spacing12 }}>
            {data.map((_, i) => {
                const dotWidth = ITEM_SIZE;
                const isActive = activeIndex === i;

                const adjustedScrollX = Animated.divide(scrollX, dotWidth); // current card index
                const wrappedIndex = Animated.modulo(adjustedScrollX, data.length);

                const scale = wrappedIndex.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [1, 2, 1],
                    extrapolate: 'clamp',
                });

                const opacity = wrappedIndex.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={i}
                        style={{
                            width: isActive ? Styles.activeDotSize : Styles.paginationDotSize,
                            height: Styles.paginationDotSize,
                            borderRadius: Styles.borderRadiusSmall,
                            backgroundColor: Styles.paginationActiveDotColor,
                            marginHorizontal: Styles.spacing4,
                            transform: [{ scale }],
                            opacity,
                        }}
                    />
                );
            })}
        </View>
    );
};

