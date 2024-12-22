# DaSe Lab Website Guide

## Description

## Prerequisites
- Install [Node.js](https://nodejs.org/).
- Run the following commands:

    ```
    git clone https://github.com/Data-Semantics-Laboratory/DaSe-Lab-Website.git

    cd Dase-Lab-Website

    npm install --global yarn && yarn install
    ```

## Running the Server
To start the development server with hot module reloading, run `yarn run start`. To create and serve a production build, run `yarn build && yarn serve`.

## Environment Variables
Both `yarn serve` and `yarn run start` run at `http://localhost:3000` by default. In order to run the server at a specific address, pass the enviornment flag `ADDRESS=XXXX`, where `XXXX` is your address string containing the relevant IP and port number. 

For example, to run the server on all adapters at port `5000`, you can issue one of the following commands:

- `ADDRESS=0.0.0.0:5000 yarn run start`
- `yarn build && ADDRESS=0.0.0.0:5000 yarn serve`

