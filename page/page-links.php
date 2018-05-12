<?php
/*
Template Name: 友情链接
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
                    <div class="links">
                    <?php $bookmarks=get_bookmarks();
                        if ( !empty($bookmarks) ){
                        echo '<ul>';
                        foreach ($bookmarks as $bookmark) {
                        echo '<li><a href="' . $bookmark->link_url . '" title="' . $bookmark->link_description . '" target="_blank" >'. '<img src="'.$bookmark->link_image.'"/></a>' . '<p class="linkname">'. $bookmark->link_name .'</p><p class="linkinfo">'.$bookmark->link_description.'</p><a href="'.$bookmark->link_url.'" class="but-success" target="_blank">关注</a></li>';
                        }
                        echo '</ul>';
                        }else{
                        echo '当前没有连接';
                        }
                    ?>
                    <div class="comments-div">
                            <div class="comments">
                                <?php comments_template() ;?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <?php get_footer(); ?>
        </div>
    </div>
</body>
</html>