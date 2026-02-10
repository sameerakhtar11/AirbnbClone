import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage3() {
    let navigate = useNavigate()
    let {
        title,
        description,
        frontEndImage1,
        frontEndImage2,
        frontEndImage3,
        rent,
        city,
        landmark,
        category,
        handleAddListing,
        adding
    } = useContext(listingDataContext)

    return (
        <div className='min-h-screen bg-gray-50 flex justify-center py-10 px-4 md:px-8'>
            <div className='max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative flex flex-col'>

                {/* Header & Navigation */}
                <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                    <button
                        onClick={() => navigate("/listingpage2")}
                        className='p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 group'
                    >
                        <FaArrowLeftLong className='w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform' />
                    </button>
                    <h2 className='text-xl md:text-2xl font-bold text-gray-800'>Review your listing</h2>
                    <div className='w-11'></div> {/* Spacer for visual balance */}
                </div>

                <div className='flex flex-col lg:flex-row h-full'>
                    {/* Image Grid */}
                    <div className='w-full lg:w-3/5 p-6'>
                        <div className='grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden'>
                            {/* Main Image */}
                            <div className='col-span-2 row-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden'>
                                <img
                                    src={frontEndImage1 || "https://via.placeholder.com/600x400"}
                                    alt="Main view"
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                            </div>
                            {/* Secondary Images */}
                            <div className='relative group overflow-hidden'>
                                <img
                                    src={frontEndImage2 || "https://via.placeholder.com/300x200"}
                                    alt="Secondary view 1"
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                            </div>
                            <div className='relative group overflow-hidden'>
                                <img
                                    src={frontEndImage3 || "https://via.placeholder.com/300x200"}
                                    alt="Secondary view 2"
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className='w-full lg:w-2/5 p-6 lg:pl-0 flex flex-col'>
                        <div className='flex-grow space-y-6'>
                            <div className='space-y-2'>
                                <div className='inline-block px-3 py-1 bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wide rounded-full'>
                                    {category || "Category"}
                                </div>
                                <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight'>
                                    {title || "Untitled Listing"}
                                </h1>
                                <p className='text-lg text-gray-500 font-medium flex items-center'>
                                    <span className="mr-2">📍</span>
                                    {landmark || "Landmark"}, {city || "City"}
                                </p>
                            </div>

                            <div className='py-6 border-t border-b border-gray-100'>
                                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2'>Description</h3>
                                <p className='text-gray-600 leading-relaxed text-base'>
                                    {description || "No description provided."}
                                </p>
                            </div>

                            <div className='flex items-end justify-between'>
                                <div>
                                    <p className='text-sm text-gray-500 mb-1'>Price per night</p>
                                    <p className='text-3xl font-bold text-gray-900'>
                                        ₹{rent || 0}
                                        <span className='text-lg text-gray-500 font-normal'> / night</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className='mt-8 pt-6 border-t border-gray-100'>
                            <button
                                onClick={handleAddListing}
                                disabled={adding}
                                className={`w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-lg shadow-rose-200 transform transition-all duration-300
                                    ${adding
                                        ? 'bg-rose-300 cursor-not-allowed'
                                        : 'bg-rose-500 hover:bg-rose-600 hover:-translate-y-1 hover:shadow-xl'
                                    }`}
                            >
                                {adding ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </span>
                                ) : (
                                    "Publish Listing"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage3
