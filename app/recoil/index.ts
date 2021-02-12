import { atom, selector } from 'recoil';

// Action defs
const ACTIONS = {
  ACCOUNT_AUTHORISATION: "authorise.signature",
  ACCOUNT_FETCH_DATA: "fetch.account.data",
  ALL_POOLS_FETCH_DATA: "fetch.allpools.data",
  // Selectors
  SELECT_ACCOUNT_AUTHORISATION: "select.authorise.signature",
  SELECT_ACCOUNT_DATA: "select.account.data",
  SELECT_ALL_POOLS_DATA: "select.allpool.data",
}

// selectors
const selectAuthorisedAccount = selector({
  key: ACTIONS.ACCOUNT_AUTHORISATION,
  get: ({ get }) => get(signatureAuth)
});

const selectAccountData = selector({
  key: ACTIONS.ACCOUNT_FETCH_DATA,
  get: ({ get }) => get(accountData)
});

const selectAllPoolsData = selector({
  key: ACTIONS.SELECT_ALL_POOLS_DATA,
  get: ({ get }) => get(allPoolsData)
});

// Atoms
const signatureAuth = atom({
  key: ACTIONS.ACCOUNT_AUTHORISATION,
  default: {}
});

const accountData = atom({
  key: ACTIONS.ACCOUNT_FETCH_DATA,
  default: {}
});

const allPoolsData = atom({
  key: ACTIONS.ALL_POOLS_FETCH_DATA,
  default: {}
});

export default {
  actions: ACTIONS,
  selectors: {
    selectAuthorisedAccount,
    selectAccountData,
    selectAllPoolsData
  },
  atoms: {
    signatureAuth,
    accountData,
    allPoolsData
  }
}
