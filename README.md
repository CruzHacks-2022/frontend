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

We used the Google Could Vision API to recognize the medication and that API talks to the scraper which finds the drugs that are the closest match.

To design the application we used React Native and Expo as they were scalable frameworks that allow us to develop cross-platform apps.

## 🧠 Challenges we ran into
- 
- Scraping the data

## 🏅 Accomplishments that we're proud of

- Scraping the data from the web in the given time frame.
- Using the Google Cloud Vision API to recognize the image.
- Building the full application in the given time frame.
- Having an application with a strong design language that is clean and intuitive.
- Creating a scalable application that lets us add more features that will make this app even more useful.

## 📖 What we learned
- Albert:
- Ankur:
- Ameya:
- Harshal:

## 🚀 What's next for Remedia
We're genuinely just scratching the surface with Remedia. We have two features we plan on adding:
- Letting users take an image of their pill for search:  
- Creating a medication scheduler: 
