// Everything you'd want to edit (words, links, photos) lives in this file.
// Each photo/video is used in exactly one place on the site.
import coverBlue from "../assets/photos/cover-blue.jpg";
import digiFront from "../assets/photos/digi-front.jpg";
import digiProfile from "../assets/photos/digi-profile.jpg";
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

// About: one statement that lights up as you scroll, a few facts, and the video.
export const about = {
  statement:
    "A signed model and creative from Downtown LA. Recent UCLA grad, financial analyst by day, South Asian, Gen-Z, dog mom, building the story you'll want to say you saw first.",
  facts: [
    ["Niches", "Beauty & style, lifestyle & wellness, career"],
    ["Off duty", "Gaming, basketball, horror movies, R&B & dancing"],
  ],
  video: { src: onTheGo, poster: onTheGoPoster, caption: "On the go" },
};

// "The Book": the sideways-scrolling gallery. Add photos here as they come in.
export const book = [
  { src: digiFront, caption: "Digital: front" },
  { src: digiProfile, caption: "Digital: profile" },
  { src: alo, caption: "Alo Wellness Club" },
];

// "In the next issue": the goals list. Set done: true as you hit them.
export const nextIssue = [
  { goal: "A magazine cover", done: false },
  { goal: "A campaign billboard in LA", done: false },
  { goal: "Walk in fashion week", done: false },
  { goal: "My own brand", done: false },
];
