const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

//generating a slug since it is a required field
function generateSlug(title) {
    return title.replace(/\s+/g, '_').replace(/\W/g,'');
}

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: Sequelize.ENUM('open', 'closed')
});

Page.beforeValidate(instance => {
    const slug = generateSlug(instance.title);
    instance.slug = slug;
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
})

const main = async () => {
    await db.sync({
        force: true
    })
    console.log('DB synced. All good to go!');
}

main();

module.exports = {
    db,
    Page,
    User
}