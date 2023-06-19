# Community Application

## Table of Contents

- [Community Application](#community-application)
    - [Description](#description)
    - [Table of Contents](#table-of-contents)
    - [Features](#features)
    - [Installation](#installation)
        - [Requirements](#requirements)
        - [Setup](#setup)
            - [Client](#client)
            - [Dashboard](#dashboard)
            - [Application Programming Interface](#application-programming-interface)
    - [Links](#links)

## Description

This is a discord bot equipped with a user-friendly dashboard designed to help optimize and grow your community.
it offers an intuitive interface, allowing admins to easily change settings and customize the bot to compliment their
community. The dashboard provides comprehensive analytics, allowing admins to track the growth of their community
and even features an AI suggested action plan which updates every week based on the latest analytics.

## Technologies

- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [scss](https://sass-lang.com/)
- [NestJS](https://nestjs.com/)
- [DiscordJS](https://discord.js.org/)
- [openai](https://openai.com/)
- [TypeORM](https://typeorm.io/#/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [PassportJS](http://www.passportjs.org/)
- [Apollo](https://www.apollographql.com/)

## Features

- **Dashboard** - A user-friendly dashboard designed to help optimize and grow your community.
- **Bot** - A discord bot that can be customized to compliment your community.
    - **Levels**
    - **Birthday**
    - **Dynamic Voice Channels**
    - **More to come...**
- **Markdown generator** - A markdown generator that allows you to easily create and edit markdown files to customize
  your bot.
- **API** - A graphql api that allows the dashboard to communicate with the bot.
- **Database** - A fully scalable database that stores all the data for the bot.

## Installation

### Requirements

- PostgreSQL
- NodeJS
- Git

### Setup

1. Clone the repository
   ```shell
   git clone https://github.com/Lyttle-Development/Community.git
   ```

#### Client

2. Navigate to the client directory
   ```shell
   cd client
   ```
3. Install the dependencies
   ```shell
   npm ci
   ```
4. Build the client
   ```shell
    npm run setup
    ```

#### Dashboard

2. Navigate to the dashboard directory
   ```shell
   cd dashboard
   ```
3. Install the dependencies
   ```shell
    npm ci
    ```
4. Build the dashboard
    ```shell
     npm run build
     ```
5. Start the dashboard
   ```shell
    npm run start
    ```

#### Application Programming Interface

2. Navigate to the api directory
   ```shell
   cd api
   ```
3. Install the dependencies
   ```shell
    npm ci
    ```
4. Build the api
    ```shell
     npm run build
     ```
5. Start the api
    ```shell
    npm run start
    ```

## Links

- [Dashboard](https://community.lyttledev.com) this takes you to the dashboard where you can login and manage your bot.
