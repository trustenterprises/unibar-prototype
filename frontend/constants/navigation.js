const sections = {
  assets: { title: 'Assets',  key: 'assets' },
  pool: { title: 'Pool',  key: 'pool' },
  bridge: { title: 'Bridge',  key: 'bridge' },
  reward: { title: 'Reward',  key: 'reward' },
  project: { title: 'Projects',  key: 'project' },
}

const overviewSections = {
  my_account: { title: 'Account', key: 'my_account' },
  my_tokens: { title: 'Assets', key: 'my_tokens' },
  mint_ft: { title: 'Mint Fungible Token', key: 'mint_ft' },
  mint_dnft: { title: 'Mint Dynamic Token (dNFT)', key: 'mint_dnft' },
  // sandbox: { title: 'Testing Sandbox', key: 'sandbox' },
  // status: { title: 'Unibar Status', key: 'status' }
}

const poolSections = {
  current_pools: { title: 'Current Pools', key: 'current_pools' },
  create_pool: { title: 'Create Project Pool', key: 'create_pool' },
}

export default {
  sections,
  overviewSections,
  poolSections
}
