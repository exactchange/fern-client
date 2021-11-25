const fetch = require('node-fetch');
const parser = require('node-fetch-parser');
const querystring = require('query-string');

let baseURL = '';

const request = (method, url, body = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  return fetch(url, options);
};

const parse = parser({
  getCard: async params => (
    request(
      'GET',
      `${baseURL}/fern/card?${querystring.stringify(params)}`
    )
  ),

  putCard: async params => (
    request(
      'PUT',
      `${baseURL}/fern/card`,
      params
    )
  ),

  createTransaction: async params => (
    request(
      'POST',
      `${baseURL}/fern/transaction`,
      params
    )
  )
});

module.exports = {
  setURL: url => baseURL = url,

  card: async params => (
    parse('getCard', params)
  ),

  save: async params => (
    parse('putCard', params)
  ),

  transaction: async params => (
    parse('createTransaction', params)
  )
};
