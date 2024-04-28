import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'


export default function Search({ meals, input, setInput }) {
    return (
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
                placeholder='Search any recipe'
                placeholderTextColor={'grey'}
                style={{ fontSize: hp(1.7) }}
                className="flex-1 text-base mb-1 pl-3 tracking-wideer"
                value={input}
                onChangeText={
                    (text) => {
                        setInput(text)
                    }
                }
            />
            <View className="bg-white rounded-full p-3">
                <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='grey' />
            </View>
        </View>

    )
}