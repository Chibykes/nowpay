import Link from 'next/link';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

export default function SingleTransactionList({ reference, type, details, amount }){
    return (
        <Link href={`/transaction?reference=${reference}`} className="flex items-center bg-white p-4 gap-4 rounded-lg">
            {type === 'credit' ? <BiDownArrowAlt className="text-lg text-green-500" /> :
            <BiUpArrowAlt className="text-lg text-red-500" />}
            <div className='grow space-y-1'>
                <p className='text-xs text-app-gray'>{type === "credit" ? "Money Recieved" : "Money Sent"}</p>
                <p className='text-xs text-purple-600'>{details}</p>
            </div>
            <p className={`${type === "credit" ? "text-green-500" : "text-red-500"} text-xs font-bold`}>&#8358; {amount}</p>
        </Link>
    );
}