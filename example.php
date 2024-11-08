<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="src/tabs.js"></script>

</head>
<body>

    <!-- Navigation Menu -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Example</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="tablinks">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link tablink active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link tablink" href="examplepages/about.php">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link tablink" href="examplepages/services.php">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link tablink" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-5 tabcontnet" id="tabcontent">
        Example page content
    </div>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>    
        const Tabmenu = new Tabs({
            tablinksClass: ".tablink",
            containerId: "tabcontent",
            activeTab: 0
        });
    </script>   
</body>
</html>
