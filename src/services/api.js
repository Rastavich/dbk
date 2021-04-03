import {GRAPHQL_URI} from '../config/index';
import axios from 'axios';
import {Alert} from 'react-native';

async function send(_method, _input, _query, _token) {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (_token) {
    opts.headers['Authorization'] = 'Bearer ' + _token;
  }

  let _data = {
    query: _query,
    variables: {
      ..._input,
    },
  };

  let config = {
    method: _method,
    url: GRAPHQL_URI,
    headers: opts.headers,
    data: _data,
  };

  console.log('config', config);

  // return;
  return await axios(config)
    .then((response) => {
      // console.log('response', response);
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
  return send('POST', _input, _query, _token);
}

export function put(_input, _query) {
  return send('PUT', _input, _query);
}
