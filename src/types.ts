export interface Course {
  id: string;
  title: string;
  category: 'fullstack' | 'testing' | 'cloud' | 'programming';
  duration: string;
  mode: string; // "Online & Classroom", "Weekend/Weekday"
  description: string;
  longDescription?: string;
  modules: string[];
  skillsCovered: string[];
  tag?: string;
  colorTheme: string; // colors like sky, blue, amber, emerald, indigo
}

export interface Stat {
  id: string;
  iconName: string;
  label: string;
  value: string;
  target: number;
  suffix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  packageText?: string;
  courseTaken: string;
  fromBackground: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export interface PlacementPartner {
  name: string;
  logoType: 'tcs' | 'infosys' | 'cognizant' | 'wipro' | 'capgemini' | 'techmahindra' | 'amazon' | 'deloitte' | 'accenture';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'classroom' | 'labs' | 'events' | 'placement';
  imageUrl: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
