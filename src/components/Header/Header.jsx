import {Link, useI18next, useTranslation} from 'gatsby-plugin-react-i18next';
import React from 'react';
import {useState} from "react";
import FLSlink from '../../images/FLS-link.png';

const Header = ({ siteTitle }) => {
    const { languages, originalPath, t, i18n } = useI18next();
    const [isOpened, setIsOpened] = useState(false);
    const navBarItems = [
        {
            translationKey: "header_routes",
            url: "#routes"
        },
        {
            translationKey: "header_services",
            url: "#services"
        },
        {
            translationKey: "header_whyus",
            url: "#why-us"
        },
        {
            translationKey: "header_faqs",
            url: "#faqs"
        },
    ]
    return (
        <header className="main-header h-[130px] w-full bg-white text-white flex justify-between sticky top-0 z-50 md:px-0 px-4">
            <div className={"flex items-center justify-between container mx-auto relative md:gap-0 gap-5"}>
                <div className={"flex items-center gap-4"}>
                    <div className={`burger-menu-icon flex flex-col hover:cursor-pointer ${isOpened ? "is-opened": ""}`} onClick={()=> setIsOpened(!isOpened)}>
                        <div className={'menu-line-1'}/>
                        <div className={'menu-line-2'}/>
                        <div className={'menu-line-3'}/>
                    </div>
                    <ul className={`navbar flex gap-5 transition items-center md:flex-row flex-col md:static absolute ${isOpened ? "opacity-100 block top-[130px] z-10 w-full left-0 bg-white": "opacity-0 hidden"}`}>
                        {navBarItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.url} className={"text-black font-[Gotham] hover:cursor-pointer flex items-center"}>
                                    {t(item.translationKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={"flex items-center gap-5"}>
                    <a href={"#cta-script"} className={"bg-[#0068B0] px-[18px] py-[12px] rounded-[8px] shadow-[0px 1px 2px 0px #0000000D] text-[16px]"}>{t("header_enquiry")}</a>
                    <ul className="languages">
                        {languages.map((lng) => (
                            <li key={lng}>
                                <Link to={originalPath} language={lng} className={`uppercase text-[#0068B0] border-[#0068B0] border-solid border-[1px] px-[18px] py-[12px] rounded-[8px] ${i18n.resolvedLanguage === lng ? "hidden" : "flex"}`}>
                                    {lng}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <a href={"https://fls-group.com/"}>
                        <img src={FLSlink} alt={""} className={"h-full object-contain hover:cursor-pointer max-w-[100px]"}/>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
