import { useNavigate } from "react-router-dom";


export function AboutSection() {
    const navigate = useNavigate();
    return (
        <section className="pb-12 ">
            <div className=" text-black py-4 md:p-12 flex flex-col md:max-w-[65%] w-[95%] mx-auto items-center justify-center lg:p-16 ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
                    About Avenue Impact
                </h2>
                <p style={{ lineHeight: '40px' }} className=" mb-8 sm:tracking-wider text-center md:text-xl">
                Our drive is to make a noticeable difference in everything we undertake. At Avenue Impact, our focus 
                is on supporting established and growing companies in the best possible way. Our team of business 
                and technology consultants provides expert advice and hands-on support tailored to meet your specific 
                needs. Our objective is to deliver customized solutions that tackle commercial, technical, and operational 
                challenges, leading to long-term success for your business and its customers.
                </p>
                <div>
                    <button
                    size="lg"
                    className="bg-[#14345F] flex items-center hover:bg-primary/60 text-white border border-white/20 rounded-full px-12 py-4 gap-4"
                    onClick={() => navigate("/feedback")}
                    >
                        Give Feedback 
                    </button>
                </div>
            </div>
        </section>
    )
}