const Transactions = {
  SendBalance: {
    WITHDRAWABLE_LABEL: '출금 가능 금액',
    BALANCE_INPUT_LABEL: '보낼 금액',
    BALANCE_INPUT_PLACEHOLDER: '0.0000000',
    HELPER_BALANCE_DEFAULT: '보낼 금액을 입력하세요\n소수점 이하 7자리까지 입력 가능합니다',
    HELPER_BALANCE_ERROR_NO_INPUT: '보낼 금액을 입력하세요',
    HELPER_BALANCE_ERROR_NOT_VALID: '유효하지 않은 금액입니다.',
    HELPER_BALANCE_ERROR_RANGE: '출금 가능 금액보다 적은 금액을 입력해 주세요',
    HELPER_BALANCE_ERROR_DOT_RANGE: '소수점 이하 7자리까지 입력가능합니다',

    ADDRESS_INPUT_LABEL: '받는 계좌 공개주소',
    ADDRESS_INPUT_PLACEHOLDER: 'G로 시작하는 공개주소를 입력하세요',
    HELPER_ADDRESS_DEFAULT: '공개주소를 입력하세요',
    HELPER_ADDRESS_ERROR_NO_INPUT: '공개주소를 입력하세요',
    HELPER_ADDRESS_ERROR_NOT_VALID: '이 공개 주소로는 입금이 불가능 합니다',
  },
};

export default Transactions;
