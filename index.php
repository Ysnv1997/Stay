<?php get_header(); ?>
<div id="Tbody">
    <div class="headerFilter" style="background:<?php echo stripslashes(get_option('stay_color'));?>
    <?php if(!empty(stripslashes(get_option('stay_topBg')))):?>;background: url(<?php echo stripslashes(get_option('stay_topBg')); ?>);<?php endif;?>">
        <div class="headerFilterZ">
            <?php if ( is_home() ) {
                echo '<div class="blogName" style="color:'.stripslashes(get_option('stay_title_color')).'">';
                bloginfo('name');
                echo '</div>';
            } elseif ( is_category() ) {
                echo '<div class="blogName style="color:'.stripslashes(get_option('stay_title_color')).'"">';
                single_cat_title();
                echo '</div>';

            } elseif (is_single() || is_page() ) {
                echo '<div class="blogName style="color:'.stripslashes(get_option('stay_title_color')).'"">';
                single_post_title();
                echo'</div>';
            }else{
                echo '<div class="blogName style="color:'.stripslashes(get_option('stay_title_color')).'"">';
                bloginfo('name');
                echo '</div>';
                };?>
        </div>
    </div>
    <div class="main">
        <div class="hestiaBlogs">
            <div class="container">
                <div class="blogsPost">
                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <!-- post -->
                    <article class="post" post-id="<?php the_ID(); ?>">
                        <header class="postHeader">
                        <a href="<?php the_permalink(); ?>">
                            <h2><?php the_title(); ?></h2>
                        </a>
                            <div class="postInfo">
                                <span>@ <?php the_author(); ?></span>
                                <span><?php the_category(',') ?></span>
                                <span><?php the_time('Y年n月j日') ?></span>
                            </div>
                        </header>
                        <div class="postBody">
                            <?php if(catch_that_image()): ?>
                                     <img src="<?php echo catch_that_image();?>" alt="<?php the_title(); ?>">
                            <?php endif;?>
                            <p><?php echo mb_strimwidth(strip_tags(apply_filters('the_content', $post->post_content)), 0, 300,"..."); ?></p>
                        </div>
                        <footer class="postFooter">
                            <span><i class="fa fa-comment-o"></i> <?php echo number_format_i18n( get_comments_number() );?> </span>
                            <span><i class="fa fa-font"></i> <?php echo count_words($text); ?> </span>
                            <span><i class="fa fa-eye"></i> <?php get_post_views($post->ID); ?> </span>
                        </footer>
                    </article>
                <?php endwhile; ?>
                <?php else : ?>
                    <h2 id="noArticle">暂时没有文章</h2>
                <?php endif; ?>

                    <div class="nextPage">
                        <div class="previous">
                            <?php previous_posts_link(__('上一页')) ?>
                        </div>
                        <div class="next">
                            <?php next_posts_link(__('下一页')) ?>
                        </div>
                    </div>
                </div>
                <?php get_sidebar(); ?>
            </div>
        </div>
        <?php get_footer(); ?>
    </div>
</div>
</body>
</html>