# What To Improve
1.We can implement autologin and autologout functionality based on token expire time.
2.On Login functionality we can use Auth Guard for security purpose.
3.We can add new feature of loading spinner till the time auth service return response.
4.We can implement error handling functionality so that we can handle failure of anonymous user login and show specific message.
5.Implementation of auth user token for api calls using Http interceptors so that when user has authenticated token then only it will redirect to landing page
i.e is one gap now in app
6.We can avoid unwanted api call if user data is present in store

# Instructions to execute code and run tests.
Step 1-Download Nodejs and install it on your machine
Step 2-Open Prject on your machine and run npm install -g @angular/cli
step 3-run command npm install
Step 4-Make sure you have all required packages to run the application if not install it.
Step 5-run command ng build
Step 6-run command ng serve --o
Step 7-To test code coverage run command ng test 
Step 8-Once you run the app,login with username-test@ibm.com and password:123456 which is stored in firebase as user.
