declare module '@/data/activitiesData' {
  export const pages: any[];
  export const defaultActivities: any[];
  export const COLLEGE: {
    name: string;
    short: string;
    place: string;
    email: string;
    phone: string;
  };
  export const pageBySlug: (slug: string) => any;
}
