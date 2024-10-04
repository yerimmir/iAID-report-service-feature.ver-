FROM node:14.16.0

WORKDIR ~/iaid-reportform-image

COPY package.json ./
COPY package-lock.json ./

# install
RUN npm install

# 전체 source code 복사
COPY ./ ./

# expose port
EXPOSE 3000

# 실행
CMD ["npm", "start"]