import { test, expect } from '@playwright/test';

test.describe('API tests Restful-booker @api', () => {

    const bookingData = {
        firstname : 'Jim',
        lastname : 'Brown',
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
            checkin : '2018-01-01',
            checkout : '2019-01-01'
        },
        additionalneeds : 'Breakfast'
    }

    const baseURL = 'https://restful-booker.herokuapp.com';
    const bookingID = 551;  //hardcoded value

    test('POST', async ({ request }) => {

        const response = await request.post(`${baseURL}/booking`, { data: bookingData });

        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Response: ', responseBody);

        expect(responseBody.booking.firstname).toBe('Jim');
        expect(responseBody.booking.lastname).toBe('Brown');
        expect(responseBody.booking.totalprice).toBe(111);
        expect(responseBody.booking.depositpaid).toBe(true);
        expect(responseBody.booking.bookingdates.checkin).toBe('2018-01-01');
        expect(responseBody.booking.bookingdates.checkout).toBe('2019-01-01');
        expect(responseBody.booking.additionalneeds).toBe('Breakfast');

    });

    test('GET', async ({ request }) => {

        const response = await request.get(`${baseURL}/booking/${bookingID}`);

        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Response: ', responseBody);
        expect(responseBody.firstname).toBe('Jim');
        expect(responseBody.lastname).toBe('Brown');

    });

    test('PUT', async ({ request }) => {

        const auth = await request.post(`${baseURL}/auth`, {
            data : {
                username : 'admin',
                password : 'password123',
            },
        });

        const authToken = await auth.json();
        console.log(authToken.token);

        const response = await request.put(`${baseURL}/booking/${bookingID}`, {
            headers : {
                'Cookie' : `token=${authToken.token}`,
            },
            data : {
                firstname : 'Jom',  //Jim to Jom
                lastname : 'Briwn', //Brown to Briwn
                totalprice : 111,
                depositpaid : true,
                bookingdates : {
                    checkin : '2018-01-01',
                    checkout : '2019-01-01'
                },
                additionalneeds : 'Breakfast'
            },
        });

        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Response: ', responseBody);
        expect(responseBody.firstname).toBe('Jom');
        expect(responseBody.lastname).toBe('Briwn');
    });

    test('DELETE', async ({ request }) => {

        const auth = await request.post(`${baseURL}/auth`, {
            data : {
                username : 'admin',
                password : 'password123',
            },
        });

        const authToken = await auth.json();
        console.log(authToken.token);

        let response = await request.delete(`${baseURL}/booking/${bookingID}`, {
            headers : {
                'Cookie' : `token=${authToken.token}`,
            },
        });

        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(201);
        
        response = await request.get(`${baseURL}/booking/${bookingID}`);

        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(404);

    });

});