import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import {UserContext, AuthContext} from '../components/context';

import {
  DefaultView,
  DefaultHeader,
  DefaultButton,
  TextWhite,
} from '../components/generics/defaults';

export function AddAssetScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [type, setType] = React.useState('');

  let theme = require('../styles/theme');
  let data = [];

  async function getAuth() {
    if (user == '') {
      await signOut();
    }
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <DefaultView>
      <DefaultHeader
        onPress={() => navigation.goBack()}
        text="Create an Asset"
      />
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.inputBackground}>
            <View style={styles.fixToText}>
              <Button title="Website" onPress={() => setType('website')} />
              <Button title="Email" onPress={() => setType('email')} />
            </View>
            {type == 'website' ? (
              <View>
                <TextInput
                  style={theme.textInput}
                  placeholder="www.mywebsite.com.au"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => userInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                <TextInput
                  style={theme.textInput}
                  placeholder=""
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => userEmailInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

                <TextInput
                  style={theme.textInput}
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <DefaultButton
                  onPress={() => {
                    register();
                  }}
                  text="Sign Up!"
                />
              </View>
            ) : (
              <View>
                <TextWhite>Please choose an asset type</TextWhite>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </>
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
