# [Impreda](https://impreda.vercel.app/) - fashion shopping app 👕
## About
### Introduction
Impreda is a fullstack shopping app created by me from the scratch. It was a part of my final degree project along side a ~7100 word report I wrote about it. 
I had complete autonomy and creative freedom over it. Everything from the idea to the technologies used was decided by me.

### Why shopping app? 🤔
As a Software Engineering major, I faced the challenge of balancing my passion for fashion and art alongside my studies. However, I refused to let these interests remain separate. I saw an opportunity to merge coding and fashion, which led me to embark on the creation of Impreda. My long-standing dream has been to establish my own clothing brand, and working on Impreda brings me closer to that goal. Through this project, I gained valuable insights into the requirements and necessities of developing a fashion-focused application. Even if I don't end up using Impreda directly, it has undoubtedly been one of the most rewarding coding experiences I've had so far, providing me with valuable lessons and knowledge.

### What exactly Impreda is? 🧐
Impreda is envisioned as a high-end fashion shopping application, with its beginning rooted in my evolving fascination for the industry. The app was meant to be scalable, fast and easy-to-use for the user. But most importantly I aimed for a luxurious vibe of the site. Taking these two things into account I took a minimalistic approach to Impreda, treating the site as a "canvas" and products as "paint". I wanted the products to truly shine, so I made sure to maximize the available space and create an almost "window shopping" online experience.

## Design
Apart from programming, I invested a lot of time and effort into the design phase. I had a clear vision in mind and drew inspiration from various sources (Balenciaga, Carhartt, SSense). However, due to the project's deadline, I couldn't design everything in advance. Some elements had to be created on the spot. I highly recommend checking out the [Figma](https://www.figma.com/file/ZzXiwQ0kUZEunwYxD4lg14/Impreda---second-iteration?type=design&node-id=0%3A1&t=EBb5TKKLN66MhXwV-1) prototype I made for Impreda, as it demonstrates the result of my creative work.

## Admin functionality 👮🏽
Since the Admin Panel is not accessible to regular users, I have created a [10-minute video](https://youtu.be/r75RUcLIgEo) where I walk through all the functionalities it offers.
## Technologies and tools
- **T3-Stack** 🥞
  - TypeScript
  - NextJS
  - tRPC
  - Prisma
  - TailwindCSS
  - NextAuth.js
- **Deployment and database** 🌐
  - Vercel deployment
  - PlanetScale for hosting the database
- AWS S3 Bucket for storing the images 🖼️
- Configured ESLint, Prettier, Husky and Github Actions ♻️
- Designed in Figma 🖌️

## Running Impreda locally
- You would have to have AWS, PlanetScale and Console Cloud Google account.
- Have a look at [`.env.local.example`](./.env.local.example), and fill out you `.env` file based on it
- yarn
- yarn db
- yarn dev
