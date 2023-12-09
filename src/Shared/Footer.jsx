import parcelLogo from "../assets/Banner/parcellogo.png"

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-[#023b6d] text-[#ffffff]">
                <aside>
                    <img src={parcelLogo} width={96} alt="" />
                    <p className="text-base font-medium"><span className="text-[#00a6eb]">e</span>Parcel Ltd.<br />Providing best services since 1992</p>
                </aside>
                <nav>
                    <header className="footer-title font-semibold text-base">Services</header>
                    <a className="link link-hover font-medium">Branding</a>
                    <a className="link link-hover font-medium">Design</a>
                    <a className="link link-hover font-medium">Marketing</a>
                    <a className="link link-hover font-medium">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title font-semibold text-base">Company</header>
                    <a className="link link-hover font-medium">About us</a>
                    <a className="link link-hover font-medium">Contact</a>
                    <a className="link link-hover font-medium">Jobs</a>
                    <a className="link link-hover font-medium">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title font-semibold text-base">Legal</header>
                    <a className="link link-hover font-medium">Terms of use</a>
                    <a className="link link-hover font-medium">Privacy policy</a>
                    <a className="link link-hover font-medium">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p className="font-medium text-base">Copyright © 2023 - All right reserved by eParcel Service Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;