export interface Entity {
  id: number;
}

export interface Message extends Entity {
  body: string;
  channelId: number;
  username: string;
}

export interface Channel extends Entity {
  name: string;
  removable: boolean;
}
