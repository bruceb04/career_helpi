const bruce = require("./photos/bruce.JPEG");
const ryan = require("./photos/ryan.png");
const matt = require("./photos/matt.png");
const dev = require("./photos/dev.png");

export const PEOPLE = 
[
    {
        "name": "Bruce Bermel",
        "pronouns": ["he", "him"],
        "gradSem": "Spring 2026",
        "schoolEmail": "brbe@udel.edu",
        "image": bruce,
        "links": [
            {"site": "LinkedIn", "url": "https://www.linkedin.com/in/bruce-bermel-25197a25b/"},
            {"site": "GitHub", "url": "https://github.com/bruceb04"}
        ]
    },
    {
        "name": "Ryan Cortes",
        "pronouns": ["he", "him"],
        "gradSem": "Spring 2027",
        "schoolEmail": "ryancort@udel.edu",
        "image": ryan,
        "links": []

    },
    {
        "name": "Devashish Kaluvakolanu",
        "pronouns": ["he", "him"],
        "gradSem": "Spring 2026",
        "schoolEmail": "kaldevas@udel.edu",
        "image": dev,
        "links": []

    },
    {
        "name": "Matthew Kudler",
        "pronouns": ["he", "him"],
        "gradSem": "Spring 2026",
        "schoolEmail": "mkudler@udel.edu",
        "image": matt,
        "links": []

    }

]