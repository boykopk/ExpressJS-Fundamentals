const restrictedPages = require('../config/auth');
const controllers = require('../controllers/index');

module.exports = (app) => {
    app.get('/', controllers.homeController.index);

    // User routes
    app.get('/user/register', restrictedPages.isAnonymos, controllers.userController.registerGet);
    app.post('/user/register', restrictedPages.isAnonymos, controllers.userController.registerPost);
    app.get('/user/login', restrictedPages.isAnonymos, controllers.userController.loginGet);
    app.post('/user/login', restrictedPages.isAnonymos, controllers.userController.loginPost);
    app.get('/user/logout', restrictedPages.isAuthed, controllers.userController.logout);

    // Article routes
    app.get('/article/create', restrictedPages.isAuthed, controllers.articleController.createGet);
    app.post('/article/create', restrictedPages.isAuthed, controllers.articleController.createPost);
    app.get('/article/details/:articleId', controllers.articleController.details);

    app.get('/article/edit/:articleId', restrictedPages.isAuthed, controllers.articleController.editGet);
    app.post('/article/edit/:articleId', restrictedPages.isAuthed, controllers.articleController.editPost);
    app.get('/article/delete/:articleId', restrictedPages.isAuthed, controllers.articleController.deleteGet);
    app.post('/article/delete/:articleId', restrictedPages.isAuthed, controllers.articleController.deletePost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};

