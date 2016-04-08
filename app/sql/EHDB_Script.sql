-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `temp_user`;
DROP TABLE IF EXISTS `verification`;
DROP TABLE IF EXISTS `bookingDetails`;
DROP TABLE IF EXISTS `group`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `vendor`;
DROP TABLE IF EXISTS `media`;
DROP TABLE IF EXISTS `profile`;
DROP TABLE IF EXISTS `member_details`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `otpVerification`;
DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `membership`;


-- ---
-- Table 'membership'
-- This table hold the membership details which EventoHub has planned to offer
-- ---
		
CREATE TABLE IF NOT EXISTS `membership` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50),
  `visibility` VARCHAR(50),
  `space` VARCHAR(50),
  `noOfBookingsAllowed` INTEGER DEFAULT -1,
  `bookingCharge` SMALLINT DEFAULT 0,
  `paymentOption` TINYINT DEFAULT 0,
  `badge` TINYINT DEFAULT 0,
  `trustLevel` TINYINT DEFAULT 0,
  `isActive` CHAR(1) DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- ---
-- Table 'account'
-- 
-- ---

	
CREATE TABLE IF NOT EXISTS `account` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `accountNumber` INTEGER(16) DEFAULT 0,
  `bankName` VARCHAR(50) DEFAULT NULL,
  `ifscCode` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB;

-- ---
-- Table 'services'
-- 
-- ---

		
CREATE TABLE IF NOT EXISTS `services` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `serviceType` VARCHAR(20) DEFAULT NULL,
  `service` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB;

-- ---
-- Table 'address'
-- This holds the address information for anyone. Used for Vendor, Customer, Booking etc
-- ---

		
CREATE TABLE IF NOT EXISTS `address` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `address1` VARCHAR(50) DEFAULT NULL,
  `address2` VARCHAR(50) DEFAULT NULL,
  `city` VARCHAR(20) DEFAULT NULL,
  `state` VARCHAR(20) DEFAULT NULL,
  `pincode` SMALLINT DEFAULT 0,
  `country` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB;



-- ---
-- Table 'otpVerification'
-- This is specific to otp verification
-- ---

		
CREATE TABLE IF NOT EXISTS `otpVerification` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `otp` INTEGER DEFAULT 0,
  `expireTime` TIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- ---
-- Table 'user'
-- This table contains the basic user information whether the user is Vendor or customer. This table holds the login information of the user.
-- ---

		
CREATE TABLE IF NOT EXISTS `user` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(50) DEFAULT NULL,
  `userType` VARCHAR(50) DEFAULT NULL,
  `name` VARCHAR(50) DEFAULT NULL,
  `countryCode` TINYINT DEFAULT 0,
  `phoneNumber` BIGINT DEFAULT 9999999999,
  `emailId` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;



-- ---
-- Table 'member_details'
-- Contains membership details of the vendor 
-- ---

		
CREATE TABLE IF NOT EXISTS `member_details` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `membership_id` INTEGER DEFAULT NULL,
  `status` VARCHAR(20) DEFAULT NULL,
  `expiryDate` DATETIME DEFAULT NULL,
  `level` TINYINT DEFAULT 0,
  PRIMARY KEY (`id`),
FOREIGN KEY (membership_id) REFERENCES `membership` (`id`)
) ENGINE=InnoDB;


-- ---
-- Table 'profile'
-- 
-- ---

		
CREATE TABLE IF NOT EXISTS `profile` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `profileName` VARCHAR(20) DEFAULT NULL,
  `payRangeMin` INTEGER DEFAULT 0,
  `payRangeMax` INTEGER DEFAULT 0,
  `payPer` VARCHAR(20) DEFAULT NULL,
  `travelDistance` INTEGER DEFAULT 0,
  `showPayOnReq` CHAR DEFAULT 'N',
  `inProfessionSince` DATE DEFAULT NULL,
  `desc` VARCHAR(400) DEFAULT NULL,
  `city` VARCHAR(20) DEFAULT NULL,
  `state` VARCHAR(20) DEFAULT NULL,
  `pincode` INTEGER(10) DEFAULT 0,
  `autoAdd` CHAR DEFAULT 'N',
  `account_id` INTEGER DEFAULT NULL,
  `address_id` INTEGER DEFAULT NULL,
  `service_id` INTEGER DEFAULT NULL,
  `profilePhotoUrl` VARCHAR(200) DEFAULT NULL,
  `coverPhotoUrl` VARCHAR(200) DEFAULT NULL,
  `leadsRecieved` INTEGER DEFAULT 0,
  `leadsResponded` INTEGER DEFAULT 0,
  `leadsQouted` INTEGER DEFAULT 0,
  PRIMARY KEY (`id`),
