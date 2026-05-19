export default function Footer() {
    return (
        <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

                    <div className="lg:col-span-4 space-y-8">
                        <a href="#" className="flex items-center gap-3">
                            <div className="w-6 h-6 flex flex-col justify-between">
                                <div className="w-full h-1 bg-white"></div>
                                <div className="w-full h-1 flex justify-between">
                                    <div className="w-[40%] h-full bg-white"></div>
                                    <div className="w-[40%] h-full bg-white"></div>
                                </div>
                                <div className="w-full h-1 flex justify-between">
                                    <div className="w-[40%] h-full bg-white"></div>
                                    <div className="w-[40%] h-full bg-white"></div>
                                </div>
                            </div>
                            <span className="text-2xl font-sans font-bold tracking-wide">Kara</span>
                        </a>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            get the sensation of exploring the room with us and other fans
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">TW</a>
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">FB</a>
                            <a href="#" className="text-white hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">IG</a>
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div>
                            <h4 className="text-white font-sans font-medium text-lg mb-8">Pages</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Explore</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Special Deal</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">About Us</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-sans font-medium text-lg mb-8">Info</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Customer Service</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Voucher</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Give Away</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Address</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-white font-sans font-medium text-lg mb-8">My Account</h4>
                            <ul className="space-y-4 text-xs tracking-wide text-gray-500">
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Profile</a></li>
                                <li><a href="#" className="hover:text-primary hover:pl-2 transition-all block">Settings</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
