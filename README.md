# 🏸 Men’s Singles Tournament Bracket

A simple full-stack application that stores and displays **Men’s Singles tournament matches** in a **Quarterfinal → Semifinal → Final** bracket format.

---

## 🛠️ Tech Stack

* Backend: Node.js, Express
* Database: MongoDB (local)
* Frontend: React.js
* API Calls: Axios

---

## 🔧 Backend

### API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/api/matches/save`   | Save match data      |
| GET    | `/api/matches`        | Get all matches      |
| GET    | `/api/matches/:round` | Get matches by round |

### Environment Variables

Create a `.env` file in the **backend root**:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8081
```

### `.env.example`

```env
MONGO_URI=
PORT=
```

### Run Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:8081
```

---

## 🎨 Frontend

### Features

* Fetches match data from backend
* Displays tournament draw:

  * Quarterfinals
  * Semifinals
  * Final
* Shows match scores and tournament winner

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📂 Frontend Structure

```
src/
├── api/matchesApi.jsx
├── components/
│   ├── MatchCard.jsx
│   ├── RoundSection.jsx
│   └── TournamentBracket.css
├── pages/TournamentDraw.jsx
├── App.jsx
└── index.css
```

---

## 🧠 Data Format

```json
{
  "roundName": "QF | SF | Final",
  "player1": "Player A",
  "player2": "Player B",
  "score": "21-18, 21-16",
  "winner": "Player A",
  "eventName": "MS",
  "drawName": "MS",
}
```