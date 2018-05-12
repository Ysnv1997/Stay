<?php
/**
 * @Author: Alamr
 * @Date:   2018-05-12 18:52:11
 * @Last Modified by:   Alamr
 * @Last Modified time: 2018-05-12 19:20:20
 */
add_theme_support('post-thumbnails');
register_nav_menus(array(
    'top' => '顶部菜单',
    'footer' => '页脚菜单'
));
add_filter('pre_option_link_manager_enabled', '__return_true');
add_filter('wp_revisions_to_keep', 'specs_wp_revisions_to_keep', 10, 2);
function specs_wp_revisions_to_keep($post) {
    return 0;
}
function wpbeginner_remove_version() {
    return;
}
//去除头部无用代码
add_filter('show_admin_bar', '__return_false');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'locale_stylesheet');
remove_action('wp_head', 'noindex', 1);
remove_action('wp_head', 'wp_print_head_scripts', 9);
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'wp_oembed_add_host_js');
remove_action('wp_head', 'wp_resource_hints', 2);
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('wp_footer', 'wp_print_footer_scripts');
remove_action('publish_future_post', 'check_and_publish_future_post', 10, 1);
remove_action('template_redirect', 'wp_shortlink_header', 11, 0);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);
remove_action('rest_api_init', 'wp_oembed_register_route');
remove_filter('rest_pre_serve_request', '_oembed_rest_pre_serve_request', 10, 4);
remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
remove_filter('oembed_response_data', 'get_oembed_response_data_rich', 10, 4);
add_filter('rest_enabled', '__return_false');
add_filter('rest_jsonp_enabled', '__return_false');
//禁用Emoji表情
function disable_emojis() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
}
add_action('init', 'disable_emojis');
function disable_emojis_tinymce($plugins) {
    if (is_array($plugins)) {
        return array_diff($plugins, array(
            'wpemoji'
        ));
    } else {
        return array();
    }
}
//移除菜单的多余CSS选择器
add_filter('nav_menu_css_class', 'my_css_attributes_filter', 100, 1);
add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1);
add_filter('page_css_class', 'my_css_attributes_filter', 100, 1);
function my_css_attributes_filter($var) {
    return is_array($var) ? array() : '';
}
//SMTP邮箱设置
function mail_smtp( $phpmailer ){
    $phpmailer->From = "ysnv1997@163.com"; //发件人
    $phpmailer->FromName = "Stay Ma"; //发件人昵称
    $phpmailer->Host = "smtp.163.com"; //SMTP服务器地址
    $phpmailer->Port = 25; //SMTP端口，常用的有25、465、587，具体谷歌百度
    $phpmailer->SMTPSecure = ""; //SMTP加密方式，常用的有SSL/TLS，具体谷歌百度
    $phpmailer->Username = "ysnv1997@163.com"; //邮箱帐号
    $phpmailer->Password = 'mA159753'; //邮箱密码
    $phpmailer->IsSMTP(); //使用SMTP发送
    $phpmailer->SMTPAuth = true; //启用SMTPAuth服务
}
add_action('phpmailer_init','mail_smtp');
//获取文章的评论人数
function zfunc_comments_users($postid = 0, $which = 0) {
    $comments = get_comments('status=approve&type=comment&post_id=' . $postid);
    if ($comments) {
        $i = 0;
        $j = 0;
        $commentusers = array();
        foreach ($comments as $comment) {
            ++$i;
            if ($i == 1) {
                $commentusers[] = $comment->comment_author_email;
                ++$j;
            }
            if (!in_array($comment->comment_author_email, $commentusers)) {
                $commentusers[] = $comment->comment_author_email;
                ++$j;
            }
        }
        $output = array(
            $j,
            $i
        );
        $which = ($which == 0) ? 0 : 1;
        return $output[$which];

    }
    return 0; //没有评论返回0

}
//字数统计功能
function count_words($text) {
    global $post;
    if ('' == $text) {
        $text = $post->post_content;
        if (mb_strlen($output, 'UTF-8') < mb_strlen($text, 'UTF-8')) $output.= mb_strlen(preg_replace('/\s/', '', html_entity_decode(strip_tags($post->post_content))) , 'UTF-8');
        return $output;
    }
}
//postviews
function get_post_views($post_id) {
    $count_key = 'views';
    $count = get_post_meta($post_id, $count_key, true);
    if ($count == '') {
        delete_post_meta($post_id, $count_key);
        add_post_meta($post_id, $count_key, '0');
        $count = '0';
    }
    echo number_format_i18n($count);
}
function set_post_views() {
    global $post;
    $post_id = $post->ID;
    $count_key = 'views';
    $count = get_post_meta($post_id, $count_key, true);
    if (is_single() || is_page()) {
        if ($count == '') {
            delete_post_meta($post_id, $count_key);
            add_post_meta($post_id, $count_key, '0');
        } else {
            update_post_meta($post_id, $count_key, $count + 1);
        }
    }
}
add_action('get_header', 'set_post_views');
//获取文章第一张图片
function catch_that_image() {
    global $post, $posts;
    $first_img = '';
    ob_start();
    ob_end_clean();
    $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
    $first_img = $matches[1][0];
    if (empty($first_img)) {
        return false;
    }
    return $first_img;
}
// 回复评论添加@
function idevs_comment_add_at($comment_text, $comment = '') {
    if ($comment->comment_parent > 0) {
        $comment_text = '<span id="AtName">@</span><a id="AtName" href="#comment-' . $comment->comment_parent . '">' . get_comment_author($comment->comment_parent) . '</a> ' . $comment_text;
    }
    return $comment_text;
}
add_filter('comment_text', 'idevs_comment_add_at', 20, 2);
// WordPress 文章内调用文章
function xx_insert_posts($atts, $content = null) {
    extract(shortcode_atts(array(
        'ids' => ''
    ) , $atts));
    global $post;
    $content = '';
    $postids = explode(',', $ids);
    $inset_posts = get_posts(array(
        'post__in' => $postids
    ));
    foreach ($inset_posts as $key => $post) {
        setup_postdata($post);
        $content.= '<div class="wp-embed-post"><a target="_blank" href="' . get_permalink() . '">';
        if (catch_that_image()) {
            $content.= '<div class="wp-embed-img"><img src="' . catch_that_image() . '" alt=""></div>';
        };
        $content.= '<div class="wp-embed-content"><div><p class="wp-embed-post-heading">' . wp_trim_words(get_the_title() , 22) . '
            </p>
            <div class="wp-embed-post-excerpt">' . wp_trim_words(get_the_content() , 100, '...') . '</div>
        </div>
      </div>
    </a>
</div>';
    }
    wp_reset_postdata();
    return $content;
}
add_shortcode('stayma_get_post', 'xx_insert_posts');
// 评论后可见
function reply_to_read($atts, $content = null) {
    extract(shortcode_atts(array(
        "notice" => '<p class="reply-to-read">温馨提示: 此处内容需要<a href="#respond" title="评论本文">评论本文</a>并刷新后才能查看.</p>'
    ) , $atts));
    $email = null;
    $user_ID = (int)wp_get_current_user()->ID;
    if ($user_ID > 0) {
        $email = get_userdata($user_ID)->user_email;
        //对博主直接显示内容
        $admin_email = '100954636@qq.com'; //博主Email
        if ($email == $admin_email) {
            return $content;
        }
    } else if (isset($_COOKIE['comment_author_email_' . COOKIEHASH])) {
        $email = str_replace('%40', '@', $_COOKIE['comment_author_email_' . COOKIEHASH]);
    } else {
        return $notice;
    }
    if (empty($email)) {
        return $notice;
    }
    global $wpdb;
    $post_id = get_the_ID();
    $query = "SELECT `comment_ID` FROM {$wpdb->comments} WHERE `comment_post_ID`={$post_id} and `comment_approved`='1' and `comment_author_email`='{$email}' LIMIT 1";
    if ($wpdb->get_results($query)) {
        return do_shortcode($content);
    } else {
        return $notice;
    }
}
add_shortcode('reply', 'reply_to_read');
//新建说说功能
add_action('init', 'my_custom_init');
function my_custom_init()
{ $labels = array( 'name' => '说说',
'singular_name' => '说说',
'add_new' => '发表说说',
'add_new_item' => '发表说说',
'edit_item' => '编辑说说',
'new_item' => '新说说',
'view_item' => '查看说说',
'search_items' => '搜索说说',
'not_found' => '暂无说说',
'not_found_in_trash' => '没有已遗弃的说说',
'parent_item_colon' => '', 'menu_name' => '说说' );
$args = array( 'labels' => $labels,
'public' => true,
'publicly_queryable' => true,
'show_ui' => true,
'show_in_menu' => true,
'exclude_from_search' =>true,
'query_var' => true,
'rewrite' => true, 'capability_type' => 'post',
'has_archive' => false, 'hierarchical' => false,
'menu_position' => null, 'supports' => array('editor','author','title', 'custom-fields') );
register_post_type('shuoshuo',$args);
}
//评论回复邮件
function comment_mail_notify($comment_id) {
    $comment = get_comment($comment_id);
    $parent_id = $comment->comment_parent ? $comment->comment_parent : '';
    $spam_confirmed = $comment->comment_approved;
    if (($parent_id != '') && ($spam_confirmed != 'spam')) {
    $wp_email = 'no-reply@' . preg_replace('#^www\.#', '', strtolower($_SERVER['SERVER_NAME']));//发件人e-mail地址，no-reply可改为可用的e-mail
    $to = trim(get_comment($parent_id)->comment_author_email);
    $subject = '您在 [' . get_option("blogname") . '] 的留言有了回应';
    $message = '<div style="border-right:#666666 1px solid;border-radius:8px;color:#111;font-size:12px;width:95%;border-bottom:#666666 1px solid;font-family:微软雅黑,arial;margin:10px auto 0px;border-top:#666666 1px solid;border-left:#666666 1px solid"><div class="adM">
    </div><div style="width:100%;background:#666666;min-height:60px;color:white;border-radius:6px 6px 0 0"><span style="line-height:60px;min-height:60px;margin-left:30px;font-size:12px">您在<a style="color:#00bbff;font-weight:600;text-decoration:none" href="' . get_option('home') . '" target="_blank">' . get_option('blogname') . '</a> 上的留言有回复啦！</span> </div>
    <div style="margin:0px auto;width:90%">
    <p><span style="font-weight:bold;">' . trim(get_comment($parent_id)->comment_author) . '</span>, 您好!</p>
    <p>您于' . trim(get_comment($parent_id)->comment_date) . ' 在文章《' . get_the_title($comment->comment_post_ID) . '》上发表评论: </p>
    <p style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">' . nl2br(get_comment($parent_id)->comment_content) . '</p>
    <p><span style="font-weight:bold;">' . trim($comment->comment_author) . '</span> 于' . trim($comment->comment_date) . ' 给您的回复如下: </p>
    <p style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">' . nl2br($comment->comment_content) . '</p>
    <p>您可以点击 <a style="color:#00bbff;text-decoration:none" href="' . htmlspecialchars(get_comment_link($parent_id)) . '" target="_blank">查看回复的完整内容</a></p>
    <p>感谢你对 <a style="color:#00bbff;text-decoration:none" href="' . get_option('home') . '" target="_blank">' . get_option('blogname') . '</a> 的关注，如您有任何疑问，欢迎在博客留言，我会一一解答</p><p style="color:#A8979A;">(此邮件由系统自动发出，请勿回复。)</p></div></div>';
    $from = "From: \"" . get_option('blogname') . "\" <$wp_email>";
    $headers = "$from\nContent-Type: text/html; charset=" . get_option('blog_charset') . "\n";
    wp_mail( $to, $subject, $message, $headers );
    }
}
add_action('comment_post', 'comment_mail_notify');





