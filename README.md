# Movie Recommendations

A web application that provides personalized movie recommendations using AI. The application combines a React frontend with a Python backend and uses Weaviate as a vector database for semantic search capabilities.

## Features

- Movie recommendations based on user preferences
- AI-powered movie analysis
- Poetic movie descriptions generated by AI
- Search functionality for finding similar movies

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Python
- FastAPI
- Weaviate (Vector Database)
- Anthropic's Claude AI

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Setup Backend
```bash
cd backend/movie_recommendations
cp .env.example .env  # Configure your environment variables
pip install -r requirements.txt
```

3. Setup Frontend
```bash
npm install
```

4. Run the Application
```bash
# Start backend
cd backend/movie_recommendations
python -m movie_recommendations.main

# Start frontend (in a new terminal)
npm run dev
```
