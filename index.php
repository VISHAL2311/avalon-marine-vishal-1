<html>
<head>
    <title>Form Html</title>
    <style>
        .required{
            color:red;
        }
    </style>
</head>
<body>
    <form action="" method="post" name="registration" id="registration">
        <input type="hidden" name="action" id="action" placeholder="action" value="<?php?>">
        <input type="hidden" name="id" id="id" placeholder="Id" value="<?php?>">
        <label>Name <span class="required">*</span></lable>
        <input type="text" name="name" id="name" placeholder="Name" value="<?php?>">
        <label>Email <span class="required">*</span></lable>
        <input type="email" name="email" id="email" placeholder="Email" value="<?php?>">
        <label>Phone Number <span class="required">*</span></lable>
        <input type="text" name="phone_no" id="phone_no" placeholder="Phone Number" value="<?php?>">
        <label>Username <span class="required">*</span></lable>
        <input type="text" name="username" id="username" placeholder="Username" value="<?php?>">
        <label>Gender <span class="required">*</span></label>
        <input type="radio" name="gender" value="Male" <?php ?>>
        <input type="radio" name="gender" value="Female" <?php?>>
        <label>Password <span class="required">*</span></lable>
        <input type="password" name="password" id="password" placeholder="Password" value="<?php?>">
        <label>Confrim Password <span class="required">*</span></lable>
        <input type="password" name="c_password" id="c_password" placeholder="Confrim Password" value="<?php?>">

        <button type="submit" name="save" id="save">Save</button>
    </form>
</body>
<script>
    jquery(document).ready(function(){
        alert("hii");
    });
</script>
</html>