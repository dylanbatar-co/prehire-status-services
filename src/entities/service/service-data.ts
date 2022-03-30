export interface ServiceData {
  name: string;
  url: string;
  owner: string;
  incidents?: incident[];
  status?: 'success' | 'warn' | 'fail' | 'success';
}

type incident = {
  fixed: boolean;
  name: string;
  description?: string;
  date: Date;
};
