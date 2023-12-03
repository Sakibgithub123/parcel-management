import parcelLogo from "../assets/Banner/parcellogo.png"

const Footer = () => {
    return (
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
    );
};

export default Footer;