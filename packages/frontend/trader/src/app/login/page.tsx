/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
'use client'
import { WalletAsset } from '@/core/domain/models'
import { toast } from 'react-hot-toast'
import api from '@/core/infra/http/api'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

// Server Components => micro renderizações (cache)

export default async function WalletLogin() {
  const [wallet_id, setWalletID] = useState('')

  const handleSubmit = useCallback(async () => {
    try {
      const data = await api.get(`wallets/${wallet_id}/assets`)

      const result = data.data.some(
        (wallet: WalletAsset) => wallet.wallet_id === wallet_id,
      )
      console.log(result)

      toast.success('Found walletID.')

      if (result) redirect(`/${wallet_id}`)
    } catch (error) {
      toast.error('Something went wrong')
      redirect(`/`)
    }
  }, [wallet_id])

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          alt="K8S Invest"
          src="/logo.png"
          width={47}
          height={50}
        />
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
          Search wallet to enter your home broker account
        </h2>
      </div>

      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-slate-200">
              Wallet ID
            </label>
            <div className="mt-2">
              <input
                id="wallet_id"
                name="wallet_id"
                type="wallet_id"
                autoComplete="wallet_id"
                required
                onChange={(e) => setWalletID(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-slate-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="#"
            className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Become an investor.
          </a>
        </p>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  )
}
