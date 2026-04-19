import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const handleHome = () =>{
        sessionStorage.clear();
        navigate('/');
    }
    return (
        <>
            <div className="header-main border-b border-gray-300">
                <div className="header-top mx-10 max-sm:mx-5">

                    <div className="inner-header-top flex items-center justify-between py-1 ">
                        <div className="top-left-content mt-2">

                            <Link to={'/'} className="flex items-center">
                                <img src="/assets/img/logo.png" alt="logo" className="w-14 h-14 object-contain max-sm:w-10 max-sm:h-10" />
                                <span className="text-xl font-bold tracking-tight mb-2 max-sm:text-lg">Zenpix</span>
                            </Link>

                        </div>
                        <div className="top-right-content mr-3 max-sm:mr-0">
                            <nav className="mr-3 max-sm:mr-0">
                                <ul className="flex gap-4 text-[18px] items-center max-sm:gap-1 max-sm:text-sm">
                                    <li>
                                        <Link to={'/'}
                                            className="text-gray-600 font-semibold px-3 py-2 rounded hover:bg-gray-100 hover:text-black transition-all"
                                            onClick={handleHome}>
                                            Home
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to={'/Collections'}
                                            className="text-gray-600 font-semibold px-3 py-2 rounded hover:bg-gray-100 hover:text-black transition-all">
                                            Collection
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/ContactUs'}
                                            className="text-gray-600 font-semibold px-3 py-2 rounded hover:bg-gray-100 hover:text-black transition-all">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="header-middle"></div>
                <div className="header-bottom"></div>
            </div>
        </>
    )
}

export default Header;