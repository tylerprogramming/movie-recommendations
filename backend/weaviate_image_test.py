import weaviate
import weaviate.classes.query as wq
import os


headers = {
    "X-OpenAI-Api-Key": "sk-111"
}

client = weaviate.connect_to_local(headers=headers)


def url_to_base64(url):
    import requests
    import base64

    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode("utf-8")


# Get the collection
movies = client.collections.get("MovieMM")

# Perform query
src_img_path = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
query_b64 = url_to_base64(src_img_path)

# response = movies.query.near_text(
#     query="history",
#     limit=5,
#     return_metadata=wq.MetadataQuery(distance=True),
#     return_properties=["title", "release_date", "tmdb_id", "poster"]  # To include the poster property in the response (`blob` properties are not returned by default)
# )

response = movies.query.near_image(
    near_image=query_b64,
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
    return_properties=["title", "release_date", "tmdb_id", "poster"]  # To include the poster property in the response (`blob` properties are not returned by default)
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year, o.properties["tmdb_id"]
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()