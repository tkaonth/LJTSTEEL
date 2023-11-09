<?php
session_start();
if (!isset($_SESSION["locale"])) {
    $_SESSION["locale"] = "th";
}
$content_lang = include '../../lang/' . $_SESSION["locale"] . '.php';
$calender = include '../../lang/calender_' . $_SESSION["locale"] . '.php';

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
        <link href="../../asset/css/sb-admin-2.min.css" rel="stylesheet">
        <script src="https://kit.fontawesome.com/0e3cae3b86.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.12.1/datatables.min.css" />
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.12.1/datatables.min.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
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
                                <b class="align-middle pl-md-5"><?php echo $content_lang['summarydailyReport'] ?></b>
                            </div>
                            <div class="ml-md-auto pr-md-5">
                                <form action="post" class="d-flex align-items-center ml-md-auto">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="Selectlanguage"><?php echo $content_lang['selectlanguage'] . " : " ?></label>
                                        </div>
                                        <select class="custom-select" id="Selectlanguage">
                                            <option value="th" <?php if ($_SESSION['locale'] == "th") { echo "selected"; } ?>><?php echo $content_lang['th'] ?></option>
                                            <option value="lao"<?php if ($_SESSION['locale'] == "lao") { echo "selected"; } ?>><?php echo $content_lang['lao'] ?></option>
                                            <option value="en" <?php if ($_SESSION['locale'] == "en") { echo "selected"; } ?>><?php echo $content_lang['en'] ?></option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">
                        <div class="p-2 d-flex flex-column flex-lg-row">
                            <div class="d-flex flex-column flex-md-row gap-2 col-xl-8 p-0">
                                <div class="p-0 d-flex flex-column flex-md-row col-12 col-md-6 gap-2">
                                    <input id="daterange" name="daterange" type="text" autocomplete="off"
                                            class="form-control datepicker datepicker-dropdown flatpickr-input my-lg-auto">
                                    <button type="submit" id="find_button" class="btn btn-primary my-lg-2"><?php echo $content_lang['find'] ?></button>
                                </div>
                                <div class="d-flex text-center align-item-center p-0 col-12 col-lg-6 col-xl-4">
                                    <form action="post" class="d-flex flex-lg-row align-items-center col-12 col-md-6 col-lg-10 p-0">
                                        <div class="input-group d-flex col-12 p-0">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="SelectBranch"><?php echo $content_lang['selectBranch'] . " : " ?></label>
                                            </div>
                                            <select class="custom-select" id="SelectBranch">
                                                <option value="All"><?php echo $content_lang['selectAll'] ?></option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <button type="submit" onclick="exportToExcel()" class="mt-2 mb-2 btn btn-primary ml-auto col-12 col-lg-2"><?php echo $content_lang['exportExcel'] ?></button>
                        </div>
                        <!-- Table -->
                            <div class="p-2">
                                <div class="table-responsive" style="max-height: 70vh; overflow-y: auto;">
                                    <table id="ReportTable"  class="table table-bordered border-primary text-nowrap">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th id="headerTable" class="border-primary" colspan="5"><?php echo $content_lang['summarydailyReport'] ?></th>
                                            </tr>
                                            <tr>
                                                <th class="border-primary"><?php echo $content_lang['list_number'] ?></th>
                                                <th class="border-primary"><?php echo $content_lang['list'] ?></th>
                                                <th class="border-primary"><?php echo $content_lang['moneyAmount'] ?></th>
                                                <th class="border-primary"><?php echo $content_lang['money'] ?></th>
                                                <th class="border-primary"><?php echo $content_lang['tranfer_bank'] ?></th>
                                            </tr>
                                        </thead>
                                        <tbody id="BodyTable" class="text-center">

                                        </tbody>
                                    </table>
                                </div>
                            </div>

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
        <script src="../../asset/js/sb-admin-2.min.js"></script>
    </body>
    <script>
        var calender = JSON.parse('<?php echo $calender; ?>');
        var loading = <?php echo json_encode($content_lang['loading']); ?>;
        var locale = "<?php echo $_SESSION['locale']; ?>";
        var BodyTable = document.getElementById("BodyTable");
        var TableHeaderText = "<?php echo $content_lang['summarydailyReport']; ?>";
        var SelectBranch = document.getElementById("SelectBranch");
        var sumText = <?php echo json_encode($content_lang['sum']); ?>;
        var total_Dailysales = 0;
        var total_Deposit_money = 0;
        var total_Deposit_tranfer = 0;
        var total_Sales_money = 0;
        var total_Sales_tranfer = 0;
        var sum_total_Dailysales = 0;
        var sum_total_Dailypay = 0;
        var sum_total_recive_net = 0;
        var sum_total_recive_money = 0;
        var sum_total_recive_tranfer = 0;
        var filterBranch = "All";
        var dataReport = "";
        var listname = [<?php echo json_encode($content_lang['listdailysale']); ?>,
                        <?php echo json_encode($content_lang['listdeposit_money']); ?>,
                        <?php echo json_encode($content_lang['listdeposit_tranfer']); ?>,
                        <?php echo json_encode($content_lang['listsale_money']); ?>,
                        <?php echo json_encode($content_lang['listsale_tranfer']); ?>,
                        <?php echo json_encode($content_lang['totaldaily_recive']); ?>,
                        <?php echo json_encode($content_lang['totaldaily_pay']); ?>,
                        <?php echo json_encode($content_lang['totaldaily_net']); ?>,
                        <?php echo json_encode($content_lang['total_revice_by_type']); ?>,

                        ];
    </script>
    <script src="../../js/createbranchselect_submenu.js"></script>
    <script src="../../js/selectlanguage_submenu.js"></script>
    <script src="../../js/flatpickrSetup.js"></script>
    <script src="../../js/summarydailyreport.js"></script>
    </html>