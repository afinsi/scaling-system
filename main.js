document.addEventListener("DOMContentLoaded", async () => {

    const supabaseUrl = "https://moexkwpmazfsmsdohcwl.supabase.co"
    const supabaseKey = "sb_publishable_pSQfqQ2K8zzuRa0P3Ln-sQ_U-YOFN_v"

    const client = window.supabase.createClient(supabaseUrl, supabaseKey)

    const { data } = await client.auth.getSession()

    if (!data.session) {
        window.location.href = "index.html"
    }

})