/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { WalletAsset } from '@/core/domain/models'
// import { isHomeBrokerClosed } from '@/utils/BrokerClosed'

// Server Components => micro renderizações (cache)
async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
  const response = await fetch(
    `http://localhost:8000/wallets/${wallet_id}/assets`,
    {
      // cache: 'no-store', processamento sempre dinâmico
      next: {
        tags: [`orders-wallet-${wallet_id}`],
        // revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
        revalidate: 1,
      },
    },
  )
  return response.json()
}

export default async function MyWallet(props: { wallet_id: string }) {
  const walletAssets = await getWalletAssets(props.wallet_id)

  return (
    <ul>
      {walletAssets.map((walletAsset) => (
        <li key={walletAsset.id}>
          {walletAsset.Asset.id} - {walletAsset.shares} - R${' '}
          {walletAsset.Asset.price}
        </li>
      ))}
    </ul>
  )
}
