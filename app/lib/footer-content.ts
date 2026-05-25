/** Editorial footer copy and links (design mock). */

export const FOOTER_TAGLINE =
  'Curating the world\u2019s most evocative coffees for those who understand that the best things in life are never rushed.';

export const FOOTER_NEWSLETTER_NOTE =
  'Bi-weekly dispatches on the art of slow living.';

export const FOOTER_ARCHIVE_LINKS = [
  {label: 'Journal', to: '/blogs/journal'},
  {label: 'Origin Stories', to: '/blogs/journal'},
  {label: 'Sustainability', to: '/pages/sustainability'},
  {label: 'Brew Guides', to: '/blogs/journal'},
] as const;

export const FOOTER_CUSTOMER_CARE_LINKS = [
  {label: 'Shipping', to: '/policies/shipping-policy'},
  {label: 'Wholesale', to: '/pages/wholesale'},
  {label: 'Privacy', to: '/policies/privacy-policy'},
  {label: 'Terms', to: '/policies/terms-of-service'},
] as const;

export const FOOTER_SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: 'social_leaderboard' as const,
  },
  {
    label: 'Email',
    href: 'mailto:hello@espresso-editorial.com',
    icon: 'alternate_email' as const,
  },
] as const;
