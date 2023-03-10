import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdError, MdOutlineQrCodeScanner } from 'react-icons/md';


export default function Dashboard() {
  
  const router = useRouter();
  const [form, setForm] = useState({
    reference: (new Date()).getTime().toString()
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let trx = JSON.parse(localStorage.getItem('transactions')) || [];

    let balance = trx.reduce((acc, cv) => {
      if(cv.type === "credit") return acc += Number(cv.amount);
      return acc -= Number(cv.amount);
    }, 0);

    if(form.amount > balance){
      return setError('Balance is low');
    }

    let updatedTrx = JSON.stringify([...trx, {
      type: 'debit',
      email: '',
      ...form,
      details: form.tag,
    }]);

    localStorage.setItem('transactions', updatedTrx);
    router.push(`/success?reference=${form.reference}`);
  }

  return (
    <div>
      <Head>
        <title>Pay Bills</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="w-full h-screen max-w-sm mx-auto p-4">

        <div className='py-4'>
            <p className='text-xs text-center font-bold pb-3'>Pay Bills</p>
            <form onSubmit={handleSubmit} className='pt-4 space-y-5'>

              <div className='bg-white border border-purple-600 rounded-sm py-2 px-3'>
                <input
                  name="tag"
                  type="text"
                  className="text-xs border-none outline-none focus:ring-transparent block w-full"
                  placeholder="Payee Tag"
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  required
                />
              </div>

              <div className='bg-white border border-purple-600 rounded-sm py-2 px-3'>
                <input
                  name="amount"
                  type="number"
                  className="text-xs border-none outline-none focus:ring-transparent block w-full"
                  placeholder="Amount"
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  required
                />
              </div>

              <div className='bg-white border border-purple-600 rounded-sm py-2 px-3'>
                <input
                  name="naration"
                  type="text"
                  className="text-xs border-none outline-none focus:ring-transparent block w-full"
                  placeholder="Naration"
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  required
                />
              </div>

              {error && <div className='flex gap-2 justify-center items-center text-xs text-red-600 font-bold'>
                <MdError className="text-red-600" />
                {error}
              </div>}

              <button type='submit' className='w-full text-xs text-center font-bold text-white bg-purple-600 border-2 border-purple-600 rounded-sm py-4 px-3'>
                  Pay
              </button>

              <div className='py-2 text-xs text-center font-bold'>Or</div>

              <button className='flex gap-4 justify-center items-center w-full text-xs text-center font-bold text-white bg-black border-2 border-black rounded-sm py-4 px-3'>
                  <MdOutlineQrCodeScanner className="text-xl text-white" />
                  Scan
              </button>
                
            </form>
        </div>

      </main>

    </div>
  )
}
