/**
 * Intent Definitions — weighted keyword/phrase scoring
 */

export interface IntentDef {
  name: string;
  keywords: string[];        // +6 each match
  phrases: string[];         // +12 each match
  exactPhrases: string[];    // +25 each match
}

export const INTENTS: IntentDef[] = [
  {
    name: 'greeting',
    keywords: ['hello','hi','hey','namaste','namaskar','hii','helo','hlw','sup','greetings'],
    phrases: ['good morning','good evening','good afternoon','shubh pratham','hi there','hello team'],
    exactPhrases: ['hello','hi','hey','namaste','hii','helo','namaskar'],
  },
  {
    name: 'goodbye',
    keywords: ['bye','goodbye','alvida','chal','baad','later','tata','ok bye'],
    phrases: ['bye bye','see you','talk later','phir milenge','acha bye'],
    exactPhrases: ['bye','goodbye','alvida'],
  },
  {
    name: 'about',
    keywords: ['about','company','kvantum','team','who','founded','kaun','kab','experience','background','profile','history','established'],
    phrases: ['about you','about company','kaun ho','kya hai company','tell me about','who are you','aap kaun','company ke baare me'],
    exactPhrases: ['who are you','about kvantum','company ke baare mein','about company','tell me about kvantum'],
  },
  {
    name: 'services',
    keywords: ['service','services','offer','provide','kaam','karte','solutions','develop','offerings'],
    phrases: ['kya karte ho','kya services','what services','what do you offer','aap kya karte','kya provide','services batao','services dikhao','list services'],
    exactPhrases: ['services kya hain','services kya hain?','services batao','what services do you offer','kya services dete ho','services list','services dikhao'],
  },
  {
    name: 'service_detail',
    keywords: ['detail','details','more','information','info','bataiye','batao','explain','samjhao','describe'],
    phrases: ['more about','tell me more','aur batao','details batao','describe karo'],
    exactPhrases: ['tell me more about','aur detail batao'],
  },
  {
    name: 'pricing',
    keywords: ['price','pricing','cost','charges','rate','kitna','kharcha','fees','fee','amount','budget','kitne','kitni','rupees','rs','inr','lakh','thousand','k'],
    phrases: ['how much','kitna kharch','kya rate','price kya hai','cost kya hai','kitna lagega','kya charges','price list','pricing plan','rate kya hai','budget kya','pricing batao','price batao'],
    exactPhrases: ['price kya hai','kitna price','how much does it cost','pricing kya hai','pricing batao','price batao','cost kitni hai'],
  },
  {
    name: 'portfolio',
    keywords: ['portfolio','projects','work','clients','examples','case','previous','past','purane','kaam','done','banaye'],
    phrases: ['past work','previous work','client work','example projects','kya banaya','show me work','portfolio dikhao','projects dikhao','recent work'],
    exactPhrases: ['portfolio dikhao','show portfolio','past projects','projects dikhao','portfolio','work dikhao'],
  },
  {
    name: 'contact',
    keywords: ['contact','call','phone','email','reach','connect','address','location','office','visit','sampark','milna','whatsapp','number'],
    phrases: ['how to contact','contact kaise','phone number','email address','office address','kahan hai','kahan ho','location kya','contact details','contact karo'],
    exactPhrases: ['contact details','contact karo','call karo','contact details batao','phone number kya hai','office address'],
  },
  {
    name: 'location',
    keywords: ['location','where','kahan','address','city','delhi','ncr','noida','gurgaon','faridabad','india'],
    phrases: ['where are you','kahan ho','office kahan','location batao','city kya','delhi mein'],
    exactPhrases: ['where is your office','office kahan hai','kahan located'],
  },
  {
    name: 'working_hours',
    keywords: ['timing','timings','hours','time','open','close','available','kab','schedule','working'],
    phrases: ['working hours','office hours','kab available','kab milte','kab open','timing kya'],
    exactPhrases: ['office timing','kab open hote ho','working hours kya hain'],
  },
  {
    name: 'booking',
    keywords: ['book','booking','appointment','schedule','meet','meeting','call','demo','consultation'],
    phrases: ['book appointment','schedule meeting','demo book','call schedule','consultation book','milna chahta','demo chahiye'],
    exactPhrases: ['book appointment','demo chahiye','meeting schedule karo','demo book karo'],
  },
  {
    name: 'quotation',
    keywords: ['quote','quotation','proposal','estimate','requirement','requirement send','project'],
    phrases: ['get quote','send quote','quotation chahiye','proposal send','estimate bhejo','requirement discuss','quote chahiye'],
    exactPhrases: ['quotation chahiye','quote de do','send me a quote','quote chahiye'],
  },
  {
    name: 'support',
    keywords: ['support','help','issue','problem','bug','fix','maintenance','error','crash','broken','dikkat','samasya','trouble'],
    phrases: ['need help','website broken','not working','help chahiye','kuch kaam nahi','issue hai','problem hai'],
    exactPhrases: ['help chahiye','website kaam nahi kar rahi','problem hai'],
  },
  {
    name: 'human_agent',
    keywords: ['human','agent','person','staff','representative','real','actual','manager','talk','speak'],
    phrases: ['talk to human','real person','insaan se baat','manager se baat','staff se connect','bande se baat'],
    exactPhrases: ['insaan se baat karni hai','talk to a person','real agent chahiye'],
  },
  {
    name: 'faq',
    keywords: ['faq','frequently','asked','question','common','general'],
    phrases: ['common questions','frequently asked','general questions'],
    exactPhrases: ['faq dikhao'],
  },
  {
    name: 'blog',
    keywords: ['blog','article','post','read','content','guide','tutorial'],
    phrases: ['latest blog','blog read karna','article padhna','new content'],
    exactPhrases: ['blog dikhao','latest articles'],
  },
  {
    name: 'lead',
    keywords: ['interested','discuss','talk','requirement','project','start','begin','proceed','chahiye','karna','banana'],
    phrases: ['want to discuss','mujhe chahiye','project start','requirement share','tell me more','interested in'],
    exactPhrases: ['interested hoon','project discuss karna hai'],
  },
  {
    name: 'unknown',
    keywords: [],
    phrases: [],
    exactPhrases: [],
  },
];

export const INTENT_NAMES = INTENTS.map(i => i.name);
