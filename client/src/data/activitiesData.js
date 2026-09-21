/**
 * DEPRECATED: Activities and club data are now strictly loaded dynamically via the API (/api/activities).
 * This file is retained with empty fallback stubs to prevent legacy import breaks.
 */

export const defaultActivities = [];
export const pages = [];
export const pageBySlug = () => null;

export const COLLEGE = {
  name: "SVASC College of Arts and Science",
  short: "SVASC",
  place: "Erode, Tamil Nadu",
  email: "principal@svasc.org",
  phone: "+91 96009 66086",
};

export default {
  defaultActivities,
  pages,
  pageBySlug,
  COLLEGE
};
