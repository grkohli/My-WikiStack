const express = require('express');
const router = express.Router();
const { addPage } = require('../views')
const { Page } = require('../models');
const { wikiPage } = require('../views');
const { main } = require('../views');

router.get('/', (req, res, next) => {
    //res.redirect('/wiki');
    Page.findAll().then(pages => {
        //main(pages);
        console.log('Pages', pages);
    })
    //res.send('Got to GET /wiki/');
});


router.post('/', async (req, res, next) => {
    const newTitle = req.body.title;
    const newContent = req.body.content;

    const page = new Page({
        title: newTitle,
        content: newContent
    })

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { 
        next(error) 
    }
   
    //console.log('ReqBody', req.body)
    //console.log('Page Instance', page);
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(wikiPage(page));
    } catch(error) {
        next(error);
    }
  });


module.exports = router;