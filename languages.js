const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')

const defaultLanguage = 'vie';

// based on the directories get the language codes
const languages = readdirSync(join(__dirname, '/src/locales')).filter((fileName) => {
    const joinedPath = join(join(__dirname, '/src/locales'), fileName)
    return lstatSync(joinedPath).isDirectory()
});
// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

module.exports = {
    languages,
    defaultLanguage,
};
