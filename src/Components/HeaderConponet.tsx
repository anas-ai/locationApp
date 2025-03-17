import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ICON_IMG} from '../constants/ImagesConstansts';

const HeaderConponet = () => {
  return (
    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
      <Image source={ICON_IMG.USER_IMG} style={{height: 30, width: 30}} />
      <TouchableOpacity activeOpacity={0.6}>

      <Image source={ICON_IMG.SEARCH_IMG} style={{height: 30, width: 30}} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderConponet;



export const LocationPermissionModal  = () => {
  return (
    <View>
      <Text>HeaderConponet</Text>
    </View>
  )
}
