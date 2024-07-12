import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Icon( { icon, color, size, onClick }: any ): ReactElement {
	return <FontAwesomeIcon icon={ icon } color={ color } size={ size } onClick={ onClick } />
}