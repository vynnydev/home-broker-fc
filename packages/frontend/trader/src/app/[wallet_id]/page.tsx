import MyWallet from '@/presentation/components/MyWallet'
import DefaultNavbar from '@/presentation/components/NavBar'

export default function HomePageBroker({
  params,
}: {
  params: { wallet_id: string }
}) {
  return (
    <>
      <DefaultNavbar />
      <main className="container mx-auto px-2">
        <article className="format format-invert my-5">
          <h1>Meus investimentos</h1>
        </article>
        <MyWallet wallet_id={params.wallet_id} />
      </main>
    </>
  )
}
