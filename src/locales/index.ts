import Polyglot from 'node-polyglot'
import ja from './ja.json'
import en from './en.json'

const DEFAULT_LOCALE = 'ja'
const locale = process.env.LOCALE || DEFAULT_LOCALE

const polyglot = new Polyglot({ locale })

switch (locale) {
  case 'ja':
    polyglot.replace(ja)
    break
  case 'en':
    polyglot.replace(en)
    break
}

export default polyglot
