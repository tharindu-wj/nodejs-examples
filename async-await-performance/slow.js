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
  for (const language of languages) {
    try {
      // Translated string return in 'text' attribute
      const { text } = await translate(paragraph, { from: 'en', to: language });
      
      fs.appendFile('message.txt', `${language} ===> ${text}\n`, (err) => {
        if (err) throw err;
      })
    } catch (err) {
      console.log(err.message)
    }
  } 
}

translateTo('good morning');
