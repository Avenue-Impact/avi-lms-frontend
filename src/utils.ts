import moment from "moment";

export const BASE_URL = `https://sirz-xfqp.onrender.com`;
// export const BASE_URL = `http://localhost:5000`;

export const formatDate = (date: string) => {
    const formattedDate = moment(date).format('MMMM D, YYYY');
    return formattedDate
}

export const formatDateTime = (date: string) => {
    const formattedDate = moment(date).format('ddd MMM D YYYY, HH:mm:ss');
    return formattedDate
};

// https://www.instagram.com/avenueimpact/
// https://www.tiktok.com/@avenueimpact
// https://www.facebook.com/profile.php?id=100063509073637
// https://x.com/avenueimpact?t=O2qrymJ3jv1QfEwYTFHVsg&s=09
// https://whatsapp.com/channel/0029VbBA76nDp2Q1rsL4rz0Z

export const socialLinks = {
    Facebook: "https://www.facebook.com/profile.php?id=100063509073637",
    Instagram: "https://www.instagram.com/avenueimpact/",
    Whatsapp: `https://whatsapp.com/channel/0029VbBA76nDp2Q1rsL4rz0Z`,
    TikTok: "https://www.tiktok.com/@avenueimpact",
    Linkedin: "https://www.linkedin.com/company/avenueimpact/",
    Twitter: "https://x.com/avenueimpact?t=O2qrymJ3jv1QfEwYTFHVsg&s=09",
};


export const calendyLink = `https://calendly.com/sirz-support/1-hour-business-solutions-consult?month=2025-03`