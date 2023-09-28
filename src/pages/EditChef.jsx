import Dlayout from '@/components/Dlayout'
import React, { useState } from 'react'

const EditChef = () => {

    const [data, setData] = useState({
        name: "",
        address: "",
        phone: "",
        facebook: "",
        instagram: "",
        tiktok: ""
    });
    const handelInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((pre) => {
            return { ...data, [name]: value }
        })
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log('data:', data);
    }
    return (
        <Dlayout><h4>Edit Chef</h4>

            <div className="editForm">
                <form action="" onSubmit={handelSubmit}>

                    <div className=" floating mb-3">
                        <label htmlFor="formFile" className="form-label">Default file input example</label>
                        <input className="form-control" type="file" id="formFile" />
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" name='name' value={data.name} onChange={handelInput} placeholder="name" />
                        <label htmlFor="floatingPassword">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="address" name='address' value={data.address} onChange={handelInput} placeholder="address" />
                        <label htmlFor="floatingPassword">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="number" name='phone' value={data.phone} onChange={handelInput} placeholder="Password" />
                        <label htmlFor="floatingPassword">Number</label>
                    </div>
                    <div className="flex">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="number" name='facebook' value={data.facebook} onChange={handelInput} placeholder="Password" />
                            <label htmlFor="floatingPassword">Facebook</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="number" name='instagram' value={data.instagram} onChange={handelInput} placeholder="Password" />
                            <label htmlFor="floatingPassword">insta</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="number" name='tiktok' value={data.tiktok} onChange={handelInput} placeholder="Password" />
                            <label htmlFor="floatingPassword">tiktok</label>
                        </div>
                    </div>
                    <button type='submit' className='btn bg-warning'>Submit</button>
                </form>
            </div>
        </Dlayout>
    )
}

export default EditChef