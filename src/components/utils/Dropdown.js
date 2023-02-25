import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const Dropdown = ({ name, options, value, updateSelection }) => {
    const dropdown_div = useRef(null);
    const dropdown_list = useRef(null);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const listHeight = dropdown_list.current.offsetHeight;
        dropdown_div.current.style.height = 0;
        setHeight(0);
    }, []);

    const openDropdown = () => {
        const listHeight = dropdown_list.current.offsetHeight;
        dropdown_div.current.style.height = `${listHeight}px`;
        setHeight(listHeight);
    }

    const closeDropdown = () => {
        dropdown_div.current.style.height = 0;
        setHeight(0);
    }

    // const updateValue = (selected) => {
    //     const temp = [...values];
    //     temp[index].value = selected;
    //     updateSelection(temp);
    //     closeDropdown();
    // }
    // console.log(value);
    return (
        <div className='w-[250px] relative'>
            <div
                className='flex justify-between items-center my-2 py-2 px-4 bg-[#ffffff0d] rounded-md border-[#404348] w-'
                onClick={() => {
                    (height === 0) ?
                        openDropdown() :
                        closeDropdown()
                }}
            >
                <p>
                    {(!value) ? `Select ${name}` : value}
                </p>
                <IoMdArrowDropdown
                    style={{ color: '#7E8083' }}
                    className={`${(height === 0) ? '' : 'rotate-180'} transition-all ease-in-out text-xl`}
                />
            </div>
            
            <div
                className='dropdown_div overflow-hidden transition-all absolute z-30 w-[250px]'
                ref={dropdown_div}
            >
                <ul
                    className='dropdown_list bg-[#282B30] border-[#404348] border-[1px] rounded-md p-3 transition-[height] delay-300'
                    ref={dropdown_list}
                >
                    {options.map((option, index) => {
                        return (
                            <li
                                key={index}
                                className='p-2 hover:bg-[#c4c4c41a] rounded-md'
                                onClick={() => {
                                    updateSelection(name, option);
                                    closeDropdown();
                                }}
                            >
                                {option}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown