/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-23 09:48:24 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-23 14:54:46
 */

//Promises for Async

const users = [{
        id: 1,
        name: 'dheeraj',
        schoolId: 101,
    },
    {
        id: 2,
        name: 'chandan',
        schoolId: 999,
    }
];

const grades = [{
        id: 1,
        schoolId: 101,
        grade: 86
    },
    {
        id: 2,
        schoolId: 999,
        grade: 100
    },
    {
        id: 3,
        schoolId: 101,
        grade: 80
    }
];

//Functions returing Promises
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            if (user.id === id) {
                return user;
            }
        });
        if (user) {
            resolve(user);
        } else {
            reject('User not found');
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (id) => {
    var user;
    return getUser(id).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        // console.log('User name', user.name);
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b);

            return `user ${user.name} has average ${average}.`;

        }
    });
};

const getStatusAlt = async(id) => {
    const user = await getUser(id);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b);

        return `user ${user.name} has average ${average}.`;

    }

};

//Function calling - Get users

getStatusAlt(1).then((resolve) => {
    console.log(resolve);

}).catch((error) => {
    console.log(error);
});



getUser(1).then((user) => {
    // console.log(user);

}).catch((reject) => {
    console.log(reject);

});

//Get grades
getGrades(104).then((grade) => {
    // console.log(grade);

}).catch((reject) => {
    console.log(reject);

});

//Get status
getStatus(1).then((status) => {
    // console.log(status);


}).catch((reject) => {
    console.log(reject);

});