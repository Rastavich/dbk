import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';

import {UserContext} from '../components/context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import {
  BackButton,
  DefaultView,
  TextHeadingPurp,
} from '../components/generics/defaults';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.url}</Text>
  </TouchableOpacity>
);

export function AssetListScreen({navigation}) {
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  let data = [];

  async function getAuth() {
    const userToken = await AsyncStorage.getItem('userToken');

    console.log(['USER TOKEN: ', userToken]);
    console.log(['USER: ', user]);

    // if (user == '') {
    //   AsyncStorage.removeItem('userToken');
    // }

    var loginData = JSON.stringify({
      query: GET_ASSET_BY_USER,
      variables: {
        id: user.userId,
      },
    });

    var config = {
      method: 'post',
      url: GRAPHQL_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      data: loginData,
    };
    await axios(config).then(function (response) {
      response.data.data.user.digital_assets.map(function (asset) {
        // console.log(asset);
        asset.websites.map(function (site) {
          data.push(site);
        });
      });

      setAsset(data);
    });
  }

  console.log(['Asset Log: ', asset]);
  if (asset.length > 0) {
    var {domain_name_server} = asset[0];
    console.log(['DNS destructuring: ', domain_name_server]);
  }

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => openItem(item)}
        style={{backgroundColor}}
      />
    );
  };

  const openItem = ({item}) => {
    navigation.navigate('DetailsScreen', {
      params: domain_name_server,
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <DefaultView>
      {asset ? (
        <>
          <View style={styles.header}>
            <BackButton />
            <View style={styles.headText}>
              <TextHeadingPurp text="Your Digital Assets" />
            </View>
          </View>
          <FlatList
            data={asset}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}>
            <Text>{asset.url}</Text>
          </FlatList>
        </>
      ) : (
        <Text>You do not have any digital assets, go ahead and add one!</Text>
      )}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
  },
  headText: {
    marginLeft: 80,
    marginTop: 4,
    textAlign: 'center',
    alignItems: 'center',
  },
});
