var user = {
    id:2,
    firstname: 'Test',
    lastname: 'Test',
    email: 'test@test.cl',
    username: 'test',
    password: 'test'
};

describe('User CRUD Test', () => {
   
    test('Create User', done => {
        var User = require('../../src/models/user.model');
        User.create(user, (error, data) => {
            if (error) {
                done(error);
                return;
            }
            try {
                expect(data.email).toBe(user.email);
                done();
            } catch (error) {
                done(error);
            }

        })
    });

    test('Find Users', done => {
        var User = require('../../src/models/user.model');
        User.getAll((error, data) => {
            if (error) {
                done(error);
                return;
            }
            try {
                expect(Array.isArray(data)).toBe(true);
                done();
            } catch (error) {
                done(error);
            }

        })
    });

    test('Update User', done => {
        var User = require('../../src/models/user.model');
        const data = new User({
            firstname: 'Test2',
            lastname: 'Test2',
            email: user.email.toLowerCase(),
            username: user.username.toLowerCase(),
            password:user.password, 
        })
        User.updateById(user.id, data, (error, result) => {
            if (error) {
                done(error);
                return;
            }
            try {
                expect(result.firstname).toBe(data.firstname);
                expect(result.lastname).toBe(data.lastname);
                done();
            } catch (error) {
                done(error);
            }

        })
    });

    test('User remove', done => {
        var User = require('../../src/models/user.model');
        User.remove(user.id, (error, data) => {
            if (error) {
                done(error);
                return;
            }
            try {
                expect(data.affectedRows).toBe(1);
                done();
            } catch (error) {
                done(error);
            }
    
        })
        User.close();
    });
});