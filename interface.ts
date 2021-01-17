interface Position {
  row: number;
  col: number;
}

interface ClanMember {
  arena: Arena;
  clanChestPoints: number;
  lastSeen: string;
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  trophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
}

interface Arena {
  name: {};
  id: number;
  iconUrls: {};
}

interface CloudMersiveResponse {
  Successful: boolean;
  JpgResultPages: JpgResultPage[];
}

interface JpgResultPage {
  PageNumber: number;
  Content: string;
}

interface WebHookData {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  file?: any;
  embeds?: object;
  allowed_mentions?: AllowedMentions;
}

interface WebHookFormData extends WebHookData {
  payload_json?: string;
}

interface AllowedMentions {
  parse: ('users' | 'roles' | 'everyone')[];
  roles: number[];
  users: number[];
  replied_user: boolean;
}
