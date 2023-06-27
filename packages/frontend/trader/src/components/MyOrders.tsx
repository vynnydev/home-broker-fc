/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { Order } from '@/core/domain/models'
// import { isHomeBrokerClosed } from '@/utils/BrokerClosed'

// Server Components => micro renderizações (cache)
async function getOrders(wallet_id: string): Promise<Order[]> {
  const response = await fetch(
    `http://localhost:8000/wallets/${wallet_id}/orders`,
    {
      next: {
        tags: [`orders-wallet-${wallet_id}`],
        // revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
        revalidate: 1,
      },
    },
  )
  return response.json()
}

export default async function MyOrders(props: { wallet_id: string }) {
  const orders = await getOrders(props.wallet_id)

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.Asset.id} - {order.price} - {order.status}
        </li>
      ))}
    </ul>
  )
}
