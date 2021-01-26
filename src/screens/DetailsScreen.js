import React, {useContext, useEffect} from 'react';
import {TextWhite, BackButton} from '../components/generics/defaults';
import {DefaultView} from '../components/generics/defaults';
import {Text} from 'react-native';

export function DetailsScreen({route, navigation}) {
  const {digitalAsset} = route.params;
  console.log(['Route digital asset: ', digitalAsset]);

  return (
    <DefaultView>
      <BackButton onPress={() => navigation.goBack()} />
      <TextWhite text="HEllo" />
    </DefaultView>
  );
}
