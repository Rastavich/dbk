import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';

import {UserContext, AuthContext} from '../components/context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import {
  DefaultView,
  TextHeadingPurp,
  TextWhite,
  DefaultButton,
} from '../components/generics/defaults';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={styles.cardContent}>
      <Text style={styles.pill}>{item.url}</Text>
      {item.serviceStatus ? (
        <Text style={styles.pill}>Status: Up!</Text>
      ) : (
        <Text style={styles.pill}>Status: Down!</Text>
      )}
    </View>
  </TouchableOpacity>
);

export function AssetListScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  let data = [];

  async function getAuth() {
    const userToken = await AsyncStorage.getItem('userToken');

    console.log(['USER TOKEN: ', userToken]);
    console.log(['USER: ', user]);

    if (user == '') {
      signOut();
    }

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
    await axios(config)
      .then(function (response) {
        // console.log([
        //   'Get Asset Response: ',
        //   response.data.data.user.digital_asset.websites,
        // ]);
        response.data.data.user.digital_asset.websites.map(function (asset) {
          data.push(asset);
          // console.log(['Get Nested Response: ', asset]);
          // asset.websites.map(function (site) {

          // });
        });

        setAsset(data);
      })
      .catch(function (error) {
        console.log(error);
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
        key={(item) => item.id}></Item>
    );
  };

  const openItem = (item) => {
    console.log(['Item on click: ', item]);
    navigation.navigate('DetailsScreen', {
      selected: item,
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <DefaultView>
      {asset.length > 0 ? (
        <>
          <View style={styles.header}>
            <View style={styles.headText}>
              <DefaultHeader text="Your Digital Assets" />
            </View>
          </View>
          <FlatList
            data={asset}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            key={(item) => item.id}
            extraData={selectedId}></FlatList>
        </>
      ) : (
        <DefaultView>
          <View style={styles.container}>
            <TextWhite text="You do not have any digital assets, go ahead and add some!" />
            <DefaultButton
              text="Add"
              onPress={() => {
                navigation.navigate('AddAssetScreen');
              }}
            />
          </View>
        </DefaultView>
      )}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    height: 75,
    marginVertical: 8,
    marginHorizontal: 16,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
  },
  headText: {
    marginLeft: 100,
    marginTop: 4,
    textAlign: 'center',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 160,
    borderColor: '#000',
    zIndex: 10,
    padding: 3,
    marginRight: 10,
  },
  cardContent: {
    margin: 2,
    display: 'flex',
    flexDirection: 'row',
  },
});
