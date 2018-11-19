const Accounts = {
  Precaution: {
    TITLE: '계좌 생성 주의사항',
    PRECAUTION_1: '유효한 계좌를 만들기 위해서는\n최소 잔액이 필요합니다\n비밀번호 설정 후 최소 잔액\n0.1 BOS를 보내세요',
    PRECAUTION_2: '계좌 이름 및 주소록의 정보는 앱에\n저장되는 정보로서 앱을 삭제하거나\n기기를 변경하면 모든 정보가\n사라집니다\n중요한 공개 주소는 따로 보관하세요',
    PRECAUTION_3: '비밀번호는 송금, 보안키 조회,\n계좌 가져오기를 할 때 필요합니다\n비밀번호는 잃어버리면\n찾을 수 없으니 반드시 기억하세요',
    PRECAUTION_4: '보안키와 복구키는 계좌 가져오기\n할 때 필요합니다\n잃어버리거나 타인에게\n공유하지 마세요',
    ALERT_NEED_CHECK: '모든 주의사항을 체크해 주세요',
    BACK_BUTTON: '닫기',
    BUTTON_TEXT: '확인',
  },
  SetPassword: {
    HEAD_TEXT: '이 계좌의 비밀번호를 설정해 주세요',
    TITLE: '비밀번호 설정',
    ACTION_TEXT: '취소',
    INPUT1_LABEL: '새 비밀번호 입력',
    INPUT2_LABEL: '새 비밀번호 재입력',
    PLACEHOLDER: '비밀번호 입력',
    PLACEHOLDER2: '비밀번호 재입력',
    HELPER_DEFAULT: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
    HELPER_ERROR_NOTEXT: '비밀번호를 입력하세요',
    HELPER_ERROR_NOT_VALID: '잘못된 비밀번호입니다. 다시 확인해 주세요',
    HELPER_ERROR_NOT_MATCH: '비밀번호가 일치하지 않습니다',

    ALERT_PASSWORD_ERROR: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
    ALERT_PASSWORD_SET_TITLE: '비밀번호 설정 완료',
    ALERT_PASSWORD_SET_MESSAGE: '다음 화면에 보이는 복구키는\n월렛에서 계좌를 가져올 때 필요합니다\n복구키를 반드시 저장해 두세요',

    WARNING1: '비밀번호는 송금, 보안키 조회, 계좌 가져오기를 할 때 필요합니다',
    WARNING2: '비밀번호는 잃어버리면 찾을 수 없으니 반드시 기억해 주시기 바랍니다',

    WARNING_CHANGE1: '',
    WARNING_CHANGE2: '',

    BUTTON_TEXT: '확인',

    TOAST_DUPLICATED_ADDRESS: '이미 등록된 공개 주소 입니다',
    TOAST_ADDRESS_NOT_VALID: '공개 주소가 올바르지 않습니다',
    TOAST_SS_NOT_VALID: '보안키가 올바르지 않습니다',
  },
  ImportAccount: {
    TITLE: '계좌 가져오기',
    BACK_BUTTON: '취소',
    IMPORT_SS_MESSAGE: '가져올 계좌의 보안키를 입력해 주세요',
    IMPORT_RK_MESSAGE: '가져올 계좌의 복구키를 입력해 주세요',
    IMPORT_SS_LABEL: '보안키',
    IMPORT_RK_LABEL: '복구키',
    PASSWORD_LABEL: '비밀번호',

    PLACEHOLDER_SECURE: 'S로 시작하는 보안키 입력',
    HELPER_DEFAULT_SECURE: 'S로 시작하는 보안키를 입력해 주세요',
    HELPER_ERROR_NO_SECURE: '보안키를 입력하세요',
    HELPER_ERROR_NOT_VALID: '보안키가 올바르지 않습니다',
    TOAST_SS_NOT_VALID: '보안키가 올바르지 않습니다',

    PLACEHOLDER_RESTORE: 'B로 시작하는 복구키 입력',
    HELPER_DEFAULT_RESTORE: 'B로 시작하는 복구키를 입력해 주세요',
    HELPER_ERROR_NO_RESTORE: '복구키를 입력하세요',
    HELPER_ERROR_NOT_VALID_RESTORE: '복구키 또는 비밀번호를 다시 확인해 주세요',
    TOAST_RK_NOT_VALID: '복구키 또는 비밀번호를 다시 확인해 주세요',

    PLACEHOLDER_RES_PASSWORD: '이 계좌의 비밀번호 입력',
    HELPER_DEFAULT_RES_PASSWORD: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
    HELPER_ERROR_NO_RES_PASSWORD: '비밀번호를 입력하세요',
    HELPER_ERROR_NOT_VALID_RES_PASSWORD: '잘못된 비밀번호 입니다. 다시 확인해주세요',

    TOAST_DUPLICATED_ADDRESS: '이미 설치된 계좌입니다',

    NOTICE1_RK: '비밀번호는 본인 외에 아무도 알 수 없습니다',
    NOTICE2_RK: '이 계좌의 비밀번호를 모를 경우 복구키로 계좌를 가져올 수 없으니, 보안키를 이용하여 계좌 가져오기를 시도해 주시기 바랍니다',
    NOTICE1_SS: '보안키는 본인 외에 아무도 알 수 없습니다',
    NOTICE2: '이 계좌의 비밀번호를 모를 경우 복구키로 계좌를 가져올 수 없으오니, 보안키를 이용하여 계좌 가져오기를 시도해 주시기 바랍니다',
    NOTICE2_SS: '보안키를 잊어버린 경우 보안키로 계좌를 가져올 수 없으니, 복구키로 계좌 가져오기를 이용해 주시기 바랍니다',

    BUTTON_TEXT: '확인',
    BUTTON_NEXT: '다음',
  },
  ChangeAccountName: {
    TITLE: '이름 변경',
    HEAD_TEXT: '이 계좌의 이름을 등록해 주세요',
    BACK_BUTTON: '취소',

    INPUT_LABEL: '계좌 이름',
    INPUT_PLACEHOLDER: '계좌 이름 입력',
    HELPER_DEFAULT: '계좌 이름은 1자 이상 10자 이하로 입력해 주세요',
    HELPER_ERROR_NO_INPUT: '이름은 최소 1자 이상 최대 10자 이하 입력해 주세요',
    HELPER_ERROR_INVALID_NAME: '지원되지 않는 텍스트가 포함되어 있습니다',
    HELPER_ERROR_DUPLICATE_NAME: '이미 사용 중인 이름입니다',

    NOTICE: '지금 등록한 이름은 BOS Wallet을 삭제하거나, 계좌 가져오기를 통해 앱을 이전할 경우 모두 사라집니다',

    BOTTOM_BUTTON_TEXT: '확인',
  },
  AuthChangePassword: {
    modePassword: {
      TITLE: '비밀번호 인증',
      HEAD_TEXT: '이 계좌의 비밀번호를 입력해 주세요',

      INPUT_LABEL: '비밀번호',
      INPUT_PLACEHOLDER: '영문(대/소문자), 숫자, 특수문자 포함 8자 이상 입력',
      HELPER_DEFAULT: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자 이상 입니다',
      HELPER_NO_INPUT: '비밀번호를 입력하세요',
      HELPER_INVALID: '잘못된 비밀번호 입니다. 다시 확인해 주세요',

      TEXT_BUTTON_LABEL: '보안키로 인증하기',
    },
    modeSecure: {
      TITLE: '보안키 인증',
      HEAD_TEXT: '이 계좌의 보안키를 입력해 주세요',

      INPUT_LABEL: '보안키',
      INPUT_PLACEHOLDER: 'S로 시작하는 보안키 입력',
      HELPER_DEFAULT: 'S로 시작하는 보안키를 입력해 주세요',
      HELPER_NO_INPUT: '보안키를 입력하세요',
      HELPER_INVALID: '보안키가 올바르지 않습니다',
      
      TEXT_BUTTON_LABEL: '비밀번호로 인증하기',
    },

    ALERT_REMOVE_OK_TITLE: '계좌 삭제 완료',
    ALERT_REMOVE_OK_CONTEXT: '계좌 삭제가 완료되었습니다',
    ALERT_BUTTON_OK: '확인',

    BACK_KEY_TEXT: '취소',
    NOTICE1: '비밀번호는 본인 외에 아무도 알 수 없습니다',
    NOTICE2: '비밀번호 변경 완료 후 새로운 복구키를 안전한 곳에 저장해주시기 바랍니다',


    NOTICE_CHANGE1: '비밀번호를 변경하게 되면, 기존의 복구키는 사용하실 수 없습니다',
    NOTICE_CHANGE2: '비밀번호 변경 완료 후 새로운 복구키를 안전한 곳에 저장해주시기 바랍니다',

    BUTTON_TEXT_OK: '확인',
    BUTTON_TEXT_NEXT: '다음',
  },
  AccountCreated: {
    SS_KEY: '보안키',
    RS_KEY: '복구키',

    TITLE: '백업',
    BACK_BUTTON: '닫기',
    BUTTON_SAVE: '저장',
    BUTTON_COPY: '복사',

    PUBLIC_ADDRESS: '공개 주소',

    TOAST_CLIPBOARD: '가 클립보드에 복사되었습니다',

    TOAST_CLIPBOARD_SS: '클립보드에 복사되었습니다',
    TOAST_CLIPBOARD_RK: '클립보드에 복사되었습니다',

    SS_TITLE: '보안키 확인',
    RK_TITLE: '복구키 확인',

    RK_HEADTEXT: '안전한 곳에 복구키를 보관해 주세요\n복구키는 비밀번호와 함께 보관해 주세요',
    SS_HEADTEXT: '안전한 곳에 보안키를 보관해 주세요',
  },
  SelectImportType: {
    TITLE: '가져오기 방법 선택',
    BACK_BUTTON: '닫기',

    SELECT_SS: '보안키로 계좌 가져오기',
    SELECT_RK: '복구키로 계좌 가져오기',
  },
  Management: {
    TITLE: '관리',
    LABEL_CHANGE_NAME: '이름 변경',
    LABEL_CHANGE_PASSWORD: '비밀번호 설정',
    LABEL_SHOW_SS: '보안키 확인',
    LABEL_SHOW_RK: '복구키 확인',
    LABEL_REMOVE_ACCOUNT: '계좌 삭제',

    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',
  },
  WarningKeyLeakageRestore: {
    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',

    TITLE_SS: '보안키 유출 주의',
    TITLE_RK: '복구키 유출 주의',
    MESSAGE_SS: '보안키를 잃어버리거나\n타인에게 노출이 될 경우\n이 계좌에 있는 모든 코인을\n도난 당하게 됩니다\n보안키 보안에 특별히\n 신경써 주시기 바랍니다',
    MESSAGE_RK: '복구키와 비밀번호를 잊어버리거나\n타인에게 누출이 될 경우\n이 계좌에 있는 모든 코인을\n도난 당하게 됩니다\n복구키 보안에 특별히\n신경써 주시기 바랍니다',
    NOTI_SS: '보안키는 계좌를 가져올 때 사용됩니다',
    NOTI_SS2: '보안키, 복구키, 비밀번호는 본인 외에는 아무도 알 수 없으니,\n반드시 잘 보관해 주시기 바랍니다',
    NOTI_RK: '복구키와 비밀번호는 계좌를 가져올 때 사용됩니다',
    NOTI_RK2: '보안키, 복구키, 비밀번호는 본인 외에는 아무도 알 수 없으니,\n반드시 잘 보관해 주시기 바랍니다',

    BUTTON_TEXT_OK: '확인',
  },
  ConfirmBackUp: {
    TITLE: '백업 확인',
    BACK_BUTTON: '취소',

    MESSAGE: '보안키, 복구키, 비밀번호를\n모두 안전한 곳에 보관하셨나요?',
    NOTI: '보안키, 복구키, 비밀번호를 안전한 곳에 보관하지 않은 상태에서 계좌를 삭제할 경우 계좌 내 모든 보스코인을 통제할 수 없게 됩니다!',

    BUTTON_TEXT_OK: '확인',
  },
  ConfirmRemove: {
    TITLE: '최종 확인',
    BACK_BUTTON: '취소',

    MESSAGE: '정말 계좌를 삭제하시겠습니까?',

    BUTTON_TEXT_OK: '확인',
  },
};

export default Accounts;
