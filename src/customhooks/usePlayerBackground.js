import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'

export const usePlayerBackground = (imageUrl) => {
	const [imageColors, setImageColors] = useState(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => setImageColors(colors))
	}, [imageUrl])

	return { imageColors }
}

export const colors = {
	primary: '#fc3c44',
	background: '#000',
	text: '#fff',
	textMuted: '#9ca3af',
	icon: '#fff',
	maximumTrackTintColor: 'rgba(255,255,255,0.4)',
	minimumTrackTintColor: 'rgba(255,255,255,0.6)',
}