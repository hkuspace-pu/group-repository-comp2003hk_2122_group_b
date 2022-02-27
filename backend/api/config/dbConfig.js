// local database
// const dbConfig = {
// 	user: 'sa',
// 	password: 'Svnny4ever',
// 	database: 'COMP2001HK_YCheuk',
// 	server: 'localhost',
// 	port: 1401,
// 	options: {
// 		encrypt: true, // for azure
// 		trustServerCertificate: true // change to true for local dev / self-signed certs
// 	}
// };

// Plymouth database
const dbConfig = {
	  user: "admin",
	  password: "Svnny4ever",
	  database: "COMP2003HK_GROUP_B",
	  server: "database-tree-survey.c2i34jeq5e09.us-east-1.rds.amazonaws.com",
    port: 1433,
	  options: {
		    encrypt: true, // for azure
		    trustServerCertificate: true // change to true for local dev / self-signed certs
	  }
};


module.exports = dbConfig;
