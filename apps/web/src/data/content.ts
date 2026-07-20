import type { ComponentType } from "react";
import {
  BriefcaseIcon,
  CarIcon,
  ClockIcon,
  CupIcon,
  DocumentCheckIcon,
  FamilyHomeIcon,
  FlameIcon,
  HeadphonesIcon,
  NarrateIcon,
  SentencesIcon,
  SparkleIcon,
  StarIcon,
  SunIcon,
  TargetIcon,
  type RephraseIconProps,
} from "../icons/RephraseIcons";
import type { PastelTone } from "../components/PastelIconBadge";

type IconType = ComponentType<RephraseIconProps>;

export type TodayTask = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: IconType;
  tone: PastelTone;
};

export const todayTasks: TodayTask[] = [
  {
    id: "narrate",
    title: "Narrate a Moment",
    subtitle: "Record a short moment from your day",
    duration: "10 min",
    icon: NarrateIcon,
    tone: "blush",
  },
  {
    id: "listen",
    title: "Listen to a Playlist",
    subtitle: "Learn from real conversations picked for you",
    duration: "15 min",
    icon: HeadphonesIcon,
    tone: "sage",
  },
  {
    id: "recall",
    title: "Recall Weak Sentences",
    subtitle: "Practice and strengthen what matters",
    duration: "10 min",
    icon: DocumentCheckIcon,
    tone: "butter",
  },
];

export type LanguageIsland = {
  id: string;
  name: string;
  icon: IconType;
  tone: PastelTone;
  sentenceCount: number;
  description: string;
  chipLabel: string;
  chipTone: PastelTone;
};

export const languageIslands: LanguageIsland[] = [
  {
    id: "career",
    name: "Career & Interviews",
    icon: BriefcaseIcon,
    tone: "blush",
    sentenceCount: 24,
    description: "Job applications, interviews and daily work talk.",
    chipLabel: "Work",
    chipTone: "sage",
  },
  {
    id: "morning",
    name: "Morning Routine",
    icon: SunIcon,
    tone: "butter",
    sentenceCount: 18,
    description: "Getting ready, coffee, and the start of the day.",
    chipLabel: "Breakfast",
    chipTone: "blush",
  },
  {
    id: "family",
    name: "Friends & Family",
    icon: FamilyHomeIcon,
    tone: "sage",
    sentenceCount: 31,
    description: "Catching up, plans, and everyday family life.",
    chipLabel: "Family",
    chipTone: "blush",
  },
  {
    id: "driving",
    name: "Driving & Rallying",
    icon: CarIcon,
    tone: "peach",
    sentenceCount: 12,
    description: "Co-driving, motorsport, and road trips.",
    chipLabel: "In the Car",
    chipTone: "butter",
  },
  {
    id: "food",
    name: "Food & Cooking",
    icon: CupIcon,
    tone: "blush",
    sentenceCount: 15,
    description: "Recipes, cafes, and what's for dinner.",
    chipLabel: "Cooking",
    chipTone: "blush",
  },
];

export type ProfileStat = {
  id: string;
  icon: IconType;
  tone: PastelTone;
  value: string;
  label: string;
  sublabel: string;
};

export const profileStats: ProfileStat[] = [
  { id: "hours-learned", icon: ClockIcon, tone: "blush", value: "128", label: "Hours Learned", sublabel: "Total time spent" },
  { id: "day-streak", icon: FlameIcon, tone: "sage", value: "27", label: "Day Streak", sublabel: "Keep it going!" },
  { id: "sentences", icon: SentencesIcon, tone: "butter", value: "1,842", label: "Sentences Collected", sublabel: "Building your library" },
  { id: "playlists", icon: DocumentCheckIcon, tone: "sage", value: "34", label: "Playlists Completed", sublabel: "Lessons finished" },
  { id: "recall-accuracy", icon: TargetIcon, tone: "butter", value: "92%", label: "Recall Accuracy", sublabel: "Last 30 days" },
  { id: "hours-listened", icon: HeadphonesIcon, tone: "blush", value: "6.4", label: "Hours Listened", sublabel: "This week" },
];

export const TARGET_LANGUAGE_LABEL = "French";
export const TARGET_LANGUAGE_CODE = "fr-FR";

export type Track = {
  title: string;
  phrase: string;
  duration: string;
};

export type Playlist = {
  id: string;
  title: string;
  icon: IconType;
  tone: PastelTone;
  sentenceCount: number;
  duration: string;
  tracks: Track[];
};

