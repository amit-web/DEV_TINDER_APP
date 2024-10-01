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
<!-- -POST /request/send/intrested/:userId -->
<!-- -POST /request/send/ignored/:userId -->
<!-- -POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId -->


-POST /request/send/status/:userId
-POST /request/review/status/:requestId


# userRouter
-GET /user/connections
-GET /user/request/received
-GET /feed - Gets you the profiles of other user on platforms




Status : ignored,intrested, accpted, rejected