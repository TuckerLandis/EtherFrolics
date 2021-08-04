
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"authorization" int NOT NULL DEFAULT 1
);

CREATE TABLE "provider" (
  "provider_id" SERIAL PRIMARY KEY,
	"user_id" int references "user",
	"firstName" varchar(255),
	"lastName" varchar(255),
	"DOB" DATE,
	"emailAddress" varchar(50),
	"phoneNumber" varchar(11),
	"providerRole" varchar(255),
	"streetAddress" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"zipCode" varchar(10),
	"soloProvider" BOOLEAN default FALSE,
	"verified" BOOLEAN default FALSE,
	"recruiterOpt" BOOLEAN default FALSE,
	"yearsExperience" varchar(10),
	"validPassport" BOOLEAN default FALSE,
	"availability" DATE,
	"peerReviews" TEXT [],
	"missionReviews" TEXT [],
	"publications" TEXT [],
	"registrationComplete" BOOLEAN default FALSE,
	"resumeKey" varchar(200)
);


CREATE TABLE "education" (
	"education_id" serial PRIMARY KEY,
	"institution" varchar(255),
	"startDate" DATE,
	"endDate" DATE,
	"degree" varchar(255),
	"degreeImageKey" varchar(100),
	"user_id" int references "user"
);


CREATE TABLE "work_experience" (
	"workplace" varchar(255),
	"jobTitle" varchar(255),
	"startDate" DATE,
	"endDate" DATE,
	"referenceName" varchar (100),
	"referencePhone" varchar (100),
	"referenceEmail" varchar (100),
	"user_id" int REFERENCES "user"
);

CREATE TABLE "mission_experience" (
	"missionExperience_id" serial PRIMARY KEY,
	"organizationName" varchar(255),
	"location" varchar(255),
	"startDate" DATE,
	"endDate" DATE,
	"referenceName" varchar (75),
	"referencePhone" varchar(11),
	"missionExperienceImageKey" varchar(100),
	"user_id" int REFERENCES "user"
);

CREATE TABLE "credential" (
	"credential_id" serial PRIMARY KEY,
	"licensingBoard" varchar(255),
	"credentialName" varchar(255),
	"licenseNumber" int,
	"dateInitial" DATE,
	"dateRenewed" DATE,
	"dateExpiring" DATE,
	"credentialImageKey" varchar(1000),
	"user_id" int REFERENCES "user"
);

CREATE TABLE "insurance" (
	"insurance_id" serial PRIMARY KEY,
	"insuranceType" varchar(255),
	"insuranceProvider" varchar(255),
	"state" varchar(255),
	"dateInitial" DATE,
	"dateRenewed" DATE,
	"dateExpiring" DATE,
	"policyNumber" integer,
	"insuranceImageKey" varchar(100),
	"user_id" int REFERENCES "user"
);

CREATE TABLE "organization" (
	"organization_id" serial PRIMARY KEY,
	"name" varchar(255),
	"contactName" varchar(255),
	"contactPostion" varchar(255),
	"contactPhone" varchar(12)
);

CREATE TABLE "mission" (
	"mission_id" serial PRIMARY KEY,
	"name" varchar(255),
	"location" varchar(255),
	"missionActive" BOOLEAN DEFAULT FALSE,
	"soleProvider" BOOLEAN DEFAULT FALSE,
	"startDate" DATE,
	"endDate" DATE,
	"missionLink" TEXT,
	"applyLink" TEXT,
	"providerReviews" varchar (10000)[],
	"organization_id" int REFERENCES "organization"
);

-- Get request for an idividual provider

SELECT 
"user".id, "user".username, 
"provider".provider_id, 
"provider"."firstName", 
"provider"."lastName", 
"provider"."DOB", 
"provider"."emailAddress", 
"provider"."providerRole", 
"provider"."streetAddress", 
"provider".city, 
"provider".state, 
"provider"."zipCode", 
"provider"."soloProvider", 
"provider".verified, 
"provider"."recruiterOpt", 
"provider"."yearsExperience", 
"provider"."validPassport", 
"provider".availability, 
"provider"."peerReviews", 
"provider"."missionReviews", 
"provider".publications,
"provider"."registrationComplete", 
(SELECT JSON_AGG(providerCredentials)
	FROM
		(SELECT "credential_id", "licensingBoard", "credentialName", "licenseNumber", "dateInitial", "dateRenewed", "dateExpiring", "credentialImageKey" 
		FROM "credential"
		WHERE "credential".user_id = "user".id) AS providerCredentials) AS credential_array, 
(SELECT JSON_AGG(providerEducation)
	FROM 
		(SELECT "education_id", "institution", "startDate", "endDate", "degree", "degreeImageKey"
		FROM "education"
		WHERE "education".user_id = "user".id) AS providerEducation) AS education_array, 
(SELECT JSON_AGG(providerInsurance)
	FROM
		(SELECT "insurance_id", "insuranceType", "insuranceProvider", "state", "dateInitial", "dateRenewed", "dateExpiring", "policyNumber", 		"insuranceImageKey"
		FROM "insurance"
		WHERE "insurance".user_id = "user".id) AS providerInsurance) AS insurance_array, 
(SELECT JSON_AGG(providerMissionExperience)
	FROM
		(SELECT "missionExperience_id", "organizationName", "location", "startDate", "endDate", "referenceName", "referencePhone", "missionExperienceImageKey"
		FROM "mission_experience"
		WHERE "mission_experience".user_id = "user".id) AS providerMissionExperience) AS mission_experience_array, 
(SELECT JSON_AGG(providerWorkExperience)
	FROM
		(SELECT "workplace", "jobTitle", "startDate", "endDate", "referenceName", "referencePhone", "referenceEmail"
		FROM "work_experience"
		WHERE "work_experience".user_id = "user".id) AS providerWorkExperience) AS work_experience_array
	FROM "user"
	JOIN "provider" 
	ON "user".id = "provider".user_id
	WHERE "user".authorization = 1
	GROUP BY "user".id, "user".username, "provider".provider_id
	ORDER BY "provider".verified;