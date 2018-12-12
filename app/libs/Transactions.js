import sebakjs from 'sebakjs-util';
import fetch from 'react-native-fetch-polyfill';
import BigNumber from 'bignumber.js';

import { store } from '../App';
import { decryptWallet } from './KeyGenerator';
import { USE_TESTNET } from '../config/AppConfig';

import {
  TESTNET_ADDR,
  MAINNET_ADDR,
  NETWORK_ID,
  MAINNET_NETWORK_ID,
  BOS_GON_RATE,
} from '../config/transactionConfig';

const makeRLPData = (type, body) => {

  if (type === 'payment') {
    const tx = [
      body.source,
      body.fee,
      Number(body.sequence_id),
      [[
        [body.operations[0].H.type],
        [body.operations[0].B.target, body.operations[0].B.amount],
      ]],
    ];
    return tx;
  }

  const tx = [
    body.source,
    body.fee,
    Number(body.sequence_id),
    [[
      [body.operations[0].H.type],
      [body.operations[0].B.target, body.operations[0].B.amount, ''],
    ]],
  ];

  return tx;
};

const makeFullISOString = (str) => {
  return str.slice(0, str.length - 1) + '000000' + str.slice(str.length - 1 + Math.abs(0));
};

export const retrieveAccounts = (accounts) => {
  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  const addressArray = accounts.map(e => e.address);

  return fetch(`${url}/api/v1/accounts`, {
    method: 'POST',
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addressArray),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status) return [];

      const results = data._embedded.records;

      const returns = [];

      accounts.forEach((account, index) => {
        if (results) {
          const i = results.map(e => e.address).indexOf(account.address);
          if (i > -1) {
            returns.push({
              ...account,
              index,
              balance: new BigNumber(results[i].balance)
                .div(BOS_GON_RATE).toString(),
                // .toFixed(7)
                // .replace(/[0]+$/, '')
                // .replace(/[.]+$/, ''),
            });
          } else {
            returns.push({
              ...account,
              index,
              balance: 0,
            });
          }
        } else {
          returns.push({
            ...account,
            index,
            balance: 0,
          });
        }
      });

      return returns;
    });
};

export const retrieveAccount = (address) => {
  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  return (
    fetch(`${url}/api/v1/accounts/${address}`, {
      method: 'GET',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status === 404) {
          return {
            status: 404,
            balance: 0,
          };
        }

        if (!data.status) {
          return {
            status: 200,
            ...data,
            balance: new BigNumber(data.balance).div(BOS_GON_RATE).toString(),
          };
        }


        if (data.status === 500) {
          return {
            status: 500,
          };
        }

        if (data.status === 429) {
          return {
            status: 429,
          };
        }
      })
  );
};


export const retrieveOperations = (txHash, date, fee) => {
  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  return fetch(`${url}/api/v1/transactions/${txHash}/operations`, {
    method: 'GET',
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      const records = data._embedded.records[0];

      const returnData = {
        source: records.source,
        target: records.body.target,
        amount: new BigNumber(records.body.amount).div(BOS_GON_RATE).toString(),
        type: records.type,
        txHash,
        date,
        fee: 0.001,
      };

      // console.log(JSON.stringify(data));

      return returnData;
    });
};

export const retrieveTransactions = (address, limit) => {
  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  return fetch(`${url}/api/v1/accounts/${address}/operations?limit=${limit}&reverse=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      if (data.status) {
        return data;
      }

      let { records } = data._embedded;
      records = records.map(e => ({
        date: e.confirmed,
        txHash: e.tx_hash,
        fee: 0.001,
        target: e.target,
        source: e.source,
        type: e.type,
        amount: new BigNumber(e.body.amount).div(BOS_GON_RATE).toString(),
      }));

      const prev = data._links.prev.href;
      const next = data._links.next.href;

      return { records, prev, next };
    });
};

export const retrieveMoreTx = (prev) => {
  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  return fetch(`${url}${prev}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      if (data.status) {
        return [];
      }

      let { records } = data._embedded;

      if (records && records.length > 0) {
        records = records.map(e => ({
          date: e.confirmed,
          txHash: e.tx_hash,
          fee: 0.001,
          target: e.target,
          source: e.source,
          type: e.type,
          amount: new BigNumber(e.body.amount).div(10000000).toString(),
        }));

        const nextPrev = data._links.prev.href;
        const nextMore = data._links.next.href;

        return { records, nextPrev, nextMore };
      }

      return [];
    });
};

export const makeTransaction = (source, password, target, amount, type, lastSequenceId) => {

  let url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  if (!USE_TESTNET) url = MAINNET_ADDR;

  let nid = USE_TESTNET && store.getState().settings.networkId
    ? store.getState().settings.networkId
    : NETWORK_ID;

  if (!USE_TESTNET) nid = MAINNET_NETWORK_ID;

  let HType = 'payment';
  if (type === 'create') HType = 'create-account';

  const body = {
    T: 'transaction',
    H: {
      version: '1',
      created: makeFullISOString(new Date().toISOString()),
      // 'hash': '2g3ZSrEnsUWeX5Mxz5uTh2b4KVpVQS7Ek2HzZd759FHn',
      // 'signature': '3oWmCMNHExRQnZVEBSH16ZBgLE6ayz7t1fsjzTjAB6WpXMpkDJbhcL8KudqFFG21XmfSXnJH1BLhnBUh4p68yFeR'
    },
    B: {
      source: source.address,
      fee: String('10000'),
      sequence_id: (Number(lastSequenceId)),
      operations: [
        {
          H: {
            type: HType,
          },
          B: {
            target,
            amount: new BigNumber(amount).multipliedBy(BOS_GON_RATE).toString(),
            // linked: '',
          },
        },
      ],
    },
  };


  const RDPData = makeRLPData(HType, body.B);
  const secretKey = decryptWallet(password, source.secretSeed);

  const hash = sebakjs.hash(RDPData);
  const sig = sebakjs.sign(hash, nid, secretKey);

  body.H.hash = hash;
  body.H.signature = sig;

  return fetch(`${url}/api/v1/transactions`, {
    method: 'POST',
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      // console.log(response);

      return response.json();
    })
    .then((res) => {
      if (res.status !== 'submitted') {
        return ({
          status: res.status,
          title: res.title,
          detail: res.detail,
        });
      }

      return ({
        status: 200,
        transactionId: res.hash,
        source: res.message.source,
        fee: 0.001,
        amount: new BigNumber(res.message.operations[0].B.amount).div(BOS_GON_RATE).toString(),
        target: res.message.operations[0].B.target,
      });
    });
};

export const listAccounts = () => {};
