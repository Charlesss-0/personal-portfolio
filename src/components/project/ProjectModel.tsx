import Loader from '@/components/ui/Loader'
import dynamic from 'next/dynamic'

const DeviceModel = dynamic(() => import('@/components/model/DeviceModel'), {
	ssr: false,
	loading: () => <Loader />,
})

export default function ProjectModel({
	model,
	img,
}: {
	model: string
	img: string
}): React.ReactNode {
	return (
		<div className="z-10 flex-1">
			<div className="w-full h-full">
				<DeviceModel modelPath={model} modelTexture={img} />
			</div>
		</div>
	)
}
