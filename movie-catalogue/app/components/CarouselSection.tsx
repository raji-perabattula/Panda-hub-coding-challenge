import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CarouselCard from './CarouselCard';
import { Movie, Cast, MovieOrCast } from '../types/movie';
import { SectionHeader } from '../movies';
import * as Styles from '../../constants/StylingVariables';

interface CarouselSectionProps {
    data: MovieOrCast;
    isComingSeeAllClicked?: boolean;
    setIsComingSeeAllClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    isCast?: boolean;
    shouldSeeAllPresent?:boolean;
    isCinemaCard?:boolean;
    setActiveCinemaIndex?: React.Dispatch<React.SetStateAction<number>>;
    activeCinemaIndex?: number;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ activeCinemaIndex, setActiveCinemaIndex,data, isComingSeeAllClicked, setIsComingSeeAllClicked, isCast, shouldSeeAllPresent=false, isCinemaCard=false }) => {
    return (
        <View style={[styles.container, isCast && styles.castContainer]}>
            {!isCast&&shouldSeeAllPresent && <SectionHeader
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
                renderItem={({ item, index }) => <CarouselCard data={item} isCast={isCast}
                activeCinemaIndex={activeCinemaIndex}
                setActiveCinemaIndex={setActiveCinemaIndex}
                isCinemaCard={isCinemaCard}
                
                index={index}
                />}
                showsVerticalScrollIndicator={false}
                horizontal={isCast ? true : false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Styles.spacing16,
    },
    castContainer:{
        marginHorizontal: Styles.spacing16,
    }
});

export default CarouselSection;
