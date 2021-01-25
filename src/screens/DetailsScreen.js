import React, {useContext, useEffect} from 'react';
import {TextWhite} from '../components/generics/defaults';
import {DefaultView} from '../components/generics/defaults';
import {Text} from 'react-native';

export function DetailsScreen({route}) {
  const {digitalAsset} = route.params;
  console.log(['Route digital asset: ', digitalAsset]);

  return (
    <DefaultView>
      <TextWhite text={digitalAsset} />
    </DefaultView>
  );
}
