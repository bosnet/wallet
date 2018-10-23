const Accounts = {
  SetPassword: {
    HEAD_TEXT: '이 계좌의 비밀번호를 설정해 주세요',
    TITLE: '비밀번호 설정',
    ACTION_TEXT: '취소',
    INPUT1_LABEL: '새 비밀번호 입력',
    INPUT2_LABEL: '새 비밀번호 재입력',
    PLACEHOLDER: '영문(대/소문자), 숫자, 특수문자 포함 8자 이상 입력',
    HELPER_DEFAULT: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
    HELPER_ERROR_NOTEXT: '비밀번호를 입력하세요',
    HELPER_ERROR_NOT_VALID: '잘못된 비밀번호입니다. 다시 확인해 주세요',
    HELPER_ERROR_NOT_MATCH: '비밀번호가 일치하지 않습니다',

    WARNING1: '* 비밀번호를 변경하게 되면, 기존의 복구키는 사용하실 수 없습\n   니다',
    WARNING2: '* 비밀번호 변경 완료 후 새로운 복구키를 안전한 곳에 저장해 주\n   시기 바랍니다',

    BOTTOM_BUTTON: '확인',
  },
  ImportAccount: {
    PLACEHOLDER_SECURE: 'S로 시작하는 보안키 입력',
    HELPER_DEFAULT_SECURE: 'S로 시작하는 보안키를 입력해 주세요',
    HELPER_ERROR_NO_SECURE: '보안키를 입력하세요',
    HELPER_ERROR_NOT_VALID: '보안키가 올바르지 않습니다',

    PLACEHOLDER_RESTORE: 'B로 시작하는 복구키 입력',
    HELPER_DEFAULT_RESTORE: 'B로 시작하는 복구키를 입력해 주세요',
    HELPER_ERROR_NO_RESTORE: '복구키를 입력하세요',
    HELPER_ERROR_NOT_VALID_RESTORE: '복구키가 올바르지 않습니다',

    PLACEHOLDER_RES_PASSWORD: '이 계좌의 비밀번호 입력',
    HELPER_DEFAULT_RES_PASSWORD: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니\n다',
    HELPER_ERROR_NO_RES_PASSWORD: '비밀번호를 입력하세요',
    HELPER_ERROR_NOT_VALID_RES_PASSWORD: '잘못된 비밀번호 입니다. 다시 확인해주세요',
  },
  ChangeAccountName: {
    TITLE: '이름 변경',
    HEAD_TEXT: '이 계좌의 이름을 등록해 주세요',

    INPUT_LABEL: '계좌 이름',
    INPUT_PLACEHOLDER: '계좌 이름 입력',
    HELPER_DEFAULT: '계좌 이름은 1자 이상 10자 이하로 입력해 주세요',
    HELPER_ERROR_NO_INPUT: '이름은 최소 1자 이상 최대 10자 이하 입력해 주세요',
    NOTICE: '* 지금 등록한 이름은 BOS Wallet을 삭제하거나, 계좌 가져오기를\n   통해 앱을 이전할 경우 모두 사라집니다',

    BOTTOM_BUTTON_TEXT: '확인',
  },
  AuthChangePassword: {
    modePassword: {
      TITLE: '비밀번호 인증',
      HEAD_TEXT: '이 계좌의 비밀번호를 입력해 주세요',

      INPUT_LABEL: '비밀번호',
      INPUT_PLACEHOLDER: '이 계좌의 비밀번호 입력',
      HELPER_DEFAULT: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함\n 8자 이상 입니다',

      TEXT_BUTTON_LABEL: '보안키로 인증하기',
    },
    modeSecure: {
      TITLE: '보안키 인증',
      HEAD_TEXT: '이 계좌의 보안키를 입력해 주세요',

      INPUT_LABEL: '보안키',
      INPUT_PLACEHOLDER: 'S로 시작하는 보안키 입력',
      HELPER_DEFAULT: 'S로 시작하는 보안키를 입력해 주세요',

      TEXT_BUTTON_LABEL: '보안키로 인증하기',
    },

    BACK_KEY_TEXT: '취소',
    NOTICE1: '* 비밀번호를 변경하게 되면, 기존의 복구키는 사용하실 수\n   없습니다',
    NOTICE2: '* 비밀번호 변경 완료 후 새로운 복구키를 안전한 곳에 저장해\n   주시기 바랍니다',

    BOTTOM_BUTTON_TEXT: '확인',
  },
};

export default Accounts;
