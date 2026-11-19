export interface SurprisePhoto {
  id: number;
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  note: string;
  rotationClass: string;
  pinStyle: 'tape-blush' | 'tape-lavender' | 'pin-rose' | 'tape-cream';
}

export const BIRTHDAY_SURPRISE_OPENING = {
  heading: 'My Lady... aaj aapko muskurana hai! 🤭❤️',
  paragraphs: [
    '"Kyuki aaj koi udaasi nahi, koi fikr nahi... aur sabse zaroori baat, aaj koi sad music nahi! 😂',
    'Aaj sirf cute si baatein, dher saara pyaar aur ek warm sa music... kyunki aaj ka din meri Panda ki muskurahat ke naam hai."',
  ],
  buttonLabel: 'Achha ji, ab kya surprise hai? ♡',
};

export const BIRTHDAY_SURPRISE_LETTER = {
  kicker: 'A Letter From My Heart',
  paragraphs: [
    'Meri jaan, meri Panda, meri Cutu, meri Shaistu... ♡',
    'Happy Birthday, My Lady! ❤️',
    'Allah tumhari zindagi ko itni khushiyon se bhar de ki tumhare purane dard bhi ek din muskurahat ban jaayein. Tumhari har achhi dua qubool ho, har mushkil aasaan ho aur tum hamesha Allah ki hifazat mein raho.',
    'Humne achhe waqt bhi dekhe hain aur mushkil bhi. Kabhi halaat ne aazmaya, kabhi ek doosre ko samajhne mein waqt laga. Lekin ek baat kabhi nahi badli — tum mere liye kitni khaas ho.',
    'Main chahta hoon ki tum mere saath hamesha mehfooz raho. Tumhe apni feelings chhupani na padein, apni pareshani akele na sehni pade aur kabhi ye na sochna pade ki tum akeli ho. Main perfect nahi hoon, lekin tumhe samajhne, tumhari izzat karne aur tumhara sukoon banne ki koshish hamesha karta rahunga.',
    'Aur meri chhoti si Panda, zyada overthinking mat kiya karo! 🤭 Khana time par khana, apna khayal rakhna aur apni woh pyaari si smile kabhi mat khona. Tumhari ye cute si harkatein bhi mujhe bahut pyaari hain.',
    'Main tumhare liye sirf ek khoobsurat birthday nahi, balki ek khoobsurat zindagi ki dua karta hoon — jahan hum saath hasein, ek doosre ko tang karein, chhoti-chhoti khushiyan manayein aur har mushkil mein ek doosre ka haath thaamein.',
    'Aur InshaAllah, ek din hamare aaj ke saare sapne haqeeqat banenge. 🤭',
    'Bas yaad rakhna, meri jaan...',
    'Tum meri mohabbat bhi ho, meri duaon ka hissa bhi aur mere aane wale kal ka ek bahut khoobsurat khwaab bhi.',
    'Happy Birthday, My Lady. I love you, more than words could ever explain. ♡',
    'Hamesha tumhara Sameer. ❤️',
  ],
  buttonLabel: 'Ek chhoti si duniya dekhein? ♡',
};

export const BIRTHDAY_SURPRISE_WALL = {
  heading: 'Our Little World ♡',
  subtitle: '"Some dreams are too beautiful to remain just dreams."',
  buttonLabel: 'Ek aakhri baat kahun, My Lady? ♡',
};

/**
 * Exact seven uploaded WebP photographs for Our Little World ♡.
 * Referenced directly from /assets/aistudio/ (served statically with immutable caching on Vercel).
 */
export const BIRTHDAY_SURPRISE_PHOTOS: SurprisePhoto[] = [
  {
    id: 1,
    src: '/assets/aistudio/4_6352f6e4.webp',
    alt: 'Dream photograph 1: Sharing birthday cake together',
    orientation: 'portrait',
    note: 'Ek din aise hi… ♡',
    rotationClass: '-rotate-2 sm:-rotate-3',
    pinStyle: 'tape-blush',
  },
  {
    id: 2,
    src: '/assets/aistudio/1_5a0d35de.webp',
    alt: 'Dream photograph 2: Birthday celebration together with cake',
    orientation: 'portrait',
    note: 'InshaAllah soon ✨',
    rotationClass: 'rotate-2 sm:rotate-2',
    pinStyle: 'pin-rose',
  },
  {
    id: 3,
    src: '/assets/aistudio/0_d7f54a79.webp',
    alt: 'Dream photograph 3: Birthday smiles together',
    orientation: 'portrait',
    note: 'A birthday wish ♡',
    rotationClass: '-rotate-1 sm:-rotate-2',
    pinStyle: 'tape-lavender',
  },
  {
    id: 4,
    src: '/assets/aistudio/2_226d0f2a.webp',
    alt: 'Dream photograph 4: Peaceful afternoon together on a garden bench',
    orientation: 'landscape',
    note: 'Khwaabon ka ek lamha 🌷',
    rotationClass: 'rotate-1 sm:rotate-2',
    pinStyle: 'tape-cream',
  },
  {
    id: 5,
    src: '/assets/aistudio/3_4786d5b7.webp',
    alt: 'Dream photograph 5: Looking at each other on a sunny garden bench',
    orientation: 'landscape',
    note: 'Sirf tum aur main ♡',
    rotationClass: '-rotate-2 sm:-rotate-1',
    pinStyle: 'pin-rose',
  },
  {
    id: 6,
    src: '/assets/aistudio/5_2232d1ab.webp',
    alt: 'Dream photograph 6: Smiling side by side in the sunshine',
    orientation: 'portrait',
    note: 'Ek khoobsurat khwaab ✨',
    rotationClass: 'rotate-2 sm:rotate-3',
    pinStyle: 'tape-blush',
  },
  {
    id: 7,
    src: '/assets/aistudio/6_2a7e54e2.webp',
    alt: 'Dream photograph 7: Resting peacefully on green grass together',
    orientation: 'portrait',
    note: 'Someday, My Lady ♡',
    rotationClass: '-rotate-1 sm:-rotate-2',
    pinStyle: 'tape-lavender',
  },
];

export const BIRTHDAY_SURPRISE_TRUTH = {
  kicker: 'One Little Truth',
  message:
    '"My Lady, mujhe pata hai abhi ye sab AI ki banayi hui tasveerein hain. Ho sakta hai inmein hum thode alag dikh rahe hon, toh maaf kar dena. 🤭 Lekin in tasveeron mein jo ladka hai na, uske dil mein aap bilkul waise hi hain jaise aaj hain... aur meri dua hai ki ek din naseeb mein bhi aap hi hon."',
  buttonLabel: 'Aakhri alfaaz padhein ♡',
};

export const BIRTHDAY_SURPRISE_FINALE = {
  stanzas: [
    '"Abhi toh bas khwaabon mein aapke saath tasveerein sajayi hain,',
    'Ek din haqeeqat mein bhi aapke saath zindagi sajani hai.',
    'Manzil ka pata nahi, bas duaon mein aapka naam hai,',
    'Aur dil ko aaj bhi, kal bhi... bas aapka intezaar hai. ♡"',
  ],
  closingTitle: 'Happy Birthday, My Lady ❤️',
};