FOREIGN KEY (account_id) REFERENCES `account` (`id`),
FOREIGN KEY (address_id) REFERENCES `address` (`id`),
FOREIGN KEY (service_id) REFERENCES `services` (`id`)
)ENGINE=InnoDB;

-- ---
-- Table 'media'
-- 
-- ---

		
CREATE TABLE IF NOT EXISTS `media` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `profile_id` INTEGER DEFAULT NULL,
  `mediaType` VARCHAR(20) DEFAULT NULL,
  `url` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (profile_id) REFERENCES `profile` (`id`)
)ENGINE=InnoDB;


-- ---
-- Table 'vendor'
-- This table holds the information specific to vendor only
-- ---

		
CREATE TABLE IF NOT EXISTS `vendor` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER DEFAULT NULL,
  `doj` DATETIME DEFAULT NULL,
  `rating` TINYINT DEFAULT 0,
  `profile_id` INTEGER DEFAULT NULL,
  `member_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (user_id) REFERENCES `user` (`id`),
FOREIGN KEY (profile_id) REFERENCES `profile` (`id`),
FOREIGN KEY (member_id) REFERENCES `member_details` (`id`)
) ENGINE=InnoDB;



-- ---
-- Table 'bookings'
-- This table holds information for booking against each profile
-- ---

		
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `profile_id` INTEGER DEFAULT NULL,
  `bookingStartTime` DATETIME DEFAULT NULL,
  `bookingEndTime` DATETIME DEFAULT NULL,
  `evenPlace` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (profile_id) REFERENCES `profile` (`id`)
) ENGINE=InnoDB;



-- ---
-- Table 'customer'
-- This table holds the information specific to customer only.
-- ---

		
CREATE TABLE IF NOT EXISTS `customer` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER DEFAULT NULL,
  `address_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (user_id) REFERENCES `user` (`id`),
FOREIGN KEY (address_id) REFERENCES `address` (`id`)
) ENGINE=InnoDB;

-- ---
-- Table 'group'
-- 
-- ---

		
CREATE TABLE IF NOT EXISTS `group` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `profile_id` INTEGER DEFAULT NULL,
  `memberName` VARCHAR(50) DEFAULT NULL,
  `emailId` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (profile_id) REFERENCES `profile` (`id`)
)ENGINE=InnoDB;



-- ---
-- Table 'bookingDetails'
-- 
-- ---

		
CREATE TABLE IF NOT EXISTS `bookingDetails` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `bookin_id` INTEGER DEFAULT NULL,
  `customer_id` INTEGER DEFAULT NULL,
  `address_id` INTEGER DEFAULT NULL,
  `bookingAmmount` INTEGER DEFAULT 0,
  `ammountDue` INTEGER DEFAULT 0,
  `isEventCompeted` CHAR(1) DEFAULT 'N',
  `isPaymentInitiated` CHAR(1) DEFAULT 'N',
  `otpVerification_id` INTEGER DEFAULT 0,
  `status` VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (bookin_id) REFERENCES `bookings` (`id`),
FOREIGN KEY (customer_id) REFERENCES `customer` (`id`),
FOREIGN KEY (address_id) REFERENCES `address` (`id`),
FOREIGN KEY (otpVerification_id) REFERENCES `otpVerification` (`id`)
)ENGINE=InnoDB;


-- ---
-- Table 'temp_user'
-- This table contains the temp user informationwhose verification is pending.
-- ---

		
CREATE TABLE IF NOT EXISTS `temp_user` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(50) DEFAULT NULL,
  `userType` VARCHAR(50) DEFAULT NULL,
  `name` VARCHAR(50) DEFAULT NULL,
  `countryCode` TINYINT DEFAULT 0,
  `phoneNumber` BIGINT DEFAULT 9999999999,
  `emailId` VARCHAR(255) DEFAULT NULL,
  `isActive` CHAR(1) DEFAULT 'N',
  `isVerified` CHAR(1) DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- ---
-- Table 'verification'
-- This table hold the verification information for the first time user coming for registration. The table data can be flushed based on the emailStartTime limit
-- ---
		
CREATE TABLE IF NOT EXISTS `verification` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER DEFAULT NULL,
  `otpVerification_id` INTEGER DEFAULT 0,
  `emailStartTime` DATETIME DEFAULT NULL,
  `isEmailVerified` CHAR(1) DEFAULT 'N',
  `isPhoneVerified` CHAR(1) DEFAULT 'N',
  `authToken` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
FOREIGN KEY (user_id) REFERENCES `temp_user` (`id`),
FOREIGN KEY (otpVerification_id) REFERENCES `otpVerification` (`id`)
) ENGINE=InnoDB;


