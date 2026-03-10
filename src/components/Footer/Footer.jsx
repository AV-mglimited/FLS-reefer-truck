import * as React from "react";
import facebookIcon from '../../images/facebook-icon.png';
import zaloIcon from '../../images/zalo-icon.png';
import youtubeIcon from '../../images/youtube-icon.png';
import linkedinIcon from '../../images/linkedin-icon.png';
import zaloQr from '../../images/zalo-qr.jpeg';
import {useTranslation} from "gatsby-plugin-react-i18next";


const Footer = () => {
    const {t} = useTranslation();
    return (
    <footer id={"footer"} className={"container-main container-main--even"}>
        <div className={'footer-layout flex border-[1px] border-[#E6E6E6] border-solid border-x-0'}>
            <div className={"google-map "}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.106730635836!2d106.73208108250266!3d10.803136961879936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a5fe10cf5%3A0x7692272de2bb8b31!2sFLS%20Group%20(Ho%20Chi%20Minh%20City%20branch)%20-%20FLS%20Vietnam%20Ltd.!5e0!3m2!1sen!2s!4v1723375258209!5m2!1sen!2s"
                    height="300" style={{border:0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" className={"h-full"}></iframe>
            </div>
            <div className={"info"}>
                <div className={"mb-4"}>
                    <h3>
                        {t("footer_heading")}
                    </h3>
                    <h4>
                        {t("footer_subheading")}
                    </h4>
                </div>
                <div className={"footer-description--wrapper"}>
                    <div className={"footer-description--address w-1/2 flex flex-col justify-between"}>
                        <p className={"opacity"}>
                            {t("footer_description_company_name")} <br/>
                            <a className={"underline"} href={"https://maps.app.goo.gl/L9Rf4AVUTQgTifyr6"} target="_blank">{t("footer_description_geo")}</a> <br/>
                            {t("footer_description_address")} <br/>
                            <a href={"tel:+842854496084"}>{t("footer_description_telephone")}</a> <br/>
                            <span className="hide-on-desktop">
                                Zalo:
                                <a href={"https://zalo.me/0778562404"}>
                                    <span><span className="underline">+84 778562404</span> (Công Nguyễn)</span>
                                </a> <br/>
                            </span>
                            <a href={"mailto:office.vn@fls-group.com"}>{t("footer_description_email")}</a>
                        </p>
                        <div className={"flex gap-4 align-middle mt-4"}>
                            <a href={"https://www.facebook.com/FLSGroup1993"} target="_blank" className={"self-center"}>
                                <img src={facebookIcon} alt={""}/>
                            </a>
                            <a href={"https://zalo.me/0778562404"} className={"self-center"}>
                                <img src={zaloIcon} alt={""}/>
                            </a>
                            <a href={"https://www.youtube.com/@FLSGroup"} target="_blank" className={"self-center"}>
                                <img src={youtubeIcon} alt={""}/>
                            </a>
                            <a href={"https://www.linkedin.com/company/flsgroup/"} target="_blank" className={"self-center"}>
                                <img src={linkedinIcon} alt={""}/>
                            </a>
                        </div>
                    </div>
                    <div className={"footer-description--contact w-1/2 flex flex-row items-start gap-4"}>
                        <span>
                            Công Nguyễn <br/>
                            <a href={"https://zalo.me/0778562404"} className="underline">+84 778562404</a> <br/>
                            <a href={"mailto:cong.nguyen@fls-group.com"} className="underline">cong.nguyen@fls-group.com</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer;
