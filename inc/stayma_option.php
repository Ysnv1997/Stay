<?php
$themename = "stay";
$shortname = "stay";
$options = array (

    array(
        "name" => "首页描述 Description",
        "id" => $shortname."_description",
        "type" => "textarea",
        "std" => "它将显示在首页的 meta 标签的 description 属性里"
    ),
    array(
        "name" => "首页关键字 KeyWords",
        "id" => $shortname."_keywords",
        "type" => "textarea",
        "std" => "它将显示在首页的 meta 标签的 keywords 属性里。多个关键字以英文逗号隔开。"
    ),
    array(
        "type" => "hr",
    ),
    array(
        "name" => "默认大图图片地址",
        "id" => $shortname."_topBg",
        "type" => "text",
        "std" => "",
    ),
    array(
        "name" => "文章标题下方公告",
        "id" => $shortname."_Notice",
        "type" => "text",
        "std" => "建议文字内容不要过多",
    ),
    array(
        "name" => "公告颜色",
        "id" => $shortname."_Notice_color",
        "type" => "color",
        "std" => "#fff",
        "explain" => "首页标题以及内容页标题和公告文字颜色|默认白色#fff",
    ),
    array(
        "name" => "无图时大图底色",
        "id" => $shortname."_color",
        "type" => "text",
        "std" => "linear-gradient(to top right, rgb(129, 174, 205) 0%, rgb(101, 158, 197) 100%)",
        "explain" => "默认采用linear-gradient样式，同时支持十六进制颜色代码",
    ),
    array(
        "name" => "标题颜色",
        "id" => $shortname."_title_color",
        "type" => "color",
        "std" => "#fff",
        "explain" => "首页标题以及内容页标题和公告文字颜色|默认白色#fff",
    ),
    array(
        "type" => "hr",
    ),
    // array(
    //     "name" => "Weibo地址",
    //     "id" => $shortname."_weibo_url",
    //     "type" => "text",
    //     "std" => "https://weibo.com/782622",
    // ),
    // array(
    //     "name" => "Twitter地址",
    //     "id" => $shortname."_twitter_url",
    //     "type" => "text",
    //     "std" => "https://twitter.com/JieTangOK",
    // ),
    // array(
    //     "name" => "Facebook地址",
    //     "id" => $shortname."_facebook_url",
    //     "type" => "text",
    //     "std" => "https://www.facebook.com/jietangok",
    // ),
    // array(
    //     "name" => "GitHub地址",
    //     "id" => $shortname."_github_url",
    //     "type" => "text",
    //     "std" => "https://github.com/Jarvis-Tang",
    // ),
    array(
        "type" => "hr",
    ),
    array(
        "name" => "备案号",
        "id" => $shortname."_record",
        "type" => "text",
        "std" => "",
    ),
    array(
        "name" => "年份",
        "id" => $shortname."_company",
        "type" => "text",
        "std" => "2018",
    ),
    array(
        "name" => "统计代码（页脚）",
        "id" => $shortname."_tongji",
        "type" => "textarea",
        "std" => "代码在页面底部，统计标识不会显示，但不影响统计效果"
    ),

);
function mytheme_add_admin() {
    global $themename, $shortname, $options;
    if ( $_GET['page'] == basename(__FILE__) ) {
        if ( 'save' == $_REQUEST['action'] ) {
            foreach ($options as $value) {
            update_option( $value['id'], $_REQUEST[ $value['id'] ] ); }
            foreach ($options as $value) {
            if( isset( $_REQUEST[ $value['id'] ] ) ) { update_option( $value['id'], $_REQUEST[ $value['id'] ]  ); } else { delete_option( $value['id'] ); } }
            header("Location: themes.php?page=stayma_option.php");
            die;
        } else if( 'reset' == $_REQUEST['action'] ) {
            foreach ($options as $value) {
                delete_option( $value['id'] );
                update_option( $value['id'], $value['std'] );
            }
            header("Location: themes.php?page=stayma_option.php");
            die;
        }
    }
    add_theme_page($themename." 设置", "$themename 设置", 'edit_themes', basename(__FILE__), 'mytheme_admin');
}
function mytheme_admin() {
    global $themename, $shortname, $options;
    if ( $_REQUEST['saved'] ) echo '<div id="message" class="updated notice is-dismissible"><p>'.$themename.' 设置已保存。</p></div>';
?>

<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css">

<div class="container-fluid">
    <h2 class=""><?php echo $themename; ?> <a href="https://www.stayma.cn/stay-style" target="_blank" data-toggle="tooltip" data-placement="bottom" title="点击查看更新"><span class="text-muted">v1.0.0</span></a></h2>
    <hr class="wp-header-end">
    <hr>
    <form class="form-horizontal" method="post">
    <?php foreach ($options as $value) {
        if ($value['type'] == "text") { ?>
        <div class="form-group">
            <label for="options" class="col-sm-2 control-label"><?php echo $value['name']; ?></label>
            <div class="col-sm-10">
                <input class="form-control" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?>" />
            </div>
        </div>
        <?php } elseif ($value['type'] == "textarea") { ?>
        <div class="form-group">
            <label for="options" class="col-sm-2 control-label"><?php echo $value['name']; ?></label>
            <div class="col-sm-10">
                <textarea class="form-control" rows="3" name="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" ><?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?></textarea>
            </div>
        </div>
        <?php } elseif ($value['type'] == "color") { ?>
        <div class="form-group">
            <label for="options" class="col-sm-2 control-label"><?php echo $value['name']; ?></label>
            <div class="col-sm-3">
                <input name="<?php echo $value['id']; ?>" class="input-color" type="text"  value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?>" />
            </div>
            <div class="col-sm-6">
                <p class="form-control-static"><?php echo $value['explain']; ?></p>
            </div>
        </div>
        <?php } elseif ($value['type'] == "select") { ?>
        <div class="form-group">
            <label for="options" class="col-sm-2 control-label"><?php echo $value['name']; ?></label>
            <div class="col-sm-2">
                <select class="form-control" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
                    <?php foreach ($value['options'] as $option) { ?>
                    <option value="<?php echo $option;?>" <?php if (get_settings( $value['id'] ) == $option) { echo 'selected="selected"'; } ?>>
                        <?php
                        if ((empty($option) || $option == '' ) && isset($value['option'])) {
                            echo $value['option'];
                        } else {
                            echo $option;
                        }
                        ?>
                    </option>
                    <?php } ?>
                </select>
            </div>
        </div>
        <?php } elseif ($value['type'] == "hr") { ?>
        <hr>
        <?php } ?>
    <?php } ?>
    <div class="form-group" style="margin-top:50px;">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary" name="save"> 保存 </button>
            <input type="hidden" name="action" value="save" />
        </div>
    </div>
    </form>
</div>
<script src="https://cdn.bootcss.com/jquery/1.12.2/jquery.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.js"></script>
<script>
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});
$(function () {
    $('[class="input-color"]').wpColorPicker();
});
</script>

<?php
}
add_action('admin_menu', 'mytheme_add_admin');
?>