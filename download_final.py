import urllib.request
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.facebook.com/',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
}

photos_to_download = [
    # (filename, url, description)
    ("fb-photo-robbie-profile.jpg",
     "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/311837742_108890902020613_7601051813465539187_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=vWcK29BRU6UQ7kNvwHAg-mz&_nc_oc=AdpZNQQ02u_KCCFzqlNBDmmKKjGGFujCojHP3lzmljh1DTH3PFFyW9hmGRholw-Rkjw&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=jVZxw2s8S5aR4WGc9roASQ&_nc_ss=7a30f&oh=00_AfwKPu6QoMhwm4tEThCBMnfcHXfM3ydBOJrTCO_f3QhAMg&oe=69C7E945",
     "Robbie Smith (owner) profile photo - smiling selfie with Kubota KX057-4 excavator behind him, October 2022"),
]

for filename, url, desc in photos_to_download:
    filepath = f"/home/user/workspace/rs-excavation/assets/{filename}"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"Downloaded {filename}: {len(data)} bytes")
    except Exception as e:
        print(f"FAILED {filename}: {e}")

print("Done")
