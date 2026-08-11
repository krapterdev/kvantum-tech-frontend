/**
 * StopWords — English + Hinglish stop words to remove before search vector indexing
 * Important: Intent triggers like 'hello', 'hi', 'pricing', 'service' are kept OUT of stop words.
 */
export const STOP_WORDS = new Set([
  // English
  'a','an','the','is','are','was','were','be','been','being',
  'have','has','had','do','does','did','will','would','could',
  'should','may','might','shall','can','need','dare','ought',
  'to','of','in','on','at','by','for','with','about','against',
  'between','into','through','during','before','after','above',
  'below','from','up','down','out','off','over','under','again',
  'further','then','once','here','there','when','where','why',
  'how','all','both','each','few','more','most','other','some',
  'such','no','nor','not','only','own','same','so','than','too',
  'very','just','i','me','my','myself','we','our','you','your',
  'he','him','his','she','her','it','its','they','them','their',
  'what','which','who','whom','this','that','these','those','am',
  'if','or','because','as','until','while','and','but','yet',
  'though','although','since','unless','however','therefore',
  'thus','hence','nevertheless','moreover','furthermore',

  // Hinglish common stop words (excluding greetings and intent triggers)
  'hai','h','hain','tha','thi','the','hoga','hogi','honge',
  'kaise','kaun','kab','kahan','kyun','kyunki',
  'mujhe','mujhko','main','mai','aap','tum','hum','wo','ve',
  'mein','me','se','ko','ka','ki','ke','par','pe','tak','hi',
  'bhi','to','toh','na','nhi','ni','ya','aur','or',
  'lekin','par','magar','lekn','phir','fir','ab','abhi','jab',
  'tab','yahan','vahan','wahan','yaha','vaha','waha','kuch',
  'sab','ek','do','teen','char','paanch','bahut','thoda','zyada',
  'sirf','bas','acha','theek','sahi','ok','ji','bhai','sir','madam','jee',
  'pls',
]);

export function removeStopWords(tokens: string[]): string[] {
  return tokens.filter(t => !STOP_WORDS.has(t.toLowerCase()) && t.length > 1);
}
