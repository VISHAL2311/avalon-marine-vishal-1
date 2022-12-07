<?php
use App\Http\Controllers\SiteMapController;
if (File::exists(app_path() . '/Helpers/MyLibrary.php') && Schema::hasTable('module')) {

//    if (Schema::hasTable('live_user')) {
//        $ip = App\Helpers\MyLibrary::get_client_ip();
//        $Block_live_user = \Powerpanel\LiveUser\Models\LiveUsers::getRecordCountByIp($ip);
//        if ($Block_live_user >= 1) {
//            $message = 'YOU ARE NOT AUTHORIZED TO ACCESS THIS WEB PAGE';
//            echo view('errors.authorised', compact('message'))->render();
//            exit();
//        }
//    }

    // if (Schema::hasTable('general_setting')) {
    //     if (Request::segment(1) == 'powerpanel') {
    //         $ip = App\Helpers\MyLibrary::get_client_ip();
    //         $arrSettings = \App\GeneralSettings::getSettingsByFieldName('IP_SETTING');
    //         $allow = explode(",", $arrSettings['fieldValue']); //allowed IPs
    //         if (!empty($arrSettings['fieldValue']) && !in_array($ip, $allow)) {
    //             $message = 'YOU ARE NOT AUTHORIZED TO ACCESS THIS WEB PAGE';
    //             echo view('errors.authorised', compact('message'))->render();sitemap
    //             exit();
    //         }
    //     }
    // }

//    if (Schema::hasTable('general_setting')) {
//        if (Request::segment(1) == 'powerpanel') {
//            $ip = App\Helpers\MyLibrary::get_client_ip();
//            $arrSettings = \App\GeneralSettings::getSettingsByFieldName('IP_SETTING');
//            if (!empty($arrSettings['fieldValue'])) {
//                $allow = explode(",", $arrSettings['fieldValue']); //allowed IPs
//                if (!in_array($ip, $allow)) {
//                    $message = 'YOU ARE NOT AUTHORIZED TO ACCESS THIS WEB PAGE';
//                    echo view('errors.authorised', compact('message'))->render();
//                    exit();
//                }
//            }
//        }
//    }

//    if (Schema::hasTable('blocked_ips')) {
//        if (Request::segment(1) == 'powerpanel') {
//            $MAX_LOGIN_ATTEMPTS = 50;
//            if (Schema::hasTable('general_setting')) {
//                $genSetting = DB::table('general_setting')->select('fieldValue')->where('fieldName', 'MAX_LOGIN_ATTEMPTS')->first();
//                $MAX_LOGIN_ATTEMPTS = (int) $genSetting->fieldValue;
//            }
//            $ip = App\Helpers\MyLibrary::get_client_ip();
//            $ipCount = \Powerpanel\BlockedIP\Models\BlockedIps::getRecordCountByIp($ip);
//            if ($ipCount >= $MAX_LOGIN_ATTEMPTS) {
//                $message = 'This IP has been blocked due to too many login attempts!<br> Please Contact administrator for further assistance.';
//                echo view('errors.attempts', compact('message'))->render();
//                exit();
//            }
//        }
//    }

    //    if (Schema::hasTable('blocked_ips')) {
    //        $ignoreRoutes = array('demo', 'viewPDF', 'download', '_debugbar', 'assets', 'resources', 'news-letter', 'cms', 'feedback', 'emailtofriend', 'setDocumentHitcounter', 'search', 'settings', 'laravel-filemanager', 'print', 'sitemap', 'documents', 'images', 'searchentity');
    //        if (!in_array(Request::segment(1), $ignoreRoutes) && Request::segment(2) != 'preview') {
    //            $ip = App\Helpers\MyLibrary::get_client_ip();
    //            $ipCount = \Powerpanel\BlockedIP\Models\BlockedIps::getRecordCountByIp($ip);
    //            if ($ipCount >= 5) {
    //                $message = 'This IP has been blocked due to too many login attempts!<br> Please Contact administrator for further assistance.';
    //                echo view('errors.attempts', compact('message'))->render();
    //                exit();
    //            }
    //        }
    //    }

    $segmentArr = [];
    $segmentArr = Request::segments();
    $preview = Request::segment(3);
    if ($preview != 'preview') {
        $preview = false;
    }

    $setConstants = App\Helpers\MyLibrary::setConstants($segmentArr, $preview);
    $CONTROLLER_NAME_SPACE = Config::get('Constant.MODULE.CONTROLLER_NAME_SPACE');

    if (!empty(Request::segment(1)) && Request::segment(1) != 'powerpanel') {
        $slug = Request::segment(1);
        $preview = Request::segment(3);
        if ($preview != 'preview') {
            $preview = false;
        }
        $arrModule = App\Helpers\MyLibrary::setFrontRoutes($slug, $preview);
        $MODULE_NAME = Config::get('Constant.MODULE.NAME');
        $CONTROLLER_NAME = Config::get('Constant.MODULE.CONTROLLER');
        if (isset($arrModule->modules->varModuleName)) {
            $ecategory = explode("-", $arrModule->modules->varModuleName);
        }
        if (isset($arrModule->modules->varModuleName)) {
            switch ($arrModule->modules->varModuleName) {
                case 'contact-us':
                    Route::get('contact-us/thankyou', ['as' => 'contact-us/thankyou', 'uses' => 'ThankyouController@index']);
                    Route::get('/' . $arrModule->alias->varAlias, ['as' => 'contact-us', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post('/' . $arrModule->alias->varAlias, ['as' => 'contact-us', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case 'service-inquiry':
                    Route::get('service-inquiry/thankyou', ['as' => 'service-inquiry/thankyou', 'uses' => 'ThankyouController@index']);
                    Route::get('/' . $arrModule->alias->varAlias, ['as' => 'service-inquiry', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post('/' . $arrModule->alias->varAlias, ['as' => 'service-inquiry', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case 'boat-inquiry':
                    Route::get('boat-inquiry/thankyou', ['as' => 'boat-inquiry/thankyou', 'uses' => 'ThankyouController@index']);
                    Route::get('/' . $arrModule->alias->varAlias, ['as' => 'boat-inquiry', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post('/' . $arrModule->alias->varAlias, ['as' => 'boat-inquiry', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case 'get-a-estimate':
                    Route::get('get-a-estimate/thankyou', ['as' => 'get-a-estimate/thankyou', 'uses' => 'ThankyouController@index']);
                    Route::get('/' . $arrModule->alias->varAlias, ['as' => 'get-a-estimate', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post('/' . $arrModule->alias->varAlias, ['as' => 'get-a-estimate', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case 'data-removal-lead':
                    Route::get('data-removal-lead/thankyou', ['as' => 'data-removal-lead/thankyou', 'uses' => 'ThankyouController@index']);
                    Route::get('/' . $arrModule->alias->varAlias, ['as' => 'data-removal-lead', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post('/' . $arrModule->alias->varAlias, ['as' => 'data-removal-lead', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case "appointment-lead":
                    Route::get($arrModule->alias->varAlias, ['as' => 'book-appointment', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@create']);
                    Route::post($arrModule->alias->varAlias, ['as' => 'book-appointment', 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@store']);
                    break;
                case 'page_template':
                    Route::get($arrModule->alias->varAlias . '/{record}/preview', ['as' => $arrModule->alias->varAlias, 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                    Route::get($arrModule->alias->varAlias . '/{record}/preview/detail', ['as' => $arrModule->alias->varAlias, 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                    break;

                default:
                    Route::any($arrModule->alias->varAlias . '/', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                    if (isset($ecategory[1]) && $ecategory[1] == 'category') {
                        Route::get($arrModule->alias->varAlias . '/{alias}', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                        Route::get($arrModule->alias->varAlias . '/{alias}/preview', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                        Route::get($arrModule->alias->varAlias . '/{category}/{alias}', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@detail']);
                        Route::get($arrModule->alias->varAlias . '/{category}/{alias}/preview/detail', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@detail']);
                        Route::get($arrModule->alias->varAlias . '/{record}/preview/detail', ['as' => $arrModule->alias->varAlias, 'uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@index']);
                    } else {
                        Route::get($arrModule->alias->varAlias . '/{alias}', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@detail']);
                        Route::get($arrModule->alias->varAlias . '/{record}/preview', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@detail']);
                        Route::get($arrModule->alias->varAlias . '/{alias}/preview/detail', ['uses' => $CONTROLLER_NAME_SPACE . $CONTROLLER_NAME . '@detail']);
                    }
                    break;
            }
        }

        if (isset($arrModule->modules->varModuleClass) && $arrModule->modules->varModuleClass == 'CmsPagesController') {
            $arrModule->modules->varModuleClass = 'PagesController';
        }
    }
    Route::get('/{record}/preview', ['uses' => $CONTROLLER_NAME_SPACE . 'PagesController@index']);
    Route::get('events-calender', $CONTROLLER_NAME_SPACE . 'EventsController@viewcalender');
    Route::post('NotificationToken', $CONTROLLER_NAME_SPACE . 'FrontController@UpdateNotificationToken');
    Route::post('/Country_Data', $CONTROLLER_NAME_SPACE . 'FormBuilderController@Statecmb');
    Route::post('/PagePass_URL_Listing', $CONTROLLER_NAME_SPACE . 'FrontController@PagePassURLListing');
    Route::get('/viewPDF/{dir}/{filename}', ['uses' => $CONTROLLER_NAME_SPACE . 'PagesController@viewPDF']);
    Route::post('/boat_search', '\Powerpanel\Boat\Controllers\BoatController@boat_search');
    //Cron Routes=======================================
    Route::get('cron/workflow/{id}', ['uses' => 'CronController@workflow']);
    //==================================================
    Route::get('/previewpage', ['uses' => '\Powerpanel\CmsPage\Controllers\CmsPagesController@previewpage'])->name('front.previewpage');
    Route::get('/site-map', ['as' => 'site-map', 'uses' => 'App\Http\Controllers\SiteMapController@index']);
    Route::post('/data-removal-lead/getEmail', ['uses' => 'Powerpanel\DataRemovalLead\Controllers\DataRemovalLeadController@getEmail']);

    Route::group(['namespace' => $CONTROLLER_NAME_SPACE], function () {
        Route::get('/', ['uses' => 'HomeController@index']);
        Route::get('/home', 'HomeController@index')->name('home');
        Route::post('/print', ['uses' => 'PrintController@index'])->name('front.print');

        Route::any('insta-token', 'CronController@InstaToken');

        Route::post('/getaestimate', ['as' => 'getaestimate', 'uses' => 'HomeController@getaEstimate']);
        Route::post('/serviceinquiry', ['as' => 'serviceinquiry', 'uses' =>'\Powerpanel\ServiceInquiryLead\Controllers\ServiceinquiryleadController@store']);
        Route::post('/boatinquiry', ['as' => 'boatinquiry', 'uses' =>'\Powerpanel\BoatInquiryLead\Controllers\BoatinquiryleadController@store']);
        Route::get('thank-you', ['uses' => 'ThankyouController@index'])->name('thank-you');
        Route::get('failed', ['uses' => 'ThankyouController@subscribe_failed'])->name('failed');

        Route::get('/search', ['uses' => 'SearchController@index'])->name('front.searchindex');
        Route::post('/search', ['uses' => 'SearchController@search'])->name('front.search');
        Route::post('/search/auto-complete', ['uses' => 'SearchController@autoComplete'])->name('front.searchauto');
        Route::post('/setDocumentHitcounter', ['as' => 'DocHitCounter', 'uses' => 'FrontController@setdocumentCounter']);
        Route::post('polling-lead', ['as' => 'polling-lead', 'uses' => 'PollingMasterController@store']);

        // Route::post('news-letter', ['uses' => 'SubscriptionController@store'])->name('news-letter');
        // Route::get('news-letter/subscription/subscribe/{id}/{VarToken}', ['uses' => 'SubscriptionController@subscribe'])->name('subscribe');
        // Route::get('news-letter/subscription/unsubscribe/{id}/{VarToken}', ['uses' => 'SubscriptionController@unsubscribe'])->name('unsubscribe');

        Route::post('news-letter', ['uses' => 'SubscriptionController@store'])->name('news-letter');
        Route::get('news-letter/subscription/subscribe/{id}', ['uses' => 'SubscriptionController@subscribe'])->name('subscribe');
        Route::get('news-letter/subscription/unsubscribe/{id}', ['uses' => 'SubscriptionController@unsubscribe'])->name('unsubscribe');

        Route::get('data-removal-lead/removalConfirmation/{id}', ['uses' => 'DataRemovalLeadController@removalConfirmation'])->name('removalConfirmation');
        Route::get('/removalConfirmation/aceessdenied', ['uses' => 'ThankyouController@dataremoval_failed'])->name('/aceessdenied');
        Route::any('/powerpanel', ['uses' => 'DataRemovalLeadsController@powerpanel'])->name('powerpanel');

        Route::post('feedback', ['as' => 'feedback', 'uses' => 'FeedbackController@store']);
        Route::post('cms', ['as' => 'cms', 'uses' => 'PagesController@store']);
        Route::post('emailtofriend', ['as' => 'emailtofriend', 'uses' => 'EmailtoFriendController@store']);
        Route::post('formbuildersubmit', ['as' => 'formbuildersubmit', 'uses' => '\Powerpanel\FormBuilder\Controllers\FormBuilderController@store']);
        Route::get('/formbuildersubmit/thankyou', ['as' => 'formbuildersubmit/thankyou', 'uses' => '\Powerpanel\FormBuilder\Controllers\ThankyouController@index']);
        Route::get('/news-letter/thankyou', ['as' => 'news-letter/thankyou', 'uses' => 'ThankyouController@index']);
        Route::get('/news-letter/failed', ['uses' => 'ThankyouController@subscribe_failed'])->name('/failed');
        // Route::get('site-map', ['as' => 'site-map', 'uses' => 'SiteMapController@index']);
        Route::get('download/{filename}', ['as' => 'download', 'uses' => 'FrontController@download']);
        Route::get('generateSitemap', ['as' => 'generateSitemap', 'uses' => 'SiteMapController@generateSitemap']);
        Route::post('/front/search', ['as' => 'search', 'uses' => 'FrontController@search']);
        Route::post('/front/popupvalue', ['as' => 'popupvalue', 'uses' => 'FrontController@popup']);
        Route::post('/email', ['as' => 'email', 'uses' => 'EmailController@send_email']);
        Route::get('/email', ['as' => 'email', 'uses' => 'EmailController@index']);
        Route::get('/fetchrss/{start}/{offset}', ['as' => 'fetchrss', 'uses' => 'FetchrssController@index']);
        Route::post('/front/search', ['as' => 'search', 'uses' => 'FrontController@search']);
        Route::post('/front/popupvalue', ['as' => 'popupvalue', 'uses' => 'FrontController@popup']);
        Route::post('/email', ['as' => 'email', 'uses' => 'EmailController@send_email']);
        Route::get('/email', ['as' => 'email', 'uses' => 'EmailController@index']);
        Route::get('/fetchrss/{start}/{offset}', ['as' => 'fetchrss', 'uses' => 'FetchrssController@index']);
    });

    Route::group(['namespace' => $CONTROLLER_NAME_SPACE . 'Userauth'], function () {
        Route::get('/login', ['uses' => 'AuthController@showLoginForm']);
        Route::post('/login', ['uses' => 'AuthController@login']);
        Route::get('/register', ['uses' => 'AuthController@showRegistrationForm']);
        Route::post('/register', ['uses' => 'AuthController@register']);
        Route::post('/password/email', ['uses' => 'PasswordController@sendResetLinkEmail']);
        Route::get('/password/reset/{token?}', ['uses' => 'PasswordController@showResetForm']);
        Route::post('/password/reset', ['uses' => 'PasswordController@reset']);
        Route::get('/logout', ['uses' => 'AuthController@logout']);
        //Route::get('/profile', ['uses'=> 'ProfileController@index','middleware' => ['check-login']]);
    });

    Route::group(['namespace' => $CONTROLLER_NAME_SPACE], function () {
        Route::post('powerpanel/sendResetLinkAjax', 'Auth\LoginController@login');
        Route::get('powerpanel/login', 'Auth\LoginController@showLoginForm')->name('login');
        Route::get('powerpanel/', 'Auth\LoginController@showLoginForm');
        Route::get('powerpanel/login', 'Auth\LoginController@showLoginForm')->name('login');
        Route::post('powerpanel/login', 'Auth\LoginController@login');
        Route::post('powerpanel/logout', 'Auth\LoginController@logout')->name('logout');
        Route::get('powerpanel/register', 'Auth\RegisterController@showRegistrationForm')->name('register');
        Route::post('powerpanel/register', 'Auth\RegisterController@register');
        Route::get('powerpanel/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
        Route::post('powerpanel/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
        Route::get('powerpanel/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
        Route::post('powerpanel/password/reset', 'Auth\ResetPasswordController@reset');
        Route::post('/powerpanel/aliasGenerate', ['as' => 'powerpanel/aliasGenerate', 'uses' => 'PowerpanelController@aliasGenerate']);
        Route::get('powerpanel/install/{file}', 'PowerpanelController@install');
        Route::post('/powerpanel/ckeditor/upload-image', 'PowerpanelController@uploadImage');
        Route::post('/powerpanel/Quickedit_Listing', array('uses' => 'PowerpanelController@Quickedit_Listing'));
        Route::post('/powerpanel/TrashData_Listing', array('uses' => 'PowerpanelController@TrashData_Listing'));
        Route::post('/powerpanel/RestoreData_Listing', array('uses' => 'PowerpanelController@RestoreData_Listing'));
        Route::post('/powerpanel/UnArchiveData_Listing', array('uses' => 'PowerpanelController@UnArchiveData_Listing'));
        Route::post('/powerpanel/Copy_Listing', array('uses' => 'PowerpanelController@Copy_Listing'));
        Route::post('/powerpanel/Favorite_Listing', array('uses' => 'PowerpanelController@Favorite_Listing'));
        Route::post('/powerpanel/Archive_Listing', array('uses' => 'PowerpanelController@Archive_Listing'));
        Route::post('/powerpanel/HideColumn', array('uses' => 'PowerpanelController@HideColumn'));
        Route::post('/powerpanel/RemoveDarftData', array('uses' => 'PowerpanelController@RemoveDarftData'));
        Route::post('/powerpanel/Notification_View', array('uses' => 'PowerpanelController@Notification_View'));
        Route::post('/powerpanel/Save_Data', array('uses' => 'PowerpanelController@Save_Data'));
        Route::post('/powerpanel/FormEditData', array('uses' => 'PowerpanelController@FormEditData'));
        Route::post('/powerpanel/header_notification_count', array('uses' => 'PowerpanelController@header_notification_count'));
        Route::get('/powerpanel/folderdata', array('uses' => 'PowerpanelController@folderdata'));
        Route::get('/powerpanel/FolderImages', array('uses' => 'PowerpanelController@GetFolderImages'));
        Route::get('/powerpanel/GetFolderDocument', array('uses' => 'PowerpanelController@GetFolderDocument'));
        Route::get('/powerpanel/GetFolderAudio', array('uses' => 'PowerpanelController@GetFolderAudio'));
        Route::post('/powerpanel/Hits_Listing', array('uses' => 'PowerpanelController@Hits_Listing'));
        Route::post('/powerpanel/unlock_pagedata', array('uses' => 'PowerpanelController@unlock_pagedata'));
        Route::post('/powerpanel/lock_pagedata', array('uses' => 'PowerpanelController@lock_pagedata'));

        Route::post('/powerpanel/password/sendResetLinkAjax', 'Auth\ResetPasswordController@sendResetLinkAjax');

        //Alias Module Routes#####################
        Route::post('/powerpanel/aliasGenerate', ['as' => 'powerpanel/aliasGenerate', 'uses' => 'PowerpanelController@aliasGenerate']);
        Route::post('/powerpanel/generate-seo-content', ['as' => 'powerpanel/generate-seo-content', 'uses' => 'PowerpanelController@generateSeoContent']);
    });
    //Alias Module Routes#####################
    Route::group(['namespace' => $CONTROLLER_NAME_SPACE . 'Powerpanel', 'middleware' => ['auth']], function ($request) {
        Route::get('powerpanel/verify', 'RandomController@randomverify');
        Route::get('powerpanel/question_verify', 'RandomController@question_verify');
        Route::post('powerpanel/checkrandom', 'RandomController@checkrandom');
        Route::post('powerpanel/checkanswer', 'UserController@checkanswer');
        Route::post('powerpanel/add-terms-read', 'TermsConditionsController@insertRead');
        Route::post('powerpanel/add-terms-acccept', 'TermsConditionsController@insertAccept');
        Route::post('powerpanel/terms-accepted-check', 'TermsConditionsController@checkAccepted');

        //Dashboard Module Routes#####################
        Route::get('powerpanel', 'DashboardController@index');
        Route::get('/powerpanel/dashboard', ['as' => 'dashboard.index', 'uses' => 'DashboardController@index']);
        Route::post('/powerpanel/dashboard/ajax', ['as' => 'dashboard.index', 'uses' => 'DashboardController@ajaxcall']);
        Route::post('/powerpanel/dashboard/updateorder', ['as' => 'dashboard.updateorder', 'uses' => 'DashboardController@updateorder']);
        Route::post('/powerpanel/dashboard/updatedashboardsettings', ['as' => 'dashboard.updatedashboardsettings', 'uses' => 'DashboardController@updatedashboardsettings']);
        //Dashboard Module Routes#####################
        //Menu Module Routes#####################
        Route::get('/powerpanel/menu', ['uses' => 'MenuController@index', 'middleware' => ['permission:menu-list']]);
        Route::post('/powerpanel/menu/getMenuType', ['uses' => 'MenuController@getMenuType', 'middleware' => ['permission:menu-list']]);
        Route::post('/powerpanel/menu/addMenuType', ['uses' => 'MenuController@addMenuType', 'middleware' => ['permission:menu-create']]);
        Route::post('/powerpanel/menu/saveMenu', ['uses' => 'MenuController@saveMenu', 'middleware' => ['permission:menu-create']]);
        Route::post('/powerpanel/menu/addMenuItem', ['uses' => 'MenuController@addMenuItem', 'middleware' => ['permission:menu-create']]);
        Route::post('/powerpanel/menu/addMenuItems', ['uses' => 'MenuController@addMenuItems', 'middleware' => ['permission:menu-create']]);
        Route::post('/powerpanel/menu/reload', 'MenuController@reload');
        Route::post('/powerpanel/menu/deleteMenuItem', ['uses' => 'MenuController@deleteMenuItem', 'middleware' => ['permission:menu-delete']]);
        Route::post('/powerpanel/menu/deleteMenu', ['uses' => 'MenuController@deleteMenu', 'middleware' => ['permission:menu-delete']]);
        Route::post('/powerpanel/menu/getMenuItem', ['uses' => 'MenuController@getMenuItem', 'middleware' => ['permission:menu-edit']]);
        Route::post('/powerpanel/menu/updateMenuItem', ['uses' => 'MenuController@updateMenuItem', 'middleware' => ['permission:menu-edit']]);
        Route::post('/powerpanel/menu/aliasGenerate', ['as' => 'powerpanel/menu/aliasGenerate', 'uses' => 'MenuController@aliasGenerate']);
        Route::post('/powerpanel/menu/megaMenu', ['uses' => 'MenuController@megaMenu', 'middleware' => ['permission:menu-edit']]);
        //Menu Module Routes#####################
        //Media Manager Module Routes#####################
        Route::post('/powerpanel/media/set_image_html', ['as' => 'powerpanel/media/set_image_html', 'uses' => 'MediaController@set_image_html']);
        Route::post('/powerpanel/media/ComposerDocData', ['as' => 'powerpanel/media/ComposerDocData', 'uses' => 'MediaController@ComposerDocData']);
        Route::post('/powerpanel/media/ComposerDocDatajs', ['as' => 'powerpanel/media/ComposerDocDatajs', 'uses' => 'MediaController@ComposerDocDatajs']);
        Route::post('/powerpanel/media/set_video_html', ['as' => 'powerpanel/media/set_video_html', 'uses' => 'MediaController@set_video_html']);
        Route::post('/powerpanel/media/upload_image', ['uses' => 'MediaController@upload_image'])->name('powerpanel/media/upload_image');
        Route::post('/powerpanel/media/upload_video', ['as' => 'powerpanel/media/upload_video', 'uses' => 'MediaController@upload_video']);
        Route::post('/powerpanel/media/user_uploaded_video', ['as' => 'powerpanel/media/user_uploaded_video', 'uses' => 'MediaController@user_uploaded_video']);
        Route::post('/powerpanel/media/get_trash_videos', ['as' => '/powerpanel/media/get_trash_videos', 'uses' => 'MediaController@get_trash_videos']);
        Route::post('/powerpanel/media/user_uploaded_image', ['as' => '/powerpanel/media/user_uploaded_image', 'uses' => 'MediaController@user_uploaded_image']);
        Route::post('/powerpanel/media/folder_uploaded_image', ['as' => '/powerpanel/media/folder_uploaded_image', 'uses' => 'MediaController@folder_uploaded_image']);
        Route::post('/powerpanel/media/load_more_images/{user_id}', ['as' => '/powerpanel/media/load_more_images', 'uses' => 'MediaController@load_more_images']);
        Route::post('/powerpanel/media/load_more_docs/{user_id}', ['as' => '/powerpanel/media/load_more_docs', 'uses' => 'MediaController@load_more_docs']);
        Route::post('/powerpanel/media/remove_image', ['as' => '/powerpanel/media/remove_image', 'uses' => 'MediaController@remove_image']);
        Route::post('/powerpanel/media/updateDocTitle', ['as' => '/powerpanel/media/updateDocTitle', 'uses' => 'MediaController@updateDocTitle']);
        Route::post('/powerpanel/media/updateAudioTitle', ['as' => '/powerpanel/media/updateAudioTitle', 'uses' => 'MediaController@updateAudioTitle']);
        Route::post('/powerpanel/media/get_recent_uploaded_images', ['as' => '/powerpanel/media/get_recent_uploaded_images', 'uses' => 'MediaController@get_recent_uploaded_images']);
        Route::post('/powerpanel/media/get_trash_images', ['as' => '/powerpanel/media/get_trash_images', 'uses' => 'MediaController@get_trash_images']);
        Route::post('/powerpanel/media/insert_image_by_url', ['as' => '/powerpanel/media/insert_image_by_url', 'uses' => 'MediaController@insert_image_by_url']);
        Route::post('/powerpanel/media/insert_video_by_url', ['as' => '/powerpanel/media/insert_video_by_url', 'uses' => 'MediaController@insert_video_by_url']);
        Route::post('/powerpanel/media/remove_multiple_image', ['as' => '/powerpanel/media/remove_multiple_image', 'uses' => 'MediaController@remove_multiple_image']);
        Route::post('/powerpanel/media/remove_multiple_videos', ['as' => '/powerpanel/media/remove_multiple_videos', 'uses' => 'MediaController@remove_multiple_videos']);
        Route::post('/powerpanel/media/restore_multiple_image', ['as' => '/powerpanel/media/restore_multiple_image', 'uses' => 'MediaController@restore_multiple_image']);
        Route::post('/powerpanel/media/restore-multiple-videos', ['as' => '/powerpanel/media/restore-multiple-videos', 'uses' => 'MediaController@restore_multiple_videos']);
        Route::post('/powerpanel/media/set_document_uploader', ['as' => 'powerpanel/media/set_document_uploader', 'uses' => 'MediaController@set_document_uploader']);
        Route::post('/powerpanel/media/set_audio_uploader', ['as' => 'powerpanel/media/set_audio_uploader', 'uses' => 'MediaController@set_audio_uploader']);
        Route::post('/powerpanel/media/upload_documents', ['as' => 'powerpanel/media/upload_documents', 'uses' => 'MediaController@upload_documents']);
        Route::post('/powerpanel/media/upload_audios', ['as' => 'powerpanel/media/upload_audios', 'uses' => 'MediaController@upload_audios']);
        Route::post('/powerpanel/media/user_uploaded_docs', ['as' => '/powerpanel/media/user_uploaded_docs', 'uses' => 'MediaController@user_uploaded_docs']);
        Route::post('/powerpanel/media/folder_uploaded_docs', ['as' => '/powerpanel/media/folder_uploaded_docs', 'uses' => 'MediaController@folder_uploaded_docs']);
        Route::post('/powerpanel/media/user_uploaded_audios', ['as' => '/powerpanel/media/user_uploaded_audios', 'uses' => 'MediaController@user_uploaded_audios']);
        Route::post('/powerpanel/media/folder_uploaded_audios', ['as' => '/powerpanel/media/folder_uploaded_audios', 'uses' => 'MediaController@folder_uploaded_audios']);
        Route::post('/powerpanel/media/remove_multiple_documents', ['as' => '/powerpanel/media/remove_multiple_documents', 'uses' => 'MediaController@remove_multiple_documents']);
        Route::post('/powerpanel/media/remove_multiple_audios', ['as' => '/powerpanel/media/remove_multiple_audios', 'uses' => 'MediaController@remove_multiple_audios']);
        Route::post('/powerpanel/media/get_trash_documents', ['as' => '/powerpanel/media/get_trash_documents', 'uses' => 'MediaController@get_trash_documents']);
        Route::post('/powerpanel/media/get_trash_audios', ['as' => '/powerpanel/media/get_trash_audios', 'uses' => 'MediaController@get_trash_audios']);
        Route::post('/powerpanel/media/get_trash_audios', ['as' => '/powerpanel/media/get_trash_audios', 'uses' => 'MediaController@get_trash_audios']);
        Route::post('/powerpanel/media/check-img-inuse', ['as' => '/powerpanel/media/check-img-inuse', 'uses' => 'MediaController@checkedUsedImg']);
        Route::post('/powerpanel/media/restore-multiple-document', ['as' => '/powerpanel/media/restore_multiple_document', 'uses' => 'MediaController@restore_multiple_document']);
        Route::post('/powerpanel/media/restore-multiple-audio', ['as' => '/powerpanel/media/restore_multiple_audio', 'uses' => 'MediaController@restore_multiple_audio']);
        Route::post('/powerpanel/media/check-document-inuse', ['as' => '/powerpanel/media/check-document-inuse', 'uses' => 'MediaController@checkedUsedDocument']);
        Route::post('/powerpanel/media/check-audio-inuse', ['as' => '/powerpanel/media/check-audio-inuse', 'uses' => 'MediaController@checkedUsedAudio']);
        Route::post('/powerpanel/media/get_image_details', ['uses' => 'MediaController@getImageDetails'])->name('get_image_details');
        Route::post('/powerpanel/media/save_image_details', ['uses' => 'MediaController@saveImageDetails'])->name('save_image_details');
        Route::post('/powerpanel/media/crop_image', ['uses' => 'MediaController@cropImage'])->name('crop_image');
        Route::post('/powerpanel/media/save_cropped_image', ['uses' => 'MediaController@saveCroppedImage'])->name('save_cropped_image');
        //Media Manager Routes#####################
        //Photo Gallery Module Routes#####################
        Route::post('/powerpanel/photo-gallery/update', ['as' => '/powerpanel/photo-gallery/update', 'uses' => 'PhotoGalleryController@store', 'middleware' => ['permission:photo-gallery-edit']]);
        Route::post('/powerpanel/photo-gallery/update_status', ['as' => '/powerpanel/photo-gallery/update_status', 'uses' => 'PhotoGalleryController@update_status', 'middleware' => ['permission:photo-gallery-edit']]);
        Route::post('/powerpanel/photo-gallery/destroy', ['as' => '/powerpanel/photo-gallery/destroy', 'uses' => 'PhotoGalleryController@destroy', 'middleware' => ['permission:photo-gallery-delete']]);
        //Photo Gallery Module Routes#####################
        //Video Gallery Module Routes#####################
        Route::post('/powerpanel/video-gallery/update', ['as' => '/powerpanel/video-gallery/update', 'uses' => 'VideoGalleryController@store', 'middleware' => ['permission:video-gallery-edit']]);
        Route::post('/powerpanel/video-gallery/update_status', ['as' => '/powerpanel/video-gallery/update_status', 'uses' => 'VideoGalleryController@update_status', 'middleware' => ['permission:video-gallery-edit']]);
        Route::post('/powerpanel/video-gallery/destroy', ['as' => '/powerpanel/video-gallery/destroy', 'uses' => 'VideoGalleryController@destroy', 'middleware' => ['permission:video-gallery-delete']]);
        Route::post('/powerpanel/media/check-video-inuse', ['as' => '/powerpanel/media/check-video-inuse', 'uses' => 'MediaController@checkedUsedVideo']);
        //Video Gallery Module Routes#####################
        //Banner Module Routes#####################
        Route::post('/powerpanel/banners/selectRecords', ['uses' => 'BannerController@selectRecords']);
        Route::post('/powerpanel/popup/selectRecords', ['uses' => 'PopupController@selectRecords']);
        Route::post('/powerpanel/alerts/selectRecords', ['uses' => 'AlertsController@selectRecords']);
        Route::post('/powerpanel/interest-rates/selectRecords', ['uses' => 'InterestRatesController@selectRecords']);
        Route::post('/powerpanel/quick-links/selectRecords', ['uses' => 'QuickLinksController@selectRecords']);
        Route::post('/powerpanel/useful-links/selectRecords', ['uses' => 'UsefulLinksController@selectRecords']);
        //End Banner Module Routes#################
        Route::post('/settings/testMail', ['as' => '/settings/testMail', 'uses' => 'SettingsController@testMail']);
        Route::post('/settings/save-module-settings', ['as' => '/settings/save-module-settings', 'uses' => 'SettingsController@saveModuleSettings']);
        Route::post('/settings/get-save-module-settings', ['as' => '/settings/get-save-module-settings', 'uses' => 'SettingsController@getModuleSettings']);
        Route::post('/settings/get-filtered-modules', ['as' => '/settings/get-filtered-modules', 'uses' => 'SettingsController@getModulesAjax']);
        Route::post('/powerpanel/settings/insertticket', ['as' => 'powerpanel.settings.insertticket', 'uses' => 'SettingsController@insertTicket']);
        Route::get('/powerpanel/settings/insertticket', ['uses' => 'SettingsController@insertTicket']);

        Route::get('/powerpanel/roles/show/{id}', ['as' => 'powerpanel.roles.show', 'uses' => 'RoleController@show']);
        Route::patch('/powerpanel/roles/{id}', ['as' => 'powerpanel.roles.update', 'uses' => 'RoleController@handlePost', 'middleware' => ['permission:roles-edit']]);
        Route::get('/powerpanel/changepassword', array('as' => 'powerpanel/changepassword', 'uses' => 'ProfileController@changepassword'));
        Route::post('/powerpanel/changepassword', array('as' => 'powerpanel/changepassword', 'uses' => 'ProfileController@handle_changepassword'));
        Route::post('/powerpanel/media/empty_trash_Image', ['as' => 'powerpanel/media/empty_trash_image', 'uses' => 'MediaController@empty_trash_image']);
        Route::post('/powerpanel/media/empty_trash_Video', ['as' => 'powerpanel/media/empty_trash_video', 'uses' => 'MediaController@empty_trash_video']);
        Route::post('/powerpanel/media/empty_trash_Document', ['as' => 'powerpanel/media/empty_trash_document', 'uses' => 'MediaController@empty_trash_document']);
        Route::post('/powerpanel/media/empty_trash_Audio', ['as' => 'powerpanel/media/empty_trash_audio', 'uses' => 'MediaController@empty_trash_audio']);
        Route::post('/powerpanel/pages/getChildData', ['as' => 'pages.index', 'uses' => 'CmsPagesController@getChildData']);
        Route::post('/powerpanel/pages/getChildData_rollback', ['as' => 'pages.index', 'uses' => 'CmsPagesController@getChildData_rollback']);
        Route::post('/powerpanel/pages/ApprovedData_Listing', ['as' => 'pages.index', 'uses' => 'CmsPagesController@ApprovedData_Listing']);
        Route::post('/powerpanel/pages/insertComents', ['as' => 'pages.index', 'uses' => 'CmsPagesController@insertComents']);
        Route::post('/powerpanel/pages/Get_Comments', ['as' => 'pages.index', 'uses' => 'CmsPagesController@Get_Comments']);

        Route::post('/powerpanel/dashboard/Get_Comments_user', ['uses' => 'DashboardController@Get_Comments_user']);
        Route::post('/powerpanel/dashboard/InsertComments_user', ['uses' => 'DashboardController@InsertComments_user']);
        Route::post('/powerpanel/workflow/get-admin', ['uses' => 'WorkflowController@getAdmins']);
        Route::post('/powerpanel/workflow/get-category', ['uses' => 'WorkflowController@getCategory']);
        Route::post('/powerpanel/workflow/get-modulebycategory', ['uses' => 'WorkflowController@getCategoryWiseModules']);
        Route::post('/powerpanel/workflow/check-wfexists', ['uses' => 'WorkflowController@wfExists']);
        Route::post('/powerpanel/dashboard/mobilehist', ['uses' => 'DashboardController@getPageHitChart']);
        Route::post('/powerpanel/hits-report/mobilehist', ['uses' => 'HitsReportController@getPageHitChart']);
        Route::post('/powerpanel/hits-report/sendreport', ['uses' => 'HitsReportController@getSendChart']);
        Route::post('/powerpanel/document-report/sendreport', ['uses' => 'DocumentReportController@getSendChart']);
        Route::post('/powerpanel/document-report/mobilehist', ['uses' => 'DocumentReportController@getPageHitChart']);
        Route::post('/powerpanel/dashboard/doc-chart', ['uses' => 'DashboardController@getDocChartData']);
        Route::post('/powerpanel/dashboard/LeadChart', ['uses' => 'DashboardController@LeadChart']);
        Route::post('/powerpanel/dashboard/search-chart', ['uses' => 'DashboardController@SearchChart']);
        Route::post('/powerpanel/media/get_video_byUrl_html', ['as' => '/powerpanel/media/get_video_byUrl_html', 'uses' => 'MediaController@get_video_byUrl_html']);
    });

    if ($setConstants) {
        Route::group(['namespace' => $CONTROLLER_NAME_SPACE . 'Powerpanel', 'middleware' => ['auth']], function ($request) {

            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/{file}/downloadFile', ['as' => Config::get('Constant.MODULE.NAME') . '.downloadFile', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@downloadFile']);

            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME'), ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.index', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@index', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_parentid', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_parentid']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list_New', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list_New', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list_draft', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list_draft', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list_trash', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list_trash', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list_favorite', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list_favorite', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/get_list_archive', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@get_list_archive', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);

            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/Template_Listing', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@Template_Listing', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/FormBuilder_Listing', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@FormBuilder_Listing', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);

            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/add', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.add', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@edit', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-create']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/add', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.handleAddPost', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@handlePost', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-create']);
            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/{alias}/edit', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.edit', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@edit', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/{alias}/edit', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.handleEditPost', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@handlePost', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit']);

            if (Config::get('Constant.MODULE.NAME') == "page_template" || Config::get('Constant.MODULE.NAME') == "formbuilder") {
                Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/DeleteRecord', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@DeleteRecord']);
            } else {
                Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/DeleteRecord', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@DeleteRecord', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-delete']);
            }

            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/publish', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@publish', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit']);
            Route::post('powerpanel/' . Config::get('Constant.MODULE.NAME') . '/reorder', ['as' => Config::get('Constant.MODULE.NAME') . '.reorder', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@reorder', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('powerpanel/' . Config::get('Constant.MODULE.NAME') . '/destroy', ['as' => Config::get('Constant.MODULE.NAME') . '.destroy', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@destroy', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-delete']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/makeDefault', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@makeDefault']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/ajax', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@ajax', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME'), ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.index', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@index', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME'), ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.handleEditPost', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@handleEditPost', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit']);
            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/ExportRecord', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@ExportRecord', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::get('powerpanel/newsletter/send_email', ['as' => 'newsletters/send_email', 'uses' => 'NewsletterController@send_email']);
            Route::get('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/show/{$id}', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.show', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@show', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/makeFeatured', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@makeFeatured', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit']);
            Route::get('/powerpanel/settings', ['as' => 'powerpanel/settings', 'uses' => 'SettingsController@index', 'middleware' => 'permission:settings-general-setting-management']);
            Route::post('/powerpanel/settings', ['as' => 'powerpanel/settings', 'uses' => 'SettingsController@update_settings', 'middleware' => 'permission:settings-general-setting-management']);
            Route::get('/powerpanel/settings/getDBbackUp', ['as' => 'powerpanel/settings/getDBbackUp', 'uses' => 'SettingsController@getDBbackUp']);
            Route::get('/powerpanel/searchentity', array('as' => 'powerpanel/searchentity', 'uses' => 'SearchentityController@index', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-edit'));
            Route::post('/powerpanel/searchentity', array('as' => 'powerpanel/searchentity', 'uses' => 'SearchentityController@updatesearchentity'));

            //        Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/TrashData_Listing', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@TrashData_Listing', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);

            Route::get('/powerpanel/changeprofile', array('as' => 'powerpanel/changeprofile', 'uses' => 'ProfileController@index'));
            Route::post('/powerpanel/changeprofile', array('as' => 'powerpanel/changeprofile', 'uses' => 'ProfileController@changeprofile'));
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/swaporder', Config::get('Constant.MODULE.CONTROLLER') . '@reorder');
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/ajaxCatAdd', Config::get('Constant.MODULE.CONTROLLER') . '@addCatAjax');
            Route::post('/powerpanel/appointment-lead/saveComment', 'AppointmentLeadController@saveComment');

            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/getChildData', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@getChildData', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/ApprovedData_Listing', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@ApprovedData_Listing', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-list']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/getChildData_rollback', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@getChildData_rollback']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/addpreview', ['as' => 'powerpanel.' . Config::get('Constant.MODULE.NAME') . '.addpreview', 'uses' => Config::get('Constant.MODULE.CONTROLLER') . '@addPreview', 'middleware' => 'permission:' . Config::get('Constant.MODULE.NAME') . '-create']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/insertComents', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@insertComents']);
            Route::post('/powerpanel/' . Config::get('Constant.MODULE.NAME') . '/Get_Comments', ['uses' => Config::get('Constant.MODULE.CONTROLLER') . '@Get_Comments']);
        });
    }
    Route::post('/powerpanel/share', ['uses' => $CONTROLLER_NAME_SPACE . 'OnePushController@ShareonSocialMedia']);
    Route::post('/powerpanel/share/getrec', ['uses' => $CONTROLLER_NAME_SPACE . 'OnePushController@getRecord']);
    Route::get('/powerpanel/share/gPlusCallBack', ['uses' => $CONTROLLER_NAME_SPACE . 'OnePushController@gPlusCallBack']);

    Route::group(['namespace' => $CONTROLLER_NAME_SPACE . 'Powerpanel', 'middleware' => ['auth']], function ($request) {

        Route::post('/powerpanel/formbuilder/formbuilderdata', array('as' => 'powerpanel/formbuilder/formbuilderdata', 'uses' => 'FormBuilderController@GetFormBuilderData'));
        Route::post('/powerpanel/formbuilder/updateformbuilderdata', array('as' => 'powerpanel/formbuilder/updateformbuilderdata', 'uses' => 'FormBuilderController@GetUpdateFormBuilderData'));

        Route::post('/powerpanel/blocked-ips/updateblockid', array('as' => 'powerpanel/blocked-ips/updateblockid', 'uses' => 'BlockedIpsController@UpdateData'));

        Route::post('/powerpanel/onlinepollingcategory/getonlinepollingdata', array('as' => 'powerpanel/onlinepollingcategory/getonlinepollingdata', 'uses' => 'OnlinePollingCategoryController@getonlinepollingdata'));

        Route::post('/powerpanel/users/Security_Remove', array('uses' => 'UserController@Security_Remove'));
        Route::post('/powerpanel/users/Security_Add', array('uses' => 'UserController@Security_Add'));

        Route::post('/powerpanel/users/step_Email_Otp', array('uses' => 'UserController@step_Email_Otp'));
        Route::post('/powerpanel/users/step_otp_verify', array('uses' => 'UserController@step_Otp_verify'));

        Route::post('/powerpanel/users/user-locking', array('uses' => 'UserController@userLocking'));
        Route::get('/powerpanel/tpl/{view}', array('as' => 'view', 'uses' => 'TplController@index'));
        Route::get('/powerpanel/email_log', array('as' => 'email_log', 'uses' => 'EmailLogController@index'));
        Route::post('/powerpanel/email_log/get_email_log_list', array('uses' => 'EmailLogController@get_email_log_list'));
        Route::post('/powerpanel/notification', array('uses' => 'NotificationController@index'));
        Route::post('/powerpanel/notification/update_read_status', array('uses' => 'NotificationController@update_read_status'));
        Route::post('/powerpanel/notification/get_read_notification_count', array('uses' => 'NotificationController@get_read_notification_count'));
        //    Route::post('/powerpanel/global', array('uses' => 'GlobalSearchController@index'));
        Route::get('/powerpanel/search', ['uses' => 'GlobalSearchController@index']);
        Route::post('/powerpanel/search', ['uses' => 'GlobalSearchController@search']);
        Route::post('/powerpanel/search/auto-complete', ['uses' => 'GlobalSearchController@autoComplete']);
        Route::post('/powerpanel/message', array('uses' => 'MessageController@index'));
        Route::post('/powerpanel/message/update_read_status', array('uses' => 'MessageController@update_read_status'));
        Route::post('/powerpanel/message/get_read_message_count', array('uses' => 'MessageController@get_read_message_count'));
        Route::get('/powerpanel/analytics', ['as' => 'powerpanel.analytics.index', 'uses' => 'AnalyticsController@index', 'middleware' => 'permission:analytics-list']);
        Route::post('analytics/get_range_analysis', ['as' => 'analytics.get_range_analysis', 'uses' => 'AnalyticsController@get_range_analysis', 'middleware' => 'permission:analytics-list']);
        Route::get('/powerpanel/plugins', array('uses' => 'PluginController@index'));
        Route::get('/powerpanel/plugins/get_module/{module}', array('uses' => 'PluginController@get_module'));
        Route::get('/powerpanel/plugins/update_module/{module}', array('uses' => 'PluginController@update_module'));

        Route::get('/powerpanel/blocked-ips', array('uses' => 'BlockedIpsController@index'));
        Route::post('/powerpanel/blocked-ips/get-list', array('uses' => 'BlockedIpsController@get_list'));
        Route::post('/powerpanel/blocked-ips/DeleteRecord', ['uses' => 'BlockedIpsController@DeleteRecord']);
        Route::get('/powerpanel/blocked-ips/add', array('uses' => 'BlockedIpsController@edit'));
        Route::post('/powerpanel/blocked-ips/add', ['as' => 'powerpanel.blocked-ips.handleAddPost', 'uses' => 'BlockedIpsController@handlePost']);

        Route::get('/powerpanel/live-user', array('uses' => 'LiveUsersController@index'));
        Route::post('/powerpanel/live-user/get-list', array('uses' => 'LiveUsersController@get_list'));
        Route::post('/powerpanel/live-user/DeleteRecord', ['uses' => 'LiveUsersController@DeleteRecord']);
        Route::post('/powerpanel/live-user/BlockRecord', ['uses' => 'LiveUsersController@BlockRecord']);
        Route::post('/powerpanel/live-user/block_user', ['uses' => 'LiveUsersController@block_user']);
        Route::post('/powerpanel/live-user/un_block_user', ['uses' => 'LiveUsersController@un_block_user']);

        Route::get('/powerpanel/security-settings', array('uses' => 'SecuritySettingsController@index'));

        Route::post('/powerpanel/user_notification/update_read_status', array('uses' => 'UserNotificationController@update_read_status'));
        Route::post('/powerpanel/user_notification/update_read_all_status', array('uses' => 'UserNotificationController@update_read_all_status'));

        Route::post('/powerpanel/events/get_builder_list', 'EventsController@get_buider_list');
        Route::post('/powerpanel/events-category/get_builder_list', 'EventCategoryController@get_builder_list');
        Route::post('/powerpanel/news/get_builder_list', 'NewsController@get_buider_list');
        Route::post('/powerpanel/news-category/get_builder_list', 'NewsCategoryController@get_builder_list');
        Route::post('/powerpanel/blogs/get_builder_list', 'BlogsController@get_buider_list');
        Route::post('/powerpanel/blogs-category/get_builder_list', 'BlogCategoryController@get_builder_list');
        Route::post('/powerpanel/photo-album/get_builder_list', 'PhotoAlbumController@get_buider_list');
        Route::post('/powerpanel/video-gallery/get_builder_list', 'VideoGalleryController@get_buider_list');
        Route::post('/powerpanel/publications/get_builder_list', 'PublicationsController@get_buider_list');
        Route::post('/powerpanel/publications-category/get_builder_list', 'PublicationsCategoryController@get_builder_list');
        Route::post('/powerpanel/log/selectRecords', ['uses' => 'LogController@selectRecords']);
        Route::post('/powerpanel/contact-us/emailreply', ['uses' => 'ContactLeadController@emailreply']);
        Route::post('/powerpanel/contact-us/emailforword', ['uses' => 'ContactLeadController@emailforword']);
    });

    
    Route::POST('/check_activity/no_secure', ['uses' => 'FrontController@check_activity_no_secure']);
    Route::get('/check_activity', ['uses' => 'FrontController@check_activity']);
}
