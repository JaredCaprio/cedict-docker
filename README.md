# Project Name

An api for the [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cedict) using docker to contain the mongo database and node server

## Prerequisites

Before running the project, ensure that you have the following prerequisites:

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/JaredCaprio/cedict-docker.git

   ```

2. Start the Docker containers:
   ```bash
   docker compose up -d
   ```

## Usage

Access the application in your web browser at http://localhost:8080.

The following endpoints are available for searching:

To search by Pinyin, use the following endpoint:

`GET /api/search/pinyin/'pinyin'`

Replace 'pinyin' with the desired Pinyin query with the tone numbers included. For example, to search for the Pinyin "ni3 hao3", the endpoint would be /api/search/pinyin/ni3%20hao3.

To search by Chinese characters, use the following endpoint:

`GET /api/search/characters/'characters'`

Replace 'characters' with the desired Chinese characters query. For example, to search for the characters "你好", the endpoint would be /api/search/characters/你好.
