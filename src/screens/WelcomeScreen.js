import { View, Text, StatusBar, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Credit from '../components/Credit';

export default function WelcomeScreen() {
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(2.5)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(4.5)), 300);

        // setTimeout(() => navigation.navigate('Home'), 2500)
    }, []);
    return (
        <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
            <StatusBar style="light" />
            <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
                <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}  >
                    <Image source={require('../../assets/welcomeimages.png')}
                        style={{ width: hp(25), height: hp(25), }}
                        className="rounded-full" />
                </Animated.View>
            </Animated.View>


            <View className="flex item-center space-y-2">
                <Text style={{ fontSize: hp(4) }} className="font-bold text-white tracking-widest">
                    <Button
                        HeaderBackTitleStyle={{ fontSize: 100 }}
                        color="#000000"
                        title="Wallach Cooking"
                        onPress={() => {
                            navigation.navigate('Home');
                        }} />

                </Text>
                <Text style={{ fontSize: hp(1) }} className="flex item-center space-y-2">
                    April 2024 - Version 1.0 -
                </Text>
            </View>
            <Credit />

        </View>

    )

}