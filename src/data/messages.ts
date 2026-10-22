export interface DailyLetter {
  id: string; // ISO date string YYYY-MM-DD
  dateFormatted: string; // e.g. "22 October 2026"
  daysLeft: number;
  daysLeftLabel: string;
  heading: string;
  content: string;
  signOff: string;
}

export const DAILY_LETTERS: Record<string, DailyLetter> = {
  "2026-10-22": {
    id: "2026-10-22",
    dateFormatted: "22 October 2026",
    daysLeft: 29,
    daysLeftLabel: "29 days left",
    heading: "29 days left, meri cutu si Panda 🐼💗",
    content: "Pata hai baccha, kabhi kabhi sochta hoon ki ek game mein mile do log aakhir ek doosre ke liye itne khaas kaise ban gaye. Tum meri zindagi mein aayi toh dheere-dheere tumhari chhoti-chhoti baatein hi mere din ka sabse pyaara hissa ban gayin. Tumhara sharmana, tumhari awaaz aur tumhari woh cute si adaayein… uff, tumhe kya pata tum mere chehre par kitni aasani se smile le aati ho. 🥹💗\n\nAaj ki meri dua hai ki Allah tumhare dil ko hamesha sukoon de, tumhari aankhon ki chamak kabhi kam na ho aur tumhe har us cheez mein khushi mile jo tumhare liye sach mein maayne rakhti hai. Aur haan, meri shaitaan bacchu, aaj bhi thoda sa apna khayal rakhna. Tum mere liye hi nahi, khud apne liye bhi bahut precious ho.",
    signOff: "Bas aise hi hamesha muskurati rehna, meri Panda. ♡"
  },
  "2026-10-23": {
    id: "2026-10-23",
    dateFormatted: "23 October 2026",
    daysLeft: 28,
    daysLeftLabel: "28 days left",
    heading: "28 days left, meri pyaari bacchu 💕",
    content: "Meri jaan, tumse baat karna kabhi kabhi din ke sabse ordinary moment ko bhi special bana deta hai. Zaroori nahi hota ki har baar koi badi baat ho; kabhi tumhara ek chhota sa message hi kaafi hota hai mere chehre par smile laane ke liye. Tumhari apni ek alag si jagah hai meri duniya mein, jise main words mein poori tarah samjha bhi nahi paata.\n\nAaj dil se dua hai ki Allah tumhare naseeb mein achhe log, sachchi khushiyan aur aise moments likhe jinhe yaad karke tumhara dil halka aur chehra roshan ho jaaye. Tumhe kabhi apni worth prove karne ke liye khud ko thakana na pade. Tum jaisi ho, waise hi bahut pyaari ho.",
    signOff: "Aur meri cutu, aaj ek extra smile meri taraf se bhi. 🐼💗"
  },
  "2026-10-24": {
    id: "2026-10-24",
    dateFormatted: "24 October 2026",
    daysLeft: 27,
    daysLeftLabel: "27 days left",
    heading: "27 days left, My Lady 🌷",
    content: "Meri Panda, kabhi tum apni hi chhoti-chhoti baaton par itna sochti hogi, aur shayad tumhe andaaza bhi nahi hota hoga ki tum kitni achhi ho. Main chahta hoon ki tum apne aap ko kabhi sirf apni mistakes ya difficult days ke through mat dekho. Tumhari kindness, tumhara dil aur tumhara apna sa andaaz bhi tumhari pehchaan hai.\n\nAaj meri dua hai ki Allah tumhe apni nazron mein bhi utni hi khoobsurat lagne ki himmat de jitni tum doosron ki nazron mein ho sakti ho. Tumhara confidence badhe, tum apni abilities par bharosa karo aur jo cheezein tumhe daraati hain, unka saamna dheere-dheere kar pao.",
    signOff: "Aur haan, madam, khud ko underestimate karna thoda kam kar do. Tumhari yeh aadat mujhe bilkul pasand nahi. 🤍"
  },
  "2026-10-25": {
    id: "2026-10-25",
    dateFormatted: "25 October 2026",
    daysLeft: 26,
    daysLeftLabel: "26 days left",
    heading: "26 days left, meri jaan 🫶",
    content: "Bacchu, kaash main tumhare har difficult din ko thoda easy bana paata. Har problem ko tumhari jagah solve karna shayad possible na ho, lekin main chahta hoon ki tumhe kabhi aisa mehsoos na ho ki tumhe apni feelings chhupakar sab kuch akele handle karna hai. Tumhe har waqt strong dikhne ki zaroorat nahi hai.\n\nAaj dil se dua karta hoon ki Allah tumhari pareshaniyon mein aasani paida kare, tumhe sahi waqt par sahi raaste dikhaye aur tumhare dil se woh bojh halka kare jiske baare mein tum kisi ko bata bhi nahi paati. Tumhare difficult days bhi guzar jaayein, aur unke baad tumhe sukoon bhare din milen.",
    signOff: "Meri Panda, jab thak jao toh thoda rest kar lena. Har cheez ek hi din mein theek karna zaroori nahi. 💗"
  },
  "2026-10-26": {
    id: "2026-10-26",
    dateFormatted: "26 October 2026",
    daysLeft: 25,
    daysLeftLabel: "25 days left",
    heading: "25 days left, meri sleepy Panda 🌙",
    content: "Meri cutu, agar tumhari neend aur aaram ke liye koi award hota na, toh main tumhe nominate karne ke saath saath khud vote bhi karta. 😂💗 Lekin mazaak apni jagah, main sach mein chahta hoon ki tumhari zindagi mein itna sukoon ho ki tum raat ko bina hazaar baatein soche aaram se so sako.\n\nAaj meri dua hai ki Allah tumhe sehat, achhi neend aur dil ka itminaan de. Tumhari body ko rest mile, tumhara mind halka rahe aur subah uthkar tumhe ek fresh beginning mehsoos ho. Aur agar koi din achha na bhi guzre, toh yaad rakhna ki ek bura din tumhari poori zindagi ki kahaani nahi hota.",
    signOff: "Ab meri Panda, apni neend ko bhi importance dena. Sirf cute banne se kaam nahi chalega, sehat ka khayal bhi rakhna hai. 🐼"
  },
  "2026-10-27": {
    id: "2026-10-27",
    dateFormatted: "27 October 2026",
    daysLeft: 24,
    daysLeftLabel: "24 days left",
    heading: "24 days left, meri dream girl ✨",
    content: "Pata hai meri jaan, tumhare apne dreams hain, apni pasand hai aur apni ek poori duniya hai. Main chahta hoon ki tum un sapno ko sirf isliye chhota na kar do kyunki kabhi koi cheez mushkil lagti hai. Har beautiful cheez aasani se nahi milti, lekin iska matlab yeh bhi nahi ki tum uske laayak nahi ho.\n\nAaj dua hai ki Allah tumhare liye achhe opportunities ke darwaze khole, tumhari mehnat mein barkat de aur tumhe aise decisions lene ki samajh de jo tumhare future ke liye achhe hon. Tum apne goals ki taraf confidence ke saath badho, aur apni progress ko doosron se compare karke kabhi kam mat samjho.",
    signOff: "Main chahta hoon ki ek din tum apne dreams poore hote dekhkar khud par proud feel karo. Aur main tumhari us smile ki imagination se hi khush ho jaata hoon. 🤍"
  },
  "2026-10-28": {
    id: "2026-10-28",
    dateFormatted: "28 October 2026",
    daysLeft: 23,
    daysLeftLabel: "23 days left",
    heading: "23 days left, meri favourite person 💌",
    content: "Meri Panda, mujhe tumhari sirf woh side nahi pyaari jo hasti hai, tease karti hai ya cute baatein karti hai. Main chahta hoon ki tumhari real feelings ke liye bhi jagah ho—tumhara mood off hona, kabhi chup rehna, kabhi confused hona aur kabhi bas kisi baat ka mann na karna. Tumhe har waqt entertaining ya happy rehne ki zaroorat nahi.\n\nAaj meri dua hai ki Allah tumhari zindagi mein aise log rakhe jinke saamne tum apni asli feelings ke saath reh sako. Tumhe samajhne wale log milen, tumhari boundaries ki respect ho aur tumhari baat ko bina judge kiye suna jaaye.",
    signOff: "Aur meri bacchu, kabhi kabhi chup rehna bhi okay hai. Bas apne dil ko hamesha akela mat kar dena. Tumhara sukoon bhi important hai. 💗"
  },
  "2026-10-29": {
    id: "2026-10-29",
    dateFormatted: "29 October 2026",
    daysLeft: 22,
    daysLeftLabel: "22 days left",
    heading: "22 days left, meri little sunshine ☀️",
    content: "Tumhe shayad kabhi pata bhi nahi chalega ki tumhari ek chhoti si khushi dekhkar doosre insaan ka din kitna achha ho sakta hai. Tum jab apne natural andaaz mein baat karti ho, toh usmein ek aisi warmth hoti hai jo fake nahi lagti. Aur meri Panda, tumhara yeh apna sa andaaz hi tumhe tum banata hai.\n\nAaj dua hai ki Allah tumhari zindagi mein aise moments badhaye jo tumhe bina kisi wajah ke khush kar dein. Tumhe chhoti-chhoti blessings nazar aayein, achhe surprises milen aur tumhari life mein hasi ke reasons kabhi kam na hon.",
    signOff: "Aur agar kabhi din boring ho, toh samajh lena ki tumhari taraf se ek cute si smile ki demand yahan pending hai. 😂🐼"
  },
  "2026-10-30": {
    id: "2026-10-30",
    dateFormatted: "30 October 2026",
    daysLeft: 21,
    daysLeftLabel: "21 days left",
    heading: "21 days left, meri strong si bacchu 🌹",
    content: "Meri jaan, strength ka matlab yeh nahi hota ki insaan ko kabhi dukh na ho ya woh kabhi roye hi na. Kabhi apni feelings ko accept kar lena bhi bahut himmat ki baat hoti hai. Main chahta hoon ki tum apne aap par itna bharosa karna seekho ki difficult waqt mein bhi tumhe yaad rahe—tum dheere-dheere aage badh sakti ho.\n\nAaj meri dua hai ki Allah tumhe sabr ke saath himmat bhi de, mushkil waqt mein clarity de aur tumhe apni galtiyon se seekhne ka mauka de bina khud se nafrat kiye. Tumhe apni growth par proud hone ke reasons milen.",
    signOff: "Meri Panda, tumhe har battle ek saath nahi jeetni. Ek waqt mein ek step bhi progress hoti hai. Main tumhari har chhoti achievement celebrate karna chahta hoon. 🤍"
  },
  "2026-10-31": {
    id: "2026-10-31",
    dateFormatted: "31 October 2026",
    daysLeft: 20,
    daysLeftLabel: "20 days left",
    heading: "20 days left, meri cute si troublemaker 😂💗",
    content: "Meri bacchu, tum kabhi kabhi itni shaitaan ban jaati ho ki samajh nahi aata tumhe daantun ya hans doon. Aur phir tum apne us cute se andaaz mein baat karti ho toh saari serious baatein kahin gayab ho jaati hain. Tumhari yeh masti meri favourite memories ka hissa hai.\n\nAaj dua hai ki Allah tumhari zindagi se unnecessary tension kam kare, tumhe healthy laughter aur genuine friendships de aur tumhari everyday life mein aise moments laaye jinhe tum baad mein yaad karke phir se hans sako.",
    signOff: "Haan lekin ek baat hai, madam: shaitani thodi kam karna… nahi, actually rehne do. Bas apna khayal rakhna. Tumhari yeh cute si troublemaking bhi toh meri Panda ki pehchaan hai. 🐼💕"
  },
  "2026-11-01": {
    id: "2026-11-01",
    dateFormatted: "1 November 2026",
    daysLeft: 19,
    daysLeftLabel: "19 days left",
    heading: "19 days left, meri pyaari Panda 🤍",
    content: "Naya month shuru ho gaya, meri jaan. Mujhe nahi pata November tumhare liye kaisa rahega, lekin dil se chahta hoon ki yeh month tumhare liye kuch beautiful memories lekar aaye. Har naya month perfect nahi hota, par har month ek nayi shuruaat ka chance zaroor deta hai.\n\nAaj meri dua hai ki Allah tumhare aane wale dino mein barkat de, tumhari mehnat ka achha result aaye aur tumhe aisi khushkhabriyan milen jo tumhare dil ko sach mein khush kar dein. Jo cheezein tumhare control mein nahi hain, unke liye khud ko blame karna chhod pao.",
    signOff: "Happy new month, meri Panda. Is November mein tumhari birthday smile dekhne ka intezaar toh hai hi, lekin usse pehle tumhare har din mein thodi-thodi khushi bhi honi chahiye. 💗"
  },
  "2026-11-02": {
    id: "2026-11-02",
    dateFormatted: "2 November 2026",
    daysLeft: 18,
    daysLeftLabel: "18 days left",
    heading: "18 days left, meri soft-hearted girl 🌷",
    content: "Meri Panda, tumhara dil soft rehna ek khoobsurat baat hai, lekin main yeh bhi chahta hoon ki tum apni kindness ke saath apni boundaries ko bhi importance do. Har kisi ko khush karna tumhari responsibility nahi hai. Tum bhi respect, care aur achhe treatment ki deserving ho.\n\nAaj meri dua hai ki Allah tumhe aise rishte de jahan tumhari kindness ka faayda na uthaya jaaye, tumhari baat ko importance mile aur tumhe apni needs batane mein guilt feel na ho. Tumhara dil achha rahe, lekin tumhara dil protected bhi rahe.",
    signOff: "Meri bacchu, kind rehna aur apne liye stand lena ek saath possible hai. Apne aap ko bhi wahi pyaar dena jo tum doosron ko dene ki koshish karti ho. ♡"
  },
  "2026-11-03": {
    id: "2026-11-03",
    dateFormatted: "3 November 2026",
    daysLeft: 17,
    daysLeftLabel: "17 days left",
    heading: "17 days left, meri jaan-e-dil 💗",
    content: "Kabhi kabhi main sochta hoon ki kisi insaan ka important hona sirf uske saath kitna waqt guzara, isse decide nahi hota. Kuch log apni baaton aur apne andaaz se dil mein ek special jagah bana lete hain. Tum mere liye aisi hi ho, Panda. Tumse baat karte waqt main chhoti-chhoti cheezon ko bhi yaad rakhne lagta hoon.\n\nAaj dua hai ki Allah tumhare dil mein mohabbat ke saath sukoon bhi rakhe. Tumhe sincere log milen, tumhare emotions ki respect ho aur tum kabhi sirf attention ke liye apni value compromise na karo. Tumhe aisi mohabbat mile jisme izzat, honesty aur kindness bhi ho.",
    signOff: "Main bhi chahta hoon ki apne words hi nahi, apne actions se tumhe dikha sakun ki tumhari feelings mere liye important hain. 💌"
  },
  "2026-11-04": {
    id: "2026-11-04",
    dateFormatted: "4 November 2026",
    daysLeft: 16,
    daysLeftLabel: "16 days left",
    heading: "16 days left, meri brave Panda 🫶",
    content: "Meri jaan, mujhe tumhare future ke baare mein sochna achha lagta hai—woh future jahan tum apne goals ki taraf badh rahi ho, apni life mein confident ho aur apni mehnat ka result dekhkar khush ho. Main nahi chahta ki tum apni possibilities ko kabhi sirf aaj ki situation se judge karo.\n\nAaj meri dua hai ki Allah tumhe knowledge, wisdom aur sahi opportunities de. Tum jo bhi seekhna chaho, usmein consistency mile. Jab koi raasta band lage toh tumhe alternate raasta dikhai de, aur jab result late aaye toh tum apne aap par bharosa banaye rakho.",
    signOff: "Meri Panda, tumhari journey tumhari apni hai. Main chahta hoon ki tum usmein apni pehchaan banao aur ek din dil se kaho, “Maine kar dikhaya.” 🤍"
  },
  "2026-11-05": {
    id: "2026-11-05",
    dateFormatted: "5 November 2026",
    daysLeft: 15,
    daysLeftLabel: "15 days left",
    heading: "15 days left, meri comfort person 🌙",
    content: "Meri cutu, kabhi kabhi insaan ko advice nahi chahiye hoti, bas koi aisa chahiye hota hai jo uski baat dhyaan se sun le. Main chahta hoon ki jab tum mujhse apni baatein share karo, tumhe yeh feel ho ki tumhe perfect words choose karne ki zaroorat nahi. Tum jaise mehsoos kar rahi ho, waise bata sakti ho.\n\nAaj meri dua hai ki Allah tumhe emotional peace de, tumhare dil ki uljhanon ko suljhane mein aasani de aur tumhe apni feelings samajhne ke liye waqt aur space mile. Tumhe kabhi apne emotions ko chhota samajhne ki zaroorat na pade.",
    signOff: "Aur main bhi seekhta rahun ki tumhe sirf jawab dena hi nahi, balki tumhe samajhna bhi kitna zaroori hai. Tumhari baat mere liye important hai, meri Panda. 💗"
  },
  "2026-11-06": {
    id: "2026-11-06",
    dateFormatted: "6 November 2026",
    daysLeft: 14,
    daysLeftLabel: "14 days left",
    heading: "14 days left, meri beautiful bacchu 🌸",
    content: "Meri Panda, beauty sirf kisi ki appearance mein nahi hoti. Kabhi kisi ka baat karne ka tareeqa, kabhi uski kindness aur kabhi uski chhoti si smile bhi bahut beautiful lagti hai. Tumhari khoobsurati ki baat karun toh shayad main kabhi poori baat keh hi na paun, lekin main chahta hoon ki tum apni beauty ko sirf mirror ya kisi aur ki opinion se measure na karo.\n\nAaj dua hai ki Allah tumhe healthy confidence de, tumhe apne aap ko accept karne ki khushi de aur tumhe aise logon se milaye jo tumhari appearance ke saath tumhare character ki bhi respect karein.",
    signOff: "Aur meri jaan, tumhe har waqt perfect dikhne ki zaroorat nahi. Tumhari sleepy, messy aur bina kisi preparation wali version bhi tumhari hi hai. 😂💗"
  },
  "2026-11-07": {
    id: "2026-11-07",
    dateFormatted: "7 November 2026",
    daysLeft: 13,
    daysLeftLabel: "13 days left",
    heading: "13 days left, meri little star ✨",
    content: "Meri jaan, kuch din aise hote hain jab progress bahut slow lagti hai. Lagta hai jaise hum itni koshish kar rahe hain, phir bhi kuch khaas change nahi ho raha. Lekin har effort turant result nahi deta. Kabhi kabhi wahi chhote steps baad mein sabse important ban jaate hain.\n\nAaj meri dua hai ki Allah tumhari mehnat ko achhe results tak pahunchaye, tumhe patience de aur tumhe sahi waqt par apni progress nazar aaye. Tum apne goals ko lekar hopeful raho, lekin apne aap par unnecessary pressure mat daalo.",
    signOff: "Meri Panda, tumhe har roz extraordinary banne ki zaroorat nahi. Bas apne liye ek achha step lena bhi kaafi hai. Dheere chalogi toh bhi tum aage badh rahi hogi. 🌷"
  },
  "2026-11-08": {
    id: "2026-11-08",
    dateFormatted: "8 November 2026",
    daysLeft: 12,
    daysLeftLabel: "12 days left",
    heading: "12 days left, meri pyaari si dua 💌",
    content: "Aaj tumhare liye ek alag si dua karne ka mann hai, meri Panda. Allah tumhe sirf woh khushiyan na de jo kuch pal ke liye achha feel karayein, balki woh sukoon bhi de jo mushkil din mein tumhara saath nibhaye. Tumhare paas achhi memories bhi hon aur un memories ko appreciate karne ka waqt bhi.\n\nMain chahta hoon ki tumhari life mein health, achhe relationships, meaningful goals aur chhoti-chhoti blessings ka balance ho. Tumhe kabhi itni jaldi mein na rehna pade ki tum apni hi zindagi ke beautiful moments miss kar do.",
    signOff: "Meri bacchu, aaj apne din mein ek chhoti si cheez notice karna jo tumhe achhi lage. Kabhi kabhi gratitude bade moments ka wait nahi karta. 🤍"
  },
  "2026-11-09": {
    id: "2026-11-09",
    dateFormatted: "9 November 2026",
    daysLeft: 11,
    daysLeftLabel: "11 days left",
    heading: "11 days left, meri forever favourite Panda 🐼",
    content: "Meri jaan, jab hum kisi ko genuinely care karte hain, toh uski khushi ke saath uski individuality bhi important hoti hai. Main chahta hoon ki tum apni pasand, apne opinions aur apne dreams ke saath hamesha grow karo. Pyaar ka matlab yeh nahi ki tum apni duniya chhoti kar do; balki tumhari duniya aur beautiful ho sake.\n\nAaj meri dua hai ki Allah tumhe healthy, respectful relationships de. Tumhare aas-paas aise log hon jo tumhari growth se khush hon, tumhe encourage karein aur tumhari independence ki respect karein.",
    signOff: "Aur main bhi tumhare saath grow karna chahta hoon—apni mistakes se seekhkar, apne promises ko seriously lekar aur tumhari respect ko hamesha priority dekar. Tumhari smile ke saath tumhari individuality bhi mere liye precious hai. 💗"
  },
  "2026-11-10": {
    id: "2026-11-10",
    dateFormatted: "10 November 2026",
    daysLeft: 10,
    daysLeftLabel: "10 days left",
    heading: "10 days left, meri jaan, bas das din! 🥹💗",
    content: "Meri Panda, ab countdown ke numbers chhote hote ja rahe hain aur mujhe tumhari birthday wali khushi imagine karke hi excitement ho rahi hai. Lekin main chahta hoon ki tumhara birthday sirf ek special date na ho; tumhe poore saal apni life mein special hone ka ehsaas milta rahe.\n\nAaj dua hai ki Allah tumhare aane wale saal mein naye experiences, achhe decisions, growth aur bahut saari genuine khushiyan likhe. Jo cheezein tum dil se chahti ho aur tumhare liye behtar hain, un tak pahunchne ke raaste aasaan hon.",
    signOff: "Aur haan, madam, countdown dekhkar zyada excited hone ki permission hai. Bas apni sleep schedule ko birthday excitement ke naam par barbaad mat kar dena. 😂🐼"
  },
  "2026-11-11": {
    id: "2026-11-11",
    dateFormatted: "11 November 2026",
    daysLeft: 9,
    daysLeftLabel: "9 days left",
    heading: "9 days left, meri precious bacchu 🤍",
    content: "Meri jaan, kabhi kabhi hum doosron ko bahut patience dete hain, lekin apne liye wahi patience rakhna bhool jaate hain. Hum apni mistakes par khud ko baar-baar judge karte hain, jabki hum kisi aur ko samjhane ke liye kitne gentle ho sakte hain.\n\nAaj meri dua hai ki Allah tumhe apne saath bhi kindness se pesh aane ki samajh de. Tum apni mistakes se seekho, apne past ko samajh pao aur khud ko grow karne ka mauka do. Tumhe apne har imperfect moment ke liye khud ko punish karne ki zaroorat na mehsoos ho.",
    signOff: "Meri Panda, tum ek journey par ho, koi finished product nahi. Tumhe seekhne, badalne aur dobara shuru karne ka poora haq hai. Apne dil se thoda gently baat karna, okay? ♡"
  },
  "2026-11-12": {
    id: "2026-11-12",
    dateFormatted: "12 November 2026",
    daysLeft: 8,
    daysLeftLabel: "8 days left",
    heading: "8 days left, meri little moon 🌙",
    content: "Meri Panda, mujhe tumhari woh side bhi pyaari lagti hai jo kabhi sharma jaati hai aur kabhi apni baat par bilkul confident ho jaati hai. Tumhare andar kitne different colours hain, aur shayad tum khud bhi har din apne baare mein kuch naya seekhti ho.\n\nAaj meri dua hai ki Allah tumhare dil ko roshni aur sukoon de, tumhari confusion mein clarity de aur tumhe apni strengths pehchaanne mein madad kare. Tumhe apni personality ko kisi ek label mein fit karne ki zaroorat na ho. Tum apne aap ko explore kar sako, bina unnecessary judgement ke.",
    signOff: "Meri jaan, tumhe kisi aur ki copy nahi banna. Tumhara apna andaaz hi tumhari khoobsurati hai. Aur haan, tumhara sharmana abhi bhi bahut cute hai. 🥹💗"
  },
  "2026-11-13": {
    id: "2026-11-13",
    dateFormatted: "13 November 2026",
    daysLeft: 7,
    daysLeftLabel: "7 days left",
    heading: "7 days left, meri Panda, ek hafta! 💌",
    content: "Meri jaan, ek hafta aur… sochkar hi ajeeb si khushi hoti hai. Main chahta hoon ki tum apne birthday ko lekar jitni excited ho, utna hi apne aaj ke din ko bhi enjoy karo. Zindagi sirf upcoming special dates ka wait karne ka naam nahi; beech ke normal din bhi apni jagah beautiful hote hain.\n\nAaj meri dua hai ki Allah tumhe har din ke andar chhoti-chhoti khushiyan dhoondhne ki nazar de. Tumhari routine mein ease ho, tumhare efforts ko appreciation mile aur tumhe aise moments milen jo bina kisi occasion ke bhi tumhe loved feel karayein.",
    signOff: "Aur meri bacchu, aaj se birthday countdown ke saath ek aur countdown bhi hai: tumhari taraf se kitni baar mujhe cute sa smile milega? Main toh count bhool jaunga. 😂💗"
  },
  "2026-11-14": {
    id: "2026-11-14",
    dateFormatted: "14 November 2026",
    daysLeft: 6,
    daysLeftLabel: "6 days left",
    heading: "6 days left, meri jaan-e-sukoon 🤍",
    content: "Meri Panda, main future ke baare mein sochta hoon toh mujhe sirf bade promises ya beautiful words nahi chahiye. Main chahta hoon ki main khud ek aisa insaan banu jo apni baat ki responsibility le, apni galti accept kare aur apne pyaar ko actions mein bhi dikhaye. Sirf keh dena aasaan hai; har din respect aur honesty ke saath behave karna zyada meaningful hai.\n\nAaj dua hai ki Allah hum dono ko samajh, patience aur maturity de. Agar kabhi misunderstandings hon toh unhe calmly solve karne ki wisdom de, aur humein ek doosre ki boundaries aur feelings ki respect karna sikhaye.",
    signOff: "Meri jaan, main chahta hoon ki hamari story sirf intense feelings ki nahi, balki genuine effort, trust aur kindness ki bhi ho. Tumhari izzat aur tumhara sukoon mere liye bahut important hain. 💗"
  },
  "2026-11-15": {
    id: "2026-11-15",
    dateFormatted: "15 November 2026",
    daysLeft: 5,
    daysLeftLabel: "5 days left",
    heading: "5 days left, meri cutu si Panda 🌷",
    content: "Meri bacchu, paanch din baad tumhara birthday hai, lekin aaj bhi main tumhe ek chhoti si reminder dena chahta hoon: tumhe rest earn karne ki zaroorat nahi hai. Tumhe khushi feel karne ke liye har kaam complete karna zaroori nahi. Aur tumhe apne aap ko important samajhne ke liye kisi aur ki permission nahi chahiye.\n\nAaj meri dua hai ki Allah tumhe balance de—mehnat karne ki energy, rest lene ki samajh, aur apni needs ko pehchaanne ki clarity. Tumhari health achhi rahe, tumhare dil ko sukoon mile aur tum apni life ko bina unnecessary guilt ke enjoy kar sako.",
    signOff: "Aur meri Panda, breakfast skip karne ya rest postpone karne ki aadat ho toh usse thoda pyaar se correct karna. Main tumhe sirf busy nahi, healthy aur khush bhi dekhna chahta hoon. 🐼💗"
  },
  "2026-11-16": {
    id: "2026-11-16",
    dateFormatted: "16 November 2026",
    daysLeft: 4,
    daysLeftLabel: "4 days left",
    heading: "4 days left, meri beautiful soul ✨",
    content: "Meri jaan, tumhari life mein kuch cheezein aisi hongi jo tum abhi chahti ho aur kuch aisi jo tumhe baad mein samajh aayengi ki tumhare liye behtar thi. Har cheez ka answer turant milna zaroori nahi hota. Kabhi waqt, experience aur patience milkar woh clarity dete hain jo us moment mein nahi milti.\n\nAaj meri dua hai ki Allah tumhe sahi aur galat mein farq samajhne ki wisdom de, tumhare decisions mein barkat de aur jo cheezein tumhare liye achhi nahi hain unse door hone ki himmat bhi de. Tumhe achhe mauke pehchaanne aur apne liye behtar raasta chunne ka confidence mile.",
    signOff: "Meri Panda, apne future se hopeful rehna. Tumhe har answer aaj hi nahi chahiye. Bas apne aap par bharosa rakhna aur ek-ek step aage badhna. 🤍"
  },
  "2026-11-17": {
    id: "2026-11-17",
    dateFormatted: "17 November 2026",
    daysLeft: 3,
    daysLeftLabel: "3 days left",
    heading: "3 days left, meri favourite human 🥹💗",
    content: "Meri Panda, teen din aur. Main sochta hoon ki jab tum apna birthday message padhogi toh shayad tum muskuraogi, shayad sharmaogi, ya phir mujhe tease karogi ki main kitna emotional ho gaya. Aur honestly, tum jo bhi reaction do, tumhara woh natural sa andaaz hi is sab ko special banayega.\n\nAaj meri dua hai ki Allah tumhe aise logon ka saath de jinke saath tumhe pretend na karna pade. Tumhari khushi sincere ho, tumhari friendships meaningful hon aur tumhe apni life mein belonging ka ehsaas mile. Tum jahan bhi raho, tumhe kindness aur respect milti rahe.",
    signOff: "Aur meri jaan, agar kabhi tumhe lage ki tum enough nahi ho, toh thoda rukkar apni journey yaad karna. Tum ab tak jitna seekh chuki ho, woh bhi tumhari achievement hai. ♡"
  },
  "2026-11-18": {
    id: "2026-11-18",
    dateFormatted: "18 November 2026",
    daysLeft: 2,
    daysLeftLabel: "2 days left",
    heading: "2 days left, meri birthday girl-to-be 🎀",
    content: "Meri bacchu, bas do din aur. Main tumhare liye ek perfect duniya promise nahi kar sakta, lekin dil se yeh wish zaroor karta hoon ki tumhari duniya mein achhe moments mushkil moments se zyada jagah paayein. Tumhe celebrate karne ke reasons milen aur tum khud bhi apni achievements ko notice karna seekho.\n\nAaj meri dua hai ki Allah tumhare naye saal-e-zindagi ko sehat, sukoon, growth aur khushiyon se bhar de. Tumhare liye naye doors khulen, tumhare dil ki achhi wishes poori hone ke raaste banen aur tumhe har challenge ke saamne himmat mile.",
    signOff: "Birthday ab bilkul paas hai, meri Panda. Aaj apni excitement enjoy karna, apni smile ko chhupana mat aur please apne aap ko bhi thoda celebrate karna. Tumhara hona hi is din ko special banata hai. 💗"
  },
  "2026-11-19": {
    id: "2026-11-19",
    dateFormatted: "19 November 2026",
    daysLeft: 1,
    daysLeftLabel: "1 day left",
    heading: "Just 1 day left, meri jaan… 🥹🎂",
    content: "Meri Panda, kal tumhara birthday hai. Itne din se main tumhare liye har roz ek chhota sa message likh raha hoon, aur ab sochta hoon toh lagta hai ki in sab words mein bhi meri feelings ka sirf ek hissa hi aa paaya hai. Tum mere liye special ho, lekin main chahta hoon ki tum apni life mein bhi khud ko special samjho—sirf kal nahi, har din.\n\nAaj meri sabse pyaari dua hai ki Allah tumhe aane wale saal mein sehat, lambi aur khushhaal zindagi, dil ka sukoon, achhe log, meaningful opportunities aur apne dreams ki taraf badhne ki himmat de. Tumhare liye mushkilein aasaan hon, tumhari mehnat mein barkat ho aur tumhe kabhi apni worth bhoolne ki zaroorat na pade.",
    signOff: "Kal ka din tumhara hai, meri bacchu. Aaj raat achhe se rest karna aur kal apni birthday wali smile ke saath aana. Tumhare liye ek bahut pyaara sa message intezaar kar raha hai. I love you, meri Panda. ♡"
  },
  "2026-11-20": {
    id: "2026-11-20",
    dateFormatted: "20 November 2026",
    daysLeft: 0,
    daysLeftLabel: "Birthday letter",
    heading: "Happy Birthday, meri Panda! 🎂🐼💗",
    content: `Happy Birthday, meri cutu si Panda, meri jaan, My Lady. 🥹💗\n\nAaj tumhara din hai, aur sabse pehle main chahta hoon ki tum khud ko celebrate karo. Tumhari life, tumhari journey, tumhari personality aur woh saari chhoti-badi cheezein jo tumhe tum banati hain. Main kabhi kabhi sochta hoon ki ek game mein shuru hui baat mere liye itni meaningful kaise ban gayi. Phir tumhari awaaz, tumhara sharmana, tumhari cute si shaitani aur tumhara apna sa andaaz yaad aata hai… aur jawab mil jaata hai. Tum bas apni tarah ho, aur wahi tumhe mere liye special banata hai. 💌\n\nAaj dil se dua hai ki Allah tumhe sehat aur sukoon ke saath lambi, khushhaal zindagi de. Tumhare dil ki achhi wishes poori hon, tumhari mehnat rang laaye, tumhe apne dreams achieve karne ke mauke milen aur tumhare aas-paas aise log hon jo tumhari izzat karein, tumhe samjhein aur tumhari khushi mein genuinely khush hon. Allah tumhe mushkil waqt mein himmat, important decisions mein wisdom aur har achhe moment ko enjoy karne ka dil de. Tumhari smile sirf aaj ki nahi, aane wale bahut saare dino ki hissa bane. Ameen. 🤍\n\nMain yeh bhi wish karta hoon ki tum khud se pyaar karna kabhi na bhoolo. Tumhe har waqt perfect hone ki zaroorat nahi, tumhe har kisi ko please karne ki zaroorat nahi, aur tumhe apni worth kisi ko prove karne ki bhi zaroorat nahi. Tum grow karo, seekho, apne goals chase karo, kabhi thako toh rest karo aur phir apni pace par aage badho. Main chahta hoon ki tum apni zindagi ko sirf doosron ke liye nahi, apne liye bhi beautiful banao.\n\nAur hamari baat karun toh, meri jaan, main chahta hoon ki main apne pyaar ko sirf words mein nahi, apne actions mein bhi dikhata rahun. Tumhari respect karun, tumhari baat sunun, apni galtiyon ko accept karun aur waqt ke saath ek behtar insaan banta rahun. Main future ke liye achhi hopes rakhta hoon, aur un hopes ke laayak banne ke liye khud par kaam bhi karna chahta hoon. Tumhare saath ek aisi story build karna chahta hoon jahan pyaar ke saath trust, kindness, patience aur sukoon bhi ho. ♡\n\nMeri birthday girl, aaj khoob muskuraana, apne favourite moments enjoy karna aur apne dil ko khush rehne dena. Agar main tumhare paas hota toh shayad tumhe tease karta, tumhari birthday wali smile dekhta aur phir bolta ki haan madam, aaj aapki saari shaitani maaf. 😂🐼💗\n\nHappy Birthday once again, meri Panda. Allah tumhare aane wale har saal ko khair, barkat, health, love aur beautiful memories se bhar de. Tumhari zindagi mein roshni rahe, tumhara dil hopeful rahe aur tumhe hamesha yaad rahe ki tum is duniya mein apni ek alag, precious jagah rakhti ho.\n\nAaj ka din tumhara hai. Isse khoobsurati se jeena, meri jaan.`,
    signOff: "With all my love,\nTumhara apna. ♡"
  }
};
