
# Movie Recommendations

A web application that recommends movies by text or by image. A React frontend sends the query (or an uploaded image) to a small Flask backend. A CrewAI flow then searches a local Weaviate vector database of 680 movies (Weaviate's `edu-datasets` movie set). Text queries use BM25 keyword search, and image queries use CLIP `near_image` similarity against the movie posters.

## Features

- Text search over movie titles and overviews (Weaviate BM25)
- Search by image: upload a picture and get movies with visually similar posters (Weaviate `multi2vec-clip`)
- Results show poster, year, rating and overview

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Python 3.10 to 3.13
- Flask (`server.py`, port 5111)
- CrewAI Flow (`backend/movie_recommendations`) that routes the request to the right search
- Weaviate 1.27 with the `multi2vec-clip` module, run locally with Docker Compose

No LLM call is made at query time. The `crews/poem_crew` folder is unused CrewAI template scaffolding.

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/tylerprogramming/movie-recommendations.git
cd movie-recommendations
```

2. Start Weaviate (from `docker-weaviate/`)
```bash
cd docker-weaviate
docker compose up -d
cd ..
```

3. Install the backend dependencies (from the repo root)
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

4. Load the movie data into Weaviate (one time, from the repo root). This creates the `MovieMM` collection, then downloads the dataset and posters from `weaviate-tutorials/edu-datasets` into `scratch/imgs`.
```bash
python backend/weaviate_setup.py
```

5. Run the Flask backend (from the repo root, so `backend.*` imports resolve)
```bash
python server.py
```

6. Install and run the frontend (in a new terminal, from the repo root)
```bash
npm install
npm run dev
```

The frontend calls `http://localhost:5111/api/recommendations`.

## Environment

`backend/movie_recommendations/.env.example` holds a placeholder `OPENAI_API_KEY`. Search does not need it: CLIP vectorizes locally, and the generative module configured on the collection is never called. The Weaviate scripts send a placeholder `X-OpenAI-Api-Key` header for the same reason.

## Versions

Updated for CrewAI 1.15 and weaviate-client 4.x. The original code used CrewAI 0.85, so details may differ from the video.
