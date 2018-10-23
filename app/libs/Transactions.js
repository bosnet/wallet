import sebakjs from 'sebakjs-util';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import {
  ToastAndroid,
  Clipboard,
} from 'react-native';


import { SEREVER_ADDR, NETWORK_ID, BOS_GON_RATE } from '../config/transactionConfig';


const { AES } = CryptoJS;

const makeRLPData = (body) => {
  const tx = [
    body.source,
    body.fee,
    body.sequenceID,
    [[
      [body.operations[0].H.type],
      [body.operations[0].B.target, body.operations[0].B.amount],
    ]],
  ];

  return tx;
};

export const retrieveAccount = address => (
  fetch(`${SEREVER_ADDR}/v1/accounts/${address}`, {
    method: 'GET',
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
      const result = [];
      const list = data._embedded.records;

      list.forEach((item) => {
        result.push(item.hash);
      });

      return result;  
    });
};

export const makeTransaction = (source, password, target, amount, type, lastSequenceId) => {
  let HType = 'payment';
  if (type === 'create') HType = 'create-account';

  const body = {
    T: 'transaction',
    H: {
      version: '0.1.0',
      created: new Date().toISOString(),
      // 'hash': '2g3ZSrEnsUWeX5Mxz5uTh2b4KVpVQS7Ek2HzZd759FHn',
      // 'signature': '3oWmCMNHExRQnZVEBSH16ZBgLE6ayz7t1fsjzTjAB6WpXMpkDJbhcL8KudqFFG21XmfSXnJH1BLhnBUh4p68yFeR'
    },
    B: {
      source: source.address,
      fee: String(10000),
      sequenceID: String(Number(lastSequenceId) + 1),
      operations: [
        {
          H: {
            type: HType,
          },
          B: {
            target,
            amount: String(amount),
          },
        },
      ],
    },
  };

  const RDPData = makeRLPData(body.B);

  const secretKey = AES.decrypt(source.secretSeed.slice(3), password);

  body.H.signature = sebakjs.sign(RDPData.toString(), NETWORK_ID, secretKey.toString(CryptoJS.enc.Utf8));
  body.H.hash = sebakjs.hash(RDPData);

  ToastAndroid.show(JSON.stringify(body), ToastAndroid.LONG);
  
  // const request = new XMLHttpRequest();
  // request.onreadystatechange = (e) => {
  //   if (request.readyState !== 4) {
  //     return;
  //   }
  
  //   if (request.status === 200) {
  //     console.log('success', request.responseText);
  //   } else {
  //     console.warn('error');
  //   }
  // };
  // request.open('POST', `${SEREVER_ADDR}/v1/transactions`);
  // request.setRequestHeader('Content-Type', 'application/json');
  // request.send(JSON.stringify(body));

  fetch(`${SEREVER_ADDR}/v1/transactions`, {
    method: 'POST',
    mode: "no-cors",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      ToastAndroid.show(JSON.stringify(response), ToastAndroid.LONG);
      return response.json();
    })
    .then(res => ({
      status: 200,
      transactionId: res.data.H.hash,
      source: res.data.B.source,
      fee: res.data.B.fee,
      amount: res.data.B.operations.B.amount,
      target: res.data.B.operations.B.target,
    }));

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
