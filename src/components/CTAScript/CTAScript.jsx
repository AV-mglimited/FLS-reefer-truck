import * as React from "react"
import {useTranslation} from "gatsby-plugin-react-i18next";
import {useState} from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const INITIAL_FORM = {
    contactName: '',
    contactPhoneNumber: '',
    contactEmail: '',
    contactRequest: ''
}

const CTAScript = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    console.log(isSuccess)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === 'contactPhoneNumber') {
            error = !/^(\+?\d+)?$/.test(value)
                ? 'Phone number is invalid. Use only numbers or start with "+" followed by numbers.'
                : '';
        } else if (name === 'contactEmail') {
            error = !/\S+@\S+\.\S+/.test(value)
                ? 'Email is invalid. Please enter a valid email address.'
                : '';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const isFormValid = () => {
        return form.contactName.trim() !== '' &&
            form.contactPhoneNumber.trim() !== '' &&
            form.contactEmail.trim() !== '' &&
            !errors.contactPhoneNumber &&
            !errors.contactEmail;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSuccess(false);
        if (!isFormValid()) return;

        try {
            await sendEmail(form);
            setStatus("Email sent successfully!");
            setIsSuccess(true);
            setForm(INITIAL_FORM);
            setErrors({});
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("Failed to send email. Please try again later.");
            setIsSuccess(false);
        }
    };

    const sendEmail = async (formData) => {
        const response = await fetch(`/api/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Messages: [
                    {
                        From: { Email: process.env.GATSBY_MJ_SENDER_EMAIL, Name: "Digital Ads - FLS Cont Lạnh" },
                        To: [{ Email: process.env.GATSBY_MJ_RECEIVER_EMAIL, Name: "Admin" }],
                        Subject: "[Digital Ads - FLS Cont Lạnh] Khách hàng mới",
                        HTMLPart: `
                            <h3>New Consultation Request</h3>
                            <p><strong>Name:</strong> ${formData.contactName}</p>
                            <p><strong>Phone Number:</strong> ${formData.contactPhoneNumber}</p>
                            <p><strong>Email:</strong> ${formData.contactEmail}</p>
                            <p><strong>Request:</strong> ${formData.contactRequest}</p>
                        `,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to send email");
            setIsSuccess(false);
        }
    };


    return (
        <div className={"container-main container-main--left pt-[80px]"} id={"cta-script"}>
            <div className={`one-side one-side--from-right cta-script bg-white p-8 shadow-lg border border-gray-200 ${isSuccess && "hidden"}`}>
                <h2 className="heading-section mb-[30px]">
                    {t("contact_form_heading")}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="contactName"
                                value={form.contactName}
                                onChange={handleChange}
                                placeholder={t("contact_name_placeholder")}
                                className="w-full h-12 p-4 border border-gray-400 rounded-tr-[20px] rounded-bl-none bg-white text-gray-500 font-bold text-[18px]"
                            />
                        </div>
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="contactPhoneNumber"
                                value={form.contactPhoneNumber}
                                onChange={handleChange}
                                placeholder={t("contact_phone_placeholder")}
                                className="w-full h-12 p-4 border border-gray-400 rounded-tr-[20px] rounded-bl-none bg-white text-gray-500 font-bold"
                            />
                            {errors.contactPhoneNumber && (
                                <p className="text-red-500 text-sm">{errors.contactPhoneNumber}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="contactEmail"
                            value={form.contactEmail}
                            onChange={handleChange}
                            placeholder={t("contact_email_placeholder")}
                            className="w-full h-12 p-4 border border-gray-400 rounded-tr-[20px] rounded-bl-none bg-white text-gray-500 font-bold"
                        />
                        {errors.contactEmail && (
                            <p className="text-red-500 text-sm">{errors.contactEmail}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <textarea
                            name="contactRequest"
                            value={form.contactRequest}
                            onChange={handleChange}
                            placeholder={t("contact_request_placeholder")}
                            className="w-full h-32 p-4 border border-gray-400 rounded-tr-[20px] rounded-bl-none bg-white text-gray-500 font-bold resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full h-12 ${isFormValid() ? 'bg-[#0068B0] text-white' : 'bg-gray-400 text-gray-200'} font-extrabold text-[25px] uppercase rounded-tr-[20px]`}
                            disabled={!isFormValid()}
                        >
                            {t("contact_form_submit_button")}
                        </button>
                    </div>
                </form>

                {status && <p className="mt-4 text-center text-lg font-bold">{status}</p>}
            </div>
            <div className={`bg-[#46B768] w-full flex justify-center align-center flex-col shadow[-4px 8px 20px 0px #0000001A] rounded-[30px] justify-self-center min-h-[290px] form-submitted-success ${isSuccess ? "flex" : "hidden"}`}>
                <h2 className={"heading-section text-center mb-[3rem]"}>
                    {t('contact_form_request_submitted')}
                </h2>
                <div className={"text-center"}>
                    <p className={"text-[28px]"}>{t('contact_form_thank_you')}</p>
                    <p className={"text-[18px]"}>{t('contact_form_will_response')}</p>
                </div>
            </div>
        </div>
    )
}

export default CTAScript
