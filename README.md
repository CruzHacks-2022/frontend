## 💡 Inspiration
Albert's father suffers from diabetes. He has to take a lot of pills in order to deal with it. However this leads to a lot of confusion in keeping track of each pill and what it does. Mr. Lee's plight is also the plight of many others, and it can lead to fatality. Every year, 7,000 to 9,000 people die from accidentally taking the wrong mediciation. Thus we felt it was important to develop a way to solve this problem and ensure we can provide information about medications in a timely manner without difficulty.

## 💻 What it does
Remedia allows users to locate information about their medications through 3 methods:
- Taking a picture of your medication
- Searching the brand name (e.g. Advil) or the scientific name (e.g. Ibuprofen)
- Selecting the feature of a pill such as color, imprint, shape

When the user does the following, they are given information about the medication and provided the following information:

- How to store the medication
- Side-effects (color-coded based on the severity)
- Signs of Overdose
- What to do if you or a loved one is experiencing an overdose

## ⚙️ How we built it
To allow for our app to work online, we used:
- Flask
- Docker
- Google Cloud Run

We used React Native and Expo to develop our cross-platform 

To develop the scraper, we used:
- Beautiful Soup Library
- Python
- Data from [Drugs.com](https://www.drugs.com/pill_identification.html) (for Pill Identification) and [MedlinePlus](https://medlineplus.gov/druginformation.html) (for Drug Information)

We used the Google Cloud Vision API to recognize the medication and that API talks to the scraper which finds the drugs that are the closest match.

To design the application we used React Native and Expo as they were scalable frameworks that allow us to develop cross-platform apps.

## 🧠 Challenges we ran into
- Pill Identification: This as one of our hardest issues. Our initial plans included 
- Web Scraping: As Albert eloquently stated, "Web scraping is hard." We ran into a lot of issues with web scraping, such as handling data, and ensuring proper formatting as trademark symbols would mess things up. It took a lot of delicate handling and formatting in order to ensure any data that was scraped would not break the design of our application.
- Altering the design: While this wasn't our most difficult challenge, we ran into issues with designing our application as running the app on Web (which it wasn't designed to do) led to the contents of the main page being autoscrolled down. To fix this, we designed with static data and then once we completed designing, we added our dynamic data and everything went smoothly.
- Time: We did not have a lot of time on our hands. This pushed us to do planning early on because as opposed to creating eveyr little feature possible, we looked at our goals and crafted a plan for our MVP (Minimum Viable Product) and then certain additions we can add if time permits us to do so. We were able to create our MVP with time left, and thus we proceeded with our modified version of pill identification.

## 🏅 Accomplishments that we're proud of

- Scraping the data from the web in the given time frame.
- Using the Google Cloud Vision API to recognize the image.
- Building the full application in the given time frame.
- Having an application with a strong design language that is clean and intuitive.
- Creating a scalable application that lets us add more features that will make this app even more useful.

## 📖 What we learned
- Albert: 
- Ameya: "This is the first time I used React Native. I heard of it before but I never used it until now. It was a really awesome experience. Additionally, learning about the frequnency of people taking the wrong medications was eye-opening and I'm glad to have helped developed this app."
- Ankur: 
- Harshal: 

## 🚀 What's next for Remedia
We're genuinely just scratching the surface with Remedia. We have two features we plan on adding:
- Letting users take an image of their pill for search: 
- Creating a medication scheduler: 
