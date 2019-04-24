const { expect } = require('chai')
const { formatDate, createRef, dataFormatter } = require("../utils/seeding_functions");

describe('formatDate()', () => {
    it('should always return new array when passed an array', () => {
        const input = []
        const actual = formatDate(input)
        const output = []
        expect(actual).to.eql(output)
        expect(actual).to.not.equal(input)
    });

    it('should convert the create_at value from milliseconds (a number) to a date (an object)', () => {
        const input = [
            {
                title: 'Running a Node App',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: 1471522072389
            }
        ]
        const actual = formatDate(input)
        const output = [
            {
                title: 'Running a Node App',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: new Date(1471522072389)
            }
        ]
        expect(actual).to.eql(output)
    });

    it('should update the created_at: for multiple objects in array', () => {

        const input = [
            {
                title: 'Running a Node App',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: 1471522072389
            },
            {
                title: 'Running a Node App2',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: 1471522072389
            }
        ]
        const actual = formatDate(input)
        const output = [
            {
                title: 'Running a Node App',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: new Date(1471522072389)
            },
            {
                title: 'Running a Node App2',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: new Date(1471522072389)
            }
        ]
        expect(actual).to.eql(output)

    });

    it('should not mutate the original inputted array', () => {
        const input = [
            {
                title: 'Running a Node App',
                topic: 'coding',
                author: 'jessjelly',
                body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
                created_at: 1471522072389
            }
        ]
        formatDate(input)
        expect(input).to.eql([{
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: 1471522072389
        }])
    });
})

describe("createRef()", () => {
    it("returns an empty object, when passed an empty array", () => {
        const input = [];
        const actual = createRef(input);
        const expected = {};
        expect(actual).to.eql(expected);
    });
    it("should return a key value pair from arr items, when passed array with objects", () => {
        const input = [{ article_id: 1, title: 'Running a Node App' }];
        const actual = createRef(input);
        const expected = { 1: 'Running a Node App' };
        expect(actual).to.eql(expected);
    });
    it("should create a reference object, when passed array with multiple objects", () => {
        const input = [
            { article_id: 1, title: 'Running a Node App' },
            { article_id: 2, title: 'The Rise Of Thinking Machines' },
            { article_id: 3, title: '22 Amazing open source React projects' }
        ];
        const actual = createRef(input);
        const expected = {
            1: 'Running a Node App',
            2: 'The Rise Of Thinking Machines',
            3: '22 Amazing open source React projects'
        };
        expect(actual).to.eql(expected);
    });
    it("should create key value-pairs based on strings passed in parameters", () => {
        const input = [
            { article_id: 1, title: 'Running a Node App' }
        ];
        const actual = createRef(input, "title", "article_id");
        const expected = { 'Running a Node App': 1 };
        expect(actual).to.eql(expected);
    });
})

describe.only('dataFormatter()', () => {
    it('should always return new array when passed an array', () => {
        const input = []
        const actual = dataFormatter(input)
        const output = []
        expect(actual).to.eql(output)
        expect(actual).to.not.equal(input)
    });
    it('should add article_id to object when passed Reference Object', () => {
        const inputDataArray = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1
        }]
        const refObj = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18 }
        const actual = dataFormatter(inputDataArray, refObj)
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            article_id: 18
        }]
        expect(actual).to.eql(expected)
    });
    it('should add article ID when passed multiple objects', () => {
        const inputDataArray = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1
        },
        {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7
        }]
        const refObj = {
            'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
            'Making sense of Redux': 4
        }
        const actual = dataFormatter(inputDataArray, refObj)
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            article_id: 18
        },
        {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7,
            article_id: 4
        }]
        expect(actual).to.eql(expected)
    });
});


[{
    body:
        'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to:
        'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1
},
{
    body:
        'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
    belongs_to: 'Making sense of Redux',
    created_by: 'grumpy19',
    votes: 7
}]


refObj = {
    'Running a Node App': 1,
    "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
    '22 Amazing open source React projects': 3,
    'Making sense of Redux': 4,
    'Please stop worrying about Angular 3': 5,
    'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals': 6,
    'Using React Native: One Year Later': 7,
    'Express.js: A Server-Side JavaScript Framework': 8,
    'Learn HTML5, CSS3, and Responsive WebSite Design in One Go': 9,
    'An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET': 10,
    'Designing Better JavaScript APIs': 11,
    'The battle for Node.js security has only begun': 12,
    "What does Jose Mourinho's handwriting say about his personality?": 13,
    'Who Will Manage Your Club in 2021?': 14,
    'Why do England managers keep making the same mistakes?': 15,
    'History of FC Barcelona': 16,
    'Which current Premier League manager was the best player?': 17,
    'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
    'Who are the most followed clubs and players on Instagram?': 19,
    'History of Football': 20,
    'Agility Training Drills For Football Players': 21,
    'Defensive Metrics: Measuring the Intensity of a High Press': 22,
    'Sunday league football': 23,
    'Game of talents: management lessons from top football coaches': 24,
    'Sweet potato & butternut squash soup with lemon & garlic toast': 25,
    'HOW COOKING HAS CHANGED US': 26,
    'Thanksgiving Drinks for Everyone': 27,
    'High Altitude Cooking': 28,
    'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29,
    'Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams': 30,
    'What to Cook This Week': 31,
    'Halal food: Keeping pure and true': 32,
    'Seafood substitutions are increasing': 33,
    'The Notorious MSG’s Unlikely Formula For Success': 34,
    'Stone Soup': 35,
    'The vegan carnivore?': 36
}