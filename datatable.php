<!DOCTYPE html>
<html>
<head>
    <title>DataTable avec OMDB API</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
</head>
<body>
    <table id="movies" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Titre</th>
                <th>Année</th>
                <th>Genre</th>
                <th>Résumé</th>
                <th>Acteurs</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <script>
        $(document).ready(function () {
            $('#movies').DataTable({
                "ajax": {
                    "url": "api.php", // Remplacez par l'URL de votre script API
                    "dataSrc": "Search"
                },
                "columns": [
                    {"data": "Title"},
                    {"data": "Year"},
                    {"data": "Genre"},
                    {"data": "Plot"},
                    {"data": "Actors"}
                ]
            });
        });
    </script>
</body>
</html>

<?php

if(isset($_GET['search'])) {
    $search = $_GET['search'];
    $apiKey = 'ac0f11fa'; // Remplacez par votre clé OMDB API

    $url = "http://www.omdbapi.com/?s=" . urlencode($search) . "&apikey=" . $apiKey;
    $response = file_get_contents($url);
    echo $response;
} else {
    echo "Requête invalide.";
}
