import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {DefaultButton} from '../components/generics/defaults';
import {AuthContext, UserContext} from '../components/context';

export function SettingsScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);

  return (
    <>
      <View style={styles.container}>
        <Text>{user.userName}</Text>
        <Text>Email: {user.userEmail}</Text>
        <DefaultButton text="Reset Password" />
      </View>
      <View>
        <Text>{user.abn}</Text>
      </View>
      <View style={styles.btmBtn}>
        <DefaultButton text="Logout" onPress={() => signOut()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  btmBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
