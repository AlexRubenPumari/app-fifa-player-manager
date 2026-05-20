export const searchTypes = ["equals", "not", "in", "contains", "gt", "gte", "lt", "lte"] as const;

export type SearchType = typeof searchTypes[number];