<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OMDB DataTables Example</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">

    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <!-- DataTables JS -->
    <script type="text/javascript" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
</head>
<body>

<div class="container mt-5">
    <button class="btn btn-primary mb-3" id="addRow">Ajouter</button>
    <button class="btn btn-danger mb-3" id="deleteRows">Supprimer</button>

    <table class="table" id="moviesTable">
        <thead>
        <tr>
            <th></th>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
            <th>Poster</th>
        </tr>
        </thead>
        <tbody>
        <!-- DataTable content will be inserted here dynamically -->
        </tbody>
    </table>
</div>

<script>
    $(document).ready(function () {
        // DataTable initialization
        var table = $('#moviesTable').DataTable({
            ajax: {
                url: 'https://www.omdbapi.com/?s=batman&apikey=ac0f11fa', // Replace with your OMDB API key
                dataSrc: 'Search'
            },
            columns: [
                {data: null, defaultContent: '<input type="checkbox" class="row-select">'}, // Checkbox for row selection
                {data: 'Title'},
                {data: 'Year'},
                {data: 'Type'},
                {
                    data: 'Poster',
                    render: function (data, type, row) {
                        return '<img src="' + data + '" alt="' + row.Title + '" height="50">';
                    }
                }
            ]
        });

        // Add Row button click event
        $('#addRow').on('click', function () {
            table.row.add({
                Title: 'New Movie',
                Year: '2023',
                Type: 'Action',
                Poster: 'https://via.placeholder.com/50'
            }).draw();
        });

        // Delete Rows button click event
        $('#deleteRows').on('click', function () {
            table.rows('.selected').remove().draw(false);
        });

        // Row selection
        $('#moviesTable tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });
    });
</script>

</body>
</html>
