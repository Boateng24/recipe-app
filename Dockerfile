FROM cypress/included
WORKDIR /app
COPY package.json /app
COPY . /app
RUN yarn
RUN $(yarn bin)/cypress verify
CMD ["yarn", "run", "test:run"]
