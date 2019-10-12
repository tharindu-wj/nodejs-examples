const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

// Language codes to translated
const languages = ['en', 'si', 'ta', 'zh-CN', 'es', 'ru', 'ar', 'hi', 'fr', 'de', 'it', 'ja', 'ko'];

/**
 * Translate string to other languages and write output to file
 *
 * @paragraph : String
 */
const translateTo = async (paragraph) => {

  // Stores a array of promises
  const translated = languages.map(async language => {
    try {
      // Translated string return in 'text' attribute
      const { text } = await translate(paragraph, { from: 'en', to: language });
      return { data: { from: 'en', to: language, content: text }, err: null }
    } catch (err) {
      return { data: null, err: err.message }
    }
  });

  // Store translated paragraphs in a array after all are translated
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

translateTo('good morning');
