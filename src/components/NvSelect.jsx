import React, {useState, useEffect} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const NvSelect = ({list = [], style,isChange,placeholder, except_value='',isNecessary, onFocus, defaultValue,className, onChange,onChange2, disabled = false}) => {
    const isDefault = (placeholder ? !defaultValue : false)
    const [value, setValue] = useState('')
	const ref = React.useRef()
    const handleChange = (v, v2) => {
		ref.current.blur()
		if(onChange) onChange(v.target.value);
		if(onChange2) onChange2(v.target.value, v2.props.children)
		if(except_value != v.target.value) setValue(v.target.value)		
    }
    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue, isChange])
    return(
        <Select
            value={defaultValue || ''}
			ref={ref}
            onChange={handleChange}
			onFocus={onFocus}
            MenuProps={{
                classes: {
                    root: 'nv-select-menu-root ' ,
                },
				disableScrollLock: true,
                style: {zIndex: 35001}
            }}
            classes= {{
                select: isDefault ? (isNecessary ? 'nv-select-placeholder-necessary' : 'nv-select-placeholder') : ''
            }}
            style={style}
            className={'nv-select ' + className}
            disabled={disabled}
            displayEmpty
        >
            {list.map((data,i) => {
				let disabled = false
                let style = {}
				if(data.label == placeholder) {
                    disabled = true
                    style.display = 'none'
                }
                return(
                    <MenuItem key={data.value + i} style={style} value={data.value} disabled={disabled}>{data.label}</MenuItem>
                )
            })
            }
        </Select>
    )
}
export default NvSelect