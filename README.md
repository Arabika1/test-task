# test-task

example of usage:
localhost:3000/api/v1/add-user //add new user
body: {
    "email": "test@gmail.com",
    "name": "test",
    "phoneNumber": "+123413"
}

localhost:3000/api/v1/auth/login //authorize account
body: {
    "email": "test@gmail.com"
}

localhost:3000/api/v1/users
localhost:3000/api/v1/get-user/:id
//need to be authorized to receive response

to start project use this command
docker-compose up --build 

after cloning repository rename .env.example to .env 
