const express = require("express")
const router = express.Router()
const pool = require('../database')
const {isLoggedIn} = require('../lib/auth')
router.get('/add', (req, res) => {
    res.render('links/add')
})
router.post('/add',isLoggedIn, async (req, res) => {
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url,
        user_id:req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success','Link saved successfully')
    res.redirect('/links')
})

router.get('/delete/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM links WHERE  id = ?', id)
    req.flash('success','Links removed Successfully')

    res.redirect('/links')
})

router.get('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render("links/edit", { link:links[0] })
})

router.post('/edit/:id',isLoggedIn,async (req,res)=>{
    const { id } = req.params;
    const {title, description, url} =req.body;
    const newLink = {
        title,
        description,
        url
    }
    console.log(newLink)
    await pool.query('UPDATE links set ? WHERE id=?',[newLink,id])
    req.flash('success','Link updated successfully!')

    res.redirect("/links")
})

router.get('/',isLoggedIn, async (req, res) => {
    const links = await pool.query("SELECT * from links WHERE user_id=?",[req.user.id])
    res.render('links/list', { links })
})

module.exports = router