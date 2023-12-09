import SectionTitle from "../../components/SectionTitle";


const Location = () => {
    return (
        <div>
            <SectionTitle  heading="our Location"></SectionTitle>
            <div className=" my-10">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.06397962323!2d90.25487105779115!3d23.780753024752162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1701615813836!5m2!1sen!2sbd" className="w-full height-[450]" allowfullscreen="" loading="lazy" ></iframe>
            </div>
        </div>
    );
};

export default Location;