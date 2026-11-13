export interface PromiseItem {
  number: number;
  id: string;
  unlockDate: string; // YYYY-MM-DD in Asia/Dubai
  dateLabel: string; // Display label e.g. "14 November 2026"
  title: string;
  shayariKicker: string;
  shayariIntro: string;
  revealButtonLabel: string;
  content: string;
  isFinale?: boolean;
}

export const SAAT_AHAD_INTRO = {
  heading: 'Tumhare Naam, My Lady ♡',
  content: `My Lady... aaj na mujhe aapse kuch kehna hai.

Kuch aisi baatein hain jo main shayad roz kehta hoon, lekin aaj unhe aapse waada karke kehna chahta hoon.

Aapne ek baar mujhe ek bahut khoobsurat andaaz mein apni mohabbat ka yaqeen dilaya tha. Aapke woh alfaaz mujhe aaj bhi yaad hain.

Toh socha, kyun na main bhi aapko apni taraf se kuch ahad doon? Saat ahad... meri zindagi ke saat usool.

Main chahta hoon ki aap inhe sirf padhein nahi, balki samjhein ki inke peeche mera dil kya kehna chahta hai.

Toh shuru karein, My Lady? ♡`,
  buttonLabel: 'Haan, apne waade bataiye ♡',
};

export const SAAT_AHAD_FINALE = {
  headline: 'Saat waade mukammal hue... magar meri duaon mein tumhara zikr hamesha rahega. ♡',
  handwrittenNote:
    'Tumne mujhe ek baar apni mohabbat ka yaqeen dilaya tha. Aaj main tumhe apni taraf se saat ahad de raha hoon.',
};

