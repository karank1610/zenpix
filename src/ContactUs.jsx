const ContactUs = () => {
    return (
        <>
            <div className="contactus-main py-15 bg-linear-120 from-right-to-left from-pink-700 to-purple-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="inner-content flex flex-col justify-center  gap-4">
                        <span className="text-7xl text-center leading-20 tracking-tight text-white font-bold max-w-160 self-center">Intereseted in our business pricing?</span>
                        <span className="text-3xl text-center leading-10 text-white font-semibold max-w-150 self-center my-3">Fill out the form to view details and we'll contact you as soon as possible.</span>
                        <div className="contactus-form w-full " >

                            <form action="" className="w-full max-w-4xl flex flex-col gap-4 mx-auto bg-white/20 p-10 rounded-2xl">
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-full">
                                        <span className="text-white py-1">Name</span>
                                        <input type="text" id="name" placeholder="Ethan Johnson" className=" h-16 px-4  bg-white rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:font-bold placeholder-black" required autoComplete="additional-name" />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <span className="text-white py-1">Company Email</span>
                                        <input type="email" id="company-email" placeholder="ethan@johnson.com" className="h-16 px-5  bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:font-bold placeholder-black" required />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-full relative">
                                        <span className="text-white">Company Size</span>
                                        <select name="company-size" id="" className="appearance-none h-16 px-5  bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" required defaultValue="def">
                                            <option value="def" disabled> -- Select Company Size -- </option>
                                            <option value="1-10">1-10 Employees</option>
                                            <option value="11-50">11-50 Employees</option>
                                            <option value="51-100">51-100 Employees</option>
                                        </select>

                                        <span className="absolute right-3 top-[60%] -translate-y-1/2 pointer-events-none text-black ">
                                            <img src="/assets/img/down-arrow.svg" alt="" className="w-8 h-8 " />
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-full relative">
                                        <span className="text-white">Subject</span>
                                        <select name="subject" id="" className="appearance-none h-16 px-5  bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" required defaultValue="def">
                                            <option value="def" className="font-bold" disabled> -- Select Subject -- </option>
                                            <option value="1-10">Contact Page</option>
                                            <option value="11-50">Product Page</option>
                                            <option value="51-100">Dashboard</option>

                                        </select>
                                        <span className="absolute right-3 top-[60%] -translate-y-1/2 pointer-events-none text-black ">
                                            <img src="/assets/img/down-arrow.svg" alt="" className="w-8 h-8 " />
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-white block py-1">Message</span>
                                    <textarea name="message" id="" placeholder="Enter your message here..." className="w-full h-60 px-5 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" required></textarea>
                                </div>

                                <button type="submit" className="w-full px-5 py-5 bg-white rounded-xl font-bold text-2xl text-purple-800 hover:bg-purple-200 transition">Contact Sales</button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;