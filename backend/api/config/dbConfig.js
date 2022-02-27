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
	  user: "YCheuk",
	  password: "QjzW109*",
	  database: "COMP2001HK_YCheuk",
	  server: "socem1.uopnet.plymouth.ac.uk",
	  options: {
		    encrypt: true, // for azure
		    trustServerCertificate: true // change to true for local dev / self-signed certs
	  }
};


module.exports = dbConfig;