//添加HTML编辑器自定义快捷标签按钮
add_action('after_wp_tiny_mce', 'add_button_mce');
function add_button_mce($mce_settings) {
?>
<script type="text/javascript">
    QTags.addButton( 'hr', 'hr', "\n<hr />\n", "" );
    QTags.addButton( 'quote', '引用文章', "\n[stayma_get_post ids=??????]\n", "" );
    QTags.addButton( 'd-html', 'HTML高亮', "\n<pre class=\"line-numbers language-html\"><code class=\"language-html\">\n", "\n</code></pre>\n" );
    QTags.addButton( 'd-css', 'CSS高亮', "\n<pre class=\"line-numbers language-css\"><code class=\"language-css\">\n", "\n</code></pre>\n" );
    QTags.addButton( 'd-javascript', 'javascript高亮', "\n<pre class=\"line-numbers language-javascript\"><code class=\"language-javascript\">\n", "\n</code></pre>\n" );
    QTags.addButton( 'd-php', 'php高亮', "\n<pre class=\"line-numbers language-php\"><code class=\"language-php\">\n", "\n</code></pre>\n" );
    QTags.addButton( 'commLook', '评论后可见', "[reply]", "[/reply]\n" );
</script>
<?php
}; ?>
<?php
//自定义评论列表模板
function simple_comment($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment; ?>
   <li class="comment" id="li-comment-<?php
    comment_ID(); ?>">
   <div class="comment-<?php
    comment_ID(); ?>">
      <div class="media comment-body" id="comment-<?php
    comment_ID(); ?>">
        <div class="media-left">
            <?php
    if (function_exists('get_avatar') && get_option('show_avatars')) {
        echo get_avatar($comment, 48);
    } ?>
        </div>
        <div class="media-body">
          <?php
    printf(__('<p class="author_name">%s 说：</p>') , get_comment_author_link()); ?>
            <?php
    if ($comment->comment_approved == '0'): ?>
                <em>评论等待审核...</em><br />
        <?php
    endif; ?>
        <?php
    comment_text(); ?>
        </div>
      </div>
      <div class="comment-metadata">
        <span class="comment-pub-time">
          <?php
    echo get_comment_time('Y-m-d H:i'); ?>
        </span>
        <span class="comment-btn-reply">
        <i class="fa fa-reply"></i>
        <?php
    comment_reply_link(array_merge($args, array(
        'reply_text' => __('回复', 'tangstyle') ,
        'depth' => $depth,
        'max_depth' => $args['max_depth']
    ))); ?>
        </span>
      </div>
</div>
<?php
} ?>

