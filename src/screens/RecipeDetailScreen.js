import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMealData(item.idMeal);
    }, [])


    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // console.log('Meal Data', response.data);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false)
            }
        } catch (error) {
            console.log("error msg:" + error.message);
        }
    }


    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    return (
        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style={'light'} />

            <View className="flex-row justify-center">
                <CachedImage
                    uri={item.strMealThumb}
                    sharedTransitionTag={item.strMeal}
                    style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
                />
            </View>


            <View className="w-full absolute flex-row justify-between items-center pt-5 pr-10">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-1 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        <View className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {meal.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {meal.strArea}
                            </Text>
                        </View>

                        <View className="flex-row justify-around">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                        Mins
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        3
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                        Servings
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                        Cal
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">

                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                        Easy
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.6) }} className="font-bold flex-1 text-neutral-700">
                                Ingredients
                            </Text>
                            <View className="space-y-2 ml-3">
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className="bg-amber-300 rounded-full" />
                                                <View className="flex-row space-x-2">
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.6) }} className="font-bold flex-1 text-neutral-700">
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                                {
                                    meal.strInstructions
                                }
                            </Text>
                        </View>

                    </View>
                )
            }

        </ScrollView>
    )
}