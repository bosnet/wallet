const Transactions = {
  TransactionList: {
    ACTION_SETTING: '관리',
    BUTTON_SEND: '보내기',
    BUTTON_RECEIVE: '받기',

    LABEL_CREATED: '계좌 생성',

    TOAST_ON_DELAY: '로딩중... 잠시 후에 다시 시도해 주세요',

    INVALID_ACCOUNT_NOTI: '이 계좌를 유효한 계좌로 만들기 위해\n최소 잔액(0.1BOS)이 있어야 합니다\n공개 주소로 최소 잔액 0.1 BOS를 받으세요',
    INVALID_ACCOUNT_BUTTON: '0.1 BOS 받기',

    TOAST_ACCOUNT_NOT_AVAILABLE: '현재 이 계좌는 유효한 계좌가 아닙니다\n유효한 계좌만 송금할 수 있습니다',
  },
  SendBalance: {
    TITLE: '보내기',
    BACK_BUTTON: '닫기',

    WITHDRAWABLE_LABEL: '출금 가능 금액',
    BALANCE_INPUT_LABEL: '보낼 금액',
    BALANCE_INPUT_PLACEHOLDER: '0.0000000',
    HELPER_BALANCE_DEFAULT: '보낼 금액을 입력하세요\n소수점 이하 7자리까지 입력 가능합니다',
    HELPER_BALANCE_ERROR_NO_INPUT: '보낼 금액을 입력하세요',
    HELPER_BALANCE_ERROR_NOT_VALID: '유효하지 않은 금액입니다',
    HELPER_BALANCE_ERROR_RANGE: '출금 가능 금액보다 적은 금액을 입력해 주세요',
    HELPER_BALANCE_ERROR_DOT_RANGE: '소수점 이하 7자리까지 입력가능합니다',

    ADDRESS_INPUT_LABEL: '받는 계좌 공개 주소',
    ADDRESS_INPUT_PLACEHOLDER: '공개 주소 입력',
    HELPER_ADDRESS_DEFAULT: '공개 주소를 입력하세요',
    HELPER_ADDRESS_ERROR_NO_INPUT: '공개 주소를 입력하세요',
    HELPER_ADDRESS_ERROR_NOT_VALID: '이 공개 주소로는 입금이 불가능 합니다',

    TOAST_NO_ADDRESS: '받는 계좌를 선택해 주세요',

    LABEL_FEE: '수수료',

    BUTTON_TEXT_OK: '확인',
  },
  SelectWithdraw: {
    TITLE: '출금 계좌 선택',
    NOTI_NO_ADDRESS: '유효한 출금 계좌가 없습니다',
    BACK_BUTTON: '취소',
    BUTTON_TEXT_OK: '선택',
  },
  TransactionDetail: {
    TITLE: '거래 상세 내역',
    BACK_BUTTON: '닫기',
    LABEL_SENDER: '보낸 계좌',
    LABEL_RECEIVED_AMOUNT: '받은 금액',

    LABEL_RECEIVER: '받는 계좌',
    LABEL_SEND_AMOUNT: '보낸 금액',

    LABEL_FEE: '수수료',
    LABEL_TOTAL: '총액',

    LABEL_DATE: '거래 시각',
    LABEL_TYPE: '거래 구분',
    TYPE_SEND: '출금',
    TYPE_RECV: '입금',
    LABEL_TRANSACTION_ID: '트랜잭션 아이디',

    BUTTON_TEXT_OK: '확인',
    BUTTON_TEXT_EXPLORER: '익스플로러',

    TOAST_CLIPBOARD: '클립보드에 복사되었습니다',
  },
  BeforeTransaction: {
    TITLE: '송금 내역 확인',
    HEAD_TEXT: '아래의 송금내역이 맞는지 확인해 주세요',
    LABEL_RECEIVER: '받는 계좌 공개 주소',
    LABEL_AMOUNT: '보낼 금액',
    LABEL_FEE: '수수료',
    LABEL_TOTAL: '총액',

    BUTTON_TEXT_YES: '예',
    BUTTON_TEXT_NO: '아니오',
  },
  ReceiveBalance: {
    TITLE: '받기',
    BACK_BUTTON: '닫기',
    PUBLIC_ADDRESS: '공개 주소',

    BUTTON_TEXT_SHARE: '공유',
    BUTTON_TEXT_COPY: '복사',

    TOAST_CLIPBOARD: '클립보드에 복사되었습니다',
  },
  ReceiveAccount: {
    TITLE: '받는 계좌',
    BACK_BUTTON: '취소',

    TAB1_TITLE: '나의 계좌',
    TAB2_TITLE: '주소록',
    TAB3_TITLE: '직접 입력',

    // TAB 1
    MyAccounts: {
      NOTI_NO_ADDRESS: '나의 계좌가 없습니다',
      BUTTON_TEXT_SELECT: '선택',
    },

    // TAB 2
    AddressBook: {
      NOTI_NO_ADDRESS: '아직 등록된 주소가 없습니다',
      BUTTON_TEXT_SELECT: '선택',
    },

    // TAB 3
    InputAccounts: {
      NO_RECENT_ADDRESS: '최근에 송금한 내역이 없습니다',
      BUTTON_TEXT_SELECT: '선택',
      INPUT_PLACEHOLDER: '공개 주소 입력',

      HELPER_ADDRESS_DEFAULT: 'G로 시작하는 공개 주소 56자를 입력하세요',
      HELPER_ADDRESS_ERROR_NO_INPUT: '공개 주소를 입력하세요',
      HELPER_ADDRESS_ERROR_NOT_VALID: '공개 주소가 올바르지 않습니다',

      LABEL_PUBLIC_ADDRESS: '공개 주소',
      LABEL_RECENT_SENT: '최근 송금 내역',

      TOAST_NO_ADDRESS: '받는 계좌를 선택해 주세요',
    },
  },

  CreateTransaction: {
    TITLE: '송금 요청 생성',

    HEAD_TEXT_TRANSACTION_OK: '트랜잭션이 생성되었습니다',
    HEAD_TEXT_TRANSACTION_FAIL: '트랜잭션 생성이 실패했습니다\n잠시 후 다시 시도해 주시기 바랍니다',

    BUTTON_TEXT_OK: '확인',
    BUTTON_TEXT_ADD: '주소록 추가',

    LABEL_TFAIL: '트랜잭션 결과',
    LABEL_FAIL_PREFIX: '트랜잭션 실패 -',

    LABEL_ADDR: '받는 계좌 공개 주소',
    LABEL_AMOUNT: '보낸 금액',
    LABEL_FAILED_AMOUNT: '송금 실패 금액',
    LABEL_FEE: '수수료',
    LABEL_TOTAL: '총액',
  },
};

export default Transactions;
