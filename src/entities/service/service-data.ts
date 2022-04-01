export interface ServiceData {
  uuid: string;
  name: string;
  url: string;
  owner: string;
  incidents?: incident[];
  status?: 'pass' | 'warn' | 'fail' | 'pass';
}

type incident = {
  fixed: boolean;
  name: string;
  description?: string;
  date: Date;
};
