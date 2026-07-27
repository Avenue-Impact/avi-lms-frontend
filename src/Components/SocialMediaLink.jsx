// SocialMediaLinks.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'; 
import { socialLinks } from '../utils/socialLinks';

export const socialMediaData = [
    { name: '', url: socialLinks.facebook, icon: faFacebook },
    { name: '', url: socialLinks.twitter, icon: faTwitter },
    { name: '', url: socialLinks.instagram, icon: faInstagram },
    { name: '', url: socialLinks.linkedin, icon: faLinkedin },
    { name: '', url: socialLinks.tiktok, icon: faTiktok },
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
