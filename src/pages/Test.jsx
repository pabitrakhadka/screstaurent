import React from 'react'
import OrderMessage from '@/components/OrderMessage'
import Layout from '@/components/Layout'
const Test = ({ children }) => {
    return (
        <>
            <Layout>
                <div className="view p-5">
                    <OrderMessage />
                </div>
            </Layout>
        </>
    )
}

export default Test