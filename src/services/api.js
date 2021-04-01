import {GRAPHQL_URI} from '../config/index';
import axios from 'axios';
import {Alert} from 'react-native';

async function send(_method, _input, _query, _header) {
  let _data = {
    query: _query,
    variables: {
      ..._input,
    },
  };
  console.log('_DATA', _data);

  let config = {
    method: _method,
    url: GRAPHQL_URI,
    headers: _header,
    data: _data,
  };

  console.log('config', config);

  // return;
  await axios(config)
    .then((response) => {
      console.log('response', response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Sorry!', 'There was an error processing your request.', [
        {text: 'Okay'},
      ]);
      return;
    });
}

export function get(_input, _query, _token) {
  return send('GET', _input, _query);
}

export function del(_input, _query, _token) {
  return send('DELETE', _input, _query);
}

export function post(_input, _query, _token) {
  if (_token) {
    let _header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _token,
    };
    return send('POST', _input, _query, _header);
  } else {
    let _header = {
      'Content-Type': 'application/json',
    };
    return send('POST', _input, _query, _header);
  }
}

export function put(_input, _query) {
  return send('PUT', _input, _query);
}
