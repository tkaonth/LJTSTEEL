    <?php
session_start();
if (!isset($_SESSION["locale"])) {
    $_SESSION["locale"] = "th";
}
$content_lang = include './lang/' . $_SESSION["locale"] . '.php';
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name=apple-mobile-web-app-capable content=yes>
        <meta name=apple-mobile-web-app-status-bar-style content=black>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>LJTSTEEL</title>
        <meta name="msapplication-TileColor" content="#060714">
        <meta name="theme-color" content="#060714">
        <link href="asset/css/sb-admin-2.min.css" rel="stylesheet">
        <script src="https://kit.fontawesome.com/0e3cae3b86.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.12.1/datatables.min.css" />
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.12.1/datatables.min.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap');

            body {
                background-color: #f6f6f6;
                font-family: 'Prompt', sans-serif;
            }
        </style>
    </head>

    <body id="page-top">

        <!-- Page Wrapper -->
        <div id="wrapper">

            <?php include './layout/sidebar.php';?>

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow d-flex text-nowrap">

                        <!-- Sidebar Toggle (Topbar) -->
                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>

                        <!-- Topbar Navbar -->
                        <div class="d-flex flex-column mx-auto flex-md-row mx-md-0 col-md-12">
                            <div class="text-center my-auto">
                                <b class="align-middle pl-md-5"><?php echo $content_lang['dailyreport'] ?></b>
                            </div>
                            <div class="ml-md-auto pr-md-5">
                                <form action="post" class="d-flex align-items-center ml-md-auto">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="Selectlanguage"><?php echo $content_lang['selectlanguage'] . " : " ?></label>
                                        </div>
                                        <select class="custom-select" id="Selectlanguage">
                                            <option value="th" <?php if ($_SESSION['locale'] == "th") {
                                                echo "selected";
                                            }
                                            ?>><?php echo $content_lang['th'] ?></option>
                                                                                    <option value="lao"<?php if ($_SESSION['locale'] == "lao") {
                                                echo "selected";
                                            }
                                            ?>><?php echo $content_lang['lao'] ?></option>
                                                                                    <option value="en" <?php if ($_SESSION['locale'] == "en") {
                                                echo "selected";
                                            }
                                            ?>><?php echo $content_lang['en'] ?></option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">


                    </div>
                    <!-- /.container-fluid -->

                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; LJT <?=date('Y');?></span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <!-- Logout Modal-->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
        <!-- Custom scripts for all pages-->
        <script src="asset/js/sb-admin-2.min.js"></script>
    </body>
    <script src="js/selectlanguage.js"></script>
    </html>