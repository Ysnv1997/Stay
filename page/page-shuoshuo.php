<?php /*
Template Name: 时间轴
author: Stay Ma
url: http://www.stayma.cn
*/
?>
<?php get_header(); ?>
    <div id="Tbody">
        <div class="headerFilter" style="background:<?php echo stripslashes(get_option('stay_color'));?> <?php if(!empty(stripslashes(get_option('stay_topBg')))):?>;background: url('<?php if ( has_post_thumbnail() ) { the_post_thumbnail_url();  } else { echo stripslashes(get_option('stay_topBg'));} ?>') <?php endif;?>">
            <div class="headerFilterZ">
                <div class="blogName artTitle">
                    <p  style="color:<?php echo stripslashes(get_option('stay_title_color')); ?>;"><?php the_title(); ?></p>
                    <span  style="color:<?php echo stripslashes(get_option('stay_Notice_color')); ?>;"><?php echo stripslashes(get_option('stay_Notice')); ?></span>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="hestiaBlogs">
                <div class="container">
                    <div class="ssbody">
                    <div class="shuoshuo">
                    <ul class="archives-monthlisting">
                    <?php query_posts("post_type=shuoshuo&post_status=publish&posts_per_page=-1");if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <li>
                    <div class="shuoshuo-content">
                        <?php the_content(); ?>
                        <span class="tt"><?php the_time('Y年n月j日G:H'); ?></span>
                    </div><?php endwhile;endif; ?></li>
                    </ul>
                    </div>
                    </div>

                </div>
            </div>
        <?php get_footer(); ?>
        </div>
    </div>
</body>
</html>