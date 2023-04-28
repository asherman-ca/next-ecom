import Image from 'next/image'

const Product = ({ name, price, images }) => {
	return (
		<div>
			<Image src={images[0]} width={200} height={200} alt={name} />
			{name} {price}
		</div>
	)
}

export default Product
