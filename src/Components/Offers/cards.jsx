import React from 'react'
import { Input, Select} from 'antd'

export const Cards = () => {

    const CatalogNumberRef = React.useRef(null)
    const DiscountRef = React.useRef(null)
    const RatingValueRef = React.useRef(null)
    const PriceRef = React.useRef(null)

    const [options, setOptions] = React.useState([])

    const handleChange = (value) => {
        CompanyRef.current = value
    };

    


    return (
        <div className='w-full flex justify-evenly'>
            <div className='w-3/4 px-10 bg-white '>
                <section>
                    <div>Name</div>
                    <Select
                        className='w-full'
                        placeholder="Tags Mode"
                        name="company"
                        onChange={handleChange}
                        options={[
                            {
                                label: 'MCC',
                                value: 'MCC',
                            },
                            {
                                label: 'APFC',
                                value: 'APFC',
                            },
                            {
                                label: 'MCCB',
                                value: 'MCCB',
                            }
                        ]}
                    />
                </section>
                <section>
                    <div>Components</div>
                    <Select

                        className='w-full'
                        placeholder="Tags Mode"
                        name="company"
                        onChange={handleChange}
                        options={options}
                    />
                </section>
            </div>
            <div className='bg-white  w-3/4 px-10'>
                <section>
                    <div>Price</div>
                    <Input ref={PriceRef} type="number" name='price' className='' placeholder='Enter Price' />
                </section>
                <section>
                    <div>Price</div>
                    <Input ref={PriceRef} type="number" name='price' className='' placeholder='Enter Price' />
                </section>
            </div>
        </div>
    )
}
