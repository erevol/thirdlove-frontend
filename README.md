# Frontend Thirdlove

- Webpack
- React
- Axios
- SASS

### Other libraries

- React Slick
- React Image Magnify

## Get started

```
git clone https://github.com/erevol/thirdlove-frontend.git
cd thirdlove-frontend
npm install
npm start
 ```

# Brief Report about the Tech Stack

## Libraries

### React + Webpack + Babel + SASS with BEM
According to the requirements I needed a scaffold for the project capable of transpile all my ES6 code plus SASS.
I started researching on webpack config configuration and went for a minimal approach to meet requirements.
I chose SASS + BEM to do the styling because this is the correct methodology to use when you are working on larger projects to better understand the structure and the styling going on.

### Axios
I used this powerful library to fetch the endpoint. I like that you don’t have to call twice to json the data from the response.

### React Slick and React Magnify
I digged into Google to find any library that could work for this and I found these two that can be combined and do the work. I had to read the documentation of both libraries and understand the props.

### Project Steps

- Scaffold creation
- Fetching data from the endpoint
- Rendering some props to test the data coming from the endpoint
- Start to structure the page and splitting into components
- Work on styling
- Start working on the functions needed to calculate variants
- More work on styling
- Run build for production
- Deploy to bitbucket