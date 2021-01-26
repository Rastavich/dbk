import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  DefaultButton,
  DefaultView,
  TextWhite,
  TextWhiteLink,
} from '../components/generics/defaults';
import {AuthContext, UserContext} from '../components/context';

export function SettingsScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);

  return (
    <>
      <DefaultView>
        <View style={styles.container}>
          <TextWhite text={user.userName} />
          <TextWhite text={user.userEmail} />
        </View>
        <View>
          <Text>{user.abn}</Text>
        </View>
        <View style={styles.btmBtn}>
          <TextWhiteLink text="Reset Password" />
          <DefaultButton text="Logout" onPress={() => signOut()} />
        </View>
      </DefaultView>
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
