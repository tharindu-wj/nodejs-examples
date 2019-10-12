const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

const languages = ['en', 'si', 'ta', 'zh-CN', 'es', 'ru', 'ar', 'hi', 'fr', 'de', 'it', 'ja', 'ko', 'asdf'];

const translateTo = async () => {

  const translated = languages.map(async language => {
    try {
      const { text } = await translate('good morning', { from: 'en', to: language });
      return { data: { from: 'en', to: language, content: text }, err: null }
    } catch (err) {
      return { data: null, err: err.message }
    }
  });

  const results = await Promise.all(translated);

  for (const result of results) {
    if (result.err !== null) continue;
    try {
      fs.appendFile('message.txt', `${result.data.to} ===> ${result.data.content}\n`, (err) => {
        if (err) throw err;
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}

translateTo();
