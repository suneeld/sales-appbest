
# 🚀 Sales App Best — LaunchDarkly Feature Flag, Experimentation & Grafana Integration Demo.

This is a React-based frontend application that demonstrates advanced feature flagging & experimentation with **LaunchDarkly** and frontend monitoring and LaunchDarkly integration with **Grafana Faro**.

---

## 🔧 Tech Stack

- ⚛️ React 18 (SPA)
- 🐳 Docker & Docker Compose
- 🏁 React Router v6
- 🚩 LaunchDarkly (Feature Management, Experiments & Integration)
- 📊 Grafana Faro (Frontend Monitoring)
- 💡 TailwindCSS, Framer Motion, Axios

---

## 📦 Clone and Run the App

### ✅ Step 1: Clone the Repository

```bash
git clone https://github.com/suneeld/sales-appbest.git
cd sales-appbest
```

> _Make sure Docker is installed and running on your machine._

---

### 🐳 Step 2: Run Using Docker Compose

```bash
docker-compose up --build
```

This will:

- Install all required dependencies (including **LaunchDarkly SDK** & **Grafana Faro SDK**)
- Expose the app on `http://localhost:8080`

---

## 🌐 Access the App Locally

Once running, you can test key flows using the following pages:

| Route | Description |
|-------|-------------|
| [localhost:8080/home](http://localhost:8080/home) | Homepage |
| [localhost:8080/usecases](http://localhost:8080/usecases) | Use Cases |
| [localhost:8080/valuecreationteams](http://localhost:8080/valuecreationteams) | Value Creation Teams |
| [localhost:8080/aboutus](http://localhost:8080/aboutus) | About Us |
| [localhost:8080/simulate](http://localhost:8080/simulate)| simulate |

---

## 🚩 Enable/Disable LaunchDarkly Flags

If you’ve been added to the **LaunchDarkly Team**, log in at:

https://app.launchdarkly.com

Then **enable or disable the following flags** to control app behavior in real time:

| Flag Key | Description |
|----------|-------------|
| `exploregrafana` | ✅ Enables or disables Grafana Faro monitoring |
| `explorefeatureflag` | Toggles **Try New Flow** (on Homepage) and **Explore Features** (on VCT page) |
| `valuepage` | Toggles **Value Creation Teams** menu visibility |
| `askcoachimg` | Switches between Safari- and Chrome-specific images on the Landing Page |
| `landingpage` | Toggles **new experience banner** and CTA on the homepage |

## 🧪 Experimentation & Metrics

You can simulate users and test LaunchDarkly experiments using the buttons available at:
http://localhost:8080/simulate

🛠️ Instructions-

Start the required experiment via the LaunchDarkly UI before initiating the tests.

Set the test duration between 1 to 60 minutes based on your experiment's goals.

Choose the appropriate button to begin simulation:

🚀 Start Testing Explore Feature button simulates clicks on:
   
   Try New Flow button (on the Homepage)

   Explore Features button (on the Value Creation Teams page)

🧭 Start Testing Value Creation Teams Menu button simulates clicks on:
   
   Value Creation Teams menu item in the navigation bar

📊 Metrics Tracked in LaunchDarkly:

   explorefeaturebutton
   
   valuepagecount

These metrics can be viewed in the LaunchDarkly Experiments UI under the associated experiment configuration.


<img width="698" alt="Screen Shot 2025-04-06 at 4 03 53 pm" src="https://github.com/user-attachments/assets/447eac69-ebfe-4e0f-b54b-2614c45eefb3" />


---

## 📈 Grafana Integration

When `exploregrafana` flag is enabled and traffic is active:

### Step 1: Request Access
Reach out to your team to either get access or screenshots of the **Grafana Cloud Controller** dashboard.

### Step 2: Dashboards to Monitor

1. **LaunchDarkly_FeatureFlags**
   - Home → Dashboards → `LaunchDarkly_FeatureFlags`
   - Shows real-time annotations and experiment events.

2. **Frontend Dashboard**
   - Home → Dashboards → `Frontend`
   - Tracks user sessions, page visits, and frontend errors (from Faro SDK).


---

## 📬 Need Help?

Feel free to raise issues or reach out to the repo maintainer for support configuring new flags, dashboards, or simulations.

---

## 📄 License

MIT © [Suneel Dhingra](https://github.com/suneeld)
