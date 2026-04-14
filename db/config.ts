import { column, defineDb, defineTable, NOW } from "astro:db";

const Guestbook = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    content: column.text(),
    author: column.text(),
    url: column.text({ optional: true }),
    timestamp: column.date({ default: NOW }),
    theme: column.number(),
    isSpam: column.boolean({ optional: true }),
    ip: column.text({ optional: true }),
  },
});

export default defineDb({
  tables: { Guestbook },
});
