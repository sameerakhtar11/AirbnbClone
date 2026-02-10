import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
    let [updatePopUp, setUpdatePopUp] = useState(false)
    let [bookingPopUp, setBookingPopUp] = useState(false)
    let [title, setTitle] = useState(cardDetails.title)
    let [description, setDescription] = useState(cardDetails.description)
    let [backEndImage1, setBackEndImage1] = useState(null)
    let [backEndImage2, setBackEndImage2] = useState(null)
    let [backEndImage3, setBackEndImage3] = useState(null)
    let [rent, setRent] = useState(cardDetails.rent)
    let [city, setCity] = useState(cardDetails.city)
    let [landmark, setLandmark] = useState(cardDetails.landMark)
    let { serverUrl } = useContext(authDataContext)
    let { updating, setUpdating } = useContext(listingDataContext)
    let { deleting, setDeleting } = useContext(listingDataContext)
    let [minDate, setMinDate] = useState("")

    let { checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight, handleBooking, booking } = useContext(bookingDataContext)

    useEffect(() => {
        if (checkIn && checkOut) {
            let inDate = new Date(checkIn)
            let OutDate = new Date(checkOut)
            let n = (OutDate - inDate) / (24 * 60 * 60 * 1000)
            setNight(n)
            let airBnbCharge = (cardDetails.rent * (7 / 100))
            let tax = (cardDetails.rent * (7 / 100))

            if (n > 0) {
                setTotal((cardDetails.rent * n) + airBnbCharge + tax)
            }
            else {
                setTotal(0)
            }

        }

    }, [checkIn, checkOut, cardDetails.rent, total])

    const handleUpdateListing = async () => {
        setUpdating(true)
        try {

            let formData = new FormData()
            formData.append("title", title)
            if (backEndImage1) { formData.append("image1", backEndImage1) }
            if (backEndImage2) { formData.append("image2", backEndImage2) }
            if (backEndImage3) { formData.append("image3", backEndImage3) }
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landMark", landmark)


            let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
            setUpdating(false)
            console.log(result)
            toast.success("Lising Updated")
            navigate("/")
            setTitle("")
            setDescription("")

            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)
            setRent("")
            setCity("")
            setLandmark("")


        } catch (error) {
            setUpdating(false)
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
            console.log(result.data)
            navigate("/")
            toast.success("Listing Delete")
            setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response.data.message)
        }

    }
    const handleImage1 = (e) => {
        let file = e.target.files[0]
        setBackEndImage1(file)

    }
    const handleImage2 = (e) => {
        let file = e.target.files[0]
        setBackEndImage2(file)

    }
    const handleImage3 = (e) => {
        let file = e.target.files[0]
        setBackEndImage3(file)

    }

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    return (
        <div className='min-h-screen bg-gray-50 flex justify-center py-10 px-4 md:px-8 relative'>
            <div className='max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative flex flex-col'>

                {/* Header & Navigation */}
                <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                    <button
                        onClick={() => navigate("/")}
                        className='p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 group'
                    >
                        <FaArrowLeftLong className='w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform' />
                    </button>
                    <h2 className='text-xl md:text-2xl font-bold text-gray-800'>Property Details</h2>
                    <div className='w-11'></div> {/* Spacer for visual balance */}
                </div>

                <div className='flex flex-col lg:flex-row h-full'>
                    {/* Image Grid */}
                    <div className='w-full lg:w-3/5 p-6'>
                        <div className='grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden'>
                            {/* Main Image */}
                            <div className='col-span-2 row-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden'>
                                <img
                                    src={cardDetails.image1 || "https://via.placeholder.com/600x400"}
                                    alt="Main view"
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                            </div>
                            {/* Secondary Images */}
                            <div className='relative group overflow-hidden'>
                                <img
                                    src={cardDetails.image2 || "https://via.placeholder.com/300x200"}
                                    alt="Secondary view 1"
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                            </div>
                            <div className='relative group overflow-hidden'>
                                <img
                                    src={cardDetails.image3 || "https://via.placeholder.com/300x200"}
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
                                    {cardDetails.category || "Category"}
                                </div>
                                <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight'>
                                    {cardDetails.title || "Untitled Listing"}
                                </h1>
                                <p className='text-lg text-gray-500 font-medium flex items-center'>
                                    <span className="mr-2">📍</span>
                                    {cardDetails.landMark}, {cardDetails.city}
                                </p>
                                <div className='flex items-center gap-1 text-gray-700'>
                                    <FaStar className='text-yellow-500' />
                                    <span className='font-semibold'>{cardDetails.ratings}</span>
                                    <span className='text-gray-400'>(Ratings)</span>
                                </div>
                            </div>

                            <div className='py-6 border-t border-b border-gray-100'>
                                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2'>Description</h3>
                                <p className='text-gray-600 leading-relaxed text-base'>
                                    {cardDetails.description || "No description provided."}
                                </p>
                            </div>

                            <div className='flex items-end justify-between'>
                                <div>
                                    <p className='text-sm text-gray-500 mb-1'>Price per night</p>
                                    <p className='text-3xl font-bold text-gray-900'>
                                        ₹{cardDetails.rent}
                                        <span className='text-lg text-gray-500 font-normal'> / night</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='mt-8 pt-6 border-t border-gray-100'>
                            {cardDetails.host == userData._id ? (
                                <button
                                    onClick={() => setUpdatePopUp(true)}
                                    className='w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-lg shadow-rose-200 transform transition-all duration-300 bg-rose-500 hover:bg-rose-600 hover:-translate-y-1 hover:shadow-xl'
                                >
                                    Edit listing
                                </button>
                            ) : (
                                <button
                                    onClick={() => setBookingPopUp(true)}
                                    className='w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-lg shadow-rose-200 transform transition-all duration-300 bg-rose-500 hover:bg-rose-600 hover:-translate-y-1 hover:shadow-xl'
                                >
                                    Reserve
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Popup */}
            {updatePopUp && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
                    <div className='bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden'>
                        <div className='p-6 border-b flex items-center justify-between bg-gray-50'>
                            <h2 className='text-2xl font-bold text-gray-800'>Edit Listing</h2>
                            <button onClick={() => setUpdatePopUp(false)} className='p-2 hover:bg-gray-200 rounded-full transition-colors'>
                                <RxCross2 className='w-6 h-6 text-gray-600' />
                            </button>
                        </div>

                        <div className='flex-1 overflow-y-auto p-8'>
                            <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                                {/* Form fields here - matching styling */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-semibold text-gray-700'>Title</label>
                                    <input type="text" className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-semibold text-gray-700'>Description</label>
                                    <textarea className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none h-32' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-semibold text-gray-700'>Rent (₹/night)</label>
                                        <input type="number" className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none' value={rent} onChange={(e) => setRent(e.target.value)} />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-semibold text-gray-700'>City</label>
                                        <input type="text" className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-semibold text-gray-700'>Landmark</label>
                                        <input type="text" className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none' value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                                    </div>
                                </div>

                                <div className='space-y-4 pt-4 border-t'>
                                    <p className='font-semibold text-gray-700'>Update Images</p>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        <input type="file" className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100' onChange={handleImage1} />
                                        <input type="file" className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100' onChange={handleImage2} />
                                        <input type="file" className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100' onChange={handleImage3} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='p-6 border-t bg-gray-50 flex justify-end gap-4'>
                            <button onClick={() => setUpdatePopUp(false)} className='px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors'>Cancel</button>
                            <button onClick={handleDeleteListing} disabled={deleting} className='px-6 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors'>
                                {deleting ? "Deleting..." : "Delete Listing"}
                            </button>
                            <button onClick={handleUpdateListing} disabled={updating} className='px-8 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1'>
                                {updating ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Popup */}
            {bookingPopUp && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
                    <div className='bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden'>
                        {/* Form Side */}
                        <div className='w-full md:w-1/2 p-8 flex flex-col overflow-y-auto'>
                            <div className='flex justify-between items-center mb-8'>
                                <h2 className='text-3xl font-extrabold text-gray-900'>Confirm & Pay</h2>
                                <button onClick={() => setBookingPopUp(false)} className='p-2 hover:bg-gray-100 rounded-full md:hidden'>
                                    <RxCross2 className='w-6 h-6' />
                                </button>
                            </div>

                            <div className='flex-1 space-y-8'>
                                <div className='space-y-4'>
                                    <h3 className='text-xl font-bold text-gray-800'>Your Trip</h3>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-bold uppercase tracking-wider text-gray-500'>Check-in</label>
                                            <input type="date" min={minDate} className='w-full p-3 rounded-xl border border-gray-300 focus:border-rose-500 outline-none' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                                        </div>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-bold uppercase tracking-wider text-gray-500'>Check-out</label>
                                            <input type="date" min={minDate} className='w-full p-3 rounded-xl border border-gray-300 focus:border-rose-500 outline-none' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBooking(cardDetails._id)}
                                    disabled={booking}
                                    className='w-full py-4 rounded-xl text-lg font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all transform hover:-translate-y-1'
                                >
                                    {booking ? "Processing..." : "Confirm & Book"}
                                </button>
                            </div>
                        </div>

                        {/* Summary Side */}
                        <div className='w-full md:w-1/2 bg-gray-50 p-8 border-l border-gray-100 hidden md:flex flex-col relative'>
                            <button onClick={() => setBookingPopUp(false)} className='absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-full'>
                                <RxCross2 className='w-6 h-6 text-gray-500' />
                            </button>

                            <div className='flex gap-4 mb-8'>
                                <img src={cardDetails.image1} alt="" className='w-24 h-24 object-cover rounded-xl shadow-md' />
                                <div>
                                    <p className='text-xs font-bold text-gray-500 uppercase tracking-wide'>{cardDetails.category}</p>
                                    <h3 className='text-xl font-bold text-gray-900 leading-tight mb-1'>{cardDetails.title}</h3>
                                    <p className='text-sm text-gray-600'>{cardDetails.landMark}, {cardDetails.city}</p>
                                    <div className='flex items-center gap-1 mt-1 text-sm'>
                                        <FaStar className='text-rose-500' />
                                        <span className='font-semibold'>{cardDetails.ratings}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='border-t border-gray-200 pt-6 space-y-4'>
                                <h3 className='text-xl font-bold text-gray-900'>Price Details</h3>
                                <div className='flex justify-between text-gray-600'>
                                    <span>₹{cardDetails.rent} x {night} nights</span>
                                    <span>₹{cardDetails.rent * night}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Taxes</span>
                                    <span>₹{Math.floor(cardDetails.rent * 0.07)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600 pb-4 border-b border-gray-200'>
                                    <span>Airbnb Service Fee</span>
                                    <span>₹{Math.floor(cardDetails.rent * 0.07)}</span>
                                </div>
                                <div className='flex justify-between text-xl font-extrabold text-gray-900 pt-2'>
                                    <span>Total (INR)</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewCard