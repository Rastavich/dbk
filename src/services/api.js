import {REGISTER_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import axios from 'axios';

export function api(data, _input, _method, _query) {
  let _data = JSON.stringify({
    query: _query,
    variables: {
      _input,
      //   username: data.username,
      //   email: data.userEmail,
      //   password: data.password,
    },
  });

  let config = {
    method: _method,
    url: GRAPHQL_URI,
    headers: {
      'Content-Type': 'application/json',
    },
    data: _data,
  };

  axios(config).then(
    function (response) {
      return response;
    }.catch(function (error) {
      console.log(error);
    }),
  );
}
