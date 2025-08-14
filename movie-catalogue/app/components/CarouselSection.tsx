import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CarouselCard from './CarouselCard';
import { MovieOrCast } from '../types/movie';
import { SectionHeader } from '../movies';
import * as Styles from '../constants/StylingVariables';

interface CarouselSectionProps {
    data: MovieOrCast;
    isComingSeeAllClicked?: boolean;
    setIsComingSeeAllClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    isCast?: boolean;
    shouldSeeAllPresent?: boolean;
    isCinemaCard?: boolean;
    setActiveCinemaIndex?: React.Dispatch<React.SetStateAction<number>>;
    activeCinemaIndex?: number; // Index of the active cinema card to highlight
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ activeCinemaIndex, setActiveCinemaIndex, data, isComingSeeAllClicked, setIsComingSeeAllClicked, isCast, shouldSeeAllPresent = false, isCinemaCard = false }) => {
    return (
        <View style={[styles.container, isCast && styles.castContainer]}>
            {/* render section header only if not cast and see all is present */}
            {!isCast && shouldSeeAllPresent && <SectionHeader
                title="Coming Soon"
                onSeeAll={() => {
                    if (setIsComingSeeAllClicked && typeof isComingSeeAllClicked === 'boolean') {
                        setIsComingSeeAllClicked(!isComingSeeAllClicked);
                    }
                }}
                isSeeAllClicked={isComingSeeAllClicked ?? false}
            />
            }

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) =>
                    <CarouselCard data={item} isCast={isCast}
                        activeCinemaIndex={activeCinemaIndex}
                        setActiveCinemaIndex={setActiveCinemaIndex}
                        isCinemaCard={isCinemaCard}

                        index={index}
                    />}
                showsVerticalScrollIndicator={false}
                horizontal={isCast ? true : false}
                nestedScrollEnabled={true} //to avoid nested scroll warnings
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Styles.spacing16,
    },
    castContainer: {
        marginHorizontal: Styles.spacing16,
    }
});

export default CarouselSection;
