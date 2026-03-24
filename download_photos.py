import urllib.request
import re
import os

os.makedirs("/home/user/workspace/rs-excavation/assets", exist_ok=True)

# Photo data: (fbid, thumbnail_url, description)
photos = [
    (1, "866223882953974", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/617632945_866223889620640_7409504229326569629_n.jpg?stp=c150.0.390.390a_cp6_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=O8TGmQGYCQAQ7kNvwH9HuII&_nc_oc=AdqdfocC76uyt7Q-dm6ADJ-UOTR-J-tlutaihR9FKKdeMTAwKBmdkEEkzg4fjGLlThU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfxPdP26DFrdru_pu6wxzexa-idgJKqTbgWHyaI7tFrn4w&oe=69C7B3C1", "Services list flyer - orange background with list of services and FREE ESTIMATES"),
    (2, "866223872953975", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/619392861_866223886287307_4905479273759648939_n.jpg?stp=c154.0.388.388a_cp6_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=3MGJNlq4k6YQ7kNvwEe25KV&_nc_oc=AdoyEdHG2Zwi8IADP3M1tN1Is1jED3yUqXN-daNe2cU2_NWuFia2bxsac7FTaM_a4BY&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_Afzqi-FR9LhULxL081F8dbA7uC7_ZExjIWkFEGpTtElhGw&oe=69C7B672", "RS Excavation business card/logo - orange background with dump truck and excavator, Robbie Smith name"),
    (3, "216548774588158", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480887618_608941175348914_4673555043609675659_n.jpg?stp=c0.49.1076.1076a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=a934a8&_nc_ohc=Qumb39IyKesQ7kNvwHQu0Jr&_nc_oc=AdoB46-_TYZejsNmN1ybq4cvYoxHxeY0ZtmsN9ql5eV5LWbVFOPH8cfncv11TkKm_7Y&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_Afwk1jVkbxKrKVVnZGsgwuzHyHYLKcIj9kpGntGKm1Lzcw&oe=69C7DB52", "Engine/carburetor work photo (vintage Chevy engine)"),
    (4, "211356288440740", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/481083419_608933545349677_5104222682189049667_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=a934a8&_nc_ohc=9ipCb0Kg-1cQ7kNvwHTKJu0&_nc_oc=Adosna7MnzRSsfRGPRb1FDjW7XSXdakLsjYoqOAPkFsWdfB99tG4Rkkhd4bzDDFPdng&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfzErX8GTI35F-Q6b2Yakoe383klehsibLbBfmoOCewRxw&oe=69C7CAF6", "Job site excavation work photo"),
    (5, "207448018831567", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/480938506_608925355350496_6817877417389326992_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a934a8&_nc_ohc=JmWB-KbEtZAQ7kNvwGGNrO4&_nc_oc=AdqmtPnj1th3wUi-xypz0alvF0KVb_lFU4yNXtvT5NN7A85Oh5IOAhrjO3hSOFPCZFg&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfzKjIX7CraeFxB-V-lpyzIfCcJZmhB-Cuk6bbjpceDKSA&oe=69C7D639", "Job site photo - land clearing/excavation"),
    (6, "207447975498238", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480622444_608925345350497_3615205122081735775_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=a934a8&_nc_ohc=7-wBrz6t3Z4Q7kNvwG9AijN&_nc_oc=AdoNJx_u-gAwr9M4b7nvVBFjnEBnsN-x7a5dygAfzDzXrOw5mHYuD5Qac_AxbP8FQUE&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfyG6VWMtQE3V6qSEU_WGz-UrFkeYeJDbLTNw5yFo2y2LA&oe=69C7DA91", "Job site photo - excavation work"),
    (7, "207447872164915", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480696316_608925595350472_9046742559699854325_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=a934a8&_nc_ohc=Bps92zEv0bYQ7kNvwHC_ych&_nc_oc=Adr3CgWiGPNL6v1M02sqGGdwTxQKlYf9YGpUNUZNCoC0IUM1COhqqOwaDT0LB3NCYR4&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfzNPTrGWpaO2e8c-Ih5r_jWFB-mQsZOEAw5ynRyWQDgkg&oe=69C7BA5C", "Job site photo - excavation work"),
    (8, "207447842164918", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/480613310_608925745350457_7495331861495011828_n.jpg?stp=c0.364.946.946a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a934a8&_nc_ohc=dM-BylWSTKgQ7kNvwEmK2xx&_nc_oc=Adpx8zPdjJKJ8c5QX7W26e71NAOD_UOJD5g21LUeixCNQDXWisbMoippalGHBZFBqxg&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=BCfjdcnLNbKO20uJ8gMy4Q&_nc_ss=7a30f&oh=00_AfxBcHvAIk34BO5IIChf_6tTz7K-HbsDfjbN_zai2LwXNw&oe=69C7DC86", "Job site excavation - land preparation"),
    (9, "207447812164921", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/480963066_608925375350494_1744936746052620912_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=a934a8&_nc_ohc=KBE1YjHzzKYQ7kNvwFqpJOA&_nc_oc=AdrgC9-HKw2-xxxxWl9ejV_u-IkrqfLdxBHyR-MH3Ui5AuiFTPmj5bYEL5QzGMDExf4&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_AfzWBgfxlKycaEXoSuTWSkFgSB3t3_QqaNvQuECOfBu5Qw&oe=69C7E060", "Job site photo - excavation"),
    (10, "207447782164924", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480760134_608925308683834_8918633590056198636_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=a934a8&_nc_ohc=wVpw9uyMxaoQ7kNvwEvchNL&_nc_oc=AdqoaWVVvcjVf66AEFCXfV-8RYipRTtr6x6PgeprjcBGRhnOdLeEtj-QiD5d1A_KPZE&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_Afx3zAd4pl1GSshP7xGhQVutZ9wV2U4P6F-Blm58KiIkiA&oe=69C7B635", "Job site photo - excavation"),
    (11, "207447742164928", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/480976577_608925748683790_5335166195805270592_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=a934a8&_nc_ohc=fv01Qj3L3O4Q7kNvwFRaQRt&_nc_oc=Adrxplz7rGSR60dnVTO5GVzKSSw4bfl9h0nDe0ttgY1UoYq7scRlyHV4R71pgmpONV4&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_AfxhTroZodltGwlFyFHXyhSsOCZvrHdAl5EUokBYbIKzEg&oe=69C7B499", "Job site photo - excavation"),
    (12, "207447698831599", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/481249391_608925608683804_6069209893811310434_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=a934a8&_nc_ohc=pl8rUjfIwRsQ7kNvwFGiAHb&_nc_oc=AdqtaQlGUKMuMmWzjdKRmQ-yADjq5Lb15JH21tRG1d8XDEhZY3jQmUB-QWv2uS2LxeE&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_AfxndId-2M2NkDnhzRvkn3Xv3JvGzBvvutsYGI5zDp4QgQ&oe=69C7D921", "Job site photo - excavation"),
    (13, "181751118067924", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480699590_605166639059701_6540241910274024690_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=mdx2hFsaig0Q7kNvwFoOTWU&_nc_oc=Adrk3WTqqEMqyimZMPJ0qtmhR0ESYaPBwq7d_PzQ4b9IpK9bS5GQLKpjtJAXg5RX_bs&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_Afxp5FDUl75Egidk4-vSvZU-PYWdFL2dd-KIWYroReHLlw&oe=69C7BABD", "Driveway/property landscaping job"),
    (14, "181751078067928", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480785064_605166615726370_8570640118560858051_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=lQ0W0htOKZIQ7kNvwGZ8SpJ&_nc_oc=AdoSIaDXnnPbarWg3qAv8aT7D4RKHyYxlWfNQKCfbHxNuznLIPiIySVXqGU_kl9gc_g&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_AfxJQg6MZSdp87z805jHhfxqPzRvBJc0L6Y9hmw0_4CBpw&oe=69C7E7AB", "Driveway/property landscaping job"),
    (15, "181751074734595", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/480489516_605166769059688_3697952778220325976_n.jpg?stp=c373.0.640.640a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=YBBtH4xTEz0Q7kNvwFdMgT5&_nc_oc=AdpGIZEuhikrf1JHmG_Ha-WMK8PYk8fvIQlvqVWXPpiJDEDde59W9_qmU5VUbuodFoY&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_AfzrtEr5bLQoMW9muSXZIKDgTXytxvSVoU8JdRz6eV3Jvw&oe=69C7D9AF", "Driveway/landscaping work photo"),
    (16, "180727094836993", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/480702504_605164819059883_3696604028826192358_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=B3zqYI-8iwYQ7kNvwFPjJbn&_nc_oc=Adqw1FNkqrejl6hSj5hUcatBFSThKd-VrXh7LxcilqigKFf3ExMLO-uExtXZwg_d7o8&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=VAuknUq6vkhwBdR48g1iQA&_nc_ss=7a30f&oh=00_Afzf9yicZB8sQk32kiO41knETaSnjbQYgwPOkVVxDILXjA&oe=69C7CBA4", "Driveway grading/landscaping job"),
    (17, "156727363903633", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/474453563_583572747885757_5074969802457058001_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=PpeIo6EYZysQ7kNvwERxkoQ&_nc_oc=AdojtUSUqHZNC3boTupkGRx6z_zFpbawNCzdzfR6T0fcCvUi06TaEusCdubQ04xADQ4&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=TSfIXN7YERQEuAKd54iAhg&_nc_ss=7a30f&oh=00_Afx6n1Cb27pPCoIp_SM4sdMJgXHJ9yzbrRJlxpH4RaMK8Q&oe=69C7DCF6", "Excavator on job site - land clearing"),
    (18, "153517130891323", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/473990262_583331401243225_5064798400810741809_n.jpg?stp=c551.0.946.946a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=rwfJmGEoM0QQ7kNvwHH-BPo&_nc_oc=AdpADHVcIsAoVcsgSoCCyMKqgWyHGrO-8_VYBGvgKS4aIwfFWtI0afRCcIcY9Gplink&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=TSfIXN7YERQEuAKd54iAhg&_nc_ss=7a30f&oh=00_Afxxu92a13GMFvG-ALCbAgbQcaMWOn7hSjVQ-PrX5wOpqw&oe=69C7E2C1", "Demolition/debris site photo"),
    (19, "153517097557993", "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/474179383_583331384576560_1078604076390842893_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=dxxOc2v3DJwQ7kNvwHV8sNu&_nc_oc=AdrNa_KfvZMvWIIG6fY4ZNiahJaknf7WXCxBswzs4HgPU1cjsq_JbA2LMrkjrCor5CU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=TSfIXN7YERQEuAKd54iAhg&_nc_ss=7a30f&oh=00_AfzjXcxfgVtZXm6gQq_T3Et9BmXF-SmGLxsPPza6TOxT9A&oe=69C7D52F", "Excavator self-photo - Robbie with excavator"),
    (20, "143181538591549", "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/471697499_566827229560309_4447993700119310625_n.jpg?stp=c256.0.1536.1536a_dst-jpg_s206x206_tt6&_nc_cat=110&ccb=1-7&_nc_sid=a934a8&_nc_ohc=OyBnkliM2hIQ7kNvwHDLhnH&_nc_oc=Ado21udpr9gFHmxs8t7I_u24rI3sjGXd7Hmvmgz6R2mUwteLgnDTrUEHYBABZEO6R9A&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=TSfIXN7YERQEuAKd54iAhg&_nc_ss=7a30f&oh=00_AfzFX44tznpZXqCBzS0KVZ6UNRRTefmXWiguMeHUMFgCSA&oe=69C7BBFA", "Job site photo - excavation work"),
]

def make_fullsize_url(thumb_url):
    """Convert thumbnail URL to full-size by modifying the stp parameter"""
    # Remove the size constraint (s206x206) from stp
    # Replace patterns like: c150.0.390.390a_cp6_dst-jpg_s206x206_tt6 -> cp6_dst-jpg_tt6
    # Or: c551.0.946.946a_dst-jpg_s206x206_tt6 -> dst-jpg_s960x960_tt6
    url = re.sub(r'stp=[^&]*s206x206[^&]*', 'stp=dst-jpg_s960x960_tt6', thumb_url)
    return url

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.facebook.com/',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
}

results = []
for num, fbid, thumb_url, desc in photos:
    fullsize_url = make_fullsize_url(thumb_url)
    filename = f"/home/user/workspace/rs-excavation/assets/fb-photo-{num}.jpg"
    
    try:
        req = urllib.request.Request(fullsize_url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filename, 'wb') as f:
                f.write(data)
            size = len(data)
            print(f"Photo {num}: Downloaded {size} bytes -> {filename}")
            results.append({"id": num, "fbid": fbid, "url": fullsize_url, "file": filename, "size": size, "description": desc, "status": "ok"})
    except Exception as e:
        print(f"Photo {num}: FAILED with fullsize URL, trying thumbnail: {e}")
        try:
            req = urllib.request.Request(thumb_url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as response:
                data = response.read()
                with open(filename, 'wb') as f:
                    f.write(data)
                size = len(data)
                print(f"Photo {num}: Downloaded thumbnail {size} bytes -> {filename}")
                results.append({"id": num, "fbid": fbid, "url": thumb_url, "file": filename, "size": size, "description": desc, "status": "thumbnail"})
        except Exception as e2:
            print(f"Photo {num}: ALL FAILED: {e2}")
            results.append({"id": num, "fbid": fbid, "url": thumb_url, "file": filename, "size": 0, "description": desc, "status": f"error: {e2}"})

print(f"\nCompleted: {len([r for r in results if r['status'] in ('ok','thumbnail')])} / {len(results)} photos downloaded")
