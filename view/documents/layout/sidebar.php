<style>
    .duration-1 {
        transition-duration: 0.2s;
    }
</style>
<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark position-relative accordion duration-1" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center d-md-block" href="../../index.php">
        <div class="sidebar-brand-text mx-3">LJT</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="index.php">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>ภาพรวม</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        ข้อมูล
    </div>




    <li class="nav-item">
        <a class="nav-link" href="showquotation.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['quotation'] ?></span></a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="showproduction_planning.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['production_planning'] ?></span></a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="showreceipt.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['receipt'] ?></span></a>
    </li>

    <!-- <li class="nav-item">
        <a class="nav-link" href="depositReport.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['bill_sale'] ?></span></a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="paymentReport.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['bill_deposit'] ?></span></a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="summarydailyReport.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['delivery_slip'] ?></span></a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="reportByinvoice.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['Invoice'] ?></span></a>
    </li>

    

    <li class="nav-item">
        <a class="nav-link" href="reportByinvoice.php">
            <i class="fas fa-fw fa-file-text"></i>
            <span><?php echo $content_lang['production_order'] ?></span></a>
    </li> -->

    <!-- <li class="nav-item">
        <a class="nav-link" href="#">
            <i class="fas fa-fw fa-file-text"></i>
            <span>System Logs</span></a>
    </li> -->

    <!-- <li class="nav-item">
        <a class="nav-link" href="logout.php">
            <i class="fas fa-fw fa-sign-out"></i>
            <span>ลงชื่อออก</span></a>
    </li> -->

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline position-absolute top-50 start-100 translate-middle">
        <button class="rounded-circle border-1 border-white bg-gradient-primary" id="sidebarToggle"></button>
    </div>

</ul>
<!-- End of Sidebar -->