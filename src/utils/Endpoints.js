import { Config } from "./config";


export const Endpoints = {
    TOKEN: `${Config.API_URL}/Auth/Login`,
    TENANT: `${Config.API_URL}/Tenants`,
    PACKAGES: `${Config.API_URL}/TenantPackages`,
    TRAINER: `${Config.API_URL}/TenantTrainers`,
    MEASUREMENT: `${Config.API_URL}/TenantMemberMeasurements`,
    PACKAGE_COURSES: `${Config.API_URL}/TenantPackageCourses`,
    COURSE_BY_ID: `${Config.API_URL}/TenantPackageCourses/By-User-Id`,
    CALENDAR: `${Config.API_URL}/TenantCalendar`,
    PENDING_PAYMENTS: `${Config.API_URL}/TenantPackages/Pending-Payments`,
    FINISHED_PACKAGES: `${Config.API_URL}/TenantPackages/Finished-Packages`,
    TRAINER_LESSON_SUMMARY: `${Config.API_URL}/TenantPackageCourses/Trainer-Lesson-Summary`,
    TENANT_OWNER: `${Config.API_URL}/TenantOwners`,
    TENANT_CATEGORY: `${Config.API_URL}/TenantCategories`,
    TENANT_MEASUREMENT_FIELD: `${Config.API_URL}/TenantMeasurementFields`,
    TENANT_DOCUMENT: `${Config.API_URL}/TenantDocuments`,

};
