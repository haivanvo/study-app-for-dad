This app is for my dad's post-stroke language recovery, deployed as a PWA with Google AI Studio assisting in the development process. I don't come from a web/app development background, so this project was a fun learning experience for me. My goal wasn't to build the perfect app, but to create something my dad would genuinely enjoy using, since existing language-learning apps were often either too childish and distracting or too generic for his needs.

P.S. He likes it! ^^ One of his favorite lessons is learning how to read and say the names of family members.

# Demo ⋆˚࿔

https://study-app-for-dad.vercel.app

# Run locally ⋆˚࿔

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy the example environment file and add your API key:
   `cp .env.example .env.local`
   Then open `.env.local` and set `GEMINI_API_KEY` to your Gemini API key
3. Run the app:
   `npm run dev`

-----------

**Note**: This was built with significant help from Google AI Studio for the initial implementation, with my own changes layered on top as I tested and iterated. Please be kind if you peek under the hood ‹𝟹
