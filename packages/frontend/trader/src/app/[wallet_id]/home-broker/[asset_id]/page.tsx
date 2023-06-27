/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { ChartComponent } from '@/components/ChartComponents'
import MyOrders from '@/components/MyOrders'
// import MyWallet from '@/components/MyWallet'
import { OrderForm } from '@/components/OrderForm'

import { TabsGroup, TabsItem, Card } from '@/components/flowbite-components'
import { HiShoppingCart, HiArrowUp } from '@/components/react-icons/hi'

export default async function page({
  params,
}: {
  params: { wallet_id: string; asset_id: string }
}) {
  return (
    <main className="flex flex-grow flex-col container mx-auto p-2">
      <article className="format format-invert my-5">
        <h1>K8S Home broker - {params.asset_id}</h1>
      </article>
      <div className="grid grid-cols-5 flex-grow gap-2 mt-2">
        <div className="col-span-2">
          <div>
            <Card
              theme={{
                root: {
                  children:
                    'flex h-full flex-col justify-center gap-4 py-4 px-2',
                },
              }}
            >
              <TabsGroup aria-label="Default tabs" style="pills">
                <TabsItem active title="Comprar" icon={HiShoppingCart}>
                  <OrderForm
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                    type="BUY"
                  />
                </TabsItem>
                <TabsItem title="Vender" icon={HiArrowUp}>
                  <OrderForm
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                    type="SELL"
                  />
                </TabsItem>
              </TabsGroup>
            </Card>
          </div>
          <div className="mt-2">
            <Card
              theme={{
                root: {
                  children:
                    'flex h-full flex-col justify-center gap-4 py-4 px-2',
                },
              }}
            >
              <div className="max-h-96 overflow-y-auto overflow-hidden">
                <MyOrders wallet_id={params.wallet_id} />
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-3 flex flex-grow">
          <ChartComponent header="Asset 1 - R$ 100" />
        </div>
      </div>
    </main>
  )
}