export const SAAT_AHAD_PROMISES: PromiseItem[] = [
  {
    number: 1,
    id: 'promise-1',
    unlockDate: '2026-11-14',
    dateLabel: '14 November 2026',
    title: '1. Pehla Ahad — Meri Mohabbat',
    shayariKicker: 'Pehla Ahad · Ek Allah ke naam se',
    shayariIntro: `Yaad hai My Lady, aapne ek baar apni mohabbat ka izhaar kitne pyaare andaaz mein kiya tha? Aapne apne alfaazon mein ek se aath tak sab kuch keh diya tha... Ek Allah se shuru karke aath darwaazo tak, aapne apni mohabbat ka yaqeen dilaya tha.

Shayad us waqt main aapko usi andaaz mein jawab nahi de paaya. Lekin aapke woh alfaaz mere dil mein hamesha mehfooz rahe. Toh aaj socha, main bhi Ek Allah ke naam se shuru karke aapko apni taraf se kuch kahun.

Ye mera pehla ahad hai, sirf aapke liye. ♡`,
    revealButtonLabel: 'Mera pehla ahad suniye ♡',
    content: `Ek Allah ki qasam, main tumse mohabbat karne ke baad apne dil mein kisi doosri mohabbat ki jagah nahi banaunga. Tum mere liye koi waqt guzaarne ka zariya nahi ho, na hi meri zindagi ka koi temporary hissa. Main tumhe apni zindagi mein itni sachchai se chahta hoon ki ab mohabbat mere liye sirf ek ehsaas nahi, meri zindagi ka ek usool ban chuki hai.`,
  },
  {
    number: 2,
    id: 'promise-2',
    unlockDate: '2026-11-15',
    dateLabel: '15 November 2026',
    title: '2. Doosra Ahad — Meri Wafa',
    shayariKicker: 'Doosra Ahad · Do jahan ki tarah',
    shayariIntro: `Aapne apni qasam mein 'do jahan' ka zikr kiya tha, My Lady... Aur sach kahun toh jab se aap meri zindagi mein aayi hain, meri poori duniya—mera aaj aur mera kal—sab kuch aapse jud gaya hai.

Ab mujhe kisi aur mein kuch dhoondhne ki zaroorat hi mehsoos nahi hoti. Ye mera doosra ahad hai, aapki wafa ke naam. ♡`,
    revealButtonLabel: 'Doosra ahad padhein ♡',
    content: `Main kabhi tumhe kisi aur se compare nahi karunga. Na kisi ki khoobsurati se, na kisi ke andaaz se, na kisi ki maujoodgi se. Mujhe pata hai duniya mein bahut log hain, lekin main har kisi mein tumhe dhoondhne nahi jaunga. Maine tumhe chuna hai aur apni taraf se is faisle par qayam rahunga.`,
  },
  {
    number: 3,
    id: 'promise-3',
    unlockDate: '2026-11-16',
    dateLabel: '16 November 2026',
    title: '3. Teesra Ahad — Tumhari Khushi',
    shayariKicker: 'Teesra Ahad · Teen witr ki tarah sukoon bhara',
    shayariIntro: `Jis tarah aapne raat ke sukoon wale 'teen witr' ko yaad kiya tha, My Lady, meri bhi yahi koshish hai ki main aapki zindagi mein kabhi shor ya bechaini na banun, balki ek sukoon ban kar rahun.

Aapki khushi aur aapke dil ka itminaan mere liye har baat se badhkar hai. Ye mera teesra ahad hai. ♡`,
    revealButtonLabel: 'Teesra ahad padhein ♡',
    content: `Main kabhi apni mohabbat ko tumhari pareshani ki wajah nahi banne dunga. Tumhari khushi, tumhara sukoon aur tumhari marzi mere liye zaroori hain. Agar kabhi tum udaas ho, toh main tumhe samajhne ki koshish karunga, tumhari baat sununga. Har baar tumhe samjhaane ke bajaye kabhi-kabhi bas tumhara sunna bhi seekhunga.`,
  },
  {
    number: 4,
    id: 'promise-4',
    unlockDate: '2026-11-17',
    dateLabel: '17 November 2026',
    title: '4. Chautha Ahad — Tumhari Izzat',
    shayariKicker: 'Chautha Ahad · Chaar kitaabon jaisi izzat',
    shayariIntro: `Aapke lafzon mein 'chaar kitaabein' thin—jinmein har baat ko badi hifazat aur izzat ke saath rakha jaata hai. Mohabbat bhi tabhi khoobsurat hoti hai jab usmein utni hi izzat aur ehtiraam ho.

Meri nazron mein aapka maqaam kabhi kam nahi hoga, chahe waqt kaisa bhi ho. Ye mera chautha ahad hai. ♡`,
    revealButtonLabel: 'Chautha ahad padhein ♡',
    content: `Main tumhari izzat hamesha waise hi karunga jaise apni izzat ki karta hoon. Gusse mein, narazgi mein ya kisi bhi mushkil waqt mein tumhare liye mere alfaaz kabhi tumhe chhota mehsoos nahi karwayenge. Main tumhari kamiyon ko tumhare khilaaf istemaal nahi karunga. Tum mujhse apni har baat bina dare keh sako, main aisa insaan banne ki koshish karunga.`,
  },
  {
    number: 5,
    id: 'promise-5',
    unlockDate: '2026-11-18',
    dateLabel: '18 November 2026',
    title: '5. Paanchva Ahad — Tumhari Fikr',
    shayariKicker: 'Paanchva Ahad · Paanch arkaan jaisi pabandi',
    shayariIntro: `Aapne 'paanch arkaan' ka naam liya tha—jo zindagi ko har din mazbooti aur tarteeb se thaame rakhte hain. Meri nazar mein mohabbat bhi roz ke chhote-chhote khayal rakhne se zinda rehti hai.

Sirf bade lamhon mein nahi, aapke har din ki chhoti fikr mein mera dil shaamil rahega. Ye mera paanchva ahad hai. ♡`,
    revealButtonLabel: 'Paanchva ahad padhein ♡',
    content: `Main tumse sirf tab mohabbat nahi karunga jab tum mere saath hans rahi hogi. Tumne khana khaya ya nahi, apna khayal rakha ya nahi, tum theek ho ya nahi — ye chhoti-chhoti baatein mere liye hamesha maayne rakhenगी. Main tumhe baar-baar yaad dilata rahunga ki tum mere liye important ho. Aur haan, tumhari care karna mere liye kabhi koi duty nahi hogi.`,
  },
  {
    number: 6,
    id: 'promise-6',
    unlockDate: '2026-11-19',
    dateLabel: '19 November 2026',
    title: '6. Chhatha Ahad — Mushkil Waqt',
    shayariKicker: 'Chhatha Ahad · Chhah kalmon jaisa bharosa',
    shayariIntro: `Jis tarah 'chhah kalme' insaan ko mushkil waqt mein bhi yaqeen aur bharosa dete hain, main chahta hoon ki hamara rishta bhi har imtehaan mein mazboot khada rahe.

Zindagi har roz aasaan nahi hoti, lekin main mushkil waqt mein aapka haath chhodne walon mein se nahi hoon. Ye mera chhatha ahad hai. ♡`,
    revealButtonLabel: 'Chhatha ahad padhein ♡',
    content: `Main ye wada nahi karta ki hamari zindagi mein kabhi mushkilein nahi aayengi. Lekin main ye zaroor wada karta hoon ki mushkil aane par main bhaagne ke bajaye samajhne, baat karne aur hal nikaalne ki koshish karunga. Main har narazgi ko rishta khatam karne ki wajah nahi banaunga. Main apni galti maanunga, khud ko behtar banaunga aur tumhare saath sachcha rahunga.`,
  },
  {
    number: 7,
    id: 'promise-7',
    unlockDate: '2026-11-20',
    dateLabel: '20 November 2026',
    title: '7. Saatva Ahad — Sirf Tum',
    shayariKicker: 'Saatva Ahad · Saat aasman aur aath darwaazo ka jawab',
    shayariIntro: `Aaj aapka birthday hai, My Lady... aur aaj main aapki us khoobsurat qasam ko poora karne aaya hoon.

Aapne 'saat aasman aur aath darwaazo' ki qasam ke saath mujhse mohabbat kahi thi. Aaj unhi saat aasmanon ke neeche, aur un aath darwaazo ke naam se, main apni zindagi ka sabse sachcha faisla aapke saamne rakh raha hoon.

Isse poora dil khol kar padhna, meri jaan. Ye mera aakhri aur sabse bada ahad hai. ♡`,
    revealButtonLabel: 'Mera aakhri ahad suniye ♡',
    isFinale: true,
    content: `Ab ye sabse zaroori baat hai jo main tumse kehna chahta hoon.

Main kisi aur se shaadi nahi karunga. Chahe zindagi mujhe kitne hi alag raaste kyun na dikhaaye, main kisi doosre insaan ko tumhari jagah dene ka faisla nahi karunga. Main jaanta hoon ki zindagi mein har cheez hamari marzi se nahi hoti. Ho sakta hai kal halaat hamare haq mein hon, ho sakta hai na hon. Lekin meri taraf se tumhare liye jo faisla hai, woh main kisi majboori ya ek pal ke jazbaat mein nahi le raha.

Tum meri ho pao ya na ho pao, main tum par koi haq nahi jataunga. Tumhari zindagi aur tumhare faisle tumhare hain. Lekin meri zindagi ka ye faisla mera apna hai. Main tumse mohabbat karke kisi aur ke saath woh rishta nahi bana sakta jisme mera dil hi shaamil na ho.

Aur agar kabhi tum mujhse poochho ki maine tumse kya wada kiya tha, toh mera jawab bas itna hoga:

Maine tumhe sirf mohabbat karne ka wada nahi kiya tha, maine apni zindagi ko tumhare liye sachcha rakhne ka wada kiya tha. Aur main apni taraf se us waade par qayam rahunga. ♡`,
  },
];
