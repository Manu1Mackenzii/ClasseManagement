export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password?: string
}

export const LOGIN_USER = {
    "success": true,
    "expires_in": 1671959754,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiZmlyc3ROYW1lIjoiTG91YW5nZSIsImxhc3ROYW1lIjoiQklaSSIsImVtYWlsIjoiaGVzcm9uQGxpdmUuZnIiLCJwaG9uZU51bWJlciI6IiszMzY2NDQ1OTI5MiIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJleHBpcmVzQXQiOjE2NzE5NTk3NTR9.yWfXzANFq7w5ArdhJB3zaTbjWypLRGq1--eAuUbSDCc"
}

export const LOGIN_ERROR = {
    "data": {
        "success": false,
        "message": "Incorrect credentials"
    }
};