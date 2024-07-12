import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './theme'
import { Style } from './types'

export const Button = ( props ) => {
	const { light, medium, dark, radius, color } = Theme( )

	const style: Style = {
		width: props.width || '100%',
		height: props.height || 48,
		border: `.1px solid ${dark}`,
		color: dark,
		borderRadius: radius,
		fontSize: '1rem',
		fontWeight: 'bold',
		cursor: 'pointer',
		outline: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'inherit',
		textTransform: 'capitalize',
		userSelect: 'none',
		transition: 'background 0.3s, color 0.3s'
	}

	const hoverStyle = {
		color: 'white',
		background: color
	}

	const handleMouseEnter = (event) => {
		Object.assign(event.target.style, hoverStyle)
	}

	const handleMouseLeave = (event) => {
		Object.assign(event.target.style, style)
	}

	return (
		<div
			style={{ ...style, ...props.style }}
			onClick={props?.onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{props.label ? props.label : <FontAwesomeIcon icon={props.icon} size="lg" />}
		</div>
	)
}