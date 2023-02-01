<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login / Register</title>
</head>
<body>
<h1>Register</h1>
<form action="http://localhost:3000/auth/register" method="post" enctype="application/json">
    <input type="text" name="firstname" placeholder="Firstname"><br>
    <input type="text" name="lastname" placeholder="Lastname"><br>
    <input type="email" name="email" required placeholder="Email"><br>
    <input type="password" name="password" required placeholder="Password"><br>
    <input type="submit" value="submit">
</form>

<h1>Login</h1>
<form action="http://localhost:3000/auth/login" method="post" enctype="application/json">
    <input type="email" name="email" placeholder="email" required><br>
    <input type="password" name="password" placeholder="password" required><br>
    <input type="submit" value="submit">
</form>

<h1>Logout</h1>
<form action="http://localhost:3000/auth/logout" method="post" enctype="application/json">
    <input type="submit" value="submit">
</form>
</body>
</html>
