const { expect } = require('chai')
const { formatDate } = require("../utils/seeding_functions");

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

