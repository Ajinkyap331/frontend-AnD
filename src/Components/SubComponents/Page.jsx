import { Button, Input, Select, Table, message } from 'antd'
import React, { useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { getCompanies } from '../../APIs/company'
import { postSubComponents } from '../../APIs/subComponent'




export const SubComponant = () => {

    const [data, setData] = useState([])
    const [description, setDescription] = useState("")

    const descriptionRef = useRef(null)

    const columns = [
        {
            title: "Sr. No.",
            key: "sr_no",
            render: (r) => {
                return <div>{data.indexOf(r) + 1}</div>
            }
        },
        {
            title: "Catlog Number",
            dataIndex: "catalog_number",
            key: "catalog_number",
        },
        {
            title: "Rating Value",
            dataIndex: "rating_value",
            key: "rating_value",
        },
        {
            title: "Company",
            dataIndex: "company",
            render: (r) => {
                return <div>{r.label}</div>
            }
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (_, record) => <div className="text-red-800" onClick={() => {
                setData(data => data.filter((e) => e.id !== record.id))
            }}><Trash2 /></div>
        },
    ]

    const [options, setOptions] = useState([]);

    const CatalogNumberRef = useRef(null)
    const RatingValueRef = useRef(null)
    const CompanyRef = useRef(null)
    const PriceRef = useRef(null)
    const DiscountRef = useRef(null)


    const getCompaniesData = async () => {
        try {
            const response = await getCompanies();

            const setdata = [];
            response.data.data.map((e) => {
                setdata.push({
                    label: e.name,
                    value: e._id
                })
            })
            setOptions(setdata)
        } catch (e) {
            message.error("Cannot get Companies")
        }

    }

    React.useEffect(() => {
        getCompaniesData()
    }, [])


    const handleChange = (value) => {
        CompanyRef.current = options.filter(e => e.value === value)[0]
    };

    const Handle$OnClick$Submit = () => {
        const newData = {
            id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            catalog_number: CatalogNumberRef.current?.input.value,
            rating_value: RatingValueRef.current?.input.value,
            company: CompanyRef.current,
            price: PriceRef.current?.input.value,
            discount: DiscountRef.current?.input.value,
        }
        setData([...data, newData]);
    }

    const Handle$OnClick$Purchase = async () => {

        let sendData = {
            desc: "",
            catalog: []
        }

        data.map((e) => {
            if (sendData.catalog.length !== 0) {
                const foundCatalog = sendData.catalog.map((data, i) => {
                    if (data.catalog_number === e.catalog_number) {
                        return i
                    }
                });

                if (foundCatalog) {
                    const foundRating = sendData.catalog[foundCatalog].rating.map((data, i) => { if (data.rating_value === e.rating_value) return i });

                    if (foundRating) {
                        sendData.catalog[foundCatalog].rating[foundRating].companies.push({
                            company_id: e.company.value,
                            price: e.price,
                            discount: e.discount
                        })
                    }
                    else {
                        const newRating = {
                            rating_value: e.rating_value,
                            companies: [{
                                company_id: e.company.value,
                                price: e.price,
                                discount: e.discount
                            }]
                        }
                        sendData.catalog[0].rating.push(newRating)
                    }
                }
                else {
                    const newCatalog = {
                        catalog_number: e.catalog_number,
                        rating: [{
                            rating_value: e.rating_value,
                            companies: [{
                                company_id: e.company.value,
                                price: e.price,
                                discount: e.discount
                            }]
                        }]
                    }
                    sendData.catalog.push(newCatalog)

                }
            }
            else {
                sendData = {
                    desc: description,
                    catalog: [{
                        catalog_number: e.catalog_number,
                        rating: [{
                            rating_value: e.rating_value,
                            companies: [{
                                company_id: e.company.value,
                                price: e.price,
                                discount: e.discount
                            }]
                        }]
                    }]
                }

            }
        })



        try {
            const response = await postSubComponents(sendData);
            console.log(response)
        } catch (e) {
            message.error("Cannot set Subcomponent")
        }

    }



    return (
        <div className='bg-[#f3f7ff] w-full min-h-screen flex flex-col '>
            <p className='text-3xl text-blue-800 font-semibold p-4'>Subcomponent</p>
            <div className=''>
                {
                    description !== "" ? <div className='m-5 p-5 bg-white'>
                        <p className='font-semibold'>Add SubComponent</p>
                        <div className='flex justify-center gap-3 items-center'>
                            <p>Description</p>
                            <div className='w-fit'>{description}</div>
                            <Button onClick={() => setDescription("")} className='bg-blue-700 text-white'>Edit</Button>
                        </div>
                    </div> : <div className='p-5 m-5 bg-white'>
                        <p className='py-2 text-lg font-semibold'>Description</p>
                        <div className='flex flex-col gap-3'>
                            <Input className='w-1/2' ref={descriptionRef} placeholder='Enter Description' />
                            <Button onClick={() => setDescription(descriptionRef.current?.input.value)} className='w-fit bg-blue-700 text-white'>Submit</Button>
                        </div>
                    </div>
                }

            </div>
            {
                description !== "" &&
                <div className='w-full'>
                    <div className='w-full p-5 flex justify-evenly'>
                        <div className='w-3/4 p-10 bg-white'>
                            <section>
                                <div className='font-semibold p-2'>Catalog Number</div>
                                <Input ref={CatalogNumberRef} className='' placeholder='Enter Quantity' name='catalog_number' />
                            </section>
                            <section>
                                <div className='font-semibold p-2'>Select Company</div>
                                <Select

                                    className='w-full'
                                    placeholder="Tags Mode"
                                    name="company"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </section>
                            <section>
                                <div className='font-semibold p-2'>Discount</div>
                                <Input ref={DiscountRef} type='number' name='discount' className='' placeholder='Enter Quanity' />
                            </section>
                        </div>
                            <div className='bg-white w-3/4 p-10'>
                            <section>
                                <div className='font-semibold p-2'>Rating Value</div>
                                <Input ref={RatingValueRef} className='' placeholder='Enter Value' name='rating_value' />
                            </section>
                            <section>
                                <div className='font-semibold p-2'>Price</div>
                                <Input ref={PriceRef} type="number" name='price' className='' placeholder='Enter Price' />
                            <section className='w-full flex items-center justify-center mt-8 gap-5'>
                                <Button onClick={Handle$OnClick$Submit} className='bg-blue-700 text-white'>Submit</Button>
                            </section>
                            </section>
                        </div>
                    </div>
                            <section className='w-full flex items-center justify-center mt-8 gap-5'>
                                <Button onClick={Handle$OnClick$Purchase} className='bg-blue-700 text-white'>Process to purchase</Button>
                            </section>
                    <section className=' bg-white m-7 '>
                        <Table columns={columns} dataSource={data} key={data.id} />
                    </section>
                </div>
            }
        </div>
    )
}
