<?php
/**
 * @Author: Alamr
 * @Date:   2018-05-05 14:15:23
 * @Last Modified by:   Alamr
 * @Last Modified time: 2018-05-13 11:29:10
 */
?>
<!-- blogSidebar -->
<div class="blogSidebar">
    <!-- 搜索 -->
    <form class="Alaeym-header-search" action="<?php echo home_url( '/' ); ?>" method="GET">
      <span class="input input--haruki">
            <input class="input__field input__field--haruki" type="text" id="input-1" name="s" />
            <label class="input__label input__label--haruki" for="input-1">
                <span class="input__label-content input__label-content--haruki">搜索一下(回车确认)</span>
            </label>
        </span>
    </form>
    <!-- 热门文章 -->
    <div class="topArticle">
    <h2><i class="fa fa-signal"></i> Top  List</h2>
        <ul>
        <?php
        $post_num =6; // 设置调用条数
        $args = array(
        'post_password' => '',
        'post_status' => 'publish',
        'post__not_in' => array($post->ID),
        'caller_get_posts' => '1',
        'orderby' => 'comment_count',
        'posts_per_page' => $post_num
        );
        $query_posts = new WP_Query();
        $query_posts->query($args);
        while( $query_posts->have_posts() ) { $query_posts->the_post(); ?>
        <li>
        <a href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'># <?php echo wp_trim_words( get_the_title(), 15 ); ?></a>
          <p><?php get_post_views($post->ID); ?>次围观</p>
        </li>
        <?php } wp_reset_query();?>
        </ul>
    </div>
</div>