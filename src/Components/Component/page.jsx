import React, { useEffect } from 'react'
import { Button, Input, Select, message } from 'antd'
import { getSubComponents } from '../../APIs/subComponent'
import { postComponents } from '../../APIs/component'

export const ComponentPage = () => {

    const NameRef = React.useRef(null)
    const SubComponentRef = React.useRef([])

    const [options, setOptions] = React.useState([])

    const getSubComponent = async () => {
        const response = await getSubComponents()
        if (response.type === "success") {
            setOptions(response.data.data.map((e) => ({ label: e.desc, value: e._id })))
        }
        else if (response.type === "error") {
            console.log(response.message)
        }
    }


    useEffect(() => {
        getSubComponent()
    }, [])

    const handleChange = (value) => {
        SubComponentRef.current = value
    };

    const Handle$OnClick$Send = async () => {
        const data = {
            name: NameRef.current.input.value,
            sub_components: SubComponentRef.current
        }
        console.log(data)

        const response = await postComponents(data)

        if (response.type === "success") {
            message.success(response.data.message);
        }
        else if (response.type === "error") {
            message.error(response.message);
        }

    }

    return (
        <div className='w-full h-screen bg-[#f3f7ff]'>
            <p className='text-3xl text-blue-800 font-semibold p-4'>Component</p>
            <div className='m-4 flex items-center justify-center'>
                <div className='bg-white flex flex-col items-center justify-center w-full p-4 gap-4 rounded-md'>
                <div className='bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md'>
                <div className='w-1/2'>
                    <div className='font-semibold p-2'>Name</div>
                    <Input ref={NameRef} className='w-full' placeholder='Enter Name' />
                </div>
                <div className='w-1/2'>
                    <div  className='font-semibold p-2'>Sub Components</div>
                    <Select
                        mode='multiple'
                        className='w-full'
                        placeholder="Sub Components"
                        name="company"
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                </div>
                <div className='flex items-center justify-center'>
                <Button onClick={() => Handle$OnClick$Send()} className='bg-blue-700 text-white'>Send</Button>
                </div>
            </div>
            </div>
        </div>
    )
}
