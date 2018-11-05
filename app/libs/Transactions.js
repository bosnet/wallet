import sebakjs from 'sebakjs-util';
import CryptoJS from 'crypto-js';
import {
  ToastAndroid,
  Clipboard,
} from 'react-native';
import fetch from 'react-native-fetch-polyfill';

import { SEREVER_ADDR, NETWORK_ID, BOS_GON_RATE } from '../config/transactionConfig';

const { AES } = CryptoJS;

const makeRLPData = (type, body) => {

  if (type === 'payment') {
    const tx = [
      body.source,
      Number(body.fee),
      Number(body.sequence_id),
      [[
        [body.operations[0].H.type],
        [body.operations[0].B.target, Number(body.operations[0].B.amount)],
      ]],
    ];
    return tx;
  }

  const tx = [
    body.source,
    Number(body.fee),
    Number(body.sequence_id),
    [[
      [body.operations[0].H.type],
      [body.operations[0].B.target, Number(body.operations[0].B.amount), ''],
    ]],
  ];

  return tx;
};

const makeFullISOString = (str) => {
  return str.slice(0, str.length - 1) + '000000' + str.slice(str.length - 1 + Math.abs(0));
};

export const retrieveAccount = address => (
  fetch(`${SEREVER_ADDR}/v1/accounts/${address}`, {
    method: 'GET',
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 404) {
        return {
          status: 404,
          balance: 0,
        };
      }
      if (data.status === 500) {
        return {
          status: 500,
        };
      }

      return {
        status: 200,
        ...data,
        balance: Number(data.balance) / BOS_GON_RATE,
      };
    })
);


export const retrieveOperations = (txHash, date, fee) => {

  return fetch(`${SEREVER_ADDR}/v1/transactions/${txHash}/operations`, {
    method: 'GET',
    timeout: 3000,
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
        amount: (Number(records.body.amount) / BOS_GON_RATE),
        type: records.type,
        txHash,
        date,
        fee: fee / BOS_GON_RATE,
      };

      return returnData;
    });
};

export const retrieveTransactions = (address) => {
  return fetch(`${SEREVER_ADDR}/v1/accounts/${address}/transactions?limit=10&reverse=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      const promises = [];
      const { records } = data._embedded;

      records.forEach((item) => {
        promises.push(retrieveOperations(item.hash, item.created, item.fee));
      });

      return Promise.all(promises);
    })
    .then((results) => {
      const returnArray = [];
      results.forEach((result) => {
        returnArray.push(result);
      });

      return returnArray;
    });
};

export const makeTransaction = (source, password, target, amount, type, lastSequenceId) => {
  let HType = 'payment';
  if (type === 'create') HType = 'create-account';

  const body = {
    T: 'transaction',
    H: {
      version: '``',
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
            amount: String(amount * BOS_GON_RATE),
            // linked: '',
          },
        },
      ],
    },
  };


  const RDPData = makeRLPData(HType, body.B);
  console.log(JSON.stringify(RDPData));

  const secretKey = AES.decrypt(source.secretSeed.slice(3), password);
  const hash = sebakjs.hash(RDPData);
  const sig = sebakjs.sign(hash, NETWORK_ID, secretKey.toString(CryptoJS.enc.Utf8));

  body.H.hash = hash;
  body.H.signature = sig;

  console.log(JSON.stringify(body));
  Clipboard.setString(JSON.stringify(body));

  return fetch(`${SEREVER_ADDR}/v1/transactions`, {
    method: 'POST',
    timeout: 1000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log(response);

      return response.json();
    })
    .then((res) => {
      console.log(JSON.stringify(res));

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

  // return fetch(`http://conall.co.kr/moon.php`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     charset: 'utf-8',
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then(result=> {
  //     ToastAndroid.show(JSON.stringify(result), ToastAndroid.LONG);
  //   });
};

export const listAccounts = () => {};
