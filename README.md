# SafeTrack Web Application 🌍🚀

Welcome to the **SafeTrack Web Application**! This platform is designed to streamline Public Health Inspections (PHI) workflows in Sri Lanka, transitioning from outdated, paper-based systems to a fully digital, real-time solution for food safety inspections. The application offers real-time data entry, instant reporting, and complete digital record management, allowing PHIs to focus on what matters most—ensuring public health and safety.

🔗 **[Figma Design Link](https://www.figma.com/design/KDL5igjmoget3gSd3alKxL/Safe-Track-Web-Application?node-id=0-1&t=2v0NIklwNLr2x7ZJ-1)**  
🔗 **[Project Proposal Link](https://nsbm365-my.sharepoint.com/:f:/g/personal/dsfmendis_students_nsbm_ac_lk/Emh3eQ8nZKtDgKC-6sobeIoBtf7TOsi5qggVFQdLM_zjFQ?e=6cSXBC)**

---

## Table of Contents 📑

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Proposed Solution](#proposed-solution)
4. [Key Features](#key-features)
5. [Technology Stack](#technology-stack)
6. [Innovation & Uniqueness](#innovation-uniqueness)
7. [Feasibility & Implementation](#feasibility-implementation)
8. [Impact & Benefits](#impact-benefits)
9. [Team Members](#team-members)
10. [Additional Information](#additional-information)
11. [Future Implementations](#future-implementations)
12. [Installation and Setup](#installation-and-setup)
13. [Contributing](#contributing)
14. [License](#license)

---

## Project Overview 🌍

**SafeTrack** modernizes food safety inspection processes for Public Health Inspectors (PHIs) in Sri Lanka. This web application simplifies inspections by digitizing the entire process, offering PHIs a seamless, real-time platform to input data, track violations, and generate reports instantly, all from a user-friendly interface.

---

## Problem Statement 😕

In Sri Lanka, Public Health Inspectors are burdened with a **time-consuming** and **inefficient** paper-based system:

- **Manual Data Entry**: A significant amount of time is spent on paper forms, leading to inefficiencies.
- **Limited Accessibility**: Past records are difficult to access, and data entry errors frequently occur.
- **Cumbersome Record-Keeping**: PHIs are required to carry large volumes of paperwork, which can be easily lost or damaged.
- **Delayed Reporting**: Lack of real-time reporting capabilities reduces operational speed.
- **Lost Violations**: Complaints or violations often get buried in paperwork, resulting in delayed action.

---

## Proposed Solution 💡

**SafeTrack** offers a modern, digital solution to streamline and optimize the inspection process:

- **Instant Data Entry**: PHIs can input inspection data directly into the platform, eliminating paper forms.
- **Real-Time Tracking**: Automated scheduling and tracking ensure inspections are always on schedule.
- **Digital Records**: All data is stored securely in the cloud, easily accessible at any time.
- **Instant Reporting**: Real-time, automated reporting offers valuable insights into compliance and trends.
- **Efficient Complaint Management**: Complaints are recorded and tracked for swift resolution.

---

## Key Features 🌟

- **User-Friendly Interface**: A clean, simple dashboard for efficient inspection management.
- **Shop Management**: Database of food establishments, inspection history, and compliance status.
- **Digital Inspection Forms**: Automated validation of digitized forms like HC 800 and Sandeeshaya.
- **Task Scheduling**: Schedule inspections, track follow-ups, and ensure compliance.
- **Analytics and Reporting**: Real-time reporting on food safety trends, violation tracking, and more.
- **User Profile Management**: PHIs can manage their profiles and inspect historical data.

---

## Technology Stack 🛠️

- **Frontend**: React.js – A modern, fast, and interactive JavaScript library for building responsive UIs.
- **Backend**: Node.js with Express.js – Scalable server-side architecture to handle high data loads.
- **Database**: MongoDB – Flexible, scalable NoSQL database to manage inspection data.
- **Authentication**: Firebase Authentication – Secure user management and authentication.
- **Deployment**: Hosted on **Netlify** for seamless cloud-based deployment and auto-scaling.
- **EOMIJS Optimization**: Emphasis on **Efficient Operations and Modern Interfaces (EOMIJS)**, optimizing data flow and enhancing user experience through modern JavaScript features, asynchronous programming, and performance enhancements.

---

## Innovation & Uniqueness 🚀

**SafeTrack** stands out with the following unique features:

- **Centralized Data Management**: Everything is stored digitally, providing instant access to all records.
- **Real-Time Reporting**: Real-time data analysis and report generation, improving decision-making and transparency.
- **Paperless Inspections**: PHIs no longer need to carry physical documents, reducing overhead.
- **Scalable Architecture**: Built to scale as the user base and inspection volume grow.

---

## Feasibility & Implementation 🔍

- **Technical Feasibility**: Utilizes modern, reliable technologies that are well-supported, ensuring long-term sustainability.
- **Scalability**: MongoDB’s NoSQL database architecture is highly scalable and can handle increased inspection volumes effortlessly.
- **Environmental Impact**: By digitizing inspections, SafeTrack significantly reduces paper consumption, contributing to sustainability.

---

## Impact & Benefits 🌍

**For PHIs**:
- **Reduced Time on Paperwork**: Allows PHIs to focus on inspections rather than data entry.
- **Faster Reporting**: Immediate, automated reporting for faster decision-making and enforcement.

**For Food Establishments**:
- **Transparency**: Real-time access to inspection results ensures fair treatment.
- **Streamlined Compliance**: Ensures that food establishments stay compliant with safety regulations.

**For Public Health**:
- **Improved Safety**: Faster response to violations ensures better protection of public health.
- **Public Trust**: Transparency in the inspection process builds trust with the public.

---

## Team Members 👩‍💻👨‍💻

- **Senesh Fitzroy** - Team Leader
- **Nipuni Ariyathilaka**
- **Maleesha Devindi**
- **Pasindu Piyumika**
- **Duleesha Jayangani**

---

## Additional Information 📢

- **Collaboration with PHIs**: SafeTrack was developed in consultation with Sri Lankan PHIs, ensuring the platform addresses real-world challenges.
- **Scalable for Future Growth**: Designed with future expansion in mind, SafeTrack can easily scale to include new regions or features.

---

## Future Implementations 🚧

- **Admin Dashboard**: A comprehensive admin panel for managing settings, users, and system activity.
- **Geo-Tagging**: Integration for tracking inspection locations.
- **Photo Uploads**: Ability to capture and store images during inspections for more detailed reports.
- **Predictive Reporting**: Use machine learning to predict potential violations.
- **Offline Functionality**: Record inspections offline and sync when connectivity is restored.

---

## Installation and Setup 🔧

To get started with **SafeTrack**, follow the steps below:

### 1. Clone the Repository
```bash
git clone https://github.com/SeneshFitzroy/SafeTrack-Web-Application.git
cd safetrack-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following configuration:

```
# API Configuration
REACT_APP_API_URL=http://localhost:5001
REACT_APP_FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
PORT=5001
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret

# OpenAI Configuration (if using AI features)
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

### 4. Running the Application

#### Backend
```bash
cd backend
node server.js
```

#### Frontend
```bash
npm start
```

The application will launch at `http://localhost:3000`.

---

## Contributing 🤝

We encourage contributions from the community:

1. **Fork the repository** to your GitHub account.
2. **Create a new branch**:
   ```bash
   git checkout -b new-feature
   ```
3. **Make your changes**, then commit:
   ```bash
   git commit -m "Implement new feature"
   ```
4. **Push to your fork**:
   ```bash
   git push origin new-feature
   ```
5. **Open a pull request** to merge changes into the main repository.

---

## License 📄

This project is licensed under the **Apache 2.0 License**. See the [LICENSE](LICENSE) file for details.

---

### Hosted on Netlify 🌐

The SafeTrack web application is deployed and hosted on **Netlify** for fast, reliable performance. Visit the live version here:  
🔗 **[SafeTrack Live](https://graceful-vacherin-0fb111.netlify.app/)**
