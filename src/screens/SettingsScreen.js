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

import {AuthContext, UserContext} from '../components/context';

export function SettingsScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>HELLO {user.userName}</Text>
      <Text>Your email is {user.userEmail}</Text>

      <Button
        title={'Logout'}
        style={styles.button}
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
