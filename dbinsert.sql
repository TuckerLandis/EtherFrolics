INSERT INTO "credential" ("credential_id", "licensingBoard", "credentialName", "dateInitial", "dateRenewed", "dateExpiring", "credentialImageKey", "user_id")
VALUES ('Boards of Canada', 'Full Cred', '12-21-2021', '12-21-2021', '12-21-2021', 'Picture of a key', 2);

INSERT INTO "education" ("institution", "startDate", "endDate", "degree", "degreeImageKey", "user_id")
VALUES ('The banana slug school', '12-21-2021', '12-21-2021', 'Degree in smashing pots', 'www.degreeimagekey.com/imageofakey', 2);

INSERT INTO "insurance" ("insuranceType", "insuranceProvider", "state", "dateInitial", "dateRenewed", "dateExpiring", "policyNumber", "insuranceImageKey", "user_id")
VALUES ('insurance insurance', 'insurance provider', 'WI', '12-21-2021', '12-21-2021', '12-21-2021', 12, 'www.insuranceimagekey.com/imageofakey', 2);

INSERT INTO "mission_experience" ("organizationName", "location", "startDate", "endDate", "references", "missionExperienceImageKey", "user_id")
VALUES ('Organization, Inc LLC Ltd', 'Minneapolis, MN', '12-21-2021', '12-21-2021', '{"ummmmmm", "oooooooh", "ahhhhhhh"}', 'www.missionexperienceimagekey.com/imageofakey', 2);

INSERT INTO "provider" ("firstName", "lastName", "DOB", "emailAddress", "providerRole", "streetAddress", "city", "state", "zipCode", "soloProvider", "verified", "recruiterOpt", "lastMission", "yearsExperience", "validPassport", "availability", "peerReviews", "missionReviews", "publications", "user_id")
VALUES ('Emry', 'Brisky', '07-29-1993', 'eabrisky@gmail.com', 'Provider Of Rolls', 'N14E2839 Hyrule Highway', 'Minneapolis', 'MN', '12345', TRUE, TRUE, TRUE, '12-21-2021', 8, FALSE, '12-21-2021', '{"Peer Review", "Review Of A Pier"}', '{"Mission Review", "Review Of Ms. Ion"}', '{"Publication", "Sublication", "Dublication"}', 2);

INSERT INTO "work_experience" ("workplace", "jobTitle", "startDate", "endDate", "references", "resumeImageKey", "user_id")
VALUES ('PLACE OF WORK, INC LLCS LTD', 'experienced worker', '12-21-2021', '12-21-2021', '{"ummmmm"}', 'www.resumeimagekey.com/imageofakey', 2);