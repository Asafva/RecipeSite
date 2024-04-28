import { View, Text, Image, TouchableOpacity, Icon, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellSlashIcon } from 'react-native-heroicons/outline'
import { BellAlertIcon } from 'react-native-heroicons/outline'


export default function Topbar() {
    const [isActive, setIsActive] = useState(true);

    return (
        <View>
            <View className="mx-2 flex-row justify-between items-center mb-2 ">
                <View>
                    <Image source={require("../../assets/avatar.png")} style={{ height: hp(5), width: hp(5.5) }} />
                </View>
                <Image source={require("../../assets/logo.png")} style={{ height: hp(20), width: hp(35) }} />
                <View>
                    <Pressable
                        onPress={() => {
                            setIsActive(!isActive)
                        }}
                    >
                        {isActive ?
                            <BellSlashIcon size={hp(5)} color="black" className="" />
                            :
                            <BellAlertIcon size={hp(5)} color="black" className="" />

                        }

                    </Pressable>
                </View>
                {/* <BellIconOutline size={hp(5)} color="grey" className="" />

                <BellIcon size={hp(5)} color="black" className="" /> */}

            </View>

        </View>
    )
}