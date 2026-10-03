// Finds the school logos already stored in src/assets/schoolLogo/ (no filenames hard-coded).
// A filename containing "cast" is the CAST logo; the other one is the Mater Dei College logo.
const logoFiles = import.meta.glob('../assets/schoolLogo/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url', import: 'default' })

const logos = Object.entries(logoFiles).sort(([a], [b]) => a.localeCompare(b))
const cast = logos.find(([p]) => /cast/i.test(p)) || (logos.length > 1 ? logos[logos.length - 1] : null)
const mdc = logos.find(([p]) => !cast || p !== cast[0])

export const mdcLogo = mdc?.[1]
export const castLogo = cast?.[1]

// Campus image that already exists in the project (nothing is added): any image under
// src/assets/ outside schoolLogo/, preferring a path containing "campus".
const imageFiles = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
const others = Object.entries(imageFiles).filter(([p]) => !/schoolLogo/i.test(p))
export const campusImage = (others.find(([p]) => /campus/i.test(p)) || others[0])?.[1]
