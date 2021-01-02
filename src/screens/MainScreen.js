import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext, UserContext} from '../components/context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import {Card} from '../components/card';

// TODO: TESTING this
function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.url}</Text>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

export function MainScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  async function getAuth() {
    const userToken = await AsyncStorage.getItem('userToken');

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
      let id = 0;
      response.data.data.user.digital_assets.map(function (asset) {
        setAsset([
          {
            id: id + 1,
            url: asset.url,
          },
        ]);
      });

      console.log(asset);
    });
  }

  // const renderItem = ({item}, index) => <Item key={index} title={item.url} />;

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <View style={styles.container}>
        <Text>HELLO {user.userName}</Text>
        <Text>Your email is {user.userEmail}</Text>
        <Card>
          <Text>{user.userEmail}</Text>
        </Card>
        <FlatList
          data={asset}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}></FlatList>
        <Button
          title={'Logout'}
          style={styles.button}
          onPress={() => signOut()}
        />
        <Button
          title={'Get Assets'}
          style={styles.button}
          onPress={() => getAuth()}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  button: {
    color: 'blue',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
