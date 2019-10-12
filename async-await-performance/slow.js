const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

const languages = ['en', 'si', 'ta', 'zh-CN', 'es', 'ru', 'ar', 'hi', 'fr', 'de', 'it', 'ja', 'ko', 'asdf'];

const translateTo = async () => {
  for (const language of languages) {
    try {
      const { text } = await translate('good morning', { from: 'en', to: language });
      fs.appendFile('message.txt', `${language} ===> ${text}\n`, (err) => {
        if (err) throw err;
      })
    } catch (err) {
      console.log(err.message)
    }
  } 
}

translateTo();
