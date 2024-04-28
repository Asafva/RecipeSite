import { View, Text, Button, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios'
import Recipes from '../components/recipes';
import Credit from '../components/Credit';
import Search from '../components/Search';
import Topbar from '../components/Topbar';

export default function HomeScreen() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [meals, setMeals] = useState([]);
    const [input, setInput] = useState('');


    useEffect(() => {
        getCategories();
        getRecipes();
    }, [])

    const handleChangeCatergoty = catergoy => {
        getRecipes(catergoy);
        setActiveCategory(catergoy);
        setMeals([]);
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            // console.log(response.data);
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (error) {
            console.log("error msg:" + error.message);
        }
    }

    const getRecipes = async (catergoy = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${catergoy}`);
            // console.log(response.data);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (error) {
            console.log("error msg:" + error.message);
        }
    }
    const navigation = useNavigation('Welcome');

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                className="space-y-6 pt-3"
            >

                {/* TopBar */}
                <View>
                    <Topbar />
                </View>

                {/* SearchBar */}
                <View>
                    <Search input={input} setInput={setInput} meals={meals} />
                </View>

                {/* Categories */}
                <View>
                    {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCatergoty={handleChangeCatergoty} />}
                </View>

                {/* Recipies */}
                <View>
                    <Recipes meals={meals} categories={categories} input={input} setInput={setInput} />
                </View>

                {/* CreditFooter */}
                <View>
                    <Credit />
                </View>


            </ScrollView>
        </View>
    )
}
