
# 🚀 Sales App Best — Feature Flag & Observability Demo

This is a React-based frontend application that demonstrates advanced feature flagging with **LaunchDarkly** and frontend monitoring with **Grafana Faro**.

---

## 🔧 Tech Stack

- ⚛️ React 18 (SPA)
- 🐳 Docker & Docker Compose
- 🏁 React Router v6
- 🚩 LaunchDarkly (Feature Management & Experiments)
- 📊 Grafana Faro (Frontend Monitoring)
- 💡 TailwindCSS, Framer Motion, Axios

---

## 📦 Clone and Run the App

### ✅ Step 1: Clone the Repository

```bash
git clone https://github.com/suneeld/sales-appbest.git
cd sales-appbest/webapp
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

👉 [https://app.launchdarkly.com](https://app.launchdarkly.com)

Then **enable or disable the following flags** to control app behavior in real time:

| Flag Key | Description |
|----------|-------------|
| `exploregrafana` | ✅ Enables or disables Grafana Faro monitoring |
| `explorefeatureflag` | Toggles **Try New Flow** (on Homepage) and **Explore Features** (on VCT page) |
| `valuepage` | Toggles **Value Creation Teams** menu visibility |
| `askcoachimg` | Switches between Safari- and Chrome-specific images on the Landing Page |
| `landingpage` | Toggles **new experience banner** and CTA on the homepage |

## 🧪 Experimentation & Metrics

You can simulate users and test LaunchDarkly experiments using buttons on http://localhost:8080/simulate:

- `Try New Flow` button (Homepage)
- `Explore Features` button (Value Creation Teams)
- `Value Creation Teams` menu click tracking
-  Change duration of tests between 1 to 60 minutes.

The metrics `explorefeaturebutton` and `valuepagecount` are tracked and viewable within LaunchDarkly experiments UI.


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
<img width="694" alt="Screen Shot 2025-04-06 at 1 14 05 pm" src="https://github.com/user-attachments/assets/40ae407b-e640-4712-a6a2-e449085ac909" />

---

## 📬 Need Help?

Feel free to raise issues or reach out to the repo maintainer for support configuring new flags, dashboards, or simulations.

---

## 📄 License

MIT © [Suneel Dhingra](https://github.com/suneeld)
