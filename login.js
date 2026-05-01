function showLogin() {
    document.getElementById("registerForm").hidden = true
    document.getElementById("loginForm").hidden = false
    }

function showRegister() {
    document.getElementById("loginForm").hidden = true
    document.getElementById("registerForm").hidden = false
    }

        // Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

    const supabaseUrl = "https://moexkwpmazfsmsdohcwl.supabase.co"
    const supabaseKey = "sb_publishable_pSQfqQ2K8zzuRa0P3Ln-sQ_U-YOFN_v"

    const client = supabase.createClient(supabaseUrl, supabaseKey)

            // REGISTER
    const registerForm = document.getElementById("registerForm")

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        const username = document.getElementById("username").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const { data, error } = await client.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            alert("Erro: " + error.message)
            return
        }

        if (!data.user) {
            alert("Check your email to confirm your account")
            return
        }

                // Insert profile
        const { error: insertError } = await client.from("profiles").insert([
            {
                id: data.user.id,
                username: username
            }
        ])

        if (insertError) {
            alert("Erro ao salvar perfil: " + insertError.message)
            return
        }

        alert("Registered successfully!")
    })


            // LOGIN
    const loginForm = document.getElementById("loginForm")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        const email = document.getElementById("loginEmail").value
        const password = document.getElementById("loginPassword").value

        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            alert("Erro: " + error.message)
            return
        }

        alert("Login successful!")
    })

})

const { data } = await client.auth.getSession()

if (data.session) {
    window.location.href = "index.html"
}