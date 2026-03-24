# This will store collected photo data
photos = []

# Photo 1 - Services list flyer (orange background)
photos.append({
    "id": 1,
    "fbid": "866223882953974",
    "url": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/617632945_866223889620640_7409504229326569629_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=O8TGmQGYCQAQ7kNvwH9HuII&_nc_oc=AdqdfocC76uyt7Q-dm6ADJ-UOTR-J-tlutaihR9FKKdeMTAwKBmdkEEkzg4fjGLlThU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=P4SWiCk5MLAxhcfOicVhIg&_nc_ss=7a30f&oh=00_Afym0jcxAYLl92EKU0gp3ypGuPZOszdaRwDy7xixf9ITFA&oe=69C7B3C1",
    "description": "Services list flyer - orange background with list of services (Skid Steer, Track Hoe, Storm Shelters, etc.) and FREE ESTIMATES"
})

print("Stored photo 1")
for p in photos:
    print(f"  Photo {p['id']}: {p['description'][:60]}")
