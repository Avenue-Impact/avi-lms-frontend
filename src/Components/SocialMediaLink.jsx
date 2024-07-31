// SocialMediaLinks.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // 

export const socialMediaData = [
    { name: '', url: 'https://facebook.com', icon: faFacebook },
    { name: '', url: 'https://twitter.com', icon: faTwitter },
    { name: '', url: 'https://instagram.com', icon: faInstagram },
    { name: '', url: 'https://linkedin.com', icon: faLinkedin },
];

const SocialMediaLinks = ({ data }) => {
    return (
        <div className="flex items-center gap-4">
            {data.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-white-600 hover:text-blue-500 transition-colors duration-300">
                    <FontAwesomeIcon icon={social.icon} className="mr-2 text-2xl" />
                    <span className="hidden md:inline">{social.name}</span>
                </a>
            ))}
        </div>
    );
};

export default SocialMediaLinks;
