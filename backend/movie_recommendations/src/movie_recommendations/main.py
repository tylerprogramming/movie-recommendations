#!/usr/bin/env python
from random import randint
from pydantic import BaseModel
from crewai.flow.flow import Flow, listen, start
from backend.weaviate_image_search import weaviate_image_search
from backend.weaviate_search import weaviate_search

class MovieRecommendationsState(BaseModel):
    image_b64: str = ""
    query: str = ""
    results: list = []

class MovieRecommendationsFlow(Flow[MovieRecommendationsState]):
    @start()
    def retrieve_movie_recommendations(self):
        print("Retrieving movie recommendations")
        
        if self.state.image_b64:
            self.state.results = weaviate_image_search(self.state.image_b64)
        else:
            self.state.results = weaviate_search(self.state.query)

        return self.state.results

def kickoff(image_path: str, query: str):
    inputs = {}
    inputs["image_b64"] = image_path
    inputs["query"] = query
        
    movie_recommendations_flow = MovieRecommendationsFlow()
    result = movie_recommendations_flow.kickoff(inputs=inputs)
    return result


if __name__ == "__main__":
    kickoff()
