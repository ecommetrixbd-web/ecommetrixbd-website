// Brand settings. To make another brand's site (e.g. Sketch2Growth), copy this file's values.
export const site = {
  name: 'Ecommetrix',
  domain: 'ecommetrixbd.com',
  tagline: 'Data → Content → Sales',
  description:
    'Ecommetrix is a performance marketing agency in Dhaka. Meta, Google and TikTok ads, video production, websites and server-side tracking.',
  phone: '+880 1531-753599',
  phoneRaw: '8801531753599',
  email: 'ecommetrixbd@gmail.com',
  address: 'Block-D, Road-01, House-35, Aftabnagar, Dhaka 1212',
  addressShort: 'Aftabnagar, Dhaka',
  mapQuery: 'Aftabnagar, Dhaka, Bangladesh',
  facebook: 'https://facebook.com/ecommetrix',
  // Free key from https://web3forms.com — form submissions are emailed to you. Leave empty to test.
  web3formsKey: '',
  // Short looping clip shown inside the "Video & Creative Production" card.
  // Put the file in public/videos/ (MP4, 5–10 seconds, under ~3 MB).
  creativeVideo: { src: '/videos/creative-reel.mp4', poster: '' },
};

// Slides for the hero carousel. Put images in public/images/services/ and set `image`.
// While `image` is empty, a branded placeholder is shown.
export const heroSlides = [
  { name: 'Meta Ads', image: '' },
  { name: 'Google Ads', image: '' },
  { name: 'TikTok Ads', image: '' },
  { name: 'Video & Creative Production', image: '' },
  { name: 'Website Design & Development', image: '' },
  { name: 'Graphics Design', image: '' },
  { name: 'Email Marketing', image: '' },
  { name: 'Content Support', image: '' },
  { name: 'Server-Side Tracking', image: '' },
];
