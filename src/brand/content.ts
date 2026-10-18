// Everything you'd want to edit (words, links, photos) lives in this file.
// Each photo/video is used in exactly one place on the site.
import coverBlue from "../assets/photos/cover-blue.jpg";
import coverCutout from "../assets/photos/cover-cutout.webp";
import digiHeadshot from "../assets/photos/digi-headshot.jpg";
import digiSmile from "../assets/photos/digi-smile.jpg";
import digiFront from "../assets/photos/digi-front.jpg";
import digiFull from "../assets/photos/digi-full.jpg";
import aiProfileRight from "../assets/photos/ai-full-profile-right.jpg";
import aiBack from "../assets/photos/ai-full-back.jpg";
import alo from "../assets/photos/alo.jpg";
import igWalk from "../assets/photos/ig-walk.jpg";
import igLounge from "../assets/photos/ig-lounge.jpg";
import igSunset from "../assets/photos/ig-sunset.jpg";
import igHike from "../assets/photos/ig-hike.jpg";
import igDog from "../assets/photos/ig-dog.jpg";
import ig3am from "../assets/photos/ig-3am.jpg";
import onTheGo from "../assets/reels/on-the-go.mp4";
import onTheGoPoster from "../assets/reels/on-the-go-poster.jpg";

export const profile = {
  name: "Fiza Sheikh",
  first: "Fiza",
  titles: ["Model", "Creative", "Influencer"],
  city: "Los Angeles",
  instagram: "https://www.instagram.com/fizaxsheikh/",
  instagramHandle: "@fizaxsheikh",
  tiktok: "https://www.tiktok.com/@fizoliravioli",
  tiktokHandle: "@fizoliravioli",
  email: "fizaxsheikh@gmail.com",
};

export const issue = { number: "01", season: "Fall 2026" };

export const cover = {
  photo: coverBlue,
  cutout: coverCutout,
  // Clickable cover lines on the right (desktop)
  lines: [
    { text: "Inside: the digis", href: "#digis" },
    { text: "Pages from the mood board", href: "#moodboard" },
    { text: "Let's work together", href: "#contact" },
  ],
  headline: "The one to watch",
  sub: "Model · Creative · Influencer",
};

export const ticker = ["Remember the name", "Model", "Creative", "Influencer"];

// About: an editorial profile in Fiza's voice (copy approved by Fiza).
export const about = {
  quote: "Discipline is my favorite accessory.",
  paragraphs: [
    "Hi, I'm Fiza, a signed model based in Downtown Los Angeles. I graduated from UCLA and work as a financial analyst by day, so I bring the same focus to set that I bring to a spreadsheet.",
    "Fitness is the through-line. It keeps me grounded, and it shows in how I move in front of the camera. I'm building toward campaigns, editorial and fitness work, one frame at a time.",
  ],
  credentials: [
    { title: "Signed model", detail: "Represented by The Key Mgmt" },
    { title: "UCLA alumna", detail: "Financial analyst by day" },
    { title: "Fitness", detail: "Model · fitness · fashion" },
  ],
  video: { src: onTheGo, poster: onTheGoPoster, caption: "On the go, Los Angeles" },
};

// Digitals in the order agencies expect (headshots, mid, full length, profiles, back).
// `ai: true` marks AI-generated angles (noted in alt text only).
export const digis: { src: string; caption: string; ai?: boolean }[] = [
  { src: digiHeadshot, caption: "Headshot" },
  { src: digiSmile, caption: "Smile" },
  { src: digiFront, caption: "Waist up" },
  { src: digiFull, caption: "Full length" },
  { src: aiProfileRight, caption: "Full length, profile", ai: true },
  { src: aiBack, caption: "Full length, back", ai: true },
];

// Brands worked with, shown in About.
// Brands worked with, shown in About. `src` opens a photo; `href` links to the post.
export const workedWith: { brand: string; src?: string; href?: string }[] = [
  { brand: "Alo Wellness Club", src: alo },
  { brand: "Kreation Organic", href: "https://www.instagram.com/p/DZ-1sRnEkXK/" },
  { brand: "Facecard", href: "https://www.instagram.com/p/DXKxR1UEkKe/" },
];

// "On Instagram": recent posts, each linking to the original.
export const instagramPosts = [
  { src: igWalk, caption: "walk with me ☀️", href: "https://www.instagram.com/p/DZ-1sRnEkXK/" },
  { src: igLounge, caption: "live laugh lounge", href: "https://www.instagram.com/p/DXKxR1UEkKe/" },
  { src: igSunset, caption: "am i tan yet 🌞", href: "https://www.instagram.com/p/DPpV8iAkomx/" },
  { src: igHike, caption: "keep up slowpoke", href: "https://www.instagram.com/p/DKawADlyq59/" },
  { src: igDog, caption: "momma's girl 🐶", href: "https://www.instagram.com/p/C5AVKRFuTAQ/" },
  { src: ig3am, caption: "for ur 3am scenarios", href: "https://www.instagram.com/p/CudaJxCRXln/" },
];
