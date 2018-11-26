import sebakjs from 'sebakjs-util';
import fetch from 'react-native-fetch-polyfill';

import { store } from '../App';
import { decryptWallet } from './KeyGenerator';
import { USE_TESTNET } from '../config/AppConfig';

import { TESTNET_ADDR, NETWORK_ID, BOS_GON_RATE } from '../config/transactionConfig';

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
  const url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

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
              balance: results[i].balance / BOS_GON_RATE,
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
  const url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

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
            balance: Number(data.balance) / BOS_GON_RATE,
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
  const url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

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
        amount: Number((records.body.amount) / BOS_GON_RATE),
        type: records.type,
        txHash,
        date,
        fee: fee / BOS_GON_RATE,
      };

      // console.log(JSON.stringify(data));

      return returnData;
    });
};

export const retrieveTransactions = (address, limit) => {
  const url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

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
        amount: Number(e.body.amount / 10000000).toFixed(7).replace(/[0]+$/, '').replace(/[.]+$/, ''),
      }));

      return records;
    });

  // return fetch(`${url}/api/v1/accounts/${address}/transactions?limit=${limit}&reverse=true`, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then((data) => {
  //     const promises = [];


  //     if (data.status === 429) {
  //       return {
  //         status: 429,
  //       };
  //     }

  //     const { records } = data._embedded;

  //     if (!records) return [];

  //     records.forEach((item) => {
  //       promises.push(retrieveOperations(item.hash, item.created, item.fee));
  //     });

  //     return Promise.all(promises);
  //   })
  //   .then((results) => {
  //     const returnArray = [];
  //     results.forEach((result) => {
  //       returnArray.push(result);
  //     });

  //     return returnArray;
  //   });
};

export const makeTransaction = (source, password, target, amount, type, lastSequenceId) => {

  const url = USE_TESTNET && store.getState().settings.sebakURL
    ? store.getState().settings.sebakURL
    : TESTNET_ADDR;

  const nid = USE_TESTNET && store.getState().settings.networkId
    ? store.getState().settings.networkId
    : NETWORK_ID;

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
            amount: (amount * BOS_GON_RATE).toFixed(0), // 소수점 오차떄문에 Fixed 후 replace으로 변경 필요
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

  // console.log(JSON.stringify(body));

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
      // console.log(JSON.stringify(res));

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
        fee: Number(res.message.fee) / BOS_GON_RATE,
        amount: Number(res.message.operations[0].B.amount) / BOS_GON_RATE,
        target: res.message.operations[0].B.target,
      });
    });
};

export const listAccounts = () => {};
