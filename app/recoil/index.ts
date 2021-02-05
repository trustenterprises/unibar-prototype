import { atom, selector } from 'recoil';

// Action defs
const ACTIONS = {
  ACCOUNT_AUTHORISATION: "authorise.signature"
}

// selectors
const selectAuthorisedAccount = selector({
  key: ACTIONS.ACCOUNT_AUTHORISATION,
  get: ({ get }) => get(signatureAuth)
});

// Atoms
const signatureAuth = atom({
  key: ACTIONS.ACCOUNT_AUTHORISATION,
  default: {}
});

export default {
  actions: ACTIONS,
  selectors: {
    selectAuthorisedAccount
  },
  atoms: {
    signatureAuth
  }
}
