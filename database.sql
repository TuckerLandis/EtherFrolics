
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
	"providerRole" varchar(255),
	"streetAddress" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"zipCode" varchar(10),
	"soloProvider" BOOLEAN default FALSE,
	"verified" BOOLEAN default FALSE,
	"recruiterOpt" BOOLEAN default FALSE,
	"lastMission" DATE,
	"yearsExperience" varchar(10),
	"validPassport" BOOLEAN default FALSE,
	"availability" DATE,
	"peerReviews" TEXT [],
	"missionReviews" TEXT [],
	"publications" TEXT []
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
	"resumeImageKey" varchar(100),
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
	"liscenseNumber" int,
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
	"state" varchar(2),
	"dateInitial" DATE,
	"dateRenewed" DATE,
	"dateExpiring" DATE,
	"policyNumber" integer,
	"insuranceImageKey" varchar(100),
	"user_id" int REFERENCES "user"
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
	"providerReviews" varchar (10000)[],
	"organization_id" int REFERENCES "organization"
);

CREATE TABLE "organization" (
	"organization_id" serial PRIMARY KEY,
	"name" varchar(255),
	"contactName" varchar(255),
	"contactPostion" varchar(255),
	"contactPhone" varchar(12)
);