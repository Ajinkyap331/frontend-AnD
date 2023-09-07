import React, { useEffect } from 'react'
import { Button, Input, Select, message } from 'antd'
import { addProject } from '../../APIs/project'
import {getclients} from '../../APIs/client'
import { getProjects } from '../../APIs/project'

export const ProjectPage = () => {

    const [clientName, setClientName] = React.useState({ label: "", value: "" })
    const [clientOptions, setClientOptions] = React.useState([])
    const [final, setFinal] = React.useState();
    const [projectName, setProjectName] = React.useState("")


    const handleClientChange = (value) => {
        clientOptions.map((item) => {
            if (item.value === value) {
                setClientName(item)
                return;
            }
        })
    };

  

    const handleFinalChange = (value) => {
        setFinal(value)
    }

    const getAllClients = async () => {
        const response = await getclients()
        if (response.type === "success") {
            const options = []
            response.data.data.map((item) => {
                options.push({ label: item.name, value: item._id })
            })
            setClientOptions(options)
        }
    }

    

    useEffect(() => {
       getAllClients()
    }, [])


    const Handle$OnClick$Send = async () => {
        const data = {
            client_id: clientName.value,
            project_name: projectName,
            is_finalized: final,
        }

        const response = await addProject(data)

        if (response.type === "success") {
            message.success(response.data.message);
        }
        else if (response.type === "error") {
            message.error(response.message);
        }
    }

    const ResetValues = () => {
        setClientName({ label: "", value: "" })
        setProjectName("")
        setFinal()
    }

    return (
        <div className='w-full h-screen bg-[#f3f7ff]'>
            <p className='text-3xl text-blue-800 font-semibold p-4'>Add Project</p>
            <div className='m-4 flex items-center justify-center'>
                <div className='bg-white flex flex-col items-center justify-center w-full p-4 gap-4 rounded-md'>
                    <div className='bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md'>
                        <div className='w-1/2'>
                            <div className='font-semibold p-2'>Select Client</div>
                            <Select
                                className='w-full'
                                placeholder="Select Client"
                                name="client"
                                value={clientName.label}
                                onChange={handleClientChange}
                                options={clientOptions} />
                        </div>
                        <div className='w-1/2'>
                            <div className='font-semibold p-2'>Select Project</div>
                            <Input
                                className='w-full'
                                placeholder="Select Project"
                                name="project"
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='bg-white flex flex-row w-full rounded-md'>
                        <div className='w-1/2 px-2'>
                            <div className='font-semibold p-2'>Final</div>
                            <Select className="w-full" placeholder="Offer Final" value={final} onChange={handleFinalChange} options={[{ label: "Offer Not Final", value: false }, { label: "Offer Final", value: true }]} />
                        </div>

                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <Button onClick={() => Handle$OnClick$Send()} className='bg-blue-700 text-white'>Submit</Button>
                        <Button onClick={() => ResetValues()} className='bg-gray-600 text-white'>Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
