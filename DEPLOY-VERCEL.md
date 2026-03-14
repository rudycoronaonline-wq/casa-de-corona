# Get Casa de Corona into Vercel

The project only appears in your Vercel dashboard **after** a deploy succeeds. Use **one** of the two options below.

---

## Option 1: Deploy from Vercel’s website (no CLI — recommended)

You never need to run `vercel` on your computer. You push to GitHub, then import the repo in Vercel.

### Step 1: Create a new repo on GitHub

1. Go to **https://github.com/new**
2. Repository name: **casa-de-corona** (or any name you like)
3. Leave it **empty** (no README, no .gitignore). Click **Create repository**.

### Step 2: Push this folder from your computer

Open **PowerShell** and run these lines **one at a time** (replace `YOUR_GITHUB_USERNAME` with your GitHub username):

```powershell
cd "c:\Users\mrrud\OneDrive\Desktop\Website build\Ventanas-Website\casa-de-corona"
git init
git add .
git commit -m "Casa de Corona website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/casa-de-corona.git
git push -u origin main
```

When it asks for GitHub login, sign in (or use a Personal Access Token if you use 2FA).

### Step 3: Import the project in Vercel

1. Go to **https://vercel.com** and sign in (choose **Continue with GitHub**).
2. Click **“Add New…”** → **“Project”**.
3. Under **Import Git Repository**, find **casa-de-corona** and click **Import**.
4. Do **not** change “Root Directory” (leave it blank).
5. Click **Deploy**.
6. Wait for the build to finish. You’ll get a URL like `https://casa-de-corona-xxx.vercel.app`.

### Step 4: See the project in the dashboard

- Go to **https://vercel.com/dashboard**.
- **casa-de-corona** will be in the project list. Click it to see deployments and the live URL.

---

## Option 2: Deploy using the CLI

1. Open PowerShell and run:
   ```powershell
   cd "c:\Users\mrrud\OneDrive\Desktop\Website build\Ventanas-Website\casa-de-corona"
   npx vercel login
   ```
   When the browser opens, sign in to Vercel (same account you use on vercel.com).

2. Then run:
   ```powershell
   npx vercel
   ```
   - **“Set up and deploy?”** → type **Y**, Enter  
   - **“Link to existing project?”** → type **N**, Enter  
   - For the rest, press Enter to accept the defaults.

3. When it finishes, it will print a URL. Open **https://vercel.com/dashboard** — the project will be in the list.

---

## Still not seeing the project?

- **Dashboard:** Make sure you’re on **https://vercel.com/dashboard** (not “Add New Project”). All your projects are listed there.
- **Account:** If you have a **team**, switch between “Personal” and the team in the top-left to see projects for that scope.
- **CLI:** If you used the CLI and it seemed to succeed but you don’t see the project, copy the **full terminal output** from `npx vercel login` and `npx vercel` and share it so we can check for errors.
- **GitHub:** If you used Option 1, make sure you clicked **Import** and then **Deploy** on Vercel, and that the deploy finished (green check). Only then does the project show in the dashboard.
