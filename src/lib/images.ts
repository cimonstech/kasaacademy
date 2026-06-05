export const cefImages = {
  brownTexture: "/cef/images/brown-texture.jpg",
  creativesInOffice: "/cef/images/creatives_in_office.jpg",
  creativesInStudio: "/cef/images/creatives-in-studeio.jpg",
  goldTexture: "/cef/images/goldtexture.jpg",
  photography: "/cef/images/photography.jpg",
} as const;

/** Stable per-section image picks — varied but consistent across renders */
export const sectionImages = {
  hero: cefImages.goldTexture,
  beliefTalent: cefImages.creativesInOffice,
  beliefLiteracy: cefImages.photography,
  beliefAfrica: cefImages.brownTexture,
  journey: cefImages.creativesInStudio,
  interlude: cefImages.creativesInOffice,
  register: cefImages.photography,
  footer: cefImages.goldTexture,
} as const;
