export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#story', label: 'Story' },
  { href: '#atelier', label: 'Atelier' },
  { href: '#cafe', label: 'Café' },
  { href: '#events', label: 'Events' },
  { href: '#visit', label: 'Visit' },
];

export const LOGO = 'img/hd/logo.jpg';

export const SLIDES = [
  { src: 'img/hd/shop-wide.jpg', caption: 'The flower atelier' },
  { src: 'img/hd/frozen.jpg', caption: 'Event styling' },
  { src: 'img/hd/cafe.jpg', caption: 'The pink café' },
  { src: 'img/hd/spider.jpg', caption: 'Themed celebrations' },
];

export const HOUSES = [
  {
    id: 'flowers',
    href: '#atelier',
    cta: 'See bouquets',
    src: 'img/hd/shop-woman.jpg',
    title: 'Flowers',
    body: 'Fresh bouquets, hatboxes and gift sets, designed and wrapped in-house.',
  },
  {
    id: 'cafe',
    href: '#visit',
    cta: 'Visit the café',
    src: 'img/hd/cafe.jpg',
    title: 'Café & Catering',
    body: 'A pink Parisian café for slow afternoons, with catering for private occasions.',
  },
  {
    id: 'styling',
    href: '#events',
    cta: 'View events',
    src: 'img/hd/monster.jpg',
    title: 'Event Styling',
    body: 'Ceilings, backdrops, florals and tablescapes for weddings, birthdays and milestones.',
  },
];

export const PIECES = [
  {
    src: 'img/hd/redroses.jpg',
    name: 'Red rose hatbox',
    note: 'Long-stem red roses in our signature blush hatbox.',
  },
  {
    src: 'img/lilies.jpg',
    name: 'Blush lily bouquet',
    note: "Stargazer lilies, peach roses and baby's breath.",
  },
  {
    src: 'img/yellow.jpg',
    name: 'Sunlit yellow & white',
    note: 'Yellow roses and white lilies in crisp white wrap.',
  },
  {
    src: 'img/giftbox.jpg',
    name: 'Gift box with wine',
    note: 'Curated treats with a bottle of red, tied in satin.',
  },
];

export interface EventShot {
  src: string;
  title: string;
  /** Column / row span on the desktop bento grid. */
  col: 1 | 2;
  row: 1 | 2;
}

export const EVENTS: EventShot[] = [
  { src: 'img/hd/frozen.jpg', title: 'Winter wonderland', col: 2, row: 2 },
  { src: 'img/attendant.jpg', title: 'Flowers for a salutatorian', col: 1, row: 2 },
  { src: 'img/hd/monster.jpg', title: 'Pink & noir garden party', col: 2, row: 1 },
  { src: 'img/hd/hall.jpg', title: 'Pink banquet hall', col: 1, row: 1 },
  { src: 'img/hd/spider.jpg', title: 'Superhero birthday', col: 2, row: 1 },
  { src: 'img/hd/ocean.jpg', title: 'Under the sea', col: 1, row: 1 },
  { src: 'img/family.jpg', title: 'Graduation bouquets', col: 1, row: 2 },
  { src: 'img/hd/noir.jpg', title: 'Noir & crimson', col: 2, row: 1 },
  { src: 'img/stage.jpg', title: 'Graduation stage', col: 1, row: 1 },
];

export const CONTACTS = [
  {
    label: 'Address',
    value: 'Magsaysay Street, Sorsogon, Philippines, 4700',
    href: 'https://maps.google.com/?q=Magsaysay+Street+Sorsogon',
  },
  { label: 'Phone', value: '0961 943 7924', href: 'tel:09619437924' },
  { label: 'Email', value: 'surrealscadeau@gmail.com', href: 'mailto:surrealscadeau@gmail.com' },
  { label: 'Instagram', value: '@surrealscadeau', href: 'https://instagram.com/surrealscadeau' },
  { label: 'We serve', value: 'Metro Manila · Naga · Legazpi · Sorsogon · Manila', href: '#visit' },
];

export const SITE = {
  phone: 'tel:09619437924',
  messenger: 'https://m.me/',
  instagram: 'https://instagram.com/surrealscadeau',
  instagramHandle: '@surrealscadeau',
  reelUrl: 'https://www.facebook.com/reel/2080564842822417',
  reelEmbed:
    'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2080564842822417&show_text=false&width=340',
};

export const pad = (n: number) => String(n).padStart(2, '0');
