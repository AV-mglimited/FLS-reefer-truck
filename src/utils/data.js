import flag1 from "../images/flag1.png";
import flag2 from "../images/flag2.png";
import flag3 from "../images/flag3.png";
import flag4 from "../images/flag4.png";
import flag5 from "../images/flag5.jpeg";
import phoneIcon from "../images/cta-phone.png";
import zaloIcon from "../images/cta-zalo.png";
import assetOwnerShip0 from "../images/banner/asset-ownership-0.jpg";
import assetOwnerShip1 from "../images/banner/asset-ownership-1.jpg";
import flexibility0 from "../images/banner/flexibility-0.jpg";
import flexibility1 from "../images/banner/flexibility-1.jpg";
import flexibility2 from "../images/banner/flexibility-2.jpg";
import oneStopShop0 from "../images/banner/one-stop-shop-0.jpg";
import oneStopShop1 from "../images/banner/one-stop-shop-1.jpg";
import transAsia0 from "../images/banner/trans-asia-0.jpg";
import transAsia1 from "../images/banner/trans-asia-1.jpg";
import transAsia2 from "../images/banner/trans-asia-2.jpg";

export const FAQ = [
	{
		"question": "faq_question1",
		"answer": "faq_answer1"
	},
	{
		"question": "faq_question2",
		"answer": "faq_answer2"
	},{
		"question": "faq_question3",
		"answer": "faq_answer3"
	},{
		"question": "faq_question4",
		"answer": "faq_answer4"
	},{
		"question": "faq_question5",
		"answer": "faq_answer5"
	},
	{
		"question": "faq_question6",
		"answer": "faq_answer6"
	},
	{
		"question": "faq_question7",
		"answer": "faq_answer7"
	}
]

export const BANNER_IMGS = {
	area1: [assetOwnerShip0, assetOwnerShip1],
	area2: [oneStopShop0, oneStopShop1],
	area3: [transAsia0, transAsia1, transAsia2],
	area4: [flexibility0, flexibility1, flexibility2],
};

export const CTA_ITEMS = [
	{
		logo: phoneIcon,
		name: "phone",
		order: 1,
		info: {
			href: "tel: +84778562404",
			label: '(+84) 778 562 404'
		}
	},
	{
		logo: zaloIcon,
		name: "zalo",
		order: 2,
		info: {
			href: "https://zalo.me/0778562404",
			label: '0778562404',
			newPage: true,
		}
	}
]


export const MOBILE_BANNER_ITEMS = [
	{
		"heading": "banner_heading1",
		"subHeading":"banner_subheading1",
		"content": BANNER_IMGS.area1
	},
	{
		"heading": "banner_heading2",
		"subHeading":"banner_subheading2",
		"content": BANNER_IMGS.area2
	},
	{
		"heading": "banner_heading3",
		"subHeading":"banner_subheading3",
		"content": BANNER_IMGS.area3
	},
	{
		"heading": "banner_heading4",
		"subHeading":"banner_subheading4",
		"content": BANNER_IMGS.area4
	}
]

export const TRANSPORT_ROUTES = [
	{
		id: 'vn',
		flag: flag1,
		alt: 'vietnam-flag'
	},
	{
		id: 'th',
		flag: flag5,
		alt: 'thailand-flag'
	},
	{
		id: 'cn',
		flag: flag2,
		alt: 'china-flag'
	},
	{
		id: 'kh',
		flag: flag3,
		alt: 'cambodia-flag'
	},
	{
		id: 'la',
		flag: flag4,
		alt: 'laos-flag'
	}
]
