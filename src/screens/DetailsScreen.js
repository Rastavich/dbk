import React, {useContext, useEffect} from 'react';
import {TextWhite, BackButton} from '../components/generics/defaults';
import {DefaultView} from '../components/generics/defaults';
import {Text} from 'react-native';

export function DetailsScreen({route, navigation}) {
  const {selected} = route.params;

  const {domain_name_server} = selected;
  // console.log(['Route digital asset: ', dns]);
  console.log(['Route Item: ', domain_name_server]);

  return (
    <DefaultView>
      <BackButton onPress={() => navigation.goBack()} />
      <TextWhite text={selected.url} />
      <TextWhite text={domain_name_server.username} />
      <TextWhite text={domain_name_server.password} />
    </DefaultView>
  );
}
