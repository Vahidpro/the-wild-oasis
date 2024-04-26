import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://azfkfyqtfwwbjowcdbyt.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZmtmeXF0Znd3Ympvd2NkYnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDEwODEsImV4cCI6MjAyOTM3NzA4MX0.nZIypoZpBJbIEpPOW1PNfWiswDPZHGkCP3nYV17vPJM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
