# DevTinder API'S
//authRouter
-POST /SignUp
-POST /login
-POST /logout


# profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

# connectionRequestRouter
-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

# userRouter
-GET /user/connections
-GET /user/request
-GET /feed - Gets you the profiles of other user on platforms




Status : ignore,intrested, accpted, rejected