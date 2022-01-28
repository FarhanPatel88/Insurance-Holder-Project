var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const url = require('url');

const Customers = mongoose.model('Customers');
const Policies = mongoose.model('Policies');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Policy Grab' });
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    const body = req.body;
    req.session.current_url = 'register';
    const customerdetials = {
        customerName: body.nameofcustomer,
        customerAge: Number(body.ageofcustomer),
        customerOccupation: body.occupationofcustomer,
        customerSex: body.sexofcustomer,
        customerPhone: Number(body.numberofcustomer),
        customerEmail: body.emailofcustomer,
        customerPassword: body.passwordofcustomer,
        customerAddress: body.addressofcustomer,
    };

    Customers.create(customerdetials, (err, data) => {
        if (err) {
            res.send(err);
        }
        console.log(data);
        const customerid = data._id;
        console.log(customerid);
        // res.redirect(
        //     url.format({
        //         pathname: '/applypolicy',
        //         query: {
        //             customerid: this.customerid,
        //         },
        //     })
        // );
        res.redirect(`/applypolicy?customerid=${customerid}`);
    });
});

router.get('/updateprofile', function (req, res, next) {
    const customerid = req.query.customerid;
    Customers.findById(customerid, (err, customer) => {
        if (err) {
            res.send(err);
        }
        console.log(customer);
        res.render('register', { title: 'Update Profile', customer: customer });
    });
});

router.post('/updateprofile', function (req, res) {
    const customerid = req.query.customerid;
    const body = req.body;
    req.session.current_url = 'profileupdate';
    const customerdetials = {
        customerName: body.nameofcustomer,
        customerAge: Number(body.ageofcustomer),
        customerOccupation: body.occupationofcustomer,
        customerSex: body.sexofcustomer,
        customerPhone: Number(body.numberofcustomer),
        customerEmail: body.emailofcustomer,
        customerPassword: body.passwordofcustomer,
        customerAddress: body.addressofcustomer,
    };
    console.log(customerid);
    Customers.findByIdAndUpdate(customerid, customerdetials, (err, data) => {
        if (err) {
            res.send(err);
        }
        console.log(data);
        res.redirect(`/afterlogin?customerid=${data._id}`);
    });
});

router.get('/applypolicy', function (req, res, next) {
    const customerid = req.query.customerid;
    console.log(customerid);
    const baseURL = req.session.current_url;
    console.log(req.session.current_url);
    if (baseURL == 'register') {
        // req.session
        res.render('applypolicy', {
            title: 'Apply Policy',
            customerid: customerid,
            page: 'register',
            applypolicyurl: `/applypolicy?customerid=${customerid}`,
            appliedpoliciesurl: `/appliedpolicies?customerid=${customerid}`,
        });
    } else if (baseURL == 'applypolicypost') {
        res.render('applypolicy', {
            title: 'Apply Policy',
            customerid: customerid,
            filled: true,
            applypolicyurl: `/applypolicy?customerid=${customerid}`,
            appliedpoliciesurl: `/appliedpolicies?customerid=${customerid}`,
        });
    } else {
        res.render('applypolicy', {
            title: 'Apply Policy',
            customerid: customerid,
            applypolicyurl: `/applypolicy?customerid=${customerid}`,
            appliedpoliciesurl: `/appliedpolicies?customerid=${customerid}`,
        });
    }
});

router.post('/applypolicy', function (req, res) {
    console.log(req.originalUrl);
    const customerid = req.query.customerid;
    req.session.current_url = 'applypolicypost';
    console.log(customerid);
    const body = req.body;
    console.log(req.body);
    body.smokingstyle ? (body.smokingstyle = 'on') : (body.smokingstyle = 'off');
    body.drinkingstyle ? (body.drinkingstyle = 'on') : (body.drinkingstyle = 'off');
    body.exercisestyle ? (body.exercisestyle = 'on') : (body.exercisestyle = 'off');
    const policydetails = {
        custId: customerid,
        custAnnualIncome: body.annualincome,
        custNetWorth: body.networth,
        custHeight: body.heightofcustomer,
        custWeight: body.weightofcustomer,
        custDOB: body.dobofcustomer,
        custSmokingStyle: body.smokingstyle,
        custDrinkingStyle: body.drinkingstyle,
        custExerciseStyle: body.exercisestyle,
        custBankName: body.bankname,
        custAccountNumber: body.accountnumber,
        custIFSC: body.ifsc,
        custBeneficiaryName: body.beneficiaryname,
        custBeneficiaryAge: body.beneficiaryage,
        custBeneficiaryRelation: body.beneficiaryrelation,
    };

    Policies.create(policydetails, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.redirect(`/applypolicy?customerid=${customerid}`);
        // res.render('applypolicy', { title: 'Apply Policy', customerid: customerid, filled: true });
    });
});

