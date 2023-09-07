import { Button, Input, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { getCompanies, deleteCompanies, postCompanies } from '../../APIs/company'
import { Trash } from 'lucide-react'

export const Companies = () => {

    const comapanyNameRef = useRef(null)
    const [companies, setCompanies] = useState([])

    const getComp = async () => {
        const response = await getCompanies()

        if (response.type === "success") {
            setCompanies(response.data.data)
        } else if (response.type === "error") {
            message.error(response.message);
        }

        console.log(response)

    }

    useEffect(() => {
        getComp()
    }, [])

    const Handle$OnClick$Delete = async (id) => {
        const response = await deleteCompanies(id)
        if (response.type === "success") {
            message.success(response.data.message);
            getComp()
        } else if (response.type === "error") {
            message.error(response.message);
        }
        console.log(response)
    }

    const Handle$OnClick$Submit = async () => {

        // validate company Name ref for min 3 and max 200
        if (comapanyNameRef.current.input.value.length < 2 || comapanyNameRef.current.input.value.length > 200) {
            message.error("Company Name must be between 2 to 200 characters");
            return
        }

        console.log(comapanyNameRef.current.input.value)
        const data = {
            name: comapanyNameRef.current.input.value,
        }
        const response = await postCompanies(data)
        if (response.type === "success") {
            message.success(response.data.message);
            getComp()
        } else if (response.type === "error") {
            message.error(response.message);
        }
    }

    return (
        <div className='w-full h-screen flex bg-[#f3f7ff]'>
            <div className='w-1/2 p-4'>
                <p className='text-3xl text-blue-800 font-semibold p-4'>Enter Company Details</p>
                <div className="font-semibold p-2">Company Name</div>
                <Input ref={comapanyNameRef} className='w-full' placeholder='Enter Company Name' />
                <section className="flex items-center justify-center p-2">
                    <Button onClick={Handle$OnClick$Submit} className='bg-blue-700 text-white'>Submit</Button>
                </section>
            </div>
            <div className='pt-10 w-1/2 h-[28rem] flex flex-col items-center rounded-md'>
                <div className='w-3/4 rounded-md'>
                    <p className='bg-blue-700 text-white p-3 rounded-t-md'>Company List</p>
                </div>
                <div className='w-3/4 h-4/6 overflow-y-auto'>
                    {
                        companies.map((company) => {
                            return (
                                <div className='flex justify-between p-3 border border-zinc-400'>
                                    {company.name}
                                    <Trash onClick={() => Handle$OnClick$Delete(company._id)} className='text-red-800' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
