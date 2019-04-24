const { expect } = require('chai')
const { formatDate, createRef, formatArticleID, renameKeys } = require("../utils/seeding_functions");

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

describe('formatArticleID()', () => {
    it('should always return new array when passed an array', () => {
        const input = []
        const actual = formatArticleID(input)
        const output = []
        expect(actual).to.eql(output)
        expect(actual).to.not.equal(input)
    });

    it('should remove belongs_to from input object', () => {
        const inputDataArray = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1
        }]
        const refObj = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18 }
        const actual = formatArticleID(inputDataArray, refObj)
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            created_by: 'tickle122',
            votes: -1,
            article_id: 18
        }]
        expect(actual).to.eql(expected)
    });

    it('should add article_id to object when passed Reference Object', () => {
        const inputDataArray = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1
        }]
        const refObj = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18 }
        const actual = formatArticleID(inputDataArray, refObj)
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
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
        const actual = formatArticleID(inputDataArray, refObj)
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem.',
            created_by: 'tickle122',
            votes: -1,
            article_id: 18
        },
        {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            created_by: 'grumpy19',
            votes: 7,
            article_id: 4
        }]
        expect(actual).to.eql(expected)
    });
});

describe("renameKeys", () => {
    it("returns a new empty array, when passed an empty array", () => {
        const inputArray = [];
        const actual = renameKeys(inputArray);
        const expected = [];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(inputArray);
    });
    it("should change the key name when passed a single item", () => {
        const inputArray = [{ created_by: 'butter_bridge' }];
        const keyToChange = "created_by";
        const newKey = "author";
        const actual = renameKeys(inputArray, keyToChange, newKey);
        const expected = [{ author: 'butter_bridge' }];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(inputArray);
    });
    it("should find the specific key in an array that requires updating, when object had multiple keys", () => {
        const inputArray = [{
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge'
        }];
        const keyToChange = "created_by";
        const newKey = "author";
        const actual = renameKeys(inputArray, keyToChange, newKey);
        const expected = [{
            belongs_to: "They're not exactly dogs, are they?",
            author: 'butter_bridge'
        }];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(inputArray);
    });
    it("should change the key name for multiple items in an array", () => {
        const inputArray = [{ created_by: "butter_bridge" }, { created_by: "icellusedkars" }];
        const keyToChange = "created_by";
        const newKey = "author";
        const actual = renameKeys(inputArray, keyToChange, newKey);
        const expected = [{ author: "butter_bridge" }, { author: "icellusedkars" }];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(inputArray);
    });
});