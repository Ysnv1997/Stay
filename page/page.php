<?php /*
Template Name: 文章模板
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
                            <footer class="artFootInfo">
                                <!-- 文章尾部 -->
                                <p># <?php the_time('Y-n-j ') ?></p>
                                <p id="share"><a href="javascript:;"><i class="fa fa-share-square"></i> 转发 </a></p>
                                <p id="arrows"><a href="javascript:;"><i class="fa fa-arrows-v"></i> 隐藏评论 </a></p>
                            </footer>
                        </div>
                        <?php } ?>
                        <div class="comments-div">
                            <div id="visible">
                                <div class="visible">
                                        <a target="blank" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<?php the_permalink(); ?>&title=<?php the_title(); ?>"><img src="<?php bloginfo('template_url'); ?>/images/visible/qzone.png" alt=""></a>
                                        <a target="blank" href="http://service.weibo.com/share/share.php?title=<?php the_title(); ?>&url=<?php the_permalink(); ?>"><img src="<?php bloginfo('template_url'); ?>/images/visible/weibo.png" alt=""></a>
                                        <a target="blank" href="http://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>"><img src="<?php bloginfo('template_url'); ?>/images/visible/renren.png" alt=""></a>
                                        <a target="blank" href="http://www.douban.com/recommend/?url=<?php the_permalink(); ?>&title=<?php the_title(); ?>"><img src="<?php bloginfo('template_url'); ?>/images/visible/douban.png" alt=""></a>
                                </div>
                            </div>

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