import nouns from './nouns';
import adjectives from './adjectives';

// select a random word in the list
const choose = (wordList) => wordList[Math.floor(Math.random() * wordList.length)];

// randomly generate a noun and adjective pair
export default function namer(nounLength = 5, adjectiveLength = 6) {
  const nounList = nouns.filter(n => n.length <= nounLength);
  const adjectiveList = adjectives.filter(a => a.length <= adjectiveLength);

  return `${choose(adjectiveList)}-${choose(nounList)}`;
}
