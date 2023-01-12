import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import SingleTransactionList from '../components/SingleTransactionList';


export default function Dashboard() {

  const [transactions, setTransctions] = useState([]);

  useEffect(() => {
    setTransctions(JSON.parse(localStorage.getItem('transactions')).reverse() || []);
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="w-full h-screen max-w-sm mx-auto">

        <div className='flex items-center py-4'>
            <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-purple-600 rounded-full'></div>
                <p className='text-xs font-bold'>Hello, Maxwell</p>
            </div>

            <MdOutlineQrCodeScanner className="text-xl text-purple-600 ml-auto" />
        </div>

        <div className='flex items-center px-8 py-12 bg-purple-600 text-white rounded-2xl'>
            <div className='space-y-2'>
                <p className='text-xs'>Account Balance</p>
                <p className='text-4xl font-bold'>&#8358; {(
                  transactions.reduce((acc, cv) => {
                    if(cv.type === "credit") return acc += Number(cv.amount);
                    return acc -= Number(cv.amount);
                  }, 0)
                ).toLocaleString()}</p>
            </div>
        </div>

        <div className='grid grid-cols-2 gap-4 py-4'>
            <Link href="/fund-wallet" className='block p-4 bg-[#18A47E] text-xs text-center text-white rounded-xl'>Fund Wallet</Link>
            <Link href="/pay-bills" className='block p-4 bg-purple-600 text-xs text-center text-white rounded-xl'>Pay Bills</Link>
        </div>

        <div className='py-4'>
            <p className='text-xs font-bold pb-3'>Transactions</p>
            <div className='space-y-3'>
                
                {transactions.reverse().map((trx, index) => (
                  <SingleTransactionList 
                    key={index}
                    {...trx}
                  />
                ))}
                
                <div className='flex justify-center'>
                    <Link href="/history" className='inline-block mx-auto rounded-md text-white bg-purple-600 py-2 px-4 text-xs font-bold'>More Transactions</Link>
                </div>
            </div>
        </div>

      </main>

    </div>
  )
}