export const playlists: Playlist[] = [
  {
    id: "newest",
    title: "Newest Sentences",
    icon: SparkleIcon,
    tone: "blush",
    sentenceCount: 24,
    duration: "12 min",
    tracks: [
      { title: "I finally finished the report.", phrase: "J'ai enfin fini le rapport.", duration: "2:48" },
      { title: "Can we reschedule for Friday?", phrase: "Pouvons-nous reporter à vendredi ?", duration: "3:05" },
      { title: "The weather turned out nice today.", phrase: "Il a fait beau aujourd'hui finalement.", duration: "2:52" },
      { title: "I need to call the dentist.", phrase: "Je dois appeler le dentiste.", duration: "3:15" },
    ],
  },
  {
    id: "driving",
    title: "In the Car",
    icon: CarIcon,
    tone: "sage",
    sentenceCount: 32,
    duration: "18 min",
    tracks: [
      { title: "The rally stage was longer than we expected.", phrase: "L'étape du rallye était plus longue que prévu.", duration: "4:20" },
      { title: "I need to check the tyre pressure before we go.", phrase: "Je dois vérifier la pression des pneus avant de partir.", duration: "4:45" },
      { title: "We stopped at a great café on the drive.", phrase: "Nous nous sommes arrêtés dans un excellent café pendant le trajet.", duration: "4:10" },
      { title: "That corner was faster than it looked.", phrase: "Ce virage était plus rapide qu'il n'y paraissait.", duration: "4:45" },
    ],
  },
  {
    id: "morning",
    title: "Breakfast",
    icon: CupIcon,
    tone: "blush",
    sentenceCount: 20,
    duration: "10 min",
    tracks: [
      { title: "I always have coffee first.", phrase: "Je prends toujours un café d'abord.", duration: "2:30" },
      { title: "Did you make enough for two?", phrase: "En as-tu fait assez pour deux ?", duration: "2:20" },
      { title: "We're almost out of milk.", phrase: "Il ne nous reste presque plus de lait.", duration: "2:35" },
      { title: "Let's eat before we leave.", phrase: "Mangeons avant de partir.", duration: "2:35" },
    ],
  },
  {
    id: "career",
    title: "Work",
    icon: BriefcaseIcon,
    tone: "butter",
    sentenceCount: 35,
    duration: "20 min",
    tracks: [
      { title: "Let's circle back after lunch.", phrase: "Reparlons-en après le déjeuner.", duration: "5:00" },
      { title: "I'll send the slides tonight.", phrase: "J'enverrai les diapositives ce soir.", duration: "5:10" },
      { title: "Can you review this by tomorrow?", phrase: "Peux-tu revoir ça d'ici demain ?", duration: "4:50" },
      { title: "Great work on the presentation.", phrase: "Beau travail pour la présentation.", duration: "5:00" },
    ],
  },
];

export type RecallCard = {
  sentence: string;
  translation: string;
};

export type PracticeSet = {
  id: string;
  title: string;
  icon: IconType;
  tone: PastelTone;
  due: number;
  cards: number;
  accuracy: number;
  cardItems: RecallCard[];
};

export const practiceSets: PracticeSet[] = [
  {
    id: "weakest",
    title: "Weakest Sentences",
    icon: StarIcon,
    tone: "blush",
    due: 12,
    cards: 62,
    accuracy: 72,
    cardItems: [
      { sentence: "I appreciate your help so much.", translation: "J'apprécie vraiment ton aide." },
      { sentence: "I haven't decided yet.", translation: "Je n'ai pas encore décidé." },
      { sentence: "It depends on the weather.", translation: "Ça dépend du temps." },
      { sentence: "I'll get back to you soon.", translation: "Je te répondrai bientôt." },
    ],
  },
  {
    id: "morning",
    title: "Breakfast",
    icon: SunIcon,
    tone: "butter",
    due: 8,
    cards: 34,
    accuracy: 81,
    cardItems: [
      { sentence: "I always have coffee first.", translation: "Je prends toujours un café d'abord." },
      { sentence: "Did you sleep well?", translation: "As-tu bien dormi ?" },
      { sentence: "We're out of bread.", translation: "Il ne nous reste plus de pain." },
      { sentence: "Let's eat before we leave.", translation: "Mangeons avant de partir." },
    ],
  },
  {
    id: "driving",
    title: "In the Car",
    icon: CarIcon,
    tone: "sage",
    due: 6,
    cards: 28,
    accuracy: 78,
    cardItems: [
      { sentence: "The rally went better than last time.", translation: "Le rallye s'est mieux passé que la dernière fois." },
      { sentence: "I need new tyres before the next race.", translation: "J'ai besoin de nouveaux pneus avant la prochaine course." },
      { sentence: "That was a tricky stage today.", translation: "C'était une étape difficile aujourd'hui." },
      { sentence: "We finished second in our class.", translation: "Nous avons terminé deuxièmes dans notre catégorie." },
    ],
  },
  {
    id: "career",
    title: "Work",
    icon: BriefcaseIcon,
    tone: "sage",
    due: 10,
    cards: 45,
    accuracy: 69,
    cardItems: [
      { sentence: "Let's circle back after lunch.", translation: "Reparlons-en après le déjeuner." },
      { sentence: "I'll send the slides tonight.", translation: "J'enverrai les diapositives ce soir." },
      { sentence: "Can you review this by tomorrow?", translation: "Peux-tu revoir ça d'ici demain ?" },
      { sentence: "Great work on the presentation.", translation: "Beau travail pour la présentation." },
    ],
  },
];

export type FeatureHighlight = {
  id: string;
  icon: IconType;
  tone: PastelTone;
  title: string;
  description: string;
};

export const featureHighlights: FeatureHighlight[] = [
  {
    id: "narrate",
    icon: NarrateIcon,
    tone: "blush",
    title: "Narrate your day",
    description: "Speak naturally about real life and let Rephrase find the sentences worth learning.",
  },
  {
    id: "listen",
    icon: HeadphonesIcon,
    tone: "sage",
    title: "Listen in playlists",
    description: "Hear your own sentences during downtime, from discovery to full immersion.",
  },
  {
    id: "recall",
    icon: DocumentCheckIcon,
    tone: "butter",
    title: "Recall weak sentences",
    description: "Speak your answers aloud and get adaptive, encouraging feedback.",
  },
];
