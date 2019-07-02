const recommendPoetry = [
    {
        message: 'What is the object oriented way to get wealthy ?',
        result: 'Inheritance',
    },
    {
        message: 'To understand what recursion is...',
        result: "You must first understand what recursion is",
    },
    {
        message: 'What do you call a factory that sells passable products?',
        result: 'A satisfactory',
    },
];

let recommendPoetry_call_count = 0;

export default {
    'get /dev/recommendPoetry': function (req, res) {
        const responseObj = recommendPoetry[recommendPoetry_call_count % recommendPoetry.length];
        recommendPoetry_call_count += 1;
        setTimeout(() => {
            res.json(responseObj);
        }, 3000);
    },
};