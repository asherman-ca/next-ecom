import Image from 'next/image'

import { SearchParamType } from '@/types/SearchParamType'
import formatPrice from '@/util/PriceFormat'

const page = async ({ searchParams }: SearchParamType) => {
	console.log('searchParams', searchParams)
	return (
		<div className='flex justify-between gap-24 p-12 text-gray-700'>
			<Image
				src={searchParams.image}
				alt={searchParams.name}
				height={600}
				width={600}
			/>
			<div className='font-medium text-gray-700'>
				<h1 className='text-2xl py-2'>{searchParams.name}</h1>
				<p className='py-2'>{searchParams.description}</p>
				<p className='py-2'>{searchParams.features}</p>
				<div className='flex gap-2'>
					<p className='font-bold text-gray-500'>
						{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
					</p>
				</div>
				<button className='text-white py-2 px-6 font-medium rounded-md bg-teal-700 mt-12'>
					Add to cart
				</button>
			</div>
		</div>
	)
}

export default page
