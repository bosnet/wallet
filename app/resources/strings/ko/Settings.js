const Settings = {
  CURRENT_LANGUAGE: '한국어',

  SCREEN_TITLE: '설정',
  SECTION1_TITLE: '월렛 설정',
  ADDRESSBOOK: '주소록',
  SORT_ACCOUNTS: '계좌 순서',
  LANGUAGE: '언어',
  SEBAK_ENDPOINT: 'SEBAK Endpoint 설정',

  SECTION2_TITLE: '정보',
  FAQ: 'FAQ',
  WARNING: '주의사항',
  SERVICE: '서비스개선 참여',
  PRIVACY_POLICY: '개인정보처리방침',
  LICENSE: '오픈소스 라이센스',
  VERSION: '버전',

  Warning: {
    BACK_BUTTON: '닫기',

    HEAD_TEXT1: '중요한 정보는 소중하게 보관하기',
    CONTEXT1: '보안키, 복구키, 비밀번호를\n잃어버리거나 타인에게 공유하면\n당신의 귀한 자산을 모두 잃어버릴 수 있어요',

    HEAD_TEXT2: '항상 주변을\n잘 살피기',
    CONTEXT2: 'Wallet을 사용 중에 누군가 몰래 엿보지 않는지\n항상 주의를 기울여 주세요\n사용 후 반드시 앱을 종료해 주세요',

    BUTTON_TEXT_OK: '확인',
  },
  AddressBook: {
    TITLE: '주소록',
    BACK_BUTTON: '닫기',

    NOTI_NO_ADDRESS: '아직 등록된 주소가 없습니다',
    NOTI: 'BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지며 복구할 수 없습니다\n중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다',
    BUTTON_TEXT_ADD: '주소 추가',
  },
  SelectLanguage: {
    TITLE: '언어 설정',
    BACK_BUTTON: '닫기',

    OPTION_ENG: 'English',
    OPTION_KOR: '한국어',
  },
  ModifyAddress: {
    TITLE_ADD: '주소 추가',
    TITLE_MODIFY: '주소 수정',
    BACK_BUTTON: '닫기',

    LABEL_NAME: '이름',
    PLACEHOLDER_NAME: '최소 1자 이상 최대 10자 이하 입력',
    HELPER_NAME: '이름은 최소 1자 이상 최대 10자 이하 입력해 주세요',
    HELPER_ERROR_NO_NAME: '이름을 입력하세요',
    HELPER_ERROR_NAME_NOT_VALID: '이름은 최소 1자 이상 최대 10자 이하 입력해 주세요',
    HELPER_ERROR_INVALID_NAME: '지원되지 않는 텍스트가 포함되어 있습니다',
    HELPER_ERROR_DUPLICATE_NAME: '이미 사용 중인 이름입니다',


    TOAST_MODIFY_ADDRESS: '공개 주소는 수정할 수 없습니다',

    LABEL_ADDRESS: '공개 주소',
    PLACEHOLDER_ADDRESS: '공개 주소 입력',
    HELPER_ADDRESS: 'G로 시작하는 공개 주소 56자를 입력하세요',
    HELPER_ERROR_NO_ADDRESS: '공개 주소를 입력하세요',
    HELPER_ERROR_ADDRESS_NOT_VALID: '공개 주소가 올바르지 않습니다',
    HELPER_ERROR_DUPLICATE_ADDRESS: '이미 등록된 공개 주소 입니다',

    NOTI: 'BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지며 복구할 수 없습니다',
    NOTI2: '중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다',
    BUTTON_TEXT_OK: '확인',
  },
  InAppBrowser: {
    TITLE: '오픈소스 라이센스',
    BACK_BUTTON: '닫기',
  },
  QRScan: {
    HEAD_TEXT: 'QRcode를 사각형 안에 비춰 주세요',
  },
  ServiceAgreement: {
    TITLE: '서비스개선 참여',
    BACK_BUTTON: '닫기',
    HEAD_TEXT: '이 정보는 서비스 품질 향상을 위해서만\n사용되며, 참여를 원치 않을 경우\n거부하실 수 있습니다',
    LABEL_FIREBASE: '파이어베이스',
    TEXT_FIREBASE: '비정상 종료 되었을 때 오류 정보를 서버로 자동 전송하며 서비스 개선에 참여합니다',
    NOTI_FIREBASE: '전송정보 : Device, OS 버전, App 버전, 오류관련 내용',
  },
  SetSebakEndpoint: {
    TITLE: 'SEBAK Endpoint 설정',
    BACK_BUTTON: '닫기',

    LABEL_SEBAK_ENDPOINT: 'SEBAK Endpoint URL',
    PLACEHOLDER_SEBAK_ENDPOINT: 'SEBAK Endpoint URL 입력',
    HELPER_SEBAK_DEFAULT: 'SEBAK Endpoint URL을 입력해 주세요',
    HELPER_SEBAK_NOT_VALID: '유효하지 않은 URL입니다',

    LABEL_NID: 'Network ID',
    PLACEHOLDER_NID: 'Network ID 입력',
    HELPER_NID_DEFAULT: 'Network ID를 입력해 주세요',
    HELPER_NID_NOT_VALID: '유효하지 않은 ID입니다',

    LABEL_ANGELBOT: 'Angelbot URL',
    PLACEHOLDER_ANGELBOT: 'Angelbot URL 입력',
    HELPER_ANGELBOT_DEFAULT: 'Angelbot URL을 입력해 주세요',
    HELPER_ANGELBOT_NOT_VALID: '유효하지 않은 URL입니다',

    BUTTON_TEXT: '확인',
  },
};

export default Settings;
