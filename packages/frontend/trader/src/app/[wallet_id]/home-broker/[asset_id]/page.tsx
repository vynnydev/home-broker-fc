/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { AssetChartComponent } from '@/presentation/components/AssetChartComponent'
import MyOrders from '@/presentation/components/MyOrders'
// import MyWallet from '@/presentation/components/MyWallet'
import { OrderForm } from '@/presentation/components/OrderForm'
import { SyncOrders } from '@/presentation/components/SyncOrders'
import DefaultNavbar from '@/presentation/components/NavBar'

import {
  TabsGroup,
  TabsItem,
  Card,
} from '@/presentation/components/flowbite-components'
import {
  HiShoppingCart,
  HiArrowUp,
} from '@/presentation/components/react-icons/hi'

export default async function page({
  params,
}: {
  params: { wallet_id: string; asset_id: string }
}) {
  return (
    <>
      <DefaultNavbar />
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
                <SyncOrders wallet_id={params.wallet_id}>
                  <div className="max-h-96 overflow-y-auto overflow-hidden">
                    <MyOrders wallet_id={params.wallet_id} />
                  </div>
                </SyncOrders>
              </Card>
            </div>
          </div>
          <div className="col-span-3 flex flex-grow">
            <AssetChartComponent asset_id={params.asset_id} />
          </div>
        </div>
      </main>
    </>
  )
}
