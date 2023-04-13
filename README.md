# BookWard

- *TUES Graduation Thesis for 2023*

BookWard is a web application that allows users to search for books and add them to their personal library. Users can also add their friends and send them book recommendations. The application is built with Nuxt.js 3 and uses a dataset from GoodReads (containing more than 52 000 books) to deliver book data.📕

- [BookWard](#bookward)
  - [Features](#features)
  - [Demo](#demo)
  - [Setup](#setup)
  - [Development Server](#development-server)

## Features
The platform aims to be more like a social network. That is why it has the following features:

- Book recommendations based on a starting point (book) 📚 

    The user can  receive recommendations based on the book's genre, author, or a combination of both.

- Searching using multiple filters (title, author, genre, etc.) 🔎

    This allows the user to find the book they are looking for more easily.

- Adding friends and sending them book recommendations 🙋‍♂️ 

    The user can also see the recommendations that their friends have sent them.

- Keywords based on books reviews 🈁
    
    Every book has unique keywords set based on the emotions in the reviews. For example if many people have written that the book is funny and hilarious, then the keyword "funny" will be shown before the reviews section.

- Reviews and ratings 📝

    The user can write a review and rate the book. The review will be shown in the book's page and the rating will be used to calculate the book's average rating.

## Demo
- Landing Page
![alt text](https://raw.githubusercontent.com/Book-Ward/bookward-client/main/public/main-page.png)

- Explore Page
![alt text](https://raw.githubusercontent.com/Book-Ward/bookward-client/main/public/explore-page.png)

- Sample Book Page
![alt text](https://raw.githubusercontent.com/Book-Ward/bookward-client/main/public/book-page.png)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

