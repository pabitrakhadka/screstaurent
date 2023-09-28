import Dlayout from '@/components/Dlayout'
import React from 'react'
import Router, { useRouter } from 'next/router'



const todaySpecial = () => {
    const router = useRouter();
    const productData = 'special_Product';
    const addProductSpecial = () => {
        router.push(`/addproduct?product=${productData}`);
    }

    return (
        <Dlayout>
            <div className="today_special">
                <h1>Today Special</h1>
                <button onClick={() => { addProductSpecial() }} className='addproduct text-white'>Add Special</button>
            </div>
        </Dlayout>
    )
}

export default todaySpecial