import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { MealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';


export default function Recipes({ categories, meals, input, setInput }) {
    const navigation = useNavigation();

    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
            <View>
                {
                    categories.length == 0 || meals.length == 0 ? (
                        <Loading size="large" className="mt-20" />
                    ) : (
                        <MasonryList
                            data={meals}
                            renderItem={({ item, i }) => {
                                if (input === "") {
                                    return (
                                        <RecipieCard item={item} index={i} navigation={navigation} />
                                    )
                                }
                                if (item.strMeal.toLowerCase().includes(input.toLowerCase())) {
                                    return (
                                        <RecipieCard item={item} index={i} navigation={navigation} />
                                    )

                                }
                            }
                            } />
                    )
                }
            </View>
        </View>
    )
}

const RecipieCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
            >
                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                /> */}

                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                    sharedTransitionTag={item.strMeal}
                />

                <Text style={{ fontSize: hp(1.5) }} className="font-semibold ml-2 text-neutral-600">
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}