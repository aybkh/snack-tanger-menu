# 🌮 Snack Tanger 303 System

**Modern Point of Sale (POS) & Kitchen Display System (KDS)** for Snack Tanger 303. Built with performance, simplicity, and beautiful aesthetics in mind.

---

## 🚀 Key Features

### 🖥️ Point of Sale (TPV)
- **Visual Menu:** High-contrast, touch-friendly interface for fast order entry.
- **Advanced Customization:**
  - **Tacos:** Select meats (limit logic based on size), sauces (first 2 free), and extras.
  - **Batidos:** Choose liquid base (Water, Milk, Orange Juice +0.50€).
  - **Menus:** One-click "Make it a Menu" upgrade logic.
- **Smart Cart:** Auto-grouping of identical items ("2x Pizza Margarita").
- **Thermal Printing:** Auto-formatted receipt generation (80mm width) upon order submission.

### 👨‍🍳 Kitchen Display System (KDS)
- **Real-Time Feed:** Updates every 5 seconds with new orders.
- **Status Workflow:**
  - 🟡 **Pending:** New order arrival.
  - 🔵 **Preparing:** Chef acknowledges receipt.
  - 🟢 **Ready:** Food is cooked and packed.
  - ⚪ **Delivered:** Order completed (dimmed/archived).
- **Clear Visibility:** High-contrast dark mode for kitchen environments.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Lucide React (Icons), Vanilla CSS (Custom Design System).
- **Backend:** Python FastAPI, SQLModel (SQLAlchemy + Pydantic).
- **Database:** PostgreSQL (via Docker).
- **Infrastructure:** Docker Compose.

---

## 🏁 Getting Started

### Prerequisites
- Docker Desktop installed and running.
- Git.

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd snack_tanger
   ```

2. Start the system:
   ```bash
   docker-compose up -d --build
   ```

3. **(First Time Only)** Seed the database:
   ```bash
   docker-compose exec backend python seed_full.py
   ```

### Access Points
| Service | URL | Description |
| :--- | :--- | :--- |
| **POS Terminal** | `http://localhost:3000` | Main ordering interface for waiters. |
| **Kitchen Display** | `http://localhost:3000/kitchen` | Display for cooks to manage orders. |
| **Backend API** | `http://localhost:8000/docs` | Swagger UI for testing API endpoints. |

---

## 📂 Project Structure

```
snack_tanger/
├── backend/                # Python FastAPI Server
│   ├── main.py             # API Endpoints & Logic
│   ├── models.py           # Database Schemas (SQLModel)
│   ├── seed_full.py        # Database Population Script
│   └── Dockerfile
├── frontend/               # React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── POSPage.jsx      # Main Order Interface
│   │   │   └── KitchenPage.jsx  # Chef Interface
│   │   ├── api.js          # API Client
│   │   └── index.css       # Global Styles & Print Layouts
│   └── Dockerfile
├── data/                   # Persistent Database Storage (Gitignored)
├── docker-compose.yml      # Container Orchestration
└── README.md               # Documentation
```

---

## 📝 Printing Configuration
The system assumes a standard **80mm Thermal Printer**.
- The print dialog opens automatically when an order is sent.
- **Browser Settings:** Ensure "Margins" are set to "None" or "Minimum" in the browser print dialog for best results.
- **Mobile:** Works with thermal printers connected via Bluetooth or shared network printers (AirPrint/Android Print).

---

## ✨ Design Philosophy
- **Mobile-First:** Fully responsive drawer/cart for waiters taking orders at tables via phone.
- **Minimal Clicks:** Logic optimized to minimize screen taps for common modifications.
- **Reliability:** Background command polling ensures the kitchen never misses an order even if the internet hiccups.

---

