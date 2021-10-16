<!-- ABOUT THE PROJECT -->
## About The Project

This project is consists of a very basic clone of reddit. It's a website where you can make and view and vote posts, you or some body else made.

Features:
* Register
* Login
* Logout
* Create posts
* Up/Down vote posts
* Edit posts
* Recover lost passwords

This website features cookie authentication for security.



### Built With

Those are the frameworks/libraries used to build this website client.

* [Next.js](https://nextjs.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Chakra-UI](https://chakra-ui.com/)
* [Formik](https://formik.org/)
* [Graphql Code Generator](https://www.graphql-code-generator.com/)



<!-- GETTING STARTED -->
## Getting Started

In order to try this locally you you will need to also download and run the [server side](https://github.com/CristianCiubancan/reddit-server).

### Prerequisites

To run this project you will need to do the following:
* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CristianCiubancan/reddit-client
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Enter your API in `.env.local`
   ```.env.local
   NEXT_PUBLIC_API_URL=YOUR_API_ENDPOINT
   ```
4. Run the client
   ```sh
   yarn dev
   ```
