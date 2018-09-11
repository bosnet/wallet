module.exports = {
    "extends": "airbnb",
    "rules": {
        // React Native가 `.jsx` 지원 안함
        // https://github.com/airbnb/javascript/issues/982
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
    }
};