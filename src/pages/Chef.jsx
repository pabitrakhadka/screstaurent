import Dlayout from '@/components/Dlayout'
import React from 'react'
import Link from 'next/link';
const Chef = () => {
    return (
        <Dlayout>
            <div className="view">
                <h1>Expert Chef</h1>
            </div>
            <div className="chef_row">

                <div className="card box_border">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGh1bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div className="links flex">
                            <li>  <Link href='/'><i className="bi bi-facebook"></i></Link></li>
                            <li><Link href='/'><i className="bi bi-instagram"></i></Link></li>
                            <li> <Link href='/'><i className="bi bi-twitter"></i></Link></li>
                        </div>
                        <div className="edit_data flex">
                            <button className='btn bg-danger text-white'>  <i className="bi bi-pencil-square"></i></button>
                            <button className='btn bg-danger text-white' ><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>



                <div className="card box_border"  >
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGh1bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div className="links flex">
                            <li>  <Link href='/'><i className="bi bi-facebook"></i></Link></li>
                            <li><Link href='/'><i className="bi bi-instagram"></i></Link></li>
                            <li> <Link href='/'><i className="bi bi-twitter"></i></Link></li>
                        </div>
                    </div>
                </div>


                <div className="card box_border" >
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGh1bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div className="links flex">
                            <li><Link href='/face'><i className="bi bi-facebook"></i></Link></li>
                            <li><Link href='/'><i className="bi bi-instagram"></i></Link></li>
                            <li> <Link href='/'><i className="bi bi-twitter"></i></Link></li>
                        </div>
                    </div>
                </div>
            </div>
        </Dlayout>
    )
}

export default Chef