import weaviate
import weaviate.classes.query as wq
import os
import json

def weaviate_image_search(image_b64: str):
    headers = {"X-OpenAI-Api-Key": "sk-111"}

    client = weaviate.connect_to_local(headers=headers)
    # Get the collection
    movies = client.collections.get("MovieMM")
    
    response = movies.query.near_image(
        near_image=image_b64,
        limit=5,
        return_metadata=wq.MetadataQuery(distance=True),
        return_properties=["title", "release_date", "tmdb_id", "poster", "vote_average", "overview"]
    )

    # Create a list to store the results
    results = []
    
    # Inspect and collect the response
    for o in response.objects:        
        # Create a data URL from the base64 string
        poster_url = f"data:image/jpeg;base64,{o.properties['poster']}" if o.properties['poster'] else ""

        # Collect the results in a dictionary
        movie = {
            "title": o.properties["title"],
            "rating": o.properties["vote_average"],
            "posterUrl": poster_url,  # Use the data URL
            "year": o.properties["release_date"].year,
            "description": o.properties["overview"]
        }
        results.append(movie)
        
    client.close()
    
    return results