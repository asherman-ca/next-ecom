import Image from 'next/image'

import { SearchParamType } from '@/types/SearchParamType'
import formatPrice from '@/util/PriceFormat'
import AddCart from './AddCart'

const page = async ({ searchParams }: SearchParamType) => {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-between gap-16 p-12'>
			<Image
				src={searchParams.image}
				alt={searchParams.name}
				height={600}
				width={600}
				className='w-full rounded-md'
			/>
			<div className='font-medium'>
				<h1 className='text-2xl py-2'>{searchParams.name}</h1>
				<p className='py-2'>{searchParams.description}</p>
				<p className='py-2'>{searchParams.features}</p>
				<div className='flex gap-2'>
					<p className='font-bold text-primary'>
						{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
					</p>
				</div>
				<AddCart {...searchParams} />
			</div>
		</div>
	)
}

export default page
