<?php
/**
 * @Author: Alamr
 * @Date:   2018-05-05 14:16:53
 * @Last Modified by:   Alamr
 * @Last Modified time: 2018-05-13 12:19:01
 */
?>
        <footer class="blogFooter">
            <div class="container">
                <?php
                if ( has_nav_menu( 'footer' ) ) :
                    wp_nav_menu( array(
                        'theme_location' => 'footer',
                         'menu_class'=> 'modal fade',
                         'menu_id'=>'nav',
                         'container'=>'flase',
                         'item_spacing'=>'preserve'
                    ) );
                    endif;?>
                <p><?php echo stripslashes(get_option('stay_record')); ?> | <a href="https://www.stayma.cn">Stay Ma</a> | Powered by <a href="">WordPress</a> | ©<?php echo stripslashes(get_option('stay_company')); ?></p>
            </div>
            <div style="display:none">
                <?php echo stripslashes(get_option('stay_tongji')); ?>
            </div>
        </footer>
    <script src="<?php bloginfo('template_url'); ?>/js/public.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/app.min.js"></script>
