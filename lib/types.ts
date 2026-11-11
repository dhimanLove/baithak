export interface Person {
  id: string;
  name: string;
}

export interface ActionItem {
  id: string;
  text: string;
  ownerId: string;
  due: string;
  done: boolean;
}

export interface TranscriptLine {
  id: string;
  speakerId: string;
  text: string;
  timestamp: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  durationMin: number;
  participants: Person[];
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
  transcript: TranscriptLine[];
}
