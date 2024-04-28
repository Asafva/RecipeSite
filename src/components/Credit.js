import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Credit() {
    return (
        <View className="flex item-center space-y-2 " size={hp(2)}>
            <Text className="bg-">Asaf Wallach ©</Text>
        </View >
    )
}