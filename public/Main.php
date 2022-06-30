<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="A cool web library for building fast PHP pages">
    <title></title>
    <link rel="stylesheet" href="app/css/global.css">
    <script src="app/Pages/<?= $_POST["js"] ?>.js" type="module"></script>

</head>
<body>
<div id="app" data-rubellite-props='<?= json_encode($_POST["props"])  ?>'>

</div>

</body>
</html>