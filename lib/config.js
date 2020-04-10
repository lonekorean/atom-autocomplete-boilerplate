'use babel'


export default {
  get: (cfg) => atom.config.get(`autocomplete-ygoproapi.${cfg}`),
  getFromEditor: (cfg) => atom.config.get(`editor.${cfg}`)
}
