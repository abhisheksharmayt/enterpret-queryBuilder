import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai'
import FilterGroup from './FilterGroup';
import { useGlobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';


const QueryModal = () => {
    const { filterGroups, newFilterGroups, defaultRuleGroup, query } = useGlobalContext();

    const [showMore, setShowMore] = useState([]);

    useEffect(() => {
        let tempShowMore = showMore;
        for (let i = 0; i < query.length; i++) {
            if (i >= tempShowMore.length) tempShowMore.push(false);
        }
        setShowMore([...tempShowMore]);
    }, [query])

    const toggleMore = (ind) => {
        let tempShowMore = showMore;
        tempShowMore[ind] = !tempShowMore[ind];
        setShowMore([...tempShowMore]);
    }

    const addFilterGroup = () => {
        const temp = [...filterGroups, { ...defaultRuleGroup, id: uuidv4() }];
        newFilterGroups(temp);
    }

    const copyToClipBoard = (text) => {
        const cb = navigator.clipboard;
        cb.writeText(text).then(() => alert('Text copied to clipboard'));
    }

    return (
        <div className='absolute z-10 w-full h-full overflow-auto'>
            <div className='relative my-[50px] mx-auto max-h-[640px] w-[960px] bg-[#1D2025] rounded-md md-[500px]'>
                <div className='relative w-full bg-[#5C61F0] max-h-[140px] p-5 text-white rounded-t-md overflow-hidden'>
                    <div className='flex justify-between'>
                        {
                            (query.length === 0) ? (
                                <h2 className='text-lg'>Create tag and query</h2>
                            ) : (
                                <h2 className='text-lg'>Build your query</h2>
                            )
                        }
                        <button className='absolute right-3 top-3 p-1 bg-[#4338CA] rounded-md'>
                            <AiOutlineClose color='white' />
                        </button>
                    </div>
                    <div className='py-1 overflow-auto max-h-20'>
                        {
                            (query.length) ? (
                                query.map((currQuery, index) => {
                                    return (
                                        <div key={index} className='w-full flex gap-3 items-center mb-3'>
                                            <div className='bg-[#4338CA] w-[80%] py-1 px-2 rounded-md flex justify-between items-center gap-2'>
                                                <p
                                                    className={`${(showMore[index]) ? '' : 'truncate'}`}>
                                                    <span className='font-bold'>Query {index + 1}: </span>
                                                    {currQuery}
                                                </p>
                                                <AiOutlineCopy
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        copyToClipBoard(currQuery)
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className='cursor-pointer'
                                                onClick={() => toggleMore(index)}
                                            >more...</div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className='opacity-50 text-sm'>The query you build will be saved in your active view</p>
                            )
                        }
                    </div>
                </div>
                <div className='h-[500px] flex p-5 z-30 rounded-b-md  overflow-scroll'>
                    <div className='w-full h-fit relative max-h-fit'>
                        {
                            filterGroups.map((group, index) => {
                                const { id } = group;
                                return (
                                    <div key={id} >
                                        <FilterGroup index={index} group={group} />
                                        <div className='h-10 w-[1px] bg-[#5C61F0] ml-10'></div>
                                    </div>
                                )
                            })
                        }
                        <div className=' text-white mb-10'>
                            <button
                                className='py-2 px-4 bg-[#5C61F0] rounded-md'
                                onClick={addFilterGroup}
                            >
                                + Add New Group Filter
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className='py-2 px-4 bg-[#5C61F0] rounded-md text-white absolute -bottom-14 left-1/2 -translate-x-1/2'
                    onClick={() => console.log(filterGroups)}
                >
                    Get rule object in console
                </button>
            </div>
        </div>
    )
}

export default QueryModal