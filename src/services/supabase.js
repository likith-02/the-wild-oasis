import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xqzethxzwzakgsyjkcsc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxemV0aHh6d3pha2dzeWprY3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMTA2MDMsImV4cCI6MjAwMzc4NjYwM30.hm5ELihRhjn3LRz-_onc75_9JIpcZj4eHxmegsKjXZY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