router.get('/updatepolicy', function (req, res, next) {
    const policyid = req.query.policyid;

    Policies.findById(policyid, (err, data) => {
        if (err) {
            res.send(err);
        }
        let month = data.custDOB.getMonth();
        let date = data.custDOB.getDate();
        if (month < 10) {
            month = `0${data.custDOB.getMonth() + 1}`;
        }
        if (date < 10) {
            date = `0${data.custDOB.getDate()}`;
        }

        const customerid = data.custId;
        const dob = `${data.custDOB.getFullYear()}-${month}-${date}`;
        res.render('applypolicy', {
            title: 'Update Policy',
            policy: data,
            dob: dob,
            customerid: customerid,
            applypolicyurl: `/applypolicy?customerid=${customerid}`,
            appliedpoliciesurl: `/appliedpolicies?customerid=${customerid}`,
        });
    });
});

router.post('/updatepolicy', (req, res, next) => {
    const policyid = req.query.policyid;
    const body = req.body;

    body.smokingstyle ? true : (body.smokingstyle = 'off');
    body.drinkingstyle ? true : (body.drinkingstyle = 'off');
    body.exercisestyle ? true : (body.exercisestyle = 'off');
    const policydetails = {
        custAnnualIncome: body.annualincome,
        custNetWorth: body.networth,
        custHeight: body.heightofcustomer,
        custWeight: body.weightofcustomer,
        custDOB: body.dobofcustomer,
        custSmokingStyle: body.smokingstyle,
        custDrinkingStyle: body.drinkingstyle,
        custExerciseStyle: body.exercisestyle,
        custBankName: body.bankname,
        custAccountNumber: body.accountnumber,
        custIFSC: body.ifsc,
        custBeneficiaryName: body.beneficiaryname,
        custBeneficiaryAge: body.beneficiaryage,
        custBeneficiaryRelation: body.beneficiaryrelation,
    };

    Policies.findByIdAndUpdate(policyid, policydetails, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.redirect(`/appliedpolicies?customerid=${data.custId}&updated=true`);
    });
});

router.get('/login', function (req, res, next) {
    const failed = req.query.login;
    console.log(failed);
    req.session.current_url = 'login';
    if (failed == 'failed') {
        res.render('login', { title: 'Login', failed: true });
    } else {
        res.render('login', { title: 'Login' });
    }
});

router.post('/login', function (req, res, next) {
    const body = req.body;
    const logindetails = {
        customerEmail: body.emailofcustomer,
        customerPassword: body.passwordofcustomer,
    };

    req.session.current_url = 'login';

    Customers.findOne(logindetails, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        if (data) {
            const customerid = data._id;
            res.redirect(`/afterlogin?customerid=${customerid}`);
        } else {
            res.redirect(`/login?login=failed`);
        }
    });
});

router.get('/afterlogin', function (req, res, next) {
    const customerid = req.query.customerid;
    if (req.session.current_url == 'profileupdate') {
        res.render('afterlogin', {
            title: 'Menu Page',
            customerid: customerid,
            appliedpolicieslink: `/appliedpolicies?customerid=${customerid}`,
            applypolicylink: `/applypolicy?customerid=${customerid}`,
            updatedprofile: true,
        });
    } else {
        res.render('afterlogin', {
            title: 'Menu Page',
            customerid: customerid,
            appliedpolicieslink: `/appliedpolicies?customerid=${customerid}`,
            applypolicylink: `/applypolicy?customerid=${customerid}`,
            login: true,
        });
    }
});

router.get('/appliedpolicies', function (req, res, next) {
    const customerid = req.query.customerid;
    const updated = req.query.updated;
    const deleted = req.query.deleted;
    console.log(customerid);
    Policies.find(
        {
            custId: customerid,
        },
        (err, data) => {
            if (err) {
                res.send(err);
            }
            console.log(data);
            if (updated == 'true') {
                res.render('appliedpolicies', { title: 'Applied Policies', data: data, updated: true, customerid: customerid });
            } else if (deleted == 'true') {
                res.render('appliedpolicies', { title: 'Applied Policies', data: data, deleted: true, customerid: customerid });
            } else {
                res.render('appliedpolicies', { title: 'Applied Policies', data: data, customerid: customerid });
            }
        }
    );
});

router.post('/deletepolicy', (req, res, next) => {
    const policyid = req.query.policyid;

    Policies.findByIdAndDelete(policyid, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.redirect(`/appliedpolicies?customerid=${data.custId}&deleted=true`);
    });
});

module.exports = router;
