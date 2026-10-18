// Everything you'd want to edit (words, links, photos) lives in this file.
// Each photo/video is used in exactly one place on the site.
import coverBlue from "../assets/photos/cover-blue.jpg";
import digiHeadshot from "../assets/photos/digi-headshot.jpg";
import digiSmile from "../assets/photos/digi-smile.jpg";
import digiFront from "../assets/photos/digi-front.jpg";
import digiFull from "../assets/photos/digi-full.jpg";
import digiFullRelaxed from "../assets/photos/digi-full-relaxed.jpg";
import digiProfile from "../assets/photos/digi-profile.jpg";
import digiProfileLeft from "../assets/photos/digi-profile-left.jpg";
import alo from "../assets/photos/alo.jpg";
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
  headline: "The one to watch",
  sub: "Model · Creative · Influencer",
};

export const ticker = ["Remember the name", "Model", "Creative", "Influencer"];

// About: each phrase is drawn in a style that matches it (see ABOUT_STYLES in BrandSite.tsx).
export const about = {
  intro: "Hi, I'm Fiza.",
  lines: [
    { text: "Signed model", style: "model" },
    { text: "Creative", style: "creative" },
    { text: "Downtown LA", style: "la" },
    { text: "UCLA grad", style: "ucla" },
    { text: "Financial analyst by day", style: "finance" },
    { text: "Desi & dramatic", style: "desi" },
    { text: "Gen-Z", style: "genz" },
    { text: "Gym girl", style: "gym" },
    { text: "Dog mom", style: "dog" },
    { text: "Hoops", style: "hoops" },
    { text: "Horror movies", style: "horror" },
    { text: "R&B & dancing", style: "rnb" },
  ],
  niches: "Beauty & style · Lifestyle & wellness · Career",
  outro: "Building the story you'll want to say you saw first.",
  video: { src: onTheGo, poster: onTheGoPoster, caption: "On the go" },
};

// Digitals: unretouched, in the order agencies expect (headshots, mid, full length, profiles).
export const digis = [
  { src: digiHeadshot, caption: "Headshot" },
  { src: digiSmile, caption: "Smile" },
  { src: digiFront, caption: "Waist up" },
  { src: digiFull, caption: "Full length" },
  { src: digiFullRelaxed, caption: "Full length, relaxed" },
  { src: digiProfile, caption: "Profile, right" },
  { src: digiProfileLeft, caption: "Profile, left" },
];

// Brands worked with, shown in About.
export const workedWith = [{ src: alo, brand: "Alo Wellness Club" }];

// "In the next issue": the goals list. Set done: true as you hit them.
export const nextIssue = [
  { goal: "A magazine cover", done: false },
  { goal: "A campaign billboard in LA", done: false },
  { goal: "Walk in fashion week", done: false },
  { goal: "My own brand", done: false },
];
