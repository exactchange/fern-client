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
  getBalance: async params => (
    request(
      'GET',
      `${baseURL}/fern/balance?${querystring.stringify(params)}`
    )
  ),

  getCard: async params => (
    request(
      'GET',
      `${baseURL}/fern/card?${querystring.stringify(params)}`
    )
  ),

  getCards: async params => (
    request(
      'POST',
      `${baseURL}/fern/cards`,
      params
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
  ),

  createPayout: async params => (
    request(
      'POST',
      `${baseURL}/fern/payout`,
      params
    )
  ),
  
  createBalanceInquiry: async params => (
    request(
      'POST',
      `${baseURL}/fern/balance`,
      params
    )
  )
});

module.exports = {
  setURL: url => baseURL = url,

  card: async params => (
    parse('getCard', params)
  ),

  cards: async params => (
    parse('getCards', params)
  ),

  save: async params => (
    parse('putCard', params)
  ),

  transaction: async params => (
    parse('createTransaction', params)
  ),

  payout: async params => (
    parse('createPayout', params)
  ),

  balance: async params => (
    parse('createBalanceInquiry', params)
  )
};
