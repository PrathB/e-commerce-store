import React from 'react'

const HomeSectionCard = () => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border'>
        <div className='h-[13rem] w-[10rem]'>
            <img className='object-cover w-full h-full' 
            src='https://cartrends.in/cdn/shop/products/cefe361e-7943-4136-b918-bbe31cbb0783_36a175d9-fe6a-4681-a363-9abb672e01ea_540x.jpg?v=1643920897' alt=''/>
        </div>

        <div className='p-4'>
            <h3 className='text-lg font-medium text-gray-900'>Service Kit Polo Petrol</h3>
        </div>
    </div>
  )
}

export default HomeSectionCard
