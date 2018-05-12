<?php /*
Template Name: 留言板
author: Stay Ma
url: http://www.stayma.cn
*/
?>
<?php get_header(); ?>
    <div id="Tbody">
    <?php if( have_posts() ){ the_post();?>
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
                    <div class="blogsPost">
                        <div class="artPadd">
                            <article class="article artText">
                                    <?php the_content(); ?>
                            </article>
                        </div>
                        <?php } ?>
                        <div class="comments-div">


                            <div class="comments">
                                <?php comments_template() ;?>
                            </div>
                        </div>
                    </div>
                    <!-- blogSidebar -->
        <?php get_sidebar(); ?>
                </div>
            </div>
    <?php get_footer(); ?>
        </div>
    </div>
</body>

</html>