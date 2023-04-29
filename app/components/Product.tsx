import Image from 'next/image'
import Link from 'next/link'

import { AddCartType } from '@/types/AddCartType'
import formatPrice from '@/util/PriceFormat'

const Product = ({ name, unit_amount, images }: AddCartType) => {
	return (
		<div className='text-gray-700'>
			<Image
				src={images[0]}
				width={800}
				height={800}
				alt={name}
				className='w-full h-96 rounded-lg'
			/>
			<div className='font-medium py-2'>
				<h1>{name}</h1>
				<h2 className='text-sm text-gray-500'>
					{unit_amount ? formatPrice(unit_amount) : '-'}
				</h2>
			</div>
		</div>
	)
}

export default Product
