import Image from 'next/image'
import { SearchParamType } from '@/types/SearchParamType'

const page = async ({ searchParams }: SearchParamType) => {
	return (
		<div className='flex justify-between gap-24 p-12 text-gray-700'>
			<Image
				src={searchParams.image}
				alt={searchParams.name}
				height={600}
				width={600}
			/>
			<div>
				<h1>name</h1>
				<p>Description</p>
			</div>
		</div>
	)
}

export default page
