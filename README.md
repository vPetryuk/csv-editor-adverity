# Next template repository

This template is intended for building Next apps from it

### This template includes

1. Next @12.3.1
2. Typescript @4.8.4

### Project requirements

1. Docker
2. Docker-compose
3. Yarn
4. Node v.16+

## Template usage:

In order to configure the project based on this template, you need to run the following commands:

1. Create new repository on remote server (GitHub, GitLab, etc.)
2. Open terminal and run the following commands:

```bash
    git clone https://gitlab.com/ordergroupco/nextjs-typescript-boilerplate.git your_new_repo
```

```bash
    cd your_new_repo
```

```bash
    git remote set-url origin https://gitlab.com/user.name/your_new_repo.git
```
```bash
    git branch dev
```
```bash
    git checkout dev
```
```bash
    git push
```
3. Your new repository is ready to use. You can now create merge request from dev to main branch.
# Project run:

By default, the docker image has a `next_template` name. If you want to change it, you need to change the name in the
`docker-compose.yml` file.

## Docker run

### Docker Production

```bash
    docker-compose -f docker-compose.prod.yml up -d --build
```

### Docker Development

```bash
    docker-compose up -d --build
```

### Docker Production Static

1. In next.config.js uncomment this line:
   ```
   // images: {
   //   unoptimized: true,
   // },
   ```
2. Open terminal and run 'yarn export' so output static files will be generated in 'out' folder.
3. When above is done run:
   ```bash
   docker-compose -f docker-compose.prod.static.yml up -d --build
   ```

Docker build and run project on the address `http://localhost:3000`.

## Manual run

### Next service (local):

1. `yarn install` - to install all the required dependencies.
2. `yarn dev` - to start the server.
3. `yarn build` - to build the project
