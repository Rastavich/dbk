import React, {useContext, useEffect} from 'react';
import {TextWhite, DefaultHeader} from '../components/generics/defaults';
import {DefaultView} from '../components/generics/defaults';

export function DetailsScreen({route, navigation}) {
  const {selected} = route.params;

  const {domain_name_server} = selected;

  let username;
  let password;

  if (domain_name_server) {
    username = <TextWhite text={domain_name_server.username} />;
  }

  if (domain_name_server) {
    password = <TextWhite text={domain_name_server.password} />;
  }

  return (
    <DefaultView>
      <DefaultHeader onPress={() => navigation.goBack()} />
      <TextWhite text={selected.url} />
      {username}
      {password}
    </DefaultView>
  );
}
