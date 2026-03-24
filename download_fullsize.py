import urllib.request
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.facebook.com/',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
}

# Full-size URLs collected from lightbox (no stp size restriction)
fullsize_photos = [
    # (num, fbid, url, description)
    (1, "866223882953974", 
     "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/617632945_866223889620640_7409504229326569629_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=O8TGmQGYCQAQ7kNvwH9HuII&_nc_oc=AdqdfocC76uyt7Q-dm6ADJ-UOTR-J-tlutaihR9FKKdeMTAwKBmdkEEkzg4fjGLlThU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=P4SWiCk5MLAxhcfOicVhIg&_nc_ss=7a30f&oh=00_Afym0jcxAYLl92EKU0gp3ypGuPZOszdaRwDy7xixf9ITFA&oe=69C7B3C1",
     "Services list flyer - orange background with list of services (Skid Steer, Track Hoe, etc.) and FREE ESTIMATES"),
    (2, "866223872953975",
     "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/619392861_866223886287307_4905479273759648939_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3MGJNlq4k6YQ7kNvwEe25KV&_nc_oc=AdoyEdHG2Zwi8IADP3M1tN1Is1jED3yUqXN-daNe2cU2_NWuFia2bxsac7FTaM_a4BY&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=LOJuptFmk_zRTZCeCWB3Ug&_nc_ss=7a30f&oh=00_AfyrA15SwM8iTs8xJSCMt2OjZNcFrchTc5btQ2kQ5H0Wbw&oe=69C7B672",
     "RS Excavation business card/logo - orange background with dump truck and excavator silhouette, Robbie Smith Heavy Equipment Operator Licensed Septic Installer, phone 270-543-8059"),
    (17, "156727363903633",
     "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/474453563_583572747885757_5074969802457058001_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=PpeIo6EYZysQ7kNvwERxkoQ&_nc_oc=AdojtUSUqHZNC3boTupkGRx6z_zFpbawNCzdzfR6T0fcCvUi06TaEusCdubQ04xADQ4&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=sdEtWRiPTnxh6Xes6cmS0w&_nc_ss=7a30f&oh=00_Afx0OX6mKBnw2bGR_RogSQ9opPk0Mt2oZ0Z0OGHmkLHynw&oe=69C7DCF6",
     "Robbie (owner) selfie with Kubota excavator in background doing tree removal/brush clearing, March 2023"),
    (18, "153517130891323",
     "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/473990262_583331401243225_5064798400810741809_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=rwfJmGEoM0QQ7kNvwHH-BPo&_nc_oc=AdpADHVcIsAoVcsgSoCCyMKqgWyHGrO-8_VYBGvgKS4aIwfFWtI0afRCcIcY9Gplink&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=sr5f8zA4Z-UZNszRUKegrw&_nc_ss=7a30f&oh=00_AfwF8bYbFkwm_gLBbbMOS7INto2h2H1YxkJNXLn6ov_mqw&oe=69C7E2C1",
     "Demolition site - Kubota excavator working on demolished house, debris pile, February 2023"),
]

for num, fbid, url, desc in fullsize_photos:
    filename = f"/home/user/workspace/rs-excavation/assets/fb-photo-{num}.jpg"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filename, 'wb') as f:
                f.write(data)
            print(f"Photo {num} ({fbid}): {len(data)} bytes")
    except Exception as e:
        print(f"Photo {num}: FAILED: {e}")

print("Done")

# Additional full-size photos
additional = [
    ("kubota-trailer", "108896228686747",
     "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/469144073_549202961322736_5368865775941946515_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2a1932&_nc_ohc=7aWG20B4YKMQ7kNvwHK5rKc&_nc_oc=AdpGQcvdogLzQ7b8EiHOoduzULzy8erAyuCnJMyQjsgQ343Rr4C-VeOI5MEjbYclL2I&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=daHeHQGmWwfXHUiMsEdC3g&_nc_ss=7a30f&oh=00_AfzqfiWo7Y6k-C2h7ozZEoBiN8WKEZ-e3no0uEdotPyNGA&oe=69C7BFB3",
     "Kubota KX057-4 excavator loaded on trailer being pulled by Chevrolet truck - October 2022"),
]

for name, fbid, url, desc in additional:
    filename = f"/home/user/workspace/rs-excavation/assets/{name}.jpg"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filename, 'wb') as f:
                f.write(data)
            print(f"{name}: {len(data)} bytes -> {filename}")
    except Exception as e:
        print(f"{name}: FAILED: {e}")
