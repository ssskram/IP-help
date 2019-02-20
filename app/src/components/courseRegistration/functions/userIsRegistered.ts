export default function userIsRegistered(user, course, registrations) {
    const registrationExists = registrations.some(reg => reg.courseCode == course.courseCode && reg.user == user.email)
    return registrationExists
}